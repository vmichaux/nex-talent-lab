
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TalentDashboard } from "./TalentDashboard";
import { BuilderDashboard } from "./BuilderDashboard";
import { useState } from "react";
import { ArrowRightLeft, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DashboardProjects } from "./DashboardProjects";

export function DualRoleDashboard() {
  const [viewMode, setViewMode] = useState<"combined" | "talent" | "builder">("combined");
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
          Dual Role View
        </h2>
        
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-auto">
          <TabsList>
            <TabsTrigger value="combined">Combined</TabsTrigger>
            <TabsTrigger value="talent">Talent Focus</TabsTrigger>
            <TabsTrigger value="builder">Builder Focus</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "combined" && (
        <div className="space-y-10">
          {/* Show projects first in combined view */}
          <DashboardProjects />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-primary">My Talent Activity</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium">New Opportunities</h4>
                  <p className="text-sm text-gray-600">5 new projects match your skills</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium">Skills Progress</h4>
                  <p className="text-sm text-gray-600">Your React skills are now at 85%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium">Recent Applications</h4>
                  <p className="text-sm text-gray-600">2 applications pending review</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-lg border border-secondary/20">
              <h3 className="text-xl font-bold mb-4 text-secondary">My Builder Activity</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium">Active Projects</h4>
                  <p className="text-sm text-gray-600">3 projects in progress</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium">Talent Applications</h4>
                  <p className="text-sm text-gray-600">8 new applications to review</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium">Project Metrics</h4>
                  <p className="text-sm text-gray-600">2 projects ahead of schedule</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline section showing both roles */}
          <div className="border-l-2 border-primary/30 pl-6 space-y-6 ml-4">
            <h3 className="text-xl font-bold -ml-10">Recent Activity</h3>
            
            <div className="relative">
              <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full bg-primary"></div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Today</div>
                <h4 className="font-medium">Applied to Frontend Developer Role</h4>
                <div className="text-xs inline-block bg-primary/10 text-primary px-2 py-1 rounded-full mt-1">Talent</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full bg-secondary"></div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Yesterday</div>
                <h4 className="font-medium">New Application for Garden Platform</h4>
                <div className="text-xs inline-block bg-secondary/10 text-secondary px-2 py-1 rounded-full mt-1">Builder</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full bg-primary"></div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">2 days ago</div>
                <h4 className="font-medium">Completed React Course</h4>
                <div className="text-xs inline-block bg-primary/10 text-primary px-2 py-1 rounded-full mt-1">Talent</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full bg-secondary"></div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">3 days ago</div>
                <h4 className="font-medium">Project Milestone Achieved</h4>
                <div className="text-xs inline-block bg-secondary/10 text-secondary px-2 py-1 rounded-full mt-1">Builder</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <TabsContent value="talent" className="mt-0">
        <TalentDashboard />
      </TabsContent>
      
      <TabsContent value="builder" className="mt-0">
        <BuilderDashboard />
      </TabsContent>
    </div>
  );
}
