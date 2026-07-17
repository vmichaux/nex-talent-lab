
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { DashboardNotifications } from "@/components/dashboard/DashboardNotifications";

interface BuilderDashboardProps {
  showProjectModal?: boolean;
  setShowProjectModal?: (show: boolean) => void;
}

export function BuilderDashboard({ 
  showProjectModal = false, 
  setShowProjectModal = () => {} 
}: BuilderDashboardProps) {
  const location = useLocation();
  const [internalShowProjectModal, setInternalShowProjectModal] = useState(false);

  // Use either the props or internal state
  const modalOpen = showProjectModal || internalShowProjectModal;
  const setModalOpen = (show: boolean) => {
    setShowProjectModal(show);
    setInternalShowProjectModal(show);
  };
  
  useEffect(() => {
    if (location.state?.openProjectModal) {
      setModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="flex flex-col lg:flex-row gap-24 w-full max-w-[2000px] mx-auto">
      {/* Left column (wider) */}
      <div className="lg:w-3/5 space-y-16">
        {/* Overview section */}
        <div>
          <h2 className="font-semibold category-title-gradient text-3xl mb-4">
            Your Overview
          </h2>
          <DashboardOverview role="builder" />
        </div>

        {/* Project actions section */}
        <ProjectActions 
          showProjectModal={modalOpen} 
          setShowProjectModal={setModalOpen} 
        />

        {/* Active Projects section */}
        <DashboardProjects />
        
        {/* Projects Deadlines and Milestones */}
        <ProjectDeadlines />
        
        {/* Project Metrics section */}
        <ProjectMetrics role="builder" />
        
        {/* Recommended Talents section */}
        <RecommendedTalents />
        
        {/* Skills Progress section - Moved above Learning Resources */}
        <SkillsProgress />
        
        {/* Learning Resources section */}
        <LearningResources />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-2/5 space-y-16">
        {/* Notifications section - Added at the top */}
        <DashboardNotifications />
        
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
