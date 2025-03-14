
import React from "react";
import { useState } from "react";
import { DashboardProjects } from "../DashboardProjects";
import { RoleActivityCards } from "./RoleActivityCards";
import { ActivityTimeline } from "./ActivityTimeline";
import { ReviewApplications } from "../ReviewApplications";
import { DashboardOverview } from "../DashboardOverview";
import { AppliedProjects } from "../AppliedProjects";
import { DashboardMessages } from "../DashboardMessages";
import { ProjectDeadlines } from "../ProjectDeadlines";
import { ProjectMetrics } from "../ProjectMetrics";
import { RecommendedOpportunities } from "../talent/RecommendedOpportunities";
import { ProjectHistory } from "../ProjectHistory";
import { SkillsProgress } from "../talent/SkillsProgress";
import { LearningResources } from "../talent/LearningResources";
import { ManageReviewsRecommendations } from "../ManageReviewsRecommendations";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RecommendedTalents } from "../builder/RecommendedTalents";
import { NetworkList } from "../builder/NetworkList";
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";

export function CombinedView() {
  const [filter, setFilter] = useState<string>("all");
  const [showProjectModal, setShowProjectModal] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-24 w-full max-w-[2000px] mx-auto">
      {/* Top action bar with Add Project and Search */}
      <div className="w-full mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <AddProjectButton open={showProjectModal} setOpen={setShowProjectModal} />
          </div>
          <div className="md:w-1/2 lg:w-1/3">
            <ProjectSearch />
          </div>
        </div>
      </div>
      
      {/* Left column (wider) */}
      <div className="lg:w-3/5 space-y-12">
        {/* Overview metrics */}
        <div>
          <h2 className="text-xl font-bold mb-6">Your Overview</h2>
          <DashboardOverview role="both" />
        </div>
        
        {/* Active Projects section */}
        <DashboardProjects />
        
        {/* Projects Deadlines and Milestones */}
        <ProjectDeadlines />
        
        {/* Project Metrics section with role activities */}
        <div>
          <h2 className="text-xl font-bold mb-6">Project Metrics</h2>
          <RoleActivityCards />
        </div>
        
        {/* Skills Progress section - moved from right column */}
        <SkillsProgress />
        
        {/* Learning Resources section */}
        <LearningResources />
        
        {/* Recommended Opportunities */}
        <RecommendedOpportunities filter={filter} setFilter={setFilter} />
        
        {/* Recommended Talent section */}
        <RecommendedTalents />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-2/5 space-y-12">
        {/* Applied Projects */}
        <AppliedProjects />
        
        {/* Manage Applications section */}
        <div>
          <h2 className="text-xl font-bold mb-6">Manage Applications</h2>
          <ReviewApplications />
        </div>
        
        {/* Messages */}
        <DashboardMessages />
        
        {/* Network section */}
        <NetworkList />
        
        {/* Manage Reviews section - moved from left column */}
        <ManageReviewsRecommendations role="both" />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
    </div>
  );
}
