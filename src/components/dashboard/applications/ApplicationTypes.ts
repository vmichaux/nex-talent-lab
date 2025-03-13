
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
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  feedback?: string;
}
