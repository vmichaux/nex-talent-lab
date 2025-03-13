
import { collection, getDocs, query, where, orderBy, Timestamp, DocumentData, FirestoreError, doc, getDoc } from "firebase/firestore";
import { db } from "./config";
import { toast } from "@/hooks/use-toast";
import { Project } from "@/types/project";

// Helper functions for Firebase project operations
export const getProjects = async (): Promise<DocumentData[]> => {
  try {
    const projectsCollection = collection(db, "projects");
    const projectsQuery = query(projectsCollection, orderBy("createdAt", "desc"));
    const projectsSnapshot = await getDocs(projectsQuery);
    return projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    const firestoreError = error as FirestoreError;
    console.error("Error fetching projects:", firestoreError);
    toast({
      title: "Failed to load projects",
      description: `Error: ${firestoreError.code || "Unknown error"}`,
      variant: "destructive",
    });
    return [];
  }
};

export const getProjectById = async (projectId: string): Promise<DocumentData | null> => {
  try {
    if (!projectId) {
      console.error("getProjectById called without projectId");
      return null;
    }
    
    const projectRef = doc(db, "projects", projectId);
    const projectSnapshot = await getDoc(projectRef);
    
    if (!projectSnapshot.exists()) {
      console.log("Project not found:", projectId);
      return null;
    }
    
    const projectData = projectSnapshot.data();
    let createdAt;
    
    if (projectData.createdAt instanceof Timestamp) {
      createdAt = projectData.createdAt.toDate();
    } else if (projectData.createdAt && typeof projectData.createdAt.toDate === 'function') {
      createdAt = projectData.createdAt.toDate();
    } else {
      createdAt = new Date();
    }
    
    return {
      id: projectSnapshot.id,
      ...projectData,
      createdAt
    };
  } catch (error) {
    console.error("Error in getProjectById:", error);
    toast({
      title: "Failed to load project details",
      description: "Please try again later",
      variant: "destructive",
    });
    return null;
  }
};

export const getUserProjects = async (userId: string): Promise<DocumentData[]> => {
  if (!userId) {
    console.error("getUserProjects called without userId");
    toast({
      title: "Error fetching user projects",
      description: "User ID is required",
      variant: "destructive",
    });
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
    toast({
      title: "Failed to load your projects",
      description: "Please try again later",
      variant: "destructive",
    });
    return [];
  }
};
