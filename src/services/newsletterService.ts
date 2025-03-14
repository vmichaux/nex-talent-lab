
import { db } from '../lib/firebase-config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';

export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  try {
    // Check if email already exists
    const emailQuery = query(
      collection(db, 'newsletterSubscriptions'),
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(emailQuery);
    
    if (!querySnapshot.empty) {
      toast.info('This email is already subscribed!');
      return true;
    }
    
    // Add new subscription
    await addDoc(collection(db, 'newsletterSubscriptions'), {
      email,
      createdAt: new Date(),
    });
    
    toast.success('Subscribed successfully!');
    return true;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    toast.error('Failed to subscribe. Please try again.');
    return false;
  }
};
