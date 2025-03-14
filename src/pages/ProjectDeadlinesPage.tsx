
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ProjectDeadlinesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sample data - in a real app, this would come from a database
  const deadlines = [
    {
      id: 1,
      projectName: "Eco-Friendly Mobile App",
      milestone: "UI Design Completion",
      deadline: "May 15, 2023",
      progress: 75,
      status: "On Track",
      description: "Complete user interface designs for all main screens and interactions",
      assignedTo: "Design Team"
    }, 
    {
      id: 2,
      projectName: "Community Garden Platform",
      milestone: "Backend Development",
      deadline: "June 2, 2023",
      progress: 45,
      status: "At Risk",
      description: "Implement database schema and API endpoints for garden management",
      assignedTo: "Backend Team"
    }, 
    {
      id: 3,
      projectName: "Educational VR Experience",
      milestone: "Prototype Testing",
      deadline: "May 28, 2023",
      progress: 90,
      status: "On Track",
      description: "Conduct usability testing with initial prototype on target audience",
      assignedTo: "Product Team"
    },
    {
      id: 4,
      projectName: "Renewable Energy Dashboard",
      milestone: "Data Visualization",
      deadline: "June 10, 2023",
      progress: 60,
      status: "On Track",
      description: "Create interactive charts and graphs for energy consumption metrics",
      assignedTo: "Frontend Team"
    },
    {
      id: 5,
      projectName: "Wildlife Conservation App",
      milestone: "MVP Release",
      deadline: "July 1, 2023",
      progress: 30,
      status: "Behind Schedule",
      description: "Release minimum viable product to beta testers",
      assignedTo: "Product Team"
    },
    {
      id: 6,
      projectName: "Smart City Infrastructure",
      milestone: "Requirements Gathering",
      deadline: "May 20, 2023",
      progress: 95,
      status: "On Track",
      description: "Compile stakeholder requirements and technical specifications",
      assignedTo: "Business Analysis Team"
    }
  ];

  // Filter deadlines based on search query and status
  const filteredDeadlines = deadlines.filter(item => {
    const matchesSearch = item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.milestone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "on-track" && item.status === "On Track") ||
                         (statusFilter === "at-risk" && item.status === "At Risk") ||
                         (statusFilter === "behind" && item.status === "Behind Schedule");
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold category-title-gradient mb-2">Projects Deadlines and Milestones</h1>
            <p className="text-gray-600 max-w-3xl">
              Track all your project deadlines and milestones in one place. Monitor progress, identify risks, and ensure timely delivery.
            </p>
          </div>

          {/* Search and filter section */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search projects or milestones..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="on-track">On Track</TabsTrigger>
                <TabsTrigger value="at-risk">At Risk</TabsTrigger>
                <TabsTrigger value="behind">Behind</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Deadlines cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeadlines.length > 0 ? (
              filteredDeadlines.map(item => (
                <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-base">{item.projectName}</CardTitle>
                    <p className="text-sm text-gray-500">{item.milestone}</p>
                  </CardHeader>
                  <CardContent className="space-y-4 px-4 pb-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-gray-500">Assigned to: {item.assignedTo}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="h-3.5 w-3.5" />
                        {item.deadline}
                      </div>
                      <Badge className={
                        item.status === "On Track" 
                          ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-0.5" 
                          : item.status === "At Risk" 
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs px-2 py-0.5" 
                          : "bg-red-100 text-red-800 hover:bg-red-100 text-xs px-2 py-0.5"
                      }>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-1.5" />
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 bg-white rounded-md shadow-sm">
                <p className="text-gray-500 mb-4">No deadlines or milestones match your search criteria.</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDeadlinesPage;
