
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Project } from "@/types/project";
import { getUserFullName } from "@/lib/firebase";
import { useProjects } from "@/hooks/useProjects";

export interface ProjectFormData {
  projectName: string;
  projectDescription: string;
  projectCategory: string;
  projectType: string;
  skillsWithLevel: Array<{skill: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert"}>;
  deliverables: string[];
  projectDuration: string;
  projectDeadline: string;
  collaboratorsNeeded: number;
  compensation: string;
  compensationDetails: string;
  perks: string[];
  tools: string[];
  projectGoal: string;
  targetAudience: string;
  location: "Remote" | "In-person" | "Hybrid";
  legalConstraints: string;
  budget: string;
  desiredProfiles: string[];
  projectStatus: "Open" | "Urgent" | "Closed";
}

interface AddProjectButtonProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function AddProjectButton({ open, setOpen: setOpenProp }: AddProjectButtonProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { createProject } = useProjects();
  
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = setOpenProp || setInternalOpen;
  
  const handleSubmit = async (formData: ProjectFormData) => {
    if (!currentUser) {
      toast.error("Authentication required. You must be logged in to create a project.", {
        duration: 6000,
      });
      return;
    }

    try {
      setLoading(true);
      
      const userFullName = await getUserFullName(currentUser.uid);
      
      // Extract skills from skillsWithLevel for the skills array
      const skills = formData.skillsWithLevel.map(item => item.skill);
      
      const newProject: Omit<Project, 'id' | 'createdAt'> = {
        title: formData.projectName,
        description: formData.projectDescription,
        category: formData.projectCategory,
        skills: skills, // This ensures skills and skillsWithLevel are in sync
        deadline: formData.projectDeadline,
        duration: formData.projectDuration,
        owner: userFullName || currentUser.displayName || currentUser.email || "Anonymous",
        featured: false,
        status: formData.projectStatus,
        applicants: 0,
        progress: 0,
        
        projectType: formData.projectType,
        skillsWithLevel: formData.skillsWithLevel,
        deliverables: formData.deliverables,
        timeline: formData.projectDuration,
        compensation: formData.compensation,
        compensationDetails: formData.compensationDetails,
        perks: formData.perks,
        tools: formData.tools, // These are tools, not skills
        collaboratorsNeeded: formData.collaboratorsNeeded,
        projectGoal: formData.projectGoal,
        targetAudience: formData.targetAudience,
        location: formData.location,
        legalConstraints: formData.legalConstraints,
        budget: formData.budget,
        desiredProfiles: formData.desiredProfiles,
        userId: currentUser.uid
      };
      
      // Use the createProject function from useProjects hook
      const result = await createProject(newProject);
      
      if (result.success) {
        console.log("Project added with ID: ", result.projectId);
        
        toast.success("Project created. Your new project has been successfully added to your dashboard.", {
          duration: 6000,
        });
        
        setIsOpen(false);
      } else {
        throw new Error("Failed to create project");
      }
      
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.", {
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Describe your project in detail to find the perfect collaborators.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm onSubmit={handleSubmit} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}

import { ProjectForm } from "./ProjectForm";
