
export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  category: string;
  deadline: string;
  duration: string;
  owner: string; // This will now contain the user's full name
  ownerEmail?: string; // Optional field to store the email
  userId?: string; // Store the user ID for reference
  featured: boolean;
  status: "Open" | "Urgent" | "Closed";
  applicants: number;
  createdAt: Date;
  progress?: number;
  
  // New fields
  projectType: string;
  skillsWithLevel: Array<{skill: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert"}>;
  deliverables: string[];
  timeline: string;
  compensation: string;
  compensationDetails?: string;
  perks: string[];
  tools: string[];
  collaboratorsNeeded: number;
  projectGoal: string;
  targetAudience: string;
  location: "Remote" | "In-person" | "Hybrid";
  legalConstraints?: string;
  budget?: string;
  desiredProfiles: string[];
}
