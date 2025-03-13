
import { useState } from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardMessages } from "@/components/dashboard/DashboardMessages";
import { AppliedProjects } from "@/components/dashboard/AppliedProjects";
import { SkillsProgress } from "@/components/dashboard/talent/SkillsProgress";
import { RecommendedOpportunities } from "@/components/dashboard/talent/RecommendedOpportunities";
import { LearningResources } from "@/components/dashboard/talent/LearningResources";

export function TalentDashboard() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <div className="space-y-10">
      {/* Overview section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Overview</h2>
        </div>
        <DashboardOverview />
      </div>

      {/* Applied Projects section */}
      <div className="mb-10">
        <AppliedProjects />
      </div>

      {/* Skills Progress section */}
      <SkillsProgress />

      {/* Recommended Opportunities section */}
      <RecommendedOpportunities filter={filter} setFilter={setFilter} />

      {/* Learning Resources section */}
      <LearningResources />

      {/* Messages section */}
      <DashboardMessages />
    </div>
  );
}
