
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { DashboardMessages } from "@/components/dashboard/DashboardMessages";
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
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";

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
          <DashboardOverview role="builder" />
        </div>

        {/* Active Projects section */}
        <DashboardProjects />
        
        {/* Projects Deadlines and Milestones */}
        <ProjectDeadlines />
        
        {/* Project Metrics section */}
        <ProjectMetrics role="builder" />
        
        {/* Skills Progress section - moved from right column */}
        <SkillsProgress />
        
        {/* Learning Resources section */}
        <LearningResources />
        
        {/* Recommended Talents section */}
        <RecommendedTalents />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-2/5 space-y-12">
        {/* Review Applications */}
        <ReviewApplications />
        
        {/* Messages section */}
        <DashboardMessages />
        
        {/* Network section */}
        <NetworkList />
        
        {/* Manage Reviews section - moved from left column */}
        <ManageReviewsRecommendations role="builder" />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
    </div>
  );
}
