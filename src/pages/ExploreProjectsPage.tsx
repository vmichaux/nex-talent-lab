
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/explore/PageHeader";
import { SearchBar } from "@/components/explore/SearchBar";
import { ProjectTabs } from "@/components/explore/ProjectTabs";

const ExploreProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to explore projects",
        variant: "destructive"
      });
      navigate("/login");
    }
  }, [isLoggedIn, navigate, toast]);

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <PageHeader 
              subtitle="Explore Projects"
              title="Find Your Next Collaborative Adventure"
              description="Browse through exciting projects seeking your skills and expertise. Connect with like-minded innovators."
            />

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
                <p className="text-red-500 mb-4">{error.message}</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded">Try Again</button>
              </div>
            )}

            {/* Project Tabs */}
            {!loading && !error && (
              <ProjectTabs 
                projects={projects} 
                filteredProjects={filteredProjects} 
                currentUserId={currentUser?.uid} 
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
