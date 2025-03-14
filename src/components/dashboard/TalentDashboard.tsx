
import { useState } from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardMessages } from "@/components/dashboard/DashboardMessages";
import { AppliedProjects } from "@/components/dashboard/AppliedProjects";
import { SkillsProgress } from "@/components/dashboard/talent/SkillsProgress";
import { RecommendedOpportunities } from "@/components/dashboard/talent/RecommendedOpportunities";
import { LearningResources } from "@/components/dashboard/talent/LearningResources";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { ProjectDeadlines } from "@/components/dashboard/ProjectDeadlines";
import { ProjectMetrics } from "@/components/dashboard/ProjectMetrics";
import { ProjectHistory } from "@/components/dashboard/ProjectHistory";
import { NetworkList } from "@/components/dashboard/builder/NetworkList";
import { ManageReviewsRecommendations } from "@/components/dashboard/ManageReviewsRecommendations";
import { ProjectActions } from "@/components/dashboard/builder/ProjectActions";

export function TalentDashboard() {
  const [filter, setFilter] = useState<string>("all");
  const [showProjectModal, setShowProjectModal] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-24 w-full max-w-[2000px] mx-auto">
      {/* Left column (wider) */}
      <div className="lg:w-3/5 space-y-12">
        {/* Project actions section - moved before Overview */}
        <ProjectActions 
          showProjectModal={showProjectModal} 
          setShowProjectModal={setShowProjectModal} 
        />
        
        {/* Overview section */}
        <div>
          <h2 className="text-xl font-bold mb-6">Your Overview</h2>
          <DashboardOverview role="talent" />
        </div>

        {/* Active Projects section */}
        <DashboardProjects />

        {/* Projects Deadlines and Milestones */}
        <ProjectDeadlines />
        
        {/* Project Metrics section */}
        <ProjectMetrics role="talent" />
        
        {/* Recommended Opportunities section */}
        <RecommendedOpportunities filter={filter} setFilter={setFilter} />
        
        {/* Skills Progress section - moved to left column before Learning Resources */}
        <SkillsProgress />
        
        {/* Learning Resources section */}
        <LearningResources />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-2/5 space-y-12">
        {/* Applied Projects section */}
        <AppliedProjects />
        
        {/* Messages section */}
        <DashboardMessages />
        
        {/* Network section */}
        <NetworkList />
        
        {/* Project History section */}
        <ProjectHistory />
        
        {/* Manage Reviews section - moved to right column */}
        <ManageReviewsRecommendations role="talent" />
      </div>
    </div>
  );
}
