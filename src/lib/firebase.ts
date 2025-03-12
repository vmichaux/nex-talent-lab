
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaDgZe8xVVwANQfkRoGcBW9fSuhieQ2nw",
  authDomain: "nextalent-lab-final.firebaseapp.com",
  projectId: "nextalent-lab-final",
  storageBucket: "nextalent-lab-final.firebasestorage.app",
  messagingSenderId: "409548241234",
  appId: "1:409548241234:web:d7610e10f1a77e7663e28b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
