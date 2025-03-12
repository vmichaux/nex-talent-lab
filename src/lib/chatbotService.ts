
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

    // Créer une instance du client OpenAI avec la clé API fournie
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true // Note: Ce paramètre est nécessaire pour l'utilisation côté client, mais n'est pas recommandé en production
    });

    // Obtenir l'historique des messages pour créer un contexte de conversation
    const chatHistory = await getUserChatHistory();
    
    // Préparer les messages pour l'API OpenAI en format approprié
    const formattedMessages = chatHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    // Ajouter le nouveau message à la liste
    formattedMessages.push({
      role: "user",
      content: message
    });

    // Vérifier si la configuration OpenAI est valide
    console.log("OpenAI config:", { 
      apiKeyDefined: !!openai.apiKey, 
      apiKeyLength: openai.apiKey ? openai.apiKey.length : 0,
      messagesCount: formattedMessages.length
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

    console.log("OpenAI response:", completion.choices[0]);

    // Extraire et retourner la réponse
    return completion.choices[0].message.content || "Désolé, je n'ai pas pu générer une réponse.";
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "Désolé, j'ai rencontré une erreur lors du traitement de votre demande. Veuillez vérifier votre configuration API.";
  }
};
