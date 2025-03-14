
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { FilterButtons } from "./FilterButtons";
import { ProjectCard } from "./ProjectCard";
import { OpportunitiesLoading } from "./OpportunitiesLoading";
import { OpportunitiesEmpty } from "./OpportunitiesEmpty";
import { OpportunitiesError } from "./OpportunitiesError";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RecommendedOpportunitiesProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function RecommendedOpportunities({ filter, setFilter }: RecommendedOpportunitiesProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects({
    excludeCurrentUser: true,
    userId: currentUser?.uid
  });
  const [recommendations, setRecommendations] = useState<Project[]>([]);
  
  useEffect(() => {
    if (projects.length > 0) {
      const openProjects = projects
        .filter(project => project.status === "Open")
        .map(project => ({
          ...project,
          matchPercentage: Math.floor(Math.random() * (99 - 70) + 70)
        }))
        .sort((a, b) => ((b.matchPercentage || 0) - (a.matchPercentage || 0)))
        .slice(0, 6);
        
      setRecommendations(openProjects);
    }
  }, [projects]);

  const filteredRecommendations = recommendations.filter(project => {
    if (filter === "all") return true;
    return project.location?.toLowerCase() === filter.toLowerCase();
  });

  // Only show 2 items instead of 4
  const displayedRecommendations = filteredRecommendations.slice(0, 2);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold category-title-gradient text-3xl">
          Recommended Opportunities
        </h2>
        
        <div className="flex items-center gap-4">
          <FilterButtons filter={filter} setFilter={setFilter} />
          <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/explore-projects')}>
            View All <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {loading ? (
        <OpportunitiesLoading />
      ) : error ? (
        <OpportunitiesError />
      ) : displayedRecommendations.length === 0 ? (
        <OpportunitiesEmpty filter={filter} setFilter={setFilter} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayedRecommendations.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
