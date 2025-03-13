
import { useState } from "react";
import { Project } from "@/types/project";
import { ProjectFormData } from "@/components/dashboard/AddProjectButton";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";

export function useProjectForm(project?: Project) {
  const [loading, setLoading] = useState(false);
  const { updateProject } = useProjects();
  
  // Convert project to form data format if provided
  const initialFormData: ProjectFormData = project ? {
    projectName: project.title,
    projectDescription: project.description,
    projectCategory: project.category,
    projectType: project.projectType || "Short-term",
    projectStatus: project.status,
    skillsWithLevel: project.skillsWithLevel || [],
    deliverables: project.deliverables || [],
    projectDuration: project.duration,
    projectDeadline: project.deadline,
    collaboratorsNeeded: project.collaboratorsNeeded,
    compensation: project.compensation,
    compensationDetails: project.compensationDetails || "",
    perks: project.perks || [],
    tools: project.tools || [],
    projectGoal: project.projectGoal || "",
    targetAudience: project.targetAudience || "",
    location: project.location,
    legalConstraints: project.legalConstraints || "",
    budget: project.budget || "",
    desiredProfiles: project.desiredProfiles || []
  } : {} as ProjectFormData;

  const handleSubmit = async (formData: ProjectFormData) => {
    if (!project?.id) return { success: false, error: new Error("Project ID not found") };
    
    try {
      setLoading(true);
      
      // Map the form data back to Project type for updating
      const updatedProjectData: Partial<Project> = {
        title: formData.projectName,
        description: formData.projectDescription,
        category: formData.projectCategory,
        projectType: formData.projectType,
        status: formData.projectStatus,
        skillsWithLevel: formData.skillsWithLevel,
        deliverables: formData.deliverables,
        duration: formData.projectDuration,
        deadline: formData.projectDeadline,
        collaboratorsNeeded: formData.collaboratorsNeeded,
        compensation: formData.compensation,
        compensationDetails: formData.compensationDetails,
        perks: formData.perks,
        tools: formData.tools,
        projectGoal: formData.projectGoal,
        targetAudience: formData.targetAudience,
        location: formData.location,
        legalConstraints: formData.legalConstraints,
        budget: formData.budget,
        desiredProfiles: formData.desiredProfiles
      };
      
      console.log("Submitting updated project data:", updatedProjectData);
      
      // Use the updateProject function from useProjects hook
      const result = await updateProject(project.id, updatedProjectData);
      
      if (result.success) {
        toast.success("Project updated", {
          description: "Your project has been successfully updated.",
          duration: 4000,
        });
        return { success: true, project: { ...project, ...updatedProjectData } };
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update the project", {
        description: "Please try again.",
        duration: 4000,
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    initialFormData,
    loading,
    handleSubmit
  };
}
