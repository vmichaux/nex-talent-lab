
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

// Send a message to OpenAI API
export const sendMessageToOpenAI = async (message: string): Promise<string> => {
  try {
    // Récupérer l'idToken de l'utilisateur actuel pour l'authentification
    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) {
      throw new Error("User not authenticated");
    }

    // Appeler notre fonction Edge Firebase qui contient la clé API sécurisée
    const response = await fetch("https://nextalent-lab-final.web.app/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "Désolé, j'ai rencontré une erreur lors du traitement de votre demande. Veuillez réessayer.";
  }
};
