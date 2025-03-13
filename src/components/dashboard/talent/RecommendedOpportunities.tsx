import React, { useEffect, useState } from "react";
import { FileSearch } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { FilterButtons } from "./FilterButtons";
import { ProjectCard } from "./ProjectCard";
import { OpportunitiesLoading } from "./OpportunitiesLoading";
import { OpportunitiesEmpty } from "./OpportunitiesEmpty";
import { OpportunitiesError } from "./OpportunitiesError";
import { useAuth } from "@/hooks/use-auth";

interface RecommendedOpportunitiesProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function RecommendedOpportunities({ filter, setFilter }: RecommendedOpportunitiesProps) {
  const { currentUser } = useAuth();
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

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileSearch className="h-5 w-5 text-primary" />
          Recommended Opportunities
        </h2>
        
        <FilterButtons filter={filter} setFilter={setFilter} />
      </div>
      
      {loading ? (
        <OpportunitiesLoading />
      ) : error ? (
        <OpportunitiesError />
      ) : filteredRecommendations.length === 0 ? (
        <OpportunitiesEmpty filter={filter} setFilter={setFilter} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommendations.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
