
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "./firebase-config";

// Define Project interface
export interface ProjectData {
  id: string;
  title?: string;
  description?: string;
  userId?: string;
  createdAt?: Timestamp | Date | string | number;
  status?: string;
  [key: string]: any; // Allow for other properties
}

// Helper functions for Firebase operations
export const getProjects = async () => {
  const projectsCollection = collection(db, "projects");
  const projectsQuery = query(projectsCollection);
  const projectsSnapshot = await getDocs(projectsQuery);
  const projects = projectsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ProjectData[];
  
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
