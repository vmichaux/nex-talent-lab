
import React from "react";
import { Project } from "@/types/project";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectSkills } from "./ProjectSkills";
import { ProjectCompensation } from "./ProjectCompensation";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectOwner } from "./ProjectOwner";

interface ProjectContentProps {
  project: Project;
  isEditing: boolean;
  isOwner: boolean;
  editedProject: Partial<Project>;
  owner: any;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleEditClick: () => void;
  handleDeleteProject: () => void;
  handleApplyClick: () => void;
  navigateBack: () => void;
}

export function ProjectContent({
  project,
  isEditing,
  isOwner,
  editedProject,
  owner,
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleInputChange,
  handleEditClick,
  handleDeleteProject,
  handleApplyClick,
  navigateBack
}: ProjectContentProps) {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 py-12">
        <ProjectHeader 
          project={project}
          isEditing={isEditing}
          isOwner={isOwner}
          editedProject={editedProject}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleInputChange={handleInputChange}
          handleEditClick={handleEditClick}
          handleDeleteProject={handleDeleteProject}
          handleApplyClick={handleApplyClick}
          navigateBack={navigateBack}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-10">
            <ProjectOverview 
              project={project}
              isEditing={isEditing}
              editedProject={editedProject}
              handleInputChange={handleInputChange}
            />
            
            <ProjectSkills 
              project={project}
              isEditing={isEditing}
            />
            
            <ProjectCompensation 
              project={project}
              isEditing={isEditing}
              editedProject={editedProject}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="space-y-6">
            <ProjectDetails 
              project={project}
              isEditing={isEditing}
              editedProject={editedProject}
              handleInputChange={handleInputChange}
            />
            
            <ProjectOwner 
              project={project}
              owner={owner}
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
