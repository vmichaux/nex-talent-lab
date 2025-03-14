import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, UserCircle, MessageSquare } from "lucide-react";
import { Project } from "@/types/project";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast-sonner";
import { useAuth } from "@/hooks/use-auth";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  currentUserId?: string;
  showActions?: boolean;
}

export const ProjectCard = ({ 
  project, 
  onClick, 
  currentUserId,
  showActions = false
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const handleViewDetails = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/project/${project.id}`);
    }
  };
  
  const handleApplyNow = () => {
    // Redirect to login if user is not logged in
    if (!isLoggedIn) {
      toast.info("Authentication required", {
        description: "Please sign in to apply for projects"
      });
      navigate('/login');
      return;
    }
    
    // Prevent applying to your own project
    if (project.userId === currentUserId) {
      toast.error("Cannot apply to your own project", {
        description: "You cannot apply to projects you've created."
      });
      return;
    }
    
    // Navigate to the application page
    navigate(`/apply-project/${project.id}`);
  };
  
  const isOwnProject = project.userId === currentUserId;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4 space-y-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <div className="flex gap-2">
            {project.featured && <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Featured
              </Badge>}
            {project.status === "Urgent" && <Badge variant="destructive">Urgent</Badge>}
            {isOwnProject && showActions && <Badge variant="outline" className="bg-blue-100 text-blue-800">Your Project</Badge>}
          </div>
        </div>
        <CardDescription className="text-gray-600">{project.category}</CardDescription>
      </CardHeader>
      <CardContent className="py-4 flex-1 space-y-5">
        <p className="text-sm text-gray-700 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.skills?.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span>Deadline: {project.deadline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span>Duration: {project.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCircle size={16} className="text-gray-400" />
            <span>Posted by: {project.owner}</span>
          </div>
          {project.applicants !== undefined && (
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-gray-400" />
              <span>{project.applicants} applicants</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t flex gap-2">
        {showActions ? (
          <>
            <Button 
              className="w-full" 
              onClick={handleApplyNow}
              disabled={isLoggedIn && isOwnProject}
            >
              {isLoggedIn && isOwnProject ? "Your Project" : "Apply Now"}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleViewDetails}>Details</Button>
          </>
        ) : (
          <Button className="w-full" onClick={handleViewDetails}>View Details</Button>
        )}
      </CardFooter>
    </Card>
  );
};
