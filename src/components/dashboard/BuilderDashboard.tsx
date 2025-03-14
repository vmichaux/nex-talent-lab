
import { useState, useEffect } from "react";
import { Users, PlusCircle, Briefcase, LineChart, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";
import { ReviewApplications } from "@/components/dashboard/ReviewApplications";
import { useLocation, useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { useAuth } from "@/hooks/use-auth";
import { DashboardMessages } from "@/components/dashboard/DashboardMessages";
import { ProjectDeadlines } from "@/components/dashboard/ProjectDeadlines";
import { ProjectMetrics } from "@/components/dashboard/ProjectMetrics";
import { SkillsProgress } from "@/components/dashboard/talent/SkillsProgress";
import { LearningResources } from "@/components/dashboard/talent/LearningResources";
import { ProjectHistory } from "@/components/dashboard/ProjectHistory";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

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
    <div className="space-y-16">
      {/* Overview section */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Your Overview</h2>
        <DashboardOverview role="builder" />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
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

      {/* Active Projects section */}
      <DashboardProjects />
      
      {/* Projects Deadlines and Milestones */}
      <ProjectDeadlines />
      
      {/* Review Applications */}
      <ReviewApplications />
      
      {/* Project Metrics section */}
      <ProjectMetrics role="builder" />
      
      {/* Messages section */}
      <DashboardMessages />
      
      {/* Recommended Talent section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Recommended Talent
          </h2>
          <Button variant="outline" className="gap-1">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
      
      {/* Project History section */}
      <ProjectHistory />
      
      {/* Skills Progress section */}
      <SkillsProgress />
      
      {/* Learning Resources section */}
      <LearningResources />
    </div>
  );
}
