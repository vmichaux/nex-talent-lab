
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoTabProps {
  projectName: string;
  setProjectName: (value: string) => void;
  projectDescription: string;
  setProjectDescription: (value: string) => void;
  projectCategory: string;
  setProjectCategory: (value: string) => void;
  projectType: string;
  setProjectType: (value: string) => void;
  projectStatus: "Open" | "Urgent" | "Closed";
  setProjectStatus: (value: "Open" | "Urgent" | "Closed") => void;
}

export function BasicInfoTab({
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  projectCategory,
  setProjectCategory,
  projectType,
  setProjectType,
  projectStatus,
  setProjectStatus
}: BasicInfoTabProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="project-name">Project name <span className="text-red-500">*</span></Label>
        <Input
          id="project-name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g., Custom fitness application"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="project-category">Category <span className="text-red-500">*</span></Label>
        <select
          id="project-category"
          value={projectCategory}
          onChange={(e) => setProjectCategory(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          required
        >
          <option value="Technology">Technology</option>
          <option value="Design & Creative">Design & Creative</option>
          <option value="Marketing & Advertising">Marketing & Advertising</option>
          <option value="Writing & Publishing">Writing & Publishing</option>
          <option value="Music & Entertainment">Music & Entertainment</option>
          <option value="Video & Film Production">Video & Film Production</option>
          <option value="Education & E-learning">Education & E-learning</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Finance & Consulting">Finance & Consulting</option>
          <option value="Events & Hospitality">Events & Hospitality</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="project-type">Project Type <span className="text-red-500">*</span></Label>
        <select
          id="project-type"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          required
        >
          <option value="Short-term">Short-term</option>
          <option value="Internship">Internship</option>
          <option value="Portfolio-building">Portfolio-building</option>
          <option value="Long-term mission">Long-term mission</option>
          <option value="Open-source">Open-source</option>
          <option value="Research">Research</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="project-description">Project description <span className="text-red-500">*</span></Label>
        <Textarea
          id="project-description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Briefly describe the project, its goals, and the type of collaborators you're looking for..."
          className="min-h-[120px]"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="project-status">Status <span className="text-red-500">*</span></Label>
        <select
          id="project-status"
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value as "Open" | "Urgent" | "Closed")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          required
        >
          <option value="Open">Open</option>
          <option value="Urgent">Urgent</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>
  );
}
