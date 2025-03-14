
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { Project } from "@/types/project";

export const useAllProjects = (userId?: string | null, excludeCurrentUser = false) => {
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

  useEffect(() => {
    fetchProjects();
  }, [userId, excludeCurrentUser]); // Re-fetch when these dependencies change

  return { 
    projects, 
    loading, 
    error,
    refetchProjects: fetchProjects,
  };
};
