
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, getUserFullName } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Project } from "@/types/project";
import { ProjectFormData } from "@/types/project-form";
import { ProjectFormTabs } from "./ProjectFormTabs";

export function AddProjectDialog() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basicInfo");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Initialize form data with defaults
  const [formData, setFormData] = useState<ProjectFormData>({
    // Basic Info
    projectName: "",
    projectDescription: "",
    projectCategory: "Technology",
    projectType: "Short-term",
    projectStatus: "Open",

    // Skills
    skillsWithLevel: [
      { skill: "React", level: "Intermediate" },
      { skill: "UI/UX Design", level: "Beginner" }
    ],
    skillsInput: "",
    selectedSkillLevel: "Intermediate",

    // Requirements
    deliverables: ["Website mockup", "Functional prototype"],
    projectDuration: "3 months",
    projectDeadline: "",
    collaboratorsNeeded: 2,

    // Compensation
    compensation: "Volunteer",
    compensationDetails: "",
    perks: ["Mentorship", "Networking"],
    tools: ["React", "Figma"],
    budget: "",

    // Additional Details
    projectGoal: "",
    targetAudience: "",
    location: "Remote",
    legalConstraints: "",
    desiredProfiles: ["Student", "Freelancer"]
  });

  // Set default deadline to 3 months from now
  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    setFormData(prevData => ({
      ...prevData,
      projectDeadline: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }));
  }, []);

  const isFormValid = () => {
    return (
      formData.projectName.trim() !== "" &&
      formData.projectDescription.trim() !== "" &&
      formData.skillsWithLevel.length > 0 &&
      formData.projectGoal.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a project.",
        variant: "destructive"
      });
      return;
    }

    if (!isFormValid()) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Get user's full name
      const ownerName = await getUserFullName(currentUser.uid);
      
      // Extract skills for backward compatibility
      const skills = formData.skillsWithLevel.map(item => item.skill);
      
      // Create project object that matches the Project type
      const newProject: Omit<Project, 'id' | 'createdAt'> = {
        title: formData.projectName,
        description: formData.projectDescription,
        category: formData.projectCategory,
        skills: skills,
        deadline: formData.projectDeadline,
        duration: formData.projectDuration,
        owner: ownerName,
        ownerEmail: currentUser.email || "anonymous@example.com",
        userId: currentUser.uid,
        featured: false,
        status: formData.projectStatus,
        applicants: 0,
        progress: 0,
        
        // New fields
        projectType: formData.projectType,
        skillsWithLevel: formData.skillsWithLevel,
        deliverables: formData.deliverables,
        timeline: formData.projectDuration,
        compensation: formData.compensation,
        compensationDetails: formData.compensationDetails,
        perks: formData.perks,
        tools: formData.tools,
        collaboratorsNeeded: formData.collaboratorsNeeded,
        projectGoal: formData.projectGoal,
        targetAudience: formData.targetAudience,
        location: formData.location,
        legalConstraints: formData.legalConstraints,
        budget: formData.budget,
        desiredProfiles: formData.desiredProfiles
      };
      
      // Create new project in Firestore
      const projectRef = await addDoc(collection(db, "projects"), {
        ...newProject,
        createdAt: serverTimestamp()
      });
      
      console.log("Project added with ID: ", projectRef.id);
      
      toast({
        title: "Project created",
        description: "Your new project has been successfully created."
      });
      
      // Reset form and close dialog
      resetForm();
      setOpen(false);
      
      // Navigate to explore projects page to see the new project
      navigate("/explore-projects");
      
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    // Reset to initial state
    setFormData({
      projectName: "",
      projectDescription: "",
      projectCategory: "Technology",
      projectType: "Short-term",
      skillsWithLevel: [],
      selectedSkillLevel: "Intermediate",
      deliverables: [],
      projectDuration: "3 months",
      projectDeadline: "",
      collaboratorsNeeded: 2,
      compensation: "Volunteer",
      compensationDetails: "",
      perks: ["Mentorship", "Networking"],
      tools: ["React", "Figma"],
      projectGoal: "",
      targetAudience: "",
      location: "Remote",
      legalConstraints: "",
      budget: "",
      desiredProfiles: ["Student", "Freelancer"],
      projectStatus: "Open"
    });
    setActiveTab("basicInfo");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <ProjectFormTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
