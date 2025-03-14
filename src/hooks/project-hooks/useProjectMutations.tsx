
import { useState } from "react";
import { doc, updateDoc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { Project } from "@/types/project";

export const useProjectMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      
      return { success: true };
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Failed to update project. Please try again later.");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new project
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
      
      return { success: true, projectId: projectRef.id, project: newProject };
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project. Please try again later.");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateProject,
    createProject
  };
};
