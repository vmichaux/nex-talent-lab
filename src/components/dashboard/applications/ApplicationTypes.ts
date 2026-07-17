
export interface ApplicationSummary {
  id: string;
  projectId: string;
  projectTitle: string;
  userName: string;
  userFullName?: string; // Add this field for the full name
  userEmail: string;
  userId?: string; // Make sure we have userId for fetching profile
  coverLetter?: string;
  relevantExperience?: string;
  availabilityDate?: string;
  timeCommitment?: string;
  portfolioLink?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  feedback?: string; // Add feedback field
}

export type ApplicationFilter = 'all' | 'pending' | 'reviewed';

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date instanceof Date ? date : new Date(date));
};
