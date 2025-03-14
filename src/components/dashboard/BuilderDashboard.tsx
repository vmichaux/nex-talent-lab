
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
    <div className="flex flex-col lg:flex-row gap-12 w-full max-w-[1800px] mx-auto">
      {/* Left column (wider) */}
      <div className="lg:w-2/3 space-y-20">
        {/* Overview section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Your Overview</h2>
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
        
        {/* Recommended Talents section */}
        <RecommendedTalents />
        
        {/* Project Metrics section */}
        <ProjectMetrics role="builder" />
        
        {/* Learning Resources section */}
        <LearningResources />
        
        {/* Project History section */}
        <ProjectHistory />
      </div>
      
      {/* Right column (narrower) */}
      <div className="lg:w-1/3 space-y-20">
        {/* Review Applications */}
        <ReviewApplications />
        
        {/* Messages section */}
        <DashboardMessages />
        
        {/* Network section */}
        <NetworkList />
        
        {/* Skills Progress section */}
        <SkillsProgress />
      </div>
    </div>
  );
}
