
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp, DocumentData } from "firebase/firestore";
import { db, auth } from "./firebase";

// Types for messages
export interface ChatMessage {
  id?: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  userId?: string;
}

// Get conversation history for current user
export const getUserChatHistory = async (): Promise<ChatMessage[]> => {
  if (!auth.currentUser) return [];
  
  try {
    const messagesCollection = collection(db, "chatMessages");
    const messagesQuery = query(
      messagesCollection,
      where("userId", "==", auth.currentUser.uid),
      orderBy("timestamp", "asc")
    );
    
    const messagesSnapshot = await getDocs(messagesQuery);
    return messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    } as ChatMessage));
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
};

// Save a message to Firebase
export const saveMessage = async (content: string, role: "user" | "assistant"): Promise<string | null> => {
  if (!auth.currentUser) return null;
  
  try {
    const message = {
      content,
      role,
      userId: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, "chatMessages"), message);
    return docRef.id;
  } catch (error) {
    console.error("Error saving message:", error);
    return null;
  }
};

// Send a message to OpenAI API and get a response
// Note: This function should be implemented in a Firebase Cloud Function
// for security reasons. This is a placeholder for the client-side implementation.
export const sendMessageToOpenAI = async (message: string): Promise<string> => {
  try {
    // In a real implementation, this should call a Firebase Cloud Function
    // that securely accesses the OpenAI API with the API key stored in 
    // Firebase Functions Config.
    
    // For now, we'll return a placeholder response
    return "This is a placeholder response. In a production environment, this would be a response from the OpenAI API via a Firebase Cloud Function.";
    
    /* 
    // Example Firebase Function call:
    const functionRef = httpsCallable(functions, 'sendMessageToOpenAI');
    const result = await functionRef({ message });
    return result.data as string;
    */
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};
