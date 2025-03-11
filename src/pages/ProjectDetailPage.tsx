
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Tag, UserCircle, MessageSquare, ArrowLeft, Star, MapPin, Briefcase } from "lucide-react";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock project data - in a real app, you would fetch this from an API
    const projects = [
      {
        id: 1,
        title: "AI-Powered Educational Platform",
        description: "Building an interactive learning platform with personalized AI tutoring for K-12 students.",
        fullDescription: "Our vision is to revolutionize education by creating an AI-powered learning platform that adapts to each student's unique learning style, pace, and interests. The platform will use machine learning algorithms to analyze student performance and provide personalized learning paths, interactive exercises, and real-time feedback. We aim to make quality education more accessible and engaging for students of all backgrounds.",
        skills: ["React", "Machine Learning", "UI/UX Design"],
        category: "Education",
        deadline: "June 15, 2025",
        duration: "3 months",
        owner: {
          name: "Alexandra Chen",
          title: "EdTech Entrepreneur",
          location: "Boston, MA",
          bio: "Former teacher turned tech entrepreneur with a passion for making education more accessible through technology. I've been building educational products for the past 5 years and have a background in cognitive science and machine learning.",
          image: "/placeholder.svg",
          rating: 4.9,
          projectsCompleted: 7
        },
        featured: true,
        objectives: [
          "Develop a responsive web application with React frontend and Python/TensorFlow backend",
          "Create personalized learning algorithms that adapt to individual student needs",
          "Design engaging, interactive learning exercises across multiple subjects",
          "Implement a dashboard for parents and teachers to track student progress"
        ],
        timeline: [
          { phase: "Research & Planning", duration: "2 weeks" },
          { phase: "Design & Prototyping", duration: "3 weeks" },
          { phase: "Development", duration: "6 weeks" },
          { phase: "Testing & Refinement", duration: "2 weeks" },
        ]
      },
      {
        id: 2,
        title: "Health and Wellness Mobile App",
        description: "Creating a holistic wellness app that combines fitness tracking with mental health resources.",
        fullDescription: "We're developing a comprehensive health and wellness mobile application that seamlessly integrates physical fitness tracking with mental health support. Our goal is to create a holistic approach to wellbeing that acknowledges the interconnectedness of physical and mental health. The app will combine activity tracking, nutrition guidance, meditation sessions, mood monitoring, and access to professional resources, all within a supportive community environment.",
        skills: ["React Native", "Firebase", "Health APIs"],
        category: "Health",
        deadline: "May 20, 2025",
        duration: "2 months",
        owner: {
          name: "Marcus Johnson",
          title: "Health Tech Developer",
          location: "San Diego, CA",
          bio: "Software engineer with a background in healthcare and a personal passion for wellness. I've spent the last decade building digital health solutions that have helped thousands of people live healthier lives.",
          image: "/placeholder.svg",
          rating: 4.8,
          projectsCompleted: 5
        },
        featured: false,
        objectives: [
          "Build a cross-platform mobile app using React Native",
          "Integrate with health tracking APIs for activity and biometric monitoring",
          "Develop a content library of guided meditations and mental health resources",
          "Create a secure, privacy-focused user experience"
        ],
        timeline: [
          { phase: "UX Research", duration: "2 weeks" },
          { phase: "UI Design", duration: "2 weeks" },
          { phase: "App Development", duration: "4 weeks" },
          { phase: "Testing & Launch", duration: "1 week" },
        ]
      },
      {
        id: 3,
        title: "Sustainable Fashion Marketplace",
        description: "Developing an e-commerce platform for eco-friendly fashion brands and second-hand clothing.",
        fullDescription: "Our project aims to create a specialized e-commerce marketplace focused exclusively on sustainable and ethical fashion. We will connect conscious consumers with eco-friendly brands, second-hand retailers, and upcycled fashion designers in one curated platform. The marketplace will feature robust verification of sustainability claims, transparent supply chain information, and educational content about sustainable fashion practices.",
        skills: ["E-commerce", "Sustainability", "Branding"],
        category: "Fashion",
        deadline: "July 30, 2025",
        duration: "4 months",
        owner: {
          name: "Sophia Patel",
          title: "Sustainable Fashion Advocate",
          location: "New York, NY",
          bio: "Fashion industry veteran with 8 years of experience in ethical fashion. I've worked with major brands on sustainability initiatives and have founded two eco-conscious fashion startups.",
          image: "/placeholder.svg",
          rating: 4.7,
          projectsCompleted: 4
        },
        featured: true,
        objectives: [
          "Design and build a user-friendly e-commerce platform",
          "Implement a verification system for sustainability claims",
          "Create a visual identity that appeals to eco-conscious consumers",
          "Develop a community feature for knowledge sharing"
        ],
        timeline: [
          { phase: "Market Research", duration: "3 weeks" },
          { phase: "Platform Design", duration: "4 weeks" },
          { phase: "Development", duration: "8 weeks" },
          { phase: "Vendor Onboarding", duration: "3 weeks" },
        ]
      }
    ];

    // Find the project with the matching ID
    const foundProject = projects.find(p => p.id === parseInt(id));
    
    // Simulate API delay
    setTimeout(() => {
      setProject(foundProject);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading project details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-8 text-gray-600">The project you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/explore")}>
              <ArrowLeft className="mr-2" size={16} />
              Back to Explore
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              className="mb-8 flex items-center gap-1 text-gray-600 hover:text-gray-900"
              onClick={() => navigate("/explore")}
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Button>

            {/* Project Header */}
            <div className="mb-12">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Tag size={16} />
                    <span>{project.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="gap-2">
                    <MessageSquare size={16} />
                    Contact Owner
                  </Button>
                  <Button variant="outline">Apply Now</Button>
                </div>
              </div>
            </div>

            {/* Main Content Area - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Project Details - Left Column (2/3) */}
              <div className="lg:col-span-2 space-y-10">
                {/* Project Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700">{project.fullDescription}</p>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Project Objectives</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {project.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Timeline</h3>
                      <div className="space-y-3">
                        {project.timeline.map((phase, index) => (
                          <div key={index} className="flex items-center justify-between pb-2 border-b border-gray-100">
                            <span className="text-gray-700">{phase.phase}</span>
                            <span className="text-gray-500 text-sm">{phase.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Key Details Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-gray-400" />
                        <div>
                          <p className="font-medium">Project Deadline</p>
                          <p className="text-sm">{project.deadline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-gray-400" />
                        <div>
                          <p className="font-medium">Estimated Duration</p>
                          <p className="text-sm">{project.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Tag size={18} className="text-gray-400" />
                        <div>
                          <p className="font-medium">Category</p>
                          <p className="text-sm">{project.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <UserCircle size={18} className="text-gray-400" />
                        <div>
                          <p className="font-medium">Posted By</p>
                          <p className="text-sm">{project.owner.name}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Owner - Right Column (1/3) */}
              <div className="space-y-6">
                {/* Project Owner Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Owner</CardTitle>
                    <CardDescription>Learn about who's behind this project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-primary/20">
                        <AvatarImage src={project.owner.image} alt={project.owner.name} />
                        <AvatarFallback>{project.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{project.owner.name}</h3>
                        <p className="text-gray-600">{project.owner.title}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{project.owner.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400" />
                        <span>Rating: {project.owner.rating}/5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-gray-400" />
                        <span>{project.owner.projectsCompleted} projects completed</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Bio</h4>
                      <p className="text-gray-700 text-sm">{project.owner.bio}</p>
                    </div>
                    
                    <Button className="w-full gap-2">
                      <MessageSquare size={16} />
                      Contact {project.owner.name.split(' ')[0]}
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Related Actions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Save to Favorites
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Share Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Report Project
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
