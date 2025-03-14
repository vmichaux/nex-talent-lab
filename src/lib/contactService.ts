
import { addDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "./firebase";

// Interface for contact form submission
export interface ContactFormSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  preferEmail: boolean;
  preferPhone: boolean;
  submissionDate: Date;
}

// Check if the collection exists and is accessible
export const checkContactCollection = async (): Promise<boolean> => {
  try {
    console.log("Checking contactFormSubmissions collection access...");
    const collectionRef = collection(db, "contactFormSubmissions");
    const testQuery = query(collectionRef, limit(1));
    const snapshot = await getDocs(testQuery);
    console.log(`Collection check result: ${snapshot.empty ? 'Empty collection' : 'Collection has data'}`);
    return true;
  } catch (error) {
    console.error("Error accessing contactFormSubmissions collection:", error);
    return false;
  }
};

// Add a new contact form submission to Firestore
export const submitContactForm = async (formData: Omit<ContactFormSubmission, 'submissionDate'>): Promise<string | null> => {
  try {
    console.log("Attempting to submit contact form:", formData);
    
    // First check if collection is accessible
    const collectionAccessible = await checkContactCollection();
    if (!collectionAccessible) {
      console.error("Collection not accessible, cannot proceed with submission");
      return null;
    }
    
    const submission: ContactFormSubmission = {
      ...formData,
      submissionDate: new Date(),
    };
    
    console.log("Adding document to contactFormSubmissions collection...");
    const docRef = await addDoc(collection(db, "contactFormSubmissions"), submission);
    console.log("Contact form submission successful with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return null;
  }
};
