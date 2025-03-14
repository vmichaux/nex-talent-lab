
import { useState } from "react";
import { useAllProjects } from "./project-hooks/useAllProjects";
import { useUserProjects } from "./project-hooks/useUserProjects";
import { useProjectMutations } from "./project-hooks/useProjectMutations";
import { Project } from "@/types/project";

interface UseProjectsOptions {
  excludeCurrentUser?: boolean;
  userId?: string | null;
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  const { excludeCurrentUser = false, userId = null } = options;
  
  // Use the individual hooks
  const { projects, loading, error, refetchProjects } = useAllProjects(userId, excludeCurrentUser);
  const { userProjects, userProjectsLoading, userProjectsError, getUserProjects, setUserProjects } = useUserProjects();
  const { updateProject, createProject, loading: mutationLoading } = useProjectMutations();

  // Function to add a new project to the local state
  const addProjectToState = (project: Project) => {
    // Also add to userProjects if it belongs to the current user
    if (project.userId === userId) {
      setUserProjects(prev => [project, ...prev]);
    }
  };

  // Extend updateProject to also update local state
  const updateProjectWithState = async (projectId: string, updatedData: Partial<Project>) => {
    const result = await updateProject(projectId, updatedData);
    
    if (result.success) {
      // Update projects state
      const updatedProjects = projects.map(project => 
        project.id === projectId 
          ? { ...project, ...updatedData } 
          : project
      );
      
      // Update userProjects state
      setUserProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId 
            ? { ...project, ...updatedData } 
            : project
        )
      );
    }
    
    return result;
  };

  // Extend createProject to also update local state
  const createProjectWithState = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const result = await createProject(projectData);
    
    if (result.success && result.project) {
      addProjectToState(result.project);
    }
    
    return result;
  };

  return { 
    projects, 
    userProjects, 
    loading: loading || mutationLoading, 
    userProjectsLoading,
    error, 
    userProjectsError,
    refetchProjects,
    updateProject: updateProjectWithState,
    getUserProjects,
    createProject: createProjectWithState,
    addProjectToState
  };
};
