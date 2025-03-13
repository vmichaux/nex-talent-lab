
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ProjectOverviewProps {
  project: Project;
  isEditing: boolean;
  editedProject: Partial<Project>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ProjectOverview({
  project,
  isEditing,
  editedProject,
  handleInputChange
}: ProjectOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              name="description"
              value={editedProject.description || ''}
              onChange={handleInputChange}
              rows={6}
              className="min-h-[150px]"
            />
          </div>
        ) : (
          <p className="text-gray-700">{project.description}</p>
        )}
        
        {isEditing ? (
          <div>
            <Label htmlFor="projectGoal">Project Goal</Label>
            <Textarea
              id="projectGoal"
              name="projectGoal"
              value={editedProject.projectGoal || ''}
              onChange={handleInputChange}
              rows={4}
              className="min-h-[100px]"
            />
          </div>
        ) : project.projectGoal ? (
          <div>
            <h3 className="font-semibold mb-3">Project Goal</h3>
            <p className="text-gray-700">{project.projectGoal}</p>
          </div>
        ) : null}
        
        {!isEditing && project.deliverables && project.deliverables.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Deliverables</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {project.deliverables.map((deliverable, index) => (
                <li key={index}>{deliverable}</li>
              ))}
            </ul>
          </div>
        )}
        
        {isEditing ? (
          <div>
            <Label htmlFor="duration">Timeline</Label>
            <Input
              id="duration"
              name="duration"
              value={editedProject.duration || ''}
              onChange={handleInputChange}
              placeholder="e.g., 3 months, 6 weeks"
            />
          </div>
        ) : project.timeline ? (
          <div>
            <h3 className="font-semibold mb-3">Timeline</h3>
            <div className="text-gray-700">
              <p>{project.timeline}</p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
