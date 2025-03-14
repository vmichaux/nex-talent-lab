
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
import { ContactsList } from "@/components/dashboard/talent/ContactsList";

export function TalentDashboard() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left column (wider) */}
      <div className="lg:w-2/3 space-y-16">
        {/* Overview section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Your Overview</h2>
          <DashboardOverview role="talent" />
        </div>

        {/* Active Projects section */}
        <DashboardProjects />

        {/* Projects Deadlines and Milestones */}
        <ProjectDeadlines />

        {/* Project Metrics section */}
        <ProjectMetrics role="talent" />

        {/* Messages section */}
        <DashboardMessages />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-1/3 space-y-16">
        {/* Applied Projects section */}
        <AppliedProjects />
        
        {/* Recommended Opportunities section */}
        <RecommendedOpportunities filter={filter} setFilter={setFilter} />
        
        {/* Contacts section */}
        <ContactsList />
        
        {/* Skills Progress section */}
        <SkillsProgress />
        
        {/* Learning Resources section */}
        <LearningResources />
      </div>
    </div>
  );
}
