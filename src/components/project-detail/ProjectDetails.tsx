
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import { Calendar, Clock, Tag, MapPin, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProjectDetailsProps {
  project: Project;
  isEditing: boolean;
  editedProject: Partial<Project>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ProjectDetails({
  project,
  isEditing,
  editedProject,
  handleInputChange
}: ProjectDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={18} className="text-gray-400" />
          <div>
            <p className="font-medium">Deadline</p>
            {isEditing ? (
              <Input
                id="deadline"
                name="deadline"
                value={editedProject.deadline || ''}
                onChange={handleInputChange}
                placeholder="e.g., December 31, 2023"
                className="mt-1"
              />
            ) : (
              <p className="text-sm">{project.deadline || "Not specified"}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={18} className="text-gray-400" />
          <div>
            <p className="font-medium">Duration</p>
            {isEditing ? (
              <Input
                id="duration"
                name="duration"
                value={editedProject.duration || ''}
                onChange={handleInputChange}
                placeholder="e.g., 3 months, 6 weeks"
                className="mt-1"
              />
            ) : (
              <p className="text-sm">{project.duration || "Not specified"}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Tag size={18} className="text-gray-400" />
          <div>
            <p className="font-medium">Category</p>
            <p className="text-sm">{project.category || "Not specified"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={18} className="text-gray-400" />
          <div>
            <p className="font-medium">Location</p>
            {isEditing ? (
              <select
                id="location"
                name="location"
                value={editedProject.location || 'Remote'}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
              >
                <option value="Remote">Fully Remote</option>
                <option value="In-person">In-person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            ) : (
              <p className="text-sm">{project.location || "Remote"}</p>
            )}
          </div>
        </div>
        {project.collaboratorsNeeded && !isEditing && (
          <div className="flex items-center gap-2 text-gray-700">
            <UserCircle size={18} className="text-gray-400" />
            <div>
              <p className="font-medium">Collaborators Needed</p>
              <p className="text-sm">{project.collaboratorsNeeded}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
