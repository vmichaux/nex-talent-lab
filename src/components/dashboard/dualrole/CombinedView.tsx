
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
import { BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RecommendedTalents } from "../builder/RecommendedTalents";
import { NetworkList } from "../builder/NetworkList";
import { ProjectActions } from "../builder/ProjectActions";

export function CombinedView() {
  const [filter, setFilter] = useState<string>("all");
  const [showProjectModal, setShowProjectModal] = useState(false);
  
  return <div className="flex flex-col lg:flex-row gap-24 w-full max-w-[2000px] mx-auto">
      {/* Left column (wider) */}
      <div className="lg:w-3/5 space-y-12">
        {/* Overview metrics */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Your Overview
          </h2>
          <DashboardOverview role="both" />
        </div>
        
        {/* Project actions section */}
        <ProjectActions showProjectModal={showProjectModal} setShowProjectModal={setShowProjectModal} />
        
        {/* Active Projects section */}
        <DashboardProjects />
        
        {/* Projects Deadlines and Milestones */}
        <ProjectDeadlines />
        
        {/* Project Metrics section with role activities */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Project Metrics
          </h2>
          <RoleActivityCards />
        </div>
        
        {/* Recommended Opportunities */}
        <RecommendedOpportunities filter={filter} setFilter={setFilter} />
        
        {/* Recommended Talent section */}
        <RecommendedTalents />
        
        {/* Learning Resources section */}
        <LearningResources />
        
        {/* Skills Progress section - Moved from right column */}
        <SkillsProgress />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-2/5 space-y-12">
        {/* Applied Projects */}
        <AppliedProjects />
        
        {/* Manage Applications section */}
        <div>
          <ReviewApplications />
        </div>
        
        {/* Messages */}
        <DashboardMessages />
        
        {/* Network section */}
        <NetworkList />
        
        {/* Manage Reviews section - Moved from left column */}
        <ManageReviewsRecommendations role="both" />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
    </div>;
}
