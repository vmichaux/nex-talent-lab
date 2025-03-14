import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export const ProjectsSection = ({ projects, loading, error, searchQuery }: ProjectsSectionProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  const filteredProjects = projects.filter(project => 
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewProjectDetails = () => {
    navigate("/explore-projects");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <Tabs defaultValue="all" className="mb-24">
      <TabsList className="mb-8 mx-auto flex justify-center">
        <TabsTrigger value="all" className="px-6">All Projects</TabsTrigger>
        <TabsTrigger value="featured" className="px-6">Featured</TabsTrigger>
        <TabsTrigger value="recent" className="px-6">Recently Added</TabsTrigger>
        <TabsTrigger value="closing" className="px-6">Closing Soon</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.slice(0, 6).map(project => (
            <ProjectCard key={project.id} project={project} onClick={handleViewProjectDetails} />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500 mb-4">No projects found. Try adjusting your search criteria.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="featured" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.filter(p => p.featured).length > 0 ? (
          filteredProjects.filter(p => p.featured).slice(0, 6).map(project => (
            <ProjectCard key={project.id} project={project} onClick={handleViewProjectDetails} />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500 mb-4">No featured projects found.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="recent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.slice(0, 3).map(project => (
            <ProjectCard key={project.id} project={project} onClick={handleViewProjectDetails} />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500 mb-4">No recent projects found.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="closing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.slice(0, 3).map(project => (
            <ProjectCard key={project.id} project={project} onClick={handleViewProjectDetails} />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500 mb-4">No closing soon projects found.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
