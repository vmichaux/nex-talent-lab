
import { useState } from "react";
import { Briefcase, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/useProjects";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardProjects() {
  const navigate = useNavigate();
  const {
    currentUser
  } = useAuth();
  const {
    projects,
    loading
  } = useProjects({
    excludeCurrentUser: false,
    userId: currentUser?.uid
  });

  // Filter projects to only show the current user's projects
  const userProjects = projects.filter(project => project.userId === currentUser?.uid);
  // Limit to 3 projects for display
  const displayedProjects = userProjects.slice(0, 3);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Briefcase className="h-4 w-4 text-primary" />
          Active Projects
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1" 
          onClick={() => navigate('/my-projects')}
        >
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(skeleton => (
            <Card key={skeleton} className="overflow-hidden shadow-sm">
              <CardHeader>
                <Skeleton className="h-4 w-2/3 rounded animate-pulse" />
                <Skeleton className="h-3 w-full rounded animate-pulse mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full rounded animate-pulse" />
                <Skeleton className="h-16 w-full rounded animate-pulse mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayedProjects.length > 0 ? (
            displayedProjects.map(project => (
              <Card key={project.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm mb-1">{project.title}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-3 pt-0 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress || 0}%</span>
                    </div>
                    <Progress value={project.progress || 0} className="h-1.5" />
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.skills && project.skills.slice(0, 2).map((skill, index) => (
                      <span key={index} className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-600">
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      Deadline: {project.deadline || "Not set"}
                    </div>
                    <Badge className={`text-[10px] ${project.status === "Urgent" ? "bg-red-100 text-red-800 hover:bg-red-100" : project.status === "Closed" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" : "bg-green-100 text-green-800 hover:bg-green-100"}`}>
                      {project.status}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-3">
                  <Button variant="default" size="sm" className="w-full text-xs" onClick={() => navigate(`/project/${project.id}`)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-600 text-sm mb-3">You haven't created any projects yet.</p>
              <Button 
                onClick={() => navigate('/dashboard', {
                  state: {
                    openProjectModal: true
                  }
                })} 
                size="sm" 
                className="text-xs"
              >
                Create Your First Project
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
