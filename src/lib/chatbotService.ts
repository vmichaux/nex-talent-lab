
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp, DocumentData, getDoc, doc } from "firebase/firestore";
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

// Fetch OpenAI API key from Firestore
export const getOpenAIKey = async (): Promise<string | null> => {
  try {
    const apiKeyDoc = await getDoc(doc(db, "config", "openai"));
    if (apiKeyDoc.exists()) {
      return apiKeyDoc.data().apiKey;
    } else {
      console.error("OpenAI API key not found in Firestore");
      return null;
    }
  } catch (error) {
    console.error("Error fetching OpenAI API key:", error);
    return null;
  }
};

// Send a message to OpenAI API
export const sendMessageToOpenAI = async (message: string, chatHistory: ChatMessage[] = []): Promise<string> => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    // Récupérer la clé API depuis Firestore
    const apiKey = await getOpenAIKey();
    if (!apiKey) {
      return "Erreur: La clé API OpenAI n'a pas été trouvée dans Firestore. Veuillez configurer la clé API.";
    }

    // Créer une instance du client OpenAI avec la clé API récupérée
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Note: Ce paramètre est nécessaire pour l'utilisation côté client, mais n'est pas recommandé en production
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
