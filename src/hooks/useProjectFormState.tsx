
import { useState, useEffect } from "react";
import { ProjectFormData } from "@/components/dashboard/AddProjectButton";

export function useProjectFormState(initialData?: ProjectFormData) {
  // Basic Info
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("Technology");
  const [projectType, setProjectType] = useState("Short-term");
  const [projectStatus, setProjectStatus] = useState<"Open" | "Urgent" | "Closed">("Open");

  // Skills with level
  const [skillsWithLevel, setSkillsWithLevel] = useState<Array<{skill: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert"}>>([]);

  // Requirements
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [projectDuration, setProjectDuration] = useState("3 months");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [collaboratorsNeeded, setCollaboratorsNeeded] = useState(2);

  // Compensation & Benefits
  const [compensation, setCompensation] = useState("Volunteer");
  const [compensationDetails, setCompensationDetails] = useState("");
  const [perks, setPerks] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);

  // Additional Details
  const [projectGoal, setProjectGoal] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [location, setLocation] = useState<"Remote" | "In-person" | "Hybrid">("Remote");
  const [legalConstraints, setLegalConstraints] = useState("");
  const [budget, setBudget] = useState("");
  const [desiredProfiles, setDesiredProfiles] = useState<string[]>([]);

  // Initialize form with initial data if provided (editing mode)
  useEffect(() => {
    if (initialData) {
      // Basic Info
      setProjectName(initialData.projectName);
      setProjectDescription(initialData.projectDescription);
      setProjectCategory(initialData.projectCategory);
      setProjectType(initialData.projectType);
      setProjectStatus(initialData.projectStatus);
      
      // Skills with level
      if (initialData.skillsWithLevel && initialData.skillsWithLevel.length > 0) {
        setSkillsWithLevel(initialData.skillsWithLevel);
      }
      
      // Requirements
      if (initialData.deliverables && initialData.deliverables.length > 0) {
        setDeliverables(initialData.deliverables);
      }
      setProjectDuration(initialData.projectDuration);
      setProjectDeadline(initialData.projectDeadline);
      setCollaboratorsNeeded(initialData.collaboratorsNeeded);
      
      // Compensation & Benefits
      setCompensation(initialData.compensation);
      setCompensationDetails(initialData.compensationDetails);
      if (initialData.perks && initialData.perks.length > 0) {
        setPerks(initialData.perks);
      }
      if (initialData.tools && initialData.tools.length > 0) {
        setTools(initialData.tools);
      }
      
      // Additional Details
      setProjectGoal(initialData.projectGoal);
      setTargetAudience(initialData.targetAudience);
      setLocation(initialData.location);
      setLegalConstraints(initialData.legalConstraints);
      setBudget(initialData.budget);
      if (initialData.desiredProfiles && initialData.desiredProfiles.length > 0) {
        setDesiredProfiles(initialData.desiredProfiles);
      }
    }
  }, [initialData]);

  // Set default deadline to 3 months from now if not editing
  useEffect(() => {
    if (!initialData && !projectDeadline) {
      const date = new Date();
      date.setMonth(date.getMonth() + 3);
      setProjectDeadline(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    }
  }, [initialData, projectDeadline]);

  const getFormData = (): ProjectFormData => {
    return {
      projectName,
      projectDescription,
      projectCategory,
      projectType,
      skillsWithLevel,
      deliverables,
      projectDuration,
      projectDeadline,
      collaboratorsNeeded,
      compensation,
      compensationDetails,
      perks,
      tools,
      projectGoal,
      targetAudience,
      location,
      legalConstraints,
      budget,
      desiredProfiles,
      projectStatus
    };
  };

  const isFormValid = () => {
    return (
      projectName.trim() !== "" &&
      projectDescription.trim() !== "" &&
      skillsWithLevel.length > 0 &&
      projectGoal.trim() !== ""
    );
  };

  return {
    // Basic Info
    projectName, setProjectName,
    projectDescription, setProjectDescription,
    projectCategory, setProjectCategory,
    projectType, setProjectType,
    projectStatus, setProjectStatus,
    
    // Skills & Requirements
    skillsWithLevel, setSkillsWithLevel,
    deliverables, setDeliverables,
    projectDuration, setProjectDuration,
    projectDeadline, setProjectDeadline,
    collaboratorsNeeded, setCollaboratorsNeeded,
    
    // Compensation
    compensation, setCompensation,
    compensationDetails, setCompensationDetails,
    perks, setPerks,
    tools, setTools,
    budget, setBudget,
    
    // Additional Details
    projectGoal, setProjectGoal,
    targetAudience, setTargetAudience,
    location, setLocation,
    legalConstraints, setLegalConstraints,
    desiredProfiles, setDesiredProfiles,
    
    // Form utilities
    getFormData,
    isFormValid
  };
}
