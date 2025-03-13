
import { Users, PlusCircle, Briefcase, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { DashboardRequests } from "@/components/dashboard/DashboardRequests";
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";

export function BuilderDashboard() {
  // Sample talents data
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
      {/* Action buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <AddProjectButton />
        <div className="md:w-1/2 lg:w-1/3">
          <ProjectSearch />
        </div>
      </div>

      {/* Projects section - showing this first */}
      <DashboardProjects />
      
      {/* Project metrics */}
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
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-muted-foreground">+1 from last month</p>
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

      {/* Recommended Talent */}
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
      
      {/* Collaboration Requests */}
      <DashboardRequests />
    </div>
  );
}
