
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaDgZe8xVVwANQfkRoGcBW9fSuhieQ2nw",
  authDomain: "nextalent-lab-final.firebaseapp.com",
  projectId: "nextalent-lab-final",
  storageBucket: "nextalent-lab-final.appspot.com",
  messagingSenderId: "409548241234",
  appId: "1:409548241234:web:d7610e10f1a77e7663e28b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Define UserProfile type
interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  skills?: Array<{name: string, level: string}> | string[];
  interests?: string[];
  [key: string]: any; // Allow additional properties
}

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

// Get user's full name from profile or construct from email
export const getUserFullName = async (userId: string): Promise<string> => {
  // First, try to get the user profile
  const userProfile = await getUserProfile(userId);
  
  if (userProfile && userProfile.firstName && userProfile.lastName) {
    return `${userProfile.firstName} ${userProfile.lastName}`;
  }
  
  // If no profile or incomplete profile, try auth user
  const user = auth.currentUser;
  if (user) {
    if (user.displayName) {
      return user.displayName;
    }
    
    if (user.email) {
      // Extract name from email and format it
      const emailName = user.email.split('@')[0];
      const parts = emailName.split(/[._-]/);
      
      return parts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      ).join(' ');
    }
  }
  
  return "Anonymous User";
};

// Helper function to get user profile data
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!userId) return null;
  
  try {
    const userProfileRef = doc(db, "userProfiles", userId);
    const docSnap = await getDoc(userProfileRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      
      // Handle potential old skills format (strings) vs new format (objects with name and level)
      if (userData.skills && Array.isArray(userData.skills)) {
        // Check if skills are in old format (strings)
        if (userData.skills.length > 0 && typeof userData.skills[0] === 'string') {
          userData.skills = userData.skills.map(skill => ({
            name: skill,
            level: "Intermediate"
          }));
        }
      }
      
      // Ensure interests exists as an array
      if (!userData.interests || !Array.isArray(userData.interests)) {
        userData.interests = [];
      }
      
      return {
        id: docSnap.id,
        ...userData
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export default app;
