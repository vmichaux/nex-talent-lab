
import { db } from '../lib/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Store the submission in Firestore to trigger the cloud function
    await addDoc(collection(db, 'contactSubmissions'), {
      ...formData,
      createdAt: new Date(),
    });
    
    toast.success('Message sent successfully!');
    return true;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    toast.error('Failed to send message. Please try again.');
    return false;
  }
};
