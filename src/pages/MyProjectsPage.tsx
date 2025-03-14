
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";
import { SearchBar } from "@/components/explore/SearchBar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/explore/ProjectCard";
import { useState } from "react";
import { Project } from "@/types/project";

const MyProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const {
    isLoggedIn,
    currentUser
  } = useAuth();
  const navigate = useNavigate();
  const {
    userProjects,
    userProjectsLoading,
    userProjectsError,
    getUserProjects
  } = useProjects();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      toast.error("Authentication required", {
        description: "Please sign in to view your projects",
        duration: 6000
      });
      navigate("/login");
      return;
    }

    // Fetch only the current user's projects
    const fetchUserProjects = async () => {
      if (!currentUser?.uid) return;
      await getUserProjects(currentUser.uid);
    };

    fetchUserProjects();
  }, [isLoggedIn, navigate, currentUser, getUserProjects]);

  // Filter projects based on search query
  useEffect(() => {
    if (userProjects.length > 0) {
      const filtered = userProjects.filter(project => 
        project.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.category?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects([]);
    }
  }, [searchQuery, userProjects]);

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
            <Button 
              variant="ghost" 
              className="mb-8 flex items-center gap-2" 
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>

            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-3xl font-bold">My Projects</h1>
            </div>

            {/* Search and Filter Section */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Loading state */}
            {userProjectsLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-600">Loading your projects...</span>
              </div>
            )}

            {/* Error state */}
            {userProjectsError && (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{userProjectsError}</p>
                <Button onClick={() => getUserProjects(currentUser?.uid || '')} className="px-4 py-2 bg-primary text-white rounded">Try Again</Button>
              </div>
            )}

            {/* Projects grid */}
            {!userProjectsLoading && !userProjectsError && (
              <div className="mt-8">
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        currentUserId={currentUser?.uid}
                        showActions={true}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>No Projects Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {searchQuery ? (
                        <p>No projects match your search criteria. Try adjusting your search.</p>
                      ) : (
                        <p>You haven't created any projects yet.</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => navigate('/dashboard', { state: { openProjectModal: true } })}>
                        Create a Project
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyProjectsPage;
