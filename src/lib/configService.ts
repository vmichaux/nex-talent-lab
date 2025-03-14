
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// Interface pour les données de configuration
export interface Config {
  apiKey: string;
  [key: string]: any;
}

// Fonction pour initialiser la clé OpenAI dans Firestore
export const initializeOpenAIKey = async (apiKey: string): Promise<boolean> => {
  try {
    await setDoc(doc(db, "config", "openai"), {
      apiKey,
      updatedAt: new Date()
    });
    console.log("OpenAI API key stored in Firestore");
    return true;
  } catch (error) {
    console.error("Error storing OpenAI API key:", error);
    return false;
  }
};
