
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
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";

export function TalentDashboard() {
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
        
        {/* Skills Progress section - moved from right column */}
        <SkillsProgress />
        
        {/* Learning Resources section */}
        <LearningResources />
        
        {/* Recommended Opportunities section */}
        <RecommendedOpportunities filter={filter} setFilter={setFilter} />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-2/5 space-y-12">
        {/* Applied Projects section */}
        <AppliedProjects />
        
        {/* Messages section */}
        <DashboardMessages />
        
        {/* Network section */}
        <NetworkList />
        
        {/* Manage Reviews section - moved from left column */}
        <ManageReviewsRecommendations role="talent" />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
    </div>
  );
}
