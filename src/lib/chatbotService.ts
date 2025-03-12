
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
    // Vérifier si l'utilisateur est authentifié
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    // Créer une instance du client OpenAI
    const openai = new OpenAI({
      apiKey: "sk-...", // Remplacez par votre clé API OpenAI ou utilisez une variable d'environnement
      dangerouslyAllowBrowser: true // Note: Ce paramètre est nécessaire pour l'utilisation côté client, mais n'est pas recommandé en production
    });

    // Obtenir l'historique des messages pour créer un contexte de conversation
    const chatHistory = await getUserChatHistory();
    
    // Préparer les messages pour l'API OpenAI en format approprié avec les types corrects
    const formattedMessages = chatHistory.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    }));
    
    // Ajouter le nouveau message à la liste
    formattedMessages.push({
      role: "user" as const,
      content: message
    });

    // Appeler l'API OpenAI avec les types corrects
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: formattedMessages,
      max_tokens: 1000
    });

    // Extraire et retourner la réponse
    return completion.choices[0].message.content || "Désolé, je n'ai pas pu générer une réponse.";
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "Désolé, j'ai rencontré une erreur lors du traitement de votre demande. Veuillez réessayer.";
  }
};
