
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Project } from "@/types/project";
import { ProjectHeaderActions } from "./ProjectHeaderActions";
import { ProjectTitle } from "./ProjectTitle";
import { ProjectStatus } from "./ProjectStatus";

interface ProjectHeaderProps {
  project: Project;
  isEditing: boolean;
  isOwner: boolean;
  editedProject: Partial<Project>;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleEditClick: () => void;
  handleDeleteProject: () => void;
  handleApplyClick: () => void;
  navigateBack: () => void;
}

export function ProjectHeader({
  project,
  isEditing,
  isOwner,
  editedProject,
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleInputChange,
  handleEditClick,
  handleDeleteProject,
  handleApplyClick,
  navigateBack
}: ProjectHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          onClick={navigateBack}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Button>
        
        <ProjectHeaderActions 
          isOwner={isOwner}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleEditClick={handleEditClick}
          handleDeleteProject={handleDeleteProject}
          handleApplyClick={handleApplyClick}
        />
      </div>

      <ProjectTitle 
        project={project}
        isEditing={isEditing}
        editedProject={editedProject}
        handleInputChange={handleInputChange}
      />
      
      <ProjectStatus 
        isEditing={isEditing}
        status={project.status}
        editedStatus={editedProject.status || ''}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
