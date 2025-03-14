
import { BarChart, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function AppliedProjects() {
  const navigate = useNavigate();
  
  // Sample applications data
  const applications = [
    {
      id: 1,
      projectName: "Mobile App Development",
      company: "EcoTech Solutions",
      date: "Applied on Aug 15, 2023",
      status: "Under Review"
    },
    {
      id: 2,
      projectName: "Website Redesign",
      company: "Creative Studios",
      date: "Applied on Aug 10, 2023",
      status: "Interview Scheduled"
    },
    {
      id: 3,
      projectName: "Logo Design",
      company: "Brand Innovators",
      date: "Applied on Aug 5, 2023",
      status: "Declined"
    }
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 font-semibold category-title-gradient text-3xl">
          <FileText className="h-4 w-4 text-primary" />
          My Applications
        </h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/applications')}>
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {applications.map(application => (
            <div key={application.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-sm font-medium">{application.projectName}</h3>
                  <p className="text-xs text-gray-600">{application.company}</p>
                </div>
                <Badge className={`text-xs ${
                  application.status === "Under Review" 
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100" 
                    : application.status === "Interview Scheduled" 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }`}>
                  {application.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">{application.date}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
