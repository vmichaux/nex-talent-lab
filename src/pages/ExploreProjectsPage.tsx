
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";
import { PageHeader } from "@/components/explore/PageHeader";
import { SearchBar } from "@/components/explore/SearchBar";
import { ProjectTabs } from "@/components/explore/ProjectTabs";

const ExploreProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { projects, loading, error } = useProjects();
  
  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.category?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 py-[62px] px-[44px] my-0">
              <PageHeader 
                subtitle="Explore Projects" 
                title="Find Your Next Collaborative Adventure" 
                description="Browse through exciting projects seeking your skills and expertise. Connect with like-minded innovators." 
              />
            </div>

            {/* Search and Filter Section */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-600">Loading projects...</span>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{typeof error === 'object' && error !== null ? (error as Error).message : String(error)}</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded">Try Again</button>
              </div>
            )}

            {/* Project Tabs */}
            {!loading && !error && (
              <ProjectTabs 
                projects={projects} 
                filteredProjects={filteredProjects} 
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreProjectsPage;
