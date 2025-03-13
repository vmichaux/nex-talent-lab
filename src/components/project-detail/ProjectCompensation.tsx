
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProjectCompensationProps {
  project: Project;
  isEditing: boolean;
  editedProject: Partial<Project>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ProjectCompensation({
  project,
  isEditing,
  editedProject,
  handleInputChange
}: ProjectCompensationProps) {
  if (!isEditing && !project.compensation && !project.perks) {
    return null;
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compensation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="compensation">Compensation Type</Label>
            <select
              id="compensation"
              name="compensation"
              value={editedProject.compensation || ''}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="Volunteer">Volunteer (unpaid)</option>
              <option value="Fixed Payment">Fixed Payment</option>
              <option value="Hourly Rate">Hourly Rate</option>
              <option value="Revenue Share">Revenue Share</option>
              <option value="Equity">Equity</option>
              <option value="Negotiable">Negotiable</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="compensationDetails">Compensation Details</Label>
            <Textarea
              id="compensationDetails"
              name="compensationDetails"
              value={editedProject.compensationDetails || ''}
              onChange={handleInputChange}
              placeholder="Provide more details about the compensation..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              name="budget"
              value={editedProject.budget || ''}
              onChange={handleInputChange}
              placeholder="e.g., $500, $1000-2000, etc."
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compensation and Benefits</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {project.compensation && (
          <div>
            <h3 className="font-semibold mb-2">Compensation Type</h3>
            <p className="text-gray-700">{project.compensation}</p>
            {project.compensationDetails && (
              <p className="text-gray-700 mt-2">{project.compensationDetails}</p>
            )}
          </div>
        )}
        
        {project.budget && (
          <div>
            <h3 className="font-semibold mb-2">Budget</h3>
            <p className="text-gray-700">{project.budget}</p>
          </div>
        )}
        
        {project.perks && project.perks.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Additional Perks</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {project.perks.map((perk, index) => (
                <li key={index}>{perk}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
