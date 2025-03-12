
export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  category: string;
  deadline: string;
  duration: string;
  owner: string;
  featured: boolean;
  status: "Open" | "Urgent" | "Closed";
  applicants: number;
  createdAt: Date;
  progress?: number; // Optional progress property
}
