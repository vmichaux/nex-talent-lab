
import { useState } from "react";
import { FileSearch, Briefcase, BookOpen, Award, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardMessages } from "@/components/dashboard/DashboardMessages";
import { UserApplications } from "@/components/dashboard/UserApplications";

export function TalentDashboard() {
  const [filter, setFilter] = useState<string>("all");

  // Sample opportunities data
  const opportunities = [
    {
      id: 1,
      title: "Frontend Developer for Healthcare App",
      company: "MediTech Solutions",
      type: "Remote",
      matches: "95% Match",
      skills: ["React", "TypeScript", "UI/UX"],
      duration: "3 months"
    },
    {
      id: 2,
      title: "UX/UI Designer for Fintech Startup",
      company: "FinanceFlow",
      type: "Hybrid",
      matches: "87% Match",
      skills: ["Figma", "User Research", "Prototyping"],
      duration: "6 months"
    },
    {
      id: 3,
      title: "Full Stack Developer for E-commerce Platform",
      company: "ShopWave",
      type: "Remote",
      matches: "82% Match",
      skills: ["React", "Node.js", "MongoDB"],
      duration: "2 months"
    }
  ];

  return (
    <div className="space-y-10">
      {/* Overview section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Overview</h2>
        </div>
        <DashboardOverview />
      </div>

      {/* Applications section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Your Applications
          </h2>
        </div>
        <UserApplications />
      </div>

      {/* Skills Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Skills Progress
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-lg font-semibold mb-2">React</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <div className="text-sm text-gray-600">85% - Advanced</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-lg font-semibold mb-2">TypeScript</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <div className="text-sm text-gray-600">70% - Intermediate</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-lg font-semibold mb-2">UI/UX Design</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <div className="text-sm text-gray-600">65% - Intermediate</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Opportunities */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-primary" />
            Recommended Opportunities
          </h2>
          
          <div className="flex space-x-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "remote" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("remote")}
            >
              Remote
            </Button>
            <Button 
              variant={filter === "hybrid" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("hybrid")}
            >
              Hybrid
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {opportunities
            .filter(opp => filter === "all" || opp.type.toLowerCase() === filter.toLowerCase())
            .map(opportunity => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{opportunity.title}</h3>
                      <p className="text-gray-600 mb-3">{opportunity.company} • {opportunity.type}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.skills.map(skill => (
                          <span key={skill} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        Duration: {opportunity.duration}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {opportunity.matches}
                      </div>
                      <Button className="w-full">Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Learning Resources */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Learning Resources
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="text-lg font-semibold mb-2">Advanced React Patterns</div>
              <p className="text-gray-600 text-sm mb-4">Learn industry-standard React patterns to level up your development skills.</p>
              <Button variant="outline" className="w-full">View Course</Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="text-lg font-semibold mb-2">TypeScript Masterclass</div>
              <p className="text-gray-600 text-sm mb-4">Comprehensive guide to TypeScript from basics to advanced concepts.</p>
              <Button variant="outline" className="w-full">View Course</Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="text-lg font-semibold mb-2">UI/UX Design Principles</div>
              <p className="text-gray-600 text-sm mb-4">Learn how to create intuitive and beautiful user interfaces.</p>
              <Button variant="outline" className="w-full">View Course</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Messages section */}
      <DashboardMessages />
    </div>
  );
}
