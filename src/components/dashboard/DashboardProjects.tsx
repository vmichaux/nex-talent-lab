import { Briefcase, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Sample data for projects - in a real app, this would come from Firebase
const projects = [
  {
    id: 1,
    title: "Eco-Friendly Mobile App",
    description: "A mobile application that helps users track and reduce their carbon footprint.",
    progress: 65,
    deadline: "June 15, 2025",
    status: "In Progress",
    collaborators: 3
  },
  {
    id: 2,
    title: "Community Garden Platform",
    description: "Web platform connecting urban gardeners with available land and resources.",
    progress: 30,
    deadline: "August 20, 2025",
    status: "Planning",
    collaborators: 5
  },
  {
    id: 3,
    title: "Educational VR Experience",
    description: "Virtual reality modules for high school science curriculum.",
    progress: 85,
    deadline: "May 10, 2025",
    status: "Final Review",
    collaborators: 4
  }
];

export function DashboardProjects() {
  const navigate = useNavigate();
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Active Projects
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/explore-projects')}>
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-600">
                  <Clock className="inline-block h-3 w-3 mr-1" />
                  Deadline: {project.deadline}
                </div>
                <Badge className={
                  project.status === "In Progress" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                  project.status === "Planning" ? "bg-purple-100 text-purple-800 hover:bg-purple-100" :
                  "bg-green-100 text-green-800 hover:bg-green-100"
                }>
                  {project.status}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="default" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
