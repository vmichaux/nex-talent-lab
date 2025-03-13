
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, Timestamp, doc, updateDoc } from "firebase/firestore";
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

  // New function to update a project in Firestore
  const updateProject = async (projectId: string, updatedData: Partial<Project>) => {
    try {
      setLoading(true);
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, updatedData);
      
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

  useEffect(() => {
    fetchProjects();
  }, []);

  return { 
    projects, 
    loading, 
    error, 
    refetchProjects: fetchProjects,
    updateProject
  };
};
