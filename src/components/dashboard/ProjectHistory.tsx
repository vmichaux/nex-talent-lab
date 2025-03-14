
import React from "react";
import { History, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectHistory() {
  // Sample history data
  const projectHistory = [
    {
      id: 1,
      name: "E-commerce Website Redesign",
      role: "Frontend Developer",
      date: "January - March 2023",
      status: "Completed",
      contribution: "Led UI development, implemented responsive design"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      role: "React Native Developer",
      date: "October - December 2022",
      status: "Completed",
      contribution: "Built authentication flow and transaction features"
    },
    {
      id: 3,
      name: "Health Tracking Dashboard",
      role: "Full Stack Developer",
      date: "July - September 2022",
      status: "Completed",
      contribution: "Developed data visualization components and API integration"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          My Project History
        </h2>
        <Button variant="outline" size="sm" className="gap-1">
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {projectHistory.map((project) => (
            <div key={project.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="md:flex justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold mb-1">{project.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{project.role} • {project.date}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs mt-1 md:mt-0">
                  {project.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-700">{project.contribution}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
