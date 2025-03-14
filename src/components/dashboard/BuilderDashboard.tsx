
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
    <div className="space-y-16">
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
      
      {/* Review Applications */}
      <ReviewApplications />
      
      {/* Project Metrics section */}
      <ProjectMetrics role="builder" />
      
      {/* Messages section */}
      <DashboardMessages />
      
      {/* Recommended Talent section */}
      <RecommendedTalents />
      
      {/* Project History section */}
      <ProjectHistory />
      
      {/* Skills Progress section */}
      <SkillsProgress />
      
      {/* Learning Resources section */}
      <LearningResources />
    </div>
  );
}
