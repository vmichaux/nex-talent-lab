
import { collection, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./config";

// Helper functions for Firebase project operations
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
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log("getUserProjects - Returning sorted projects:", sortedProjects);
    return sortedProjects;
  } catch (error) {
    console.error("Error in getUserProjects:", error);
    return [];
  }
};
