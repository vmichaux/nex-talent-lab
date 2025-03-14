
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

// Interface for newsletter subscription
export interface NewsletterSubscription {
  email: string;
  subscriptionDate: Date;
}

// Add a new email subscription to Firestore
export const subscribeToNewsletter = async (email: string): Promise<string | null> => {
  try {
    const subscription: NewsletterSubscription = {
      email,
      subscriptionDate: new Date(),
    };
    
    const docRef = await addDoc(collection(db, "newsletterSubscriptions"), subscription);
    return docRef.id;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return null;
  }
};
