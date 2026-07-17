
import { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  Timestamp, 
  doc, 
  updateDoc, 
  getDoc, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db, getUserProfile } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExternalLink } from "lucide-react";

export interface Application {
  id: string;
  projectId: string;
  projectTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  coverLetter: string;
  relevantExperience: string;
  availabilityDate: string;
  timeCommitment: string;
  portfolioLink?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  feedback?: string;
}

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const fetchUserApplications = async (userId?: string) => {
    if (!userId && !currentUser?.uid) {
      setLoading(false);
      return [];
    }

    const targetUserId = userId || currentUser?.uid;
    
    try {
      setLoading(true);
      
      // Simple query without ordering to avoid index requirements
      const applicationsQuery = query(
        collection(db, "applications"),
        where("userId", "==", targetUserId)
      );
      
      const querySnapshot = await getDocs(applicationsQuery);
      const fetchedApplications = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        
        // Convert Firestore timestamp to Date
        const createdAt = data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate() 
          : new Date(data.createdAt || Date.now());
        
        return {
          id: doc.id,
          ...data,
          createdAt,
        } as Application;
      });
      
      // Get full names for applications if needed
      const applicationsWithNames = await Promise.all(
        fetchedApplications.map(async (app) => {
          // Only try to get full name if userName is default/empty
          if (app.userId && (app.userName === "Anonymous User" || !app.userName)) {
            try {
              const userProfile = await getUserProfile(app.userId);
              if (userProfile && userProfile.firstName && userProfile.lastName) {
                return {
                  ...app,
                  userName: `${userProfile.firstName} ${userProfile.lastName}`
                };
              } else if (userProfile && userProfile.displayName) {
                return {
                  ...app,
                  userName: userProfile.displayName
                };
              }
            } catch (err) {
              console.error("Error fetching user profile for name:", err);
            }
          }
          return app;
        })
      );
      
      // Sort applications manually (newest first)
      const sortedApplications = applicationsWithNames.sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      );
      
      setApplications(sortedApplications);
      setError(null);
      return sortedApplications;
    } catch (err) {
      console.error("Error fetching user applications:", err);
      setError("Failed to load applications. Please try again later.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Create a notification when an application status changes
  const createNotification = async (application: Application, status: "accepted" | "rejected", feedback?: string) => {
    try {
      // Create notification for the applicant
      await addDoc(collection(db, "notifications"), {
        userId: application.userId,
        type: "application",
        title: `Application ${status === "accepted" ? "Accepted" : "Rejected"}`,
        content: status === "accepted" 
          ? `Your application for "${application.projectTitle}" has been accepted${feedback ? ": " + feedback : ""}` 
          : `Your application for "${application.projectTitle}" has been rejected${feedback ? ": " + feedback : ""}`,
        read: false,
        createdAt: serverTimestamp(),
        link: `/project/${application.projectId}`,
        relatedId: application.id
      });
      
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  return { 
    applications, 
    loading, 
    error,
    refetchApplications: fetchUserApplications,
    createNotification
  };
};
