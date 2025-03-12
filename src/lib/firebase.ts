
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

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

// Helper functions for Firebase operations
export const getProjects = async () => {
  const projectsCollection = collection(db, "projects");
  const projectsQuery = query(projectsCollection, orderBy("createdAt", "desc"));
  const projectsSnapshot = await getDocs(projectsQuery);
  return projectsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getUserProjects = async (userId: string) => {
  const projectsCollection = collection(db, "projects");
  const projectsQuery = query(
    projectsCollection, 
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const projectsSnapshot = await getDocs(projectsQuery);
  return projectsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export default app;
