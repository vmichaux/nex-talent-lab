import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, Clock, UserCircle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";

const ExploreProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 py-[64px]">
              <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Explore Projects
              </div>
              
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                Find Your Next Collaborative Adventure
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                Browse through exciting projects seeking your skills and expertise. Connect with like-minded innovators.
              </p>
            </div>

            <div className="mb-10">
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search projects by keyword, skill, or category..." 
                    className="pl-10 h-12" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2 h-12 px-6">
                  <Filter size={16} />
                  Filters
                </Button>
              </div>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-600">Loading projects...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            )}

            {!loading && !error && (
              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="mb-8 mx-auto flex justify-center">
                  <TabsTrigger value="all">All Projects ({filteredProjects.length})</TabsTrigger>
                  <TabsTrigger value="featured">Featured ({filteredProjects.filter(p => p.featured).length})</TabsTrigger>
                  <TabsTrigger value="recent">Recently Added ({Math.min(filteredProjects.length, 4)})</TabsTrigger>
                  <TabsTrigger value="urgent">Urgent Needs ({filteredProjects.filter(p => p.status === "Urgent").length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)
                  ) : (
                    <div className="col-span-3 text-center py-20">
                      <p className="text-gray-500 mb-4">No projects found. Try adjusting your search criteria.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="featured" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.filter(p => p.featured).length > 0 ? (
                    filteredProjects.filter(p => p.featured).map(project => <ProjectCard key={project.id} project={project} />)
                  ) : (
                    <div className="col-span-3 text-center py-20">
                      <p className="text-gray-500 mb-4">No featured projects found.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="recent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.slice(0, 4).map(project => <ProjectCard key={project.id} project={project} />)
                  ) : (
                    <div className="col-span-3 text-center py-20">
                      <p className="text-gray-500 mb-4">No recent projects found.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="urgent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.filter(p => p.status === "Urgent").length > 0 ? (
                    filteredProjects.filter(p => p.status === "Urgent").map(project => <ProjectCard key={project.id} project={project} />)
                  ) : (
                    <div className="col-span-3 text-center py-20">
                      <p className="text-gray-500 mb-4">No urgent projects found.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/project/${project.id}`);
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4 space-y-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <div className="flex gap-2">
            {project.featured && <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Featured
              </Badge>}
            {project.status === "Urgent" && <Badge variant="destructive">Urgent</Badge>}
          </div>
        </div>
        <CardDescription className="text-gray-600">{project.category}</CardDescription>
      </CardHeader>
      <CardContent className="py-4 flex-1 space-y-5">
        <p className="text-sm text-gray-700">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill, index) => <Badge key={index} variant="outline" className="bg-gray-50">
              {skill}
            </Badge>)}
        </div>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span>Deadline: {project.deadline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span>Duration: {project.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCircle size={16} className="text-gray-400" />
            <span>Posted by: {project.owner}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-gray-400" />
            <span>{project.applicants} applicants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button className="w-full">Apply Now</Button>
        <Button variant="outline" className="w-full" onClick={handleViewDetails}>Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ExploreProjectsPage;
