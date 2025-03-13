
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectTabsProps {
  projects: Project[];
  filteredProjects: Project[];
  currentUserId?: string;
}

export const ProjectTabs = ({ projects, filteredProjects, currentUserId }: ProjectTabsProps) => {
  return (
    <Tabs defaultValue="all" className="mb-8">
      <TabsList className="mb-8 mx-auto flex justify-center">
        <TabsTrigger value="all">All Projects ({filteredProjects.length})</TabsTrigger>
        <TabsTrigger value="featured">Featured ({filteredProjects.filter(p => p.featured).length})</TabsTrigger>
        <TabsTrigger value="recent">Recently Added ({Math.min(filteredProjects.length, 4)})</TabsTrigger>
        <TabsTrigger value="urgent">Urgent Needs ({filteredProjects.filter(p => p.status === "Urgent").length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              currentUserId={currentUserId}
              showActions={true}  
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500 mb-4">No projects found. Try adjusting your search criteria.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="featured" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.filter(p => p.featured).length > 0 ? (
          filteredProjects.filter(p => p.featured).map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              currentUserId={currentUserId}
              showActions={true}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500 mb-4">No featured projects found.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="recent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.slice(0, 4).map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              currentUserId={currentUserId}
              showActions={true}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500 mb-4">No recent projects found.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="urgent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.filter(p => p.status === "Urgent").length > 0 ? (
          filteredProjects.filter(p => p.status === "Urgent").map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              currentUserId={currentUserId}
              showActions={true}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-500 mb-4">No urgent projects found.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
