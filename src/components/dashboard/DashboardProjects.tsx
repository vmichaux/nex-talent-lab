
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
  const { currentUser } = useAuth();
  const { projects, loading } = useProjects({
    excludeCurrentUser: false,
    userId: currentUser?.uid
  });
  
  // Filter projects to only show the current user's projects
  const userProjects = projects.filter(project => project.userId === currentUser?.uid);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Active Projects
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/explore-projects')}>
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((skeleton) => (
            <Card key={skeleton} className="overflow-hidden shadow-md">
              <CardHeader>
                <Skeleton className="h-6 w-2/3 rounded animate-pulse" />
                <Skeleton className="h-4 w-full rounded animate-pulse mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full rounded animate-pulse" />
                <Skeleton className="h-20 w-full rounded animate-pulse mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userProjects.length > 0 ? (
            userProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-4 space-y-5">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress || 0}%</span>
                    </div>
                    <Progress value={project.progress || 0} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.skills && project.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      Deadline: {project.deadline || "Not set"}
                    </div>
                    <Badge className={
                      project.status === "Urgent" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                      project.status === "Closed" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
                      "bg-green-100 text-green-800 hover:bg-green-100"
                    }>
                      {project.status}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button variant="default" className="w-full" onClick={() => navigate(`/project/${project.id}`)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-600 mb-4">You haven't created any projects yet.</p>
              <Button 
                onClick={() => navigate('/dashboard', { state: { openProjectModal: true } })}
                className="bg-primary text-white font-medium px-4 py-2 rounded-md">
                Create Your First Project
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
