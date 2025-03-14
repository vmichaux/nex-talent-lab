import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardMessages } from "@/components/dashboard/DashboardMessages";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { ProjectDeadlines } from "@/components/dashboard/ProjectDeadlines";
import { ProjectMetrics } from "@/components/dashboard/ProjectMetrics";
import { ReviewApplications } from "@/components/dashboard/ReviewApplications";
import { ProjectHistory } from "@/components/dashboard/ProjectHistory";
import { SkillsProgress } from "@/components/dashboard/talent/SkillsProgress";
import { LearningResources } from "@/components/dashboard/talent/LearningResources";
import { ProjectActions } from "@/components/dashboard/builder/ProjectActions";
import { RecommendedTalents } from "@/components/dashboard/builder/RecommendedTalents";
import { NetworkList } from "@/components/dashboard/builder/NetworkList";
import { ManageReviewsRecommendations } from "@/components/dashboard/ManageReviewsRecommendations";
import { Search, BarChart } from "lucide-react";

export function BuilderDashboard() {
  const location = useLocation();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { currentUser } = useAuth();
  const { projects, loading } = useProjects({
    excludeCurrentUser: true,
    userId: currentUser?.uid
  });
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    if (location.state?.openProjectModal) {
      setShowProjectModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (projects.length > 0) {
      const shuffled = [...projects].sort(() => 0.5 - Math.random());
      setRecommendedProjects(shuffled.slice(0, 3));
    }
  }, [projects]);

  return (
    <div className="flex flex-col lg:flex-row gap-24 w-full max-w-[2000px] mx-auto">
      {/* Left column (wider) */}
      <div className="lg:w-3/5 space-y-12">
        {/* Overview section */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            Your Overview
          </h2>
          <DashboardOverview role="builder" />
        </div>

        {/* Project actions section */}
        <ProjectActions 
          showProjectModal={showProjectModal} 
          setShowProjectModal={setShowProjectModal} 
        />

        {/* Active Projects section */}
        <DashboardProjects />
        
        {/* Projects Deadlines and Milestones */}
        <ProjectDeadlines />
        
        {/* Project Metrics section */}
        <ProjectMetrics role="builder" />
        
        {/* Recommended Talents section */}
        <RecommendedTalents />
        
        {/* Learning Resources section */}
        <LearningResources />
        
        {/* Skills Progress section - Moved from right column */}
        <SkillsProgress />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-2/5 space-y-12">
        {/* Review Applications */}
        <ReviewApplications />
        
        {/* Messages section */}
        <DashboardMessages />
        
        {/* Network section */}
        <NetworkList />
        
        {/* Manage Reviews section - Moved from left column */}
        <ManageReviewsRecommendations role="builder" />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
    </div>
  );
}
