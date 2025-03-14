
import React from "react";
import { History, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          My Project History
        </h2>
        <Button variant="outline" className="gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {projectHistory.map((project) => (
          <div key={project.id} className="p-6 border-b hover:bg-gray-50 transition-colors">
            <div className="md:flex justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                <p className="text-gray-600 mb-2">{project.role} • {project.date}</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-2 md:mt-0">
                {project.status}
              </Badge>
            </div>
            <p className="text-gray-700">{project.contribution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
