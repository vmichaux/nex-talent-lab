
import { Timestamp } from "firebase/firestore";

// Define UserProfile interface
export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  skills?: Array<{name: string, level: string}>;
  interests?: string[];
  email?: string;
  displayName?: string;
  photoURL?: string;
  phone?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Define Application interface
export interface Application {
  id: string;
  projectId: string;
  projectTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  coverLetter: string;
  relevantExperience: string;
  availabilityDate: string;
  timeCommitment: string;
  portfolioLink?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}
