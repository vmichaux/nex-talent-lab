import { addDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "./firebase-config";

// Interface for newsletter subscription
export interface NewsletterSubscription {
  email: string;
  subscriptionDate: Date;
}

// Check if the collection exists and is accessible
export const checkNewsletterCollection = async (): Promise<boolean> => {
  try {
    console.log("Checking newsletterSubscriptions collection access...");
    const collectionRef = collection(db, "newsletterSubscriptions");
    const testQuery = query(collectionRef, limit(1));
    const snapshot = await getDocs(testQuery);
    console.log(`Collection check result: ${snapshot.empty ? 'Empty collection' : 'Collection has data'}`);
    return true;
  } catch (error) {
    console.error("Error accessing newsletterSubscriptions collection:", error);
    return false;
  }
};

// Add a new email subscription to Firestore
export const subscribeToNewsletter = async (email: string): Promise<string | null> => {
  try {
    console.log(`Attempting to subscribe email: ${email}`);
    
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
    
    console.log("Adding document to newsletterSubscriptions collection...");
    const docRef = await addDoc(collection(db, "newsletterSubscriptions"), subscription);
    console.log("Newsletter subscription successful with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return null;
  }
};
