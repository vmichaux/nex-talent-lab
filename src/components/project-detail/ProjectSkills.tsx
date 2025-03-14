
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProjectSkillsProps {
  project: Project;
  isEditing: boolean;
}

export function ProjectSkills({ project, isEditing }: ProjectSkillsProps) {
  // Don't show if in editing mode or if there are no skills to display
  if (isEditing || 
     (!project.skillsWithLevel || project.skillsWithLevel.length === 0) && 
     (!project.desiredProfiles || project.desiredProfiles.length === 0)) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills and Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Only show skills from skillsWithLevel instead of both arrays */}
        {project.skillsWithLevel && project.skillsWithLevel.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Skills with Proficiency</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill</TableHead>
                  <TableHead>Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.skillsWithLevel.map((skillWithLevel, index) => (
                  <TableRow key={index}>
                    <TableCell>{skillWithLevel.skill}</TableCell>
                    <TableCell>{skillWithLevel.level}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Tools section */}
        {project.tools && project.tools.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Tools Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50 px-3 py-1">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Desired profiles */}
        {project.desiredProfiles && project.desiredProfiles.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Desired Profiles</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {project.desiredProfiles.map((profile, index) => (
                <li key={index}>{profile}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
