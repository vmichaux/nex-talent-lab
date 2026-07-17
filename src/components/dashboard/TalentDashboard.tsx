
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
import { DashboardNotifications } from "@/components/dashboard/DashboardNotifications";
import { Search, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TalentDashboard() {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the actual search functionality
  };
  
  return <div className="flex flex-col lg:flex-row gap-24 w-full max-w-[2000px] mx-auto">
      {/* Left column (wider) */}
      <div className="lg:w-3/5 space-y-16">
        {/* Overview section */}
        <div>
          <h2 className="font-semibold category-title-gradient text-3xl mb-4">
            Your Overview
          </h2>
          <DashboardOverview role="talent" />
        </div>

        {/* Search bar section */}
        <div>
          <form onSubmit={handleSearch} className="flex gap-4 w-full">
            <Button type="submit" variant="default" className="h-10">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <div className="relative flex-1">
              <Input type="text" placeholder="Search for projects, skills, or opportunities..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" />
            </div>
          </form>
        </div>

        {/* Active Projects section */}
        <DashboardProjects />

        {/* Projects Deadlines and Milestones */}
        <ProjectDeadlines />
        
        {/* Project Metrics section */}
        <ProjectMetrics role="talent" />
        
        {/* Recommended Opportunities section */}
        <RecommendedOpportunities filter={filter} setFilter={setFilter} />
        
        {/* Skills Progress section - Moved above Learning Resources */}
        <SkillsProgress />
        
        {/* Learning Resources section */}
        <LearningResources />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-2/5 space-y-16">
        {/* Notifications section - Added at the top */}
        <DashboardNotifications />
        
        {/* Applied Projects section */}
        <AppliedProjects />
        
        {/* Messages section */}
        <DashboardMessages />
        
        {/* Network section */}
        <NetworkList />
        
        {/* Manage Reviews section - Moved from left column */}
        <ManageReviewsRecommendations role="talent" />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
    </div>;
}
