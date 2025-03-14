
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function ProjectDeadlines() {
  // Sample data - in a real app, this would come from a data source
  const deadlines = [
    {
      id: 1,
      projectName: "Eco-Friendly Mobile App",
      milestone: "UI Design Completion",
      deadline: "May 15, 2023",
      progress: 75,
      status: "On Track",
    },
    {
      id: 2,
      projectName: "Community Garden Platform",
      milestone: "Backend Development",
      deadline: "June 2, 2023",
      progress: 45,
      status: "At Risk",
    },
    {
      id: 3,
      projectName: "Educational VR Experience",
      milestone: "Prototype Testing",
      deadline: "May 28, 2023",
      progress: 90,
      status: "On Track",
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Projects Deadlines and Milestones
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {deadlines.map((item) => (
          <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.projectName}</CardTitle>
              <p className="text-sm text-gray-500">{item.milestone}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {item.deadline}
                </div>
                <Badge className={
                  item.status === "On Track" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                  item.status === "At Risk" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                  "bg-red-100 text-red-800 hover:bg-red-100"
                }>
                  {item.status}
                </Badge>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
