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
  const { projects: firebaseProjects, loading, error } = useProjects();

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  // Filter projects based on search query
  const filteredProjects = firebaseProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // If there are no projects from Firebase, use our backup mock data
  const projects = filteredProjects.length > 0 ? filteredProjects : [
    {
      id: 1,
      title: "AI-Powered Educational Platform",
      description: "Building an interactive learning platform with personalized AI tutoring for K-12 students.",
      skills: ["React", "Machine Learning", "UI/UX Design"],
      category: "Education",
      deadline: "June 15, 2025",
      duration: "3 months",
      owner: "Alexandra Chen",
      featured: true,
      status: "Open",
      applicants: 7,
      createdAt: new Date()
    }, {
      id: 2,
      title: "Health and Wellness Mobile App",
      description: "Creating a holistic wellness app that combines fitness tracking with mental health resources.",
      skills: ["React Native", "Firebase", "Health APIs"],
      category: "Health",
      deadline: "May 20, 2025",
      duration: "2 months",
      owner: "Marcus Johnson",
      featured: false,
      status: "Open",
      applicants: 4,
      createdAt: new Date()
    }, {
      id: 3,
      title: "Sustainable Fashion Marketplace",
      description: "Developing an e-commerce platform for eco-friendly fashion brands and second-hand clothing.",
      skills: ["E-commerce", "Sustainability", "Branding"],
      category: "Fashion",
      deadline: "July 30, 2025",
      duration: "4 months",
      owner: "Sophia Patel",
      featured: true,
      status: "Open",
      applicants: 12,
      createdAt: new Date()
    }, {
      id: 4,
      title: "Smart Home Integration System",
      description: "Creating a central hub to connect and control various smart home devices regardless of manufacturer.",
      skills: ["IoT", "API Integration", "Embedded Systems"],
      category: "Technology",
      deadline: "August 5, 2025",
      duration: "3 months",
      owner: "David Wilson",
      featured: false,
      status: "Urgent",
      applicants: 3,
      createdAt: new Date()
    }, {
      id: 5,
      title: "Community Garden Management Tool",
      description: "Building a platform to help urban communities organize and manage shared garden spaces and resources.",
      skills: ["Full Stack", "Mapping APIs", "Community Engagement"],
      category: "Environment",
      deadline: "September 15, 2025",
      duration: "2 months",
      owner: "Elena Rodriguez",
      featured: true,
      status: "Open",
      applicants: 9,
      createdAt: new Date()
    }, {
      id: 6,
      title: "Accessible Gaming Experience",
      description: "Designing an inclusive gaming platform with customizable interfaces for players with different abilities.",
      skills: ["Game Development", "Accessibility", "UX Research"],
      category: "Gaming",
      deadline: "October 10, 2025",
      duration: "5 months",
      owner: "Michael Kim",
      featured: false,
      status: "Open",
      applicants: 6,
      createdAt: new Date()
    }, {
      id: 7,
      title: "Cloud-Based Data Analytics Platform",
      description: "Developing a platform that helps small businesses leverage big data without requiring technical expertise.",
      skills: ["Cloud Architecture", "Data Visualization", "Machine Learning"],
      category: "Business",
      deadline: "July 25, 2025",
      duration: "4 months",
      owner: "Sarah Thompson",
      featured: true,
      status: "Open",
      applicants: 8,
      createdAt: new Date()
    }, {
      id: 8,
      title: "Peer-to-Peer Language Learning App",
      description: "Creating an application that connects language learners for real-time practice and cultural exchange.",
      skills: ["Mobile Development", "WebRTC", "UX Design"],
      category: "Education",
      deadline: "August 30, 2025",
      duration: "3 months",
      owner: "Carlos Mendez",
      featured: false,
      status: "Urgent",
      applicants: 5,
      createdAt: new Date()
    }, {
      id: 9,
      title: "Renewable Energy Monitoring System",
      description: "Building an IoT solution to track and optimize energy generation from solar and wind installations.",
      skills: ["IoT", "Data Science", "Embedded Systems"],
      category: "Energy",
      deadline: "September 10, 2025",
      duration: "4 months",
      owner: "Liu Wei",
      featured: true,
      status: "Open",
      applicants: 10,
      createdAt: new Date()
    }, {
      id: 10,
      title: "Virtual Reality Therapy Platform",
      description: "Developing therapeutic VR experiences for anxiety, PTSD, and phobia treatment in clinical settings.",
      skills: ["Unity3D", "VR/AR", "Healthcare"],
      category: "Healthcare",
      deadline: "October 5, 2025",
      duration: "6 months",
      owner: "Emily Jacobs",
      featured: false,
      status: "Open",
      applicants: 7,
      createdAt: new Date()
    }, {
      id: 11,
      title: "Blockchain Supply Chain Tracker",
      description: "Creating a transparent system to verify product origins and authenticity using blockchain technology.",
      skills: ["Blockchain", "Smart Contracts", "Full Stack"],
      category: "Technology",
      deadline: "August 20, 2025",
      duration: "5 months",
      owner: "Hassan Ahmed",
      featured: true,
      status: "Open",
      applicants: 11,
      createdAt: new Date()
    }, {
      id: 12,
      title: "Urban Mobility Analytics Platform",
      description: "Building a system to help cities optimize public transportation based on real-time movement data.",
      skills: ["Data Science", "GIS", "Urban Planning"],
      category: "Smart City",
      deadline: "September 25, 2025",
      duration: "4 months",
      owner: "Priya Sharma",
      featured: false,
      status: "Urgent",
      applicants: 6,
      createdAt: new Date()
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern */}
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

            {/* Search and Filter Section */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input type="text" placeholder="Search projects by keyword, skill, or category..." className="pl-10 h-12" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <Button variant="outline" className="flex items-center gap-2 h-12 px-6">
                  <Filter size={16} />
                  Filters
                </Button>
              </div>
            </div>

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
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            )}

            {/* Project Categories Tabs */}
            {!loading && !error && (
              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="mb-8 mx-auto flex justify-center">
                  <TabsTrigger value="all" className="px-6">All Projects</TabsTrigger>
                  <TabsTrigger value="featured" className="px-6">Featured</TabsTrigger>
                  <TabsTrigger value="recent" className="px-6">Recently Added</TabsTrigger>
                  <TabsTrigger value="urgent" className="px-6">Urgent Needs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map(project => <ProjectCard key={project.id} project={project} />)}
                </TabsContent>
                
                <TabsContent value="featured" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.filter(p => p.featured).map(project => <ProjectCard key={project.id} project={project} />)}
                </TabsContent>
                
                <TabsContent value="recent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Show only the last 4 projects for "recent" tab */}
                  {projects.slice(0, 4).map(project => <ProjectCard key={project.id} project={project} />)}
                </TabsContent>
                
                <TabsContent value="urgent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.filter(p => p.status === "Urgent").map(project => <ProjectCard key={project.id} project={project} />)}
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

// Project Card Component
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
