
import React, { useEffect, useState } from "react";
import { FileSearch } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { FilterButtons } from "./FilterButtons";
import { ProjectCard } from "./ProjectCard";
import { OpportunitiesLoading } from "./OpportunitiesLoading";
import { OpportunitiesEmpty } from "./OpportunitiesEmpty";
import { OpportunitiesError } from "./OpportunitiesError";
import { useAuth } from "@/contexts/AuthContext";

interface RecommendedOpportunitiesProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function RecommendedOpportunities({ filter, setFilter }: RecommendedOpportunitiesProps) {
  const { projects, loading, error } = useProjects();
  const [recommendations, setRecommendations] = useState<Project[]>([]);
  const { currentUser } = useAuth(); // Get the current user to filter their projects
  
  // Process projects to get recommendations
  useEffect(() => {
    if (projects.length > 0) {
      // Here we could implement a more sophisticated recommendation algorithm
      // For now, just filter open projects and add a match percentage
      const openProjects = projects
        .filter(project => project.status === "Open" && project.userId !== currentUser?.uid)
        .map(project => ({
          ...project,
          matchPercentage: Math.floor(Math.random() * (99 - 70) + 70) // Random match between 70-99%
        }))
        .sort((a, b) => ((b.matchPercentage || 0) - (a.matchPercentage || 0)))
        .slice(0, 6); // Limit to top 6 matches
        
      setRecommendations(openProjects);
    }
  }, [projects, currentUser?.uid]); // Add currentUser.uid as a dependency

  // Filter the recommendations based on location type
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
