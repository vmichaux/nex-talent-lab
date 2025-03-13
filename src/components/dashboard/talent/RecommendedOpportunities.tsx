
import React, { useEffect, useState } from "react";
import { FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendedOpportunitiesProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function RecommendedOpportunities({ filter, setFilter }: RecommendedOpportunitiesProps) {
  const { projects, loading, error } = useProjects();
  const [recommendations, setRecommendations] = useState<Project[]>([]);
  
  // Process projects to get recommendations
  useEffect(() => {
    if (projects.length > 0) {
      // Here we could implement a more sophisticated recommendation algorithm
      // For now, just filter open projects and add a match percentage
      const openProjects = projects
        .filter(project => project.status === "Open")
        .map(project => ({
          ...project,
          matchPercentage: Math.floor(Math.random() * (99 - 70) + 70) // Random match between 70-99%
        }))
        .sort((a, b) => ((b.matchPercentage || 0) - (a.matchPercentage || 0)))
        .slice(0, 6); // Limit to top 6 matches
        
      setRecommendations(openProjects);
    }
  }, [projects]);

  // Filter the recommendations based on location type
  const filteredRecommendations = recommendations.filter(project => {
    if (filter === "all") return true;
    return project.location?.toLowerCase() === filter.toLowerCase();
  });

  // Show loading state
  if (loading) {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-primary" />
            Recommended Opportunities
          </h2>
          
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-3 w-full">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex flex-wrap gap-2 my-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-8 w-24 rounded-full mb-2" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-primary" />
            Recommended Opportunities
          </h2>
        </div>
        <Card className="p-6 text-center">
          <p className="text-red-500">Error loading project recommendations.</p>
          <p>Please try again later.</p>
        </Card>
      </div>
    );
  }

  // Show empty state
  if (filteredRecommendations.length === 0) {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-primary" />
            Recommended Opportunities
          </h2>
          
          <div className="flex space-x-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "remote" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("remote")}
            >
              Remote
            </Button>
            <Button 
              variant={filter === "hybrid" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("hybrid")}
            >
              Hybrid
            </Button>
          </div>
        </div>
        
        <Card className="p-8 text-center">
          <FileSearch className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
          <p className="text-gray-500 mb-4">
            {filter !== "all" 
              ? `No ${filter} opportunities match your profile yet.` 
              : "No opportunities match your profile yet."}
          </p>
          <Button onClick={() => setFilter("all")}>Show All Opportunities</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileSearch className="h-5 w-5 text-primary" />
          Recommended Opportunities
        </h2>
        
        <div className="flex space-x-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={filter === "remote" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("remote")}
          >
            Remote
          </Button>
          <Button 
            variant={filter === "hybrid" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("hybrid")}
          >
            Hybrid
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.owner} • {project.location || "Location not specified"}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills?.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Duration: {project.duration || "Not specified"}
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {project.matchPercentage || 85}% Match
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = `/project/${project.id}`}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
