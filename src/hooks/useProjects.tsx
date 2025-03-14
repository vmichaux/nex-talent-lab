
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, Timestamp, doc, updateDoc, getDoc, where, addDoc, serverTimestamp, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/project";

interface UseProjectsOptions {
  excludeCurrentUser?: boolean;
  userId?: string | null;
  limitCount?: number;
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { excludeCurrentUser = false, userId = null, limitCount = 0 } = options;

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log("Fetching projects with options:", { excludeCurrentUser, userId, limitCount });
      
      // Start building the query
      let projectsQuery = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc")
      );
      
      // Add limit if specified
      if (limitCount > 0) {
        projectsQuery = query(projectsQuery, limit(limitCount));
      }
      
      console.log("Executing Firestore query...");
      const querySnapshot = await getDocs(projectsQuery);
      console.log(`Raw query returned ${querySnapshot.size} documents`);
      
      const fetchedProjects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        
        // Convert Firestore timestamp to Date
        const createdAt = data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate() 
          : new Date();
        
        // Ensure project status is one of the allowed types
        const status = ["Open", "Urgent", "Closed"].includes(data.status) 
          ? data.status as "Open" | "Urgent" | "Closed"
          : "Open";
        
        return {
          id: doc.id,
          ...data,
          status,
          createdAt,
        } as Project;
      });
      
      // Filter out current user's projects if requested
      const filteredProjects = excludeCurrentUser && userId 
        ? fetchedProjects.filter(project => project.userId !== userId)
        : fetchedProjects;
      
      setProjects(filteredProjects);
      setError(null);
      console.log("Fetched projects:", filteredProjects.length, "projects");
      
      if (excludeCurrentUser && userId) {
        console.log("Excluding projects from user:", userId);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new project to the local state
  const addProjectToState = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  // Function to update a project in Firestore
  const updateProject = async (projectId: string, updatedData: Partial<Project>) => {
    try {
      setLoading(true);
      console.log("Updating project with ID:", projectId);
      console.log("Update data:", updatedData);
      
      const projectRef = doc(db, "projects", projectId);
      
      // First get the current project data
      const projectSnap = await getDoc(projectRef);
      if (!projectSnap.exists()) {
        throw new Error("Project not found");
      }
      
      // Update the document in Firestore
      await updateDoc(projectRef, updatedData);
      console.log("Project updated successfully in Firestore");
      
      // Update the local state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId 
            ? { ...project, ...updatedData } 
            : project
        )
      );
      
      return { success: true };
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Failed to update project. Please try again later.");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new project and update local state
  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      console.log("Creating new project:", projectData);
      
      // Add the document to Firestore
      const projectRef = await addDoc(collection(db, "projects"), {
        ...projectData,
        createdAt: serverTimestamp()
      });
      
      console.log("Project created successfully with ID:", projectRef.id);
      
      // Create a complete project object with the new ID
      const newProject: Project = {
        id: projectRef.id,
        ...projectData,
        createdAt: new Date()
      };
      
      // Add the new project to the local state
      addProjectToState(newProject);
      
      return { success: true, projectId: projectRef.id, project: newProject };
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project. Please try again later.");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const getUserProjects = async (userId: string) => {
    try {
      setLoading(true);
      console.log("Fetching projects for user:", userId);
      
      const projectsQuery = query(
        collection(db, "projects"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(projectsQuery);
      const fetchedProjects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        
        // Convert Firestore timestamp to Date
        const createdAt = data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate() 
          : new Date();
        
        return {
          id: doc.id,
          ...data,
          createdAt,
        } as Project;
      });
      
      console.log("Fetched user projects:", fetchedProjects.length, "projects");
      return fetchedProjects;
    } catch (err) {
      console.error("Error fetching user projects:", err);
      setError("Failed to load user projects. Please try again later.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId, excludeCurrentUser, limitCount]); // Re-fetch when these dependencies change

  return { 
    projects, 
    loading, 
    error, 
    refetchProjects: fetchProjects,
    updateProject,
    getUserProjects,
    createProject,
    addProjectToState
  };
};
