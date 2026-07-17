
import { addDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "./firebase";

// Interface for newsletter subscription
export interface NewsletterSubscription {
  email: string;
  subscriptionDate: Date;
}

// Check if the collection exists and is accessible
export const checkNewsletterCollection = async (): Promise<boolean> => {
  try {
    const collectionRef = collection(db, "newsletterSubscriptions");
    const testQuery = query(collectionRef, limit(1));
    const snapshot = await getDocs(testQuery);
    return true;
  } catch (error) {
    console.error("Error accessing newsletterSubscriptions collection:", error);
    return false;
  }
};

// Add a new email subscription to Firestore
export const subscribeToNewsletter = async (email: string): Promise<string | null> => {
  try {
    
    // First check if collection is accessible
    const collectionAccessible = await checkNewsletterCollection();
    if (!collectionAccessible) {
      console.error("Collection not accessible, cannot proceed with subscription");
      return null;
    }
    
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
