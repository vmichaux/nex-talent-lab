
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  Timestamp, 
  doc, 
  updateDoc, 
  orderBy, 
  writeBatch
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './use-auth';
import { Notification } from '@/types/notification';
import { toast } from 'sonner';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Fetch notifications when user changes
  useEffect(() => {
    if (!currentUser?.uid) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Create a query against the notifications collection
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    // Set up a listener for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationList: Notification[] = [];
      let unread = 0;
      
      snapshot.forEach((doc) => {
        const notification = {
          id: doc.id,
          ...doc.data() 
        } as Notification;
        
        // Ensure createdAt is a Date object
        if (notification.createdAt instanceof Timestamp) {
          notification.createdAt = notification.createdAt.toDate();
        } else if (typeof notification.createdAt === 'string') {
          notification.createdAt = new Date(notification.createdAt);
        }
        
        notificationList.push(notification);
        
        if (!notification.read) {
          unread++;
        }
      });
      
      setNotifications(notificationList);
      setUnreadCount(unread);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [currentUser?.uid]);

  // Function to mark a notification as read
  const markAsRead = async (notificationId: string) => {
    if (!currentUser?.uid) return;
    
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, {
        read: true
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Function to mark all notifications as read
  const markAllAsRead = async () => {
    if (!currentUser?.uid || notifications.length === 0) return;
    
    try {
      const batch = writeBatch(db);
      
      notifications.forEach(notification => {
        if (!notification.read) {
          const notificationRef = doc(db, "notifications", notification.id);
          batch.update(notificationRef, { read: true });
        }
      });
      
      await batch.commit();
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark notifications as read");
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead
  };
}
