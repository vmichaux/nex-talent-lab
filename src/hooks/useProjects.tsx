
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, Timestamp, FirestoreError } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Project } from "@/types/project";
import { toast } from "@/hooks/use-toast";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        const firestoreError = err as FirestoreError;
        console.error("Error fetching projects:", firestoreError);
        setError(`Failed to load projects. Error: ${firestoreError.code || "Unknown error"}`);
        toast({
          title: "Error loading projects",
          description: "Failed to fetch projects. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
