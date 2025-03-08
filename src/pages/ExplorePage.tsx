import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, UserCircle, Calendar, Clock, Tag } from "lucide-react";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock project data for display purposes
  const projects = [
    {
      id: 1,
      title: "AI-Powered Educational Platform",
      description: "Building an interactive learning platform with personalized AI tutoring for K-12 students.",
      skills: ["React", "Machine Learning", "UI/UX Design"],
      category: "Education",
      deadline: "June 15, 2025",
      duration: "3 months",
      owner: "Alexandra Chen",
      featured: true
    },
    {
      id: 2,
      title: "Health and Wellness Mobile App",
      description: "Creating a holistic wellness app that combines fitness tracking with mental health resources.",
      skills: ["React Native", "Firebase", "Health APIs"],
      category: "Health",
      deadline: "May 20, 2025",
      duration: "2 months",
      owner: "Marcus Johnson",
      featured: false
    },
    {
      id: 3,
      title: "Sustainable Fashion Marketplace",
      description: "Developing an e-commerce platform for eco-friendly fashion brands and second-hand clothing.",
      skills: ["E-commerce", "Sustainability", "Branding"],
      category: "Fashion",
      deadline: "July 30, 2025",
      duration: "4 months",
      owner: "Sophia Patel",
      featured: true
    },
    {
      id: 4,
      title: "Smart Home Integration System",
      description: "Creating a central hub to connect and control various smart home devices regardless of manufacturer.",
      skills: ["IoT", "API Integration", "Embedded Systems"],
      category: "Technology",
      deadline: "August 5, 2025",
      duration: "3 months",
      owner: "David Wilson",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-12 md:py-16 max-w-6xl">
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Explore Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover innovative projects seeking talented collaborators or find your next creative challenge.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search projects by keyword, skill, or category..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 h-12 px-6">
              <Filter size={16} />
              Filters
            </Button>
          </div>
        </div>

        {/* Project Categories Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-8 mx-auto flex justify-center">
            <TabsTrigger value="all" className="px-6">All Projects</TabsTrigger>
            <TabsTrigger value="featured" className="px-6">Featured</TabsTrigger>
            <TabsTrigger value="recent" className="px-6">Recently Added</TabsTrigger>
            <TabsTrigger value="closing" className="px-6">Closing Soon</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
          
          <TabsContent value="featured" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => p.featured).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
          
          <TabsContent value="recent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Show only the last 2 projects for "recent" tab */}
            {projects.slice(-2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
          
          <TabsContent value="closing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Show only the first 2 projects for "closing soon" tab */}
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4 space-y-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          {project.featured && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription className="text-gray-600">{project.category}</CardDescription>
      </CardHeader>
      <CardContent className="py-4 flex-1 space-y-5">
        <p className="text-sm text-gray-700">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {skill}
            </Badge>
          ))}
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
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ExplorePage;
