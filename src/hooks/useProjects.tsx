
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, Timestamp, doc, updateDoc, getDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/project";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsQuery = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(projectsQuery);
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
      
      setProjects(fetchedProjects);
      setError(null);
      console.log("Fetched projects:", fetchedProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
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
      
      console.log("Fetched user projects:", fetchedProjects);
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
  }, []);

  return { 
    projects, 
    loading, 
    error, 
    refetchProjects: fetchProjects,
    updateProject,
    getUserProjects
  };
};
