
import { useState, useEffect, useCallback } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, Timestamp } from "firebase/firestore";
import { Project } from "@/types/project";

interface UseProjectsOptions {
  excludeCurrentUser?: boolean;
  userId?: string | null;
}

interface CreateProjectResult {
  success: boolean;
  projectId?: string;
  error?: Error;
}

interface UpdateProjectResult {
  success: boolean;
  project?: Project;
  error?: Error;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let projectsQuery = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc")
      );
      
      if (options.userId) {
        projectsQuery = query(
          collection(db, "projects"),
          where("userId", "==", options.userId),
          orderBy("createdAt", "desc")
        );
      }
      
      const querySnapshot = await getDocs(projectsQuery);
      const fetchedProjects: Project[] = [];
      
      querySnapshot.forEach((doc) => {
        const projectData = doc.data() as Omit<Project, "id">;
        fetchedProjects.push({
          id: doc.id,
          ...projectData,
          createdAt: projectData.createdAt instanceof Timestamp ? projectData.createdAt.toDate() : new Date()
        });
      });
      
      console.log("Fetched projects:", fetchedProjects.length, "projects");
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [options.userId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Function to add a new project to local state without fetching from database
  const addProjectToState = useCallback((project: Project) => {
    setProjects(prevProjects => [project, ...prevProjects]);
  }, []);

  const createProject = async (projectData: Omit<Project, "id" | "createdAt">): Promise<CreateProjectResult> => {
    try {
      const newProjectRef = await addDoc(collection(db, "projects"), {
        ...projectData,
        createdAt: Timestamp.now()
      });
      
      // Create a new Project object with the ID and add it to local state
      const newProject: Project = {
        id: newProjectRef.id,
        ...projectData,
        createdAt: new Date()
      };
      
      // Add the new project to local state
      addProjectToState(newProject);
      
      return { success: true, projectId: newProjectRef.id };
    } catch (error) {
      console.error("Error creating project:", error);
      return { success: false, error: error as Error };
    }
  };

  const updateProject = async (projectId: string, projectData: Partial<Project>): Promise<UpdateProjectResult> => {
    try {
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, projectData);
      
      // Update the project in local state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId 
            ? { ...project, ...projectData } 
            : project
        )
      );
      
      return { success: true, project: { ...projects.find(p => p.id === projectId)!, ...projectData } };
    } catch (error) {
      console.error("Error updating project:", error);
      return { success: false, error: error as Error };
    }
  };

  const deleteProject = async (projectId: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      
      // Remove the project from local state
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
      
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    addProjectToState
  };
}
