
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, orderBy, limit, doc, getDoc, Timestamp } from "firebase/firestore";
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

// Configure Google provider without custom client ID
export const googleProvider = new GoogleAuthProvider();

// Define UserProfile interface
export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  skills?: Array<{name: string, level: string}>;
  interests?: string[];
  email?: string;
  displayName?: string;
  photoURL?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Helper functions for Firebase operations
export const getProjects = async () => {
  const projectsCollection = collection(db, "projects");
  const projectsQuery = query(projectsCollection);
  const projectsSnapshot = await getDocs(projectsQuery);
  const projects = projectsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  // Sort manually (newest first)
  return projects.sort((a, b) => {
    const dateA = a.createdAt ? (a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt)) : new Date(0);
    const dateB = b.createdAt ? (b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt)) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
};

export const getUserProjects = async (userId: string) => {
  if (!userId) {
    console.error("getUserProjects called without userId");
    return [];
  }
  
  try {
    console.log("getUserProjects - Fetching projects for user:", userId);
    const projectsCollection = collection(db, "projects");
    const projectsQuery = query(
      projectsCollection, 
      where("userId", "==", userId)
    );
    
    const projectsSnapshot = await getDocs(projectsQuery);
    console.log("getUserProjects - Found projects:", projectsSnapshot.size);
    
    const projects = projectsSnapshot.docs.map(doc => {
      const data = doc.data();
      // Convert Firestore timestamp to Date if present
      let createdAt;
      if (data.createdAt instanceof Timestamp) {
        createdAt = data.createdAt.toDate();
      } else if (data.createdAt && typeof data.createdAt.toDate === 'function') {
        createdAt = data.createdAt.toDate();
      } else {
        createdAt = new Date();
      }
      
      return {
        id: doc.id,
        ...data,
        createdAt
      };
    });
    
    // Sort projects by creation date (newest first)
    const sortedProjects = projects.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log("getUserProjects - Returning sorted projects:", sortedProjects);
    return sortedProjects;
  } catch (error) {
    console.error("Error in getUserProjects:", error);
    return [];
  }
};

// Helper function to get user profile data
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!userId) return null;
  
  try {
    const userProfileRef = doc(db, "userProfiles", userId);
    const docSnap = await getDoc(userProfileRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data() as Omit<UserProfile, 'id'>;
      
      // Handle potential old skills format (strings) vs new format (objects with name and level)
      if (userData.skills && Array.isArray(userData.skills)) {
        // Check if skills are in old format (strings)
        if (userData.skills.length > 0 && typeof userData.skills[0] === 'string') {
          // Convert string skills to object format
          userData.skills = (userData.skills as unknown as string[]).map(skill => ({
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

// Helper function to get the user's full name
export const getUserFullName = async (userId: string): Promise<string> => {
  const userProfile = await getUserProfile(userId);
  
  if (userProfile && userProfile.firstName && userProfile.lastName) {
    return `${userProfile.firstName} ${userProfile.lastName}`;
  } else if (userProfile && userProfile.displayName) {
    return userProfile.displayName;
  } else {
    const user = auth.currentUser;
    return user?.displayName || user?.email || "Anonymous";
  }
};

export default app;
