
import { useState } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/project";

export const useUserProjects = () => {
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [userProjectsLoading, setUserProjectsLoading] = useState(false);
  const [userProjectsError, setUserProjectsError] = useState<string | null>(null);

  const getUserProjects = async (userId: string) => {
    if (!userId) {
      console.error("getUserProjects called without userId");
      return [];
    }
    
    try {
      setUserProjectsLoading(true);
      console.log("Fetching projects for user:", userId);
      
      // Modified query: only filter by userId without orderBy to avoid composite index requirement
      const projectsQuery = query(
        collection(db, "projects"),
        where("userId", "==", userId)
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
      
      // Sort the projects client-side by createdAt (newest first)
      const sortedProjects = fetchedProjects.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      // Update the user projects state
      setUserProjects(sortedProjects);
      setUserProjectsError(null);
      
      console.log("Fetched user projects:", sortedProjects.length, "projects");
      return sortedProjects;
    } catch (err) {
      console.error("Error fetching user projects:", err);
      setUserProjectsError("Failed to load user projects. Please try again later.");
      return [];
    } finally {
      setUserProjectsLoading(false);
    }
  };

  return {
    userProjects,
    userProjectsLoading,
    userProjectsError,
    getUserProjects,
    setUserProjects
  };
};
