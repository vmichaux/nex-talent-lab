
import { Timestamp } from "firebase/firestore";

export interface ApplicationSummary {
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
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

// Format timestamp to readable date
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date instanceof Date ? date : new Date(date));
};
