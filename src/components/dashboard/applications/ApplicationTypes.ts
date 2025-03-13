
export interface ApplicationSummary {
  id: string;
  projectId: string;
  projectTitle: string;
  userName: string;
  userEmail: string;
  coverLetter?: string;
  relevantExperience?: string;
  availabilityDate?: string;
  timeCommitment?: string;
  portfolioLink?: string;
  status: 'pending' | 'accepted' | 'declined' | 'rejected';
  createdAt: Date;
  feedback?: string;
  userId?: string;
}

export type ApplicationFilter = 'all' | 'pending' | 'reviewed';

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date instanceof Date ? date : new Date(date));
};
