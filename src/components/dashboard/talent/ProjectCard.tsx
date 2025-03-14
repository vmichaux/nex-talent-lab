
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card key={project.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
            <p className="text-gray-600 mb-3">{project.owner} • {project.location || "Location not specified"}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills?.slice(0, 2).map((skill, index) => (
                <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
            
            {project.progress !== undefined && (
              <div className="mb-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress || 0}%</span>
                </div>
                <Progress value={project.progress || 0} className="h-2" />
              </div>
            )}
            
            <div className="text-sm text-gray-600">
              Duration: {project.duration || "Not specified"}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {project.matchPercentage || 85}% Match
            </div>
            <Button 
              className="w-full"
              onClick={() => window.location.href = `/project/${project.id}`}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
