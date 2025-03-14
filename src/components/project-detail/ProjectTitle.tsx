
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import { Project } from "@/types/project";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProjectTitleProps {
  project: Project;
  isEditing: boolean;
  editedProject: Partial<Project>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ProjectTitle({
  project,
  isEditing,
  editedProject,
  handleInputChange
}: ProjectTitleProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        {isEditing ? (
          <div className="space-y-4 max-w-2xl">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                name="title"
                value={editedProject.title || ''}
                onChange={handleInputChange}
                className="text-2xl font-bold"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={editedProject.category || ''}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Tag size={16} />
              <span>{project.category}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.skills && project.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {skill}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="flex gap-4">
        {project.progress !== undefined && !isEditing && (
          <div className="bg-white p-4 rounded-lg shadow-sm border min-w-40">
            <p className="text-sm text-gray-500 mb-2">Project Progress</p>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
}
