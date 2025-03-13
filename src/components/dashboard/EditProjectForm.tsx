
import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { ProjectForm } from "./ProjectForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useProjects";
import { ProjectFormData } from "./AddProjectButton";

interface EditProjectFormProps {
  project: Project;
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateProject } = useProjects();
  
  // Convert project to form data format
  const initialFormData: ProjectFormData = {
    projectName: project.title,
    projectDescription: project.description,
    projectCategory: project.category,
    projectType: project.projectType,
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
  };

  const handleSubmit = async (formData: ProjectFormData) => {
    if (!project.id) return;
    
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
      
      // Use the updateProject function from useProjects hook
      const result = await updateProject(project.id, updatedProjectData);
      
      if (result.success) {
        toast({
          title: "Project updated",
          description: "Your project has been successfully updated."
        });
        
        // Navigate back to the project detail page
        navigate(`/project/${project.id}`);
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update the project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm 
        onSubmit={handleSubmit} 
        loading={loading} 
        initialData={initialFormData}
        submitLabel="Save Changes"
      />
    </div>
  );
}
