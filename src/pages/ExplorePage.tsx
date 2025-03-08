
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, UserCircle, Calendar, Clock, Tag } from "lucide-react";

// Category colors mapping
const categoryColors = {
  "Education": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  "Health": { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  "Fashion": { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  "Technology": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" }
};

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-16 md:py-24 max-w-6xl">
        <div className="mb-16 md:mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 gradient-text">Explore Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover innovative projects seeking talented collaborators or find your next creative challenge.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-5 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
              <Input
                type="text"
                placeholder="Search projects by keyword, skill, or category..."
                className="pl-12 h-14 rounded-full border-gray-200 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 h-14 px-8 rounded-full border-2 border-primary/20 text-primary hover:bg-primary/5">
              <Filter size={18} />
              Filters
            </Button>
          </div>
        </div>

        {/* Project Categories Tabs */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="mb-12 mx-auto flex justify-center space-x-4 bg-transparent h-auto p-1">
            <TabsTrigger value="all" className="px-8 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">All Projects</TabsTrigger>
            <TabsTrigger value="featured" className="px-8 py-3 rounded-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Featured</TabsTrigger>
            <TabsTrigger value="recent" className="px-8 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Recently Added</TabsTrigger>
            <TabsTrigger value="closing" className="px-8 py-3 rounded-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Closing Soon</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
          
          <TabsContent value="featured" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.filter(p => p.featured).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
          
          <TabsContent value="recent" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Show only the last 2 projects for "recent" tab */}
            {projects.slice(-2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
          
          <TabsContent value="closing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
  const categoryStyle = categoryColors[project.category] || { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 border-t-4 rounded-xl" 
          style={{ borderTopColor: project.category === "Education" ? "#3b82f6" : 
                                    project.category === "Health" ? "#10b981" : 
                                    project.category === "Fashion" ? "#8b5cf6" : 
                                    project.category === "Technology" ? "#f59e0b" : "#9ca3af" }}>
      <CardHeader className="pb-4 space-y-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-gray-800">{project.title}</CardTitle>
          {project.featured && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 border border-purple-200">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription>
          <Badge variant="outline" className={`${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} font-medium`}>
            {project.category}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4 flex-1 space-y-6">
        <p className="text-sm text-gray-700">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border border-blue-100">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <span>Deadline: <span className="font-medium text-gray-700">{project.deadline}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-secondary" />
            <span>Duration: <span className="font-medium text-gray-700">{project.duration}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <UserCircle size={16} className="text-primary" />
            <span>Posted by: <span className="font-medium text-gray-700">{project.owner}</span></span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-5 border-t">
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ExplorePage;
