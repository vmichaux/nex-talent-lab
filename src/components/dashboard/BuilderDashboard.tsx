import { Users, PlusCircle, Briefcase, LineChart, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { DashboardRequests } from "@/components/dashboard/DashboardRequests";
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";
import { ReviewApplications } from "@/components/dashboard/ReviewApplications";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { useAuth } from "@/hooks/use-auth";

export function BuilderDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { currentUser } = useAuth();
  const { projects, loading } = useProjects({
    excludeCurrentUser: true,
    userId: currentUser?.uid
  });
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    if (location.state?.openProjectModal) {
      setShowProjectModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (projects.length > 0) {
      const shuffled = [...projects].sort(() => 0.5 - Math.random());
      setRecommendedProjects(shuffled.slice(0, 3));
    }
  }, [projects]);

  const recommendedTalents = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Frontend Developer",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      matchScore: 95,
      availability: "Available now",
      location: "Remote"
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "UI/UX Designer",
      skills: ["Figma", "User Research", "Wireframing"],
      matchScore: 92,
      availability: "Available in 2 weeks",
      location: "Hybrid"
    },
    {
      id: 3,
      name: "Marcus Rivera",
      role: "Backend Developer",
      skills: ["Node.js", "Express", "MongoDB"],
      matchScore: 88,
      availability: "Available now",
      location: "Remote"
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <AddProjectButton open={showProjectModal} setOpen={setShowProjectModal} />
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate('/requests')}
          >
            <MessageSquare size={18} />
            Review Applications
          </Button>
        </div>
        <div className="md:w-1/2 lg:w-1/3">
          <ProjectSearch />
        </div>
      </div>

      <DashboardProjects />
      
      <ReviewApplications />
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            Project Metrics
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {projects.filter(p => p.status !== "Closed").length || 0}
              </div>
              <p className="text-sm text-muted-foreground">Open opportunities</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Collaborators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-muted-foreground">Review candidates</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Recommended Opportunities
          </h2>
          <Button variant="outline" className="gap-1" onClick={() => navigate('/explore-projects')}>
            View All Projects
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-3 text-center py-8">Loading recommended projects...</p>
          ) : recommendedProjects.length > 0 ? (
            recommendedProjects.map(project => (
              <Card key={project.id} className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4 space-y-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  {project.status === "Urgent" && (
                    <Badge variant="destructive">Urgent</Badge>
                  )}
                </CardHeader>
                <CardContent className="py-4 flex-1 space-y-4">
                  <p className="text-sm text-gray-700 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills?.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardContent className="pt-4 border-t flex justify-between">
                  <Button className="w-full" onClick={() => navigate(`/project/${project.id}`)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-3 text-center py-8">No recommended projects available at the moment.</p>
          )}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Recommended Talent
          </h2>
          <Button variant="outline" className="gap-1">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendedTalents.map(talent => (
            <Card key={talent.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{talent.name}</h3>
                    <p className="text-gray-600 mb-2">{talent.role}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {talent.skills.map(skill => (
                        <span key={skill} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Availability:</span> {talent.availability}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Location:</span> {talent.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center w-full">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3 w-full text-center">
                      {talent.matchScore}% Match
                    </div>
                    <Button className="w-full">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
