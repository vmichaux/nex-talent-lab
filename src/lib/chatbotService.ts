
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp, DocumentData } from "firebase/firestore";
import { db, auth } from "./firebase";
import OpenAI from "openai";

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

// Save a message to Firebase - now with a parameter to control database saving
export const saveMessage = async (
  content: string, 
  role: "user" | "assistant",
  saveToDatabase: boolean = true
): Promise<string | null> => {
  if (!auth.currentUser) return null;
  
  // If saveToDatabase is false, don't save to Firestore but return a temporary ID
  if (!saveToDatabase) {
    return `temp-${Date.now()}`;
  }
  
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

// Send a message to OpenAI API.
// The API key is never hardcoded. It is read from VITE_OPENAI_API_KEY and, when
// that variable is absent (the default — no key is shipped in the bundle), the
// client-side call is skipped entirely so no visitor can consume paid quota.
export const sendMessageToOpenAI = async (message: string, chatHistory: ChatMessage[] = []): Promise<string> => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    // La clé provient exclusivement de l'environnement, jamais du code source.
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      return "L'assistant IA n'est pas configuré pour le moment. Veuillez réessayer plus tard.";
    }

    // Créer une instance du client OpenAI avec la clé fournie via l'environnement.
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Note: nécessaire côté client; à remplacer par un proxy serveur en production.
    });

    // Use provided chat history or fetch from database if not provided
    const formattedMessages = chatHistory.length > 0
      ? chatHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      : (await getUserChatHistory()).map(msg => ({
          role: msg.role,
          content: msg.content
        }));

    // Ajouter le nouveau message à la liste
    formattedMessages.push({
      role: "user",
      content: message
    });

    // Appeler l'API OpenAI avec les types corrects
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: formattedMessages.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      })),
      max_tokens: 1000
    });

    // Extraire et retourner la réponse
    return completion.choices[0].message.content || "Désolé, je n'ai pas pu générer une réponse.";
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "Désolé, j'ai rencontré une erreur lors du traitement de votre demande. Veuillez vérifier votre configuration API.";
  }
};
