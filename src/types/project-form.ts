
export interface ProjectFormData {
  // Basic Info
  projectName: string;
  projectDescription: string;
  projectCategory: string;
  projectType: string;
  projectStatus: "Open" | "Urgent" | "Closed";
  
  // Skills
  skillsWithLevel: Array<{skill: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert"}>;
  skillsInput?: string;
  selectedSkillLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  
  // Requirements
  deliverables: string[];
  projectDuration: string;
  projectDeadline: string;
  collaboratorsNeeded: number;
  
  // Compensation
  compensation: string;
  compensationDetails: string;
  perks: string[];
  tools: string[];
  budget: string;
  
  // Additional Details
  projectGoal: string;
  targetAudience: string;
  location: "Remote" | "In-person" | "Hybrid";
  legalConstraints: string;
  desiredProfiles: string[];
}
