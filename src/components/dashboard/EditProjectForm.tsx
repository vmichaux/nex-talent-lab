
import { useState } from "react";
import { Project } from "@/types/project";
import { ProjectForm } from "./ProjectForm";
import { useNavigate } from "react-router-dom";
import { useProjectForm } from "@/hooks/useProjectForm";

interface EditProjectFormProps {
  project: Project;
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const navigate = useNavigate();
  const { initialFormData, loading, handleSubmit } = useProjectForm(project);

  const onSubmit = async (formData: any) => {
    const result = await handleSubmit(formData);
    if (result.success) {
      // Navigate to project detail page after successful update
      window.location.href = `/project/${project.id}`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm 
        onSubmit={onSubmit} 
        loading={loading} 
        initialData={initialFormData}
        submitLabel="Save Changes"
      />
    </div>
  );
}
