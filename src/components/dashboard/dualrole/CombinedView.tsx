
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

export function CombinedView() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <div className="flex flex-col lg:flex-row gap-24 w-full max-w-[2000px] mx-auto">
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
        
        {/* Recommended Opportunities */}
        <RecommendedOpportunities filter={filter} setFilter={setFilter} />
        
        {/* Recommended Talent section */}
        <RecommendedTalents />
        
        {/* Learning Resources section */}
        <LearningResources />
        
        {/* Manage Reviews section */}
        <ManageReviewsRecommendations role="both" />
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
        
        {/* Skills Progress section */}
        <SkillsProgress />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
    </div>
  );
}
