import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, MessageSquare, Calendar, ArrowRight, Clock, MapPin } from "lucide-react";
import { DashboardWelcome } from "@/components/DashboardWelcome";

// Sample data for projects
const projects = [
  {
    id: 1,
    title: "Eco-Friendly Mobile App",
    description: "A mobile application that helps users track and reduce their carbon footprint.",
    progress: 65,
    deadline: "June 15, 2025",
    status: "In Progress",
    collaborators: 3
  },
  {
    id: 2,
    title: "Community Garden Platform",
    description: "Web platform connecting urban gardeners with available land and resources.",
    progress: 30,
    deadline: "August 20, 2025",
    status: "Planning",
    collaborators: 5
  },
  {
    id: 3,
    title: "Educational VR Experience",
    description: "Virtual reality modules for high school science curriculum.",
    progress: 85,
    deadline: "May 10, 2025",
    status: "Final Review",
    collaborators: 4
  }
];

// Sample data for messages
const messages = [
  {
    id: 1,
    sender: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg",
      initials: "EW"
    },
    preview: "I've uploaded the design files for the eco app. Let me know what you think!",
    timestamp: "2 hours ago",
    unread: true,
    project: "Eco-Friendly Mobile App"
  },
  {
    id: 2,
    sender: {
      name: "Marcus Rivera",
      avatar: "/placeholder.svg",
      initials: "MR"
    },
    preview: "Can we schedule a call to discuss the garden platform timeline?",
    timestamp: "Yesterday",
    unread: false,
    project: "Community Garden Platform"
  },
  {
    id: 3,
    sender: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg",
      initials: "SC"
    },
    preview: "The VR simulations are ready for testing. Would you like to try them out?",
    timestamp: "2 days ago",
    unread: true,
    project: "Educational VR Experience"
  }
];

// Sample data for events
const events = [
  {
    id: 1,
    title: "Project Kickoff: Eco App",
    date: "May 5, 2025",
    time: "10:00 AM - 11:30 AM",
    location: "Virtual Meeting",
    attendees: 8
  },
  {
    id: 2,
    title: "Design Workshop",
    date: "May 12, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Innovation Hub, Floor 3",
    attendees: 12
  },
  {
    id: 3,
    title: "Community Garden Volunteer Day",
    date: "May 20, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Riverside Park",
    attendees: 25
  }
];

const DashboardPage = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    
    // In a real app, you would check if the user is new or has completed onboarding
    // For now, we're using a state to toggle between views
    // You could use localStorage or a database flag in production
    
    // Example: Check if user has a complete profile
    // if (currentUser?.hasCompletedProfile) {
    //   setShowWelcome(false);
    // }
  }, [isLoggedIn, navigate, currentUser]);

  // Toggle function for demo purposes - in real app would be based on profile completion
  const handleCompleteOnboarding = () => {
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {showWelcome ? (
          <>
            <DashboardWelcome />
            {/* For demo purposes only - allows toggling between views */}
            <div className="text-center mb-10">
              <Button 
                variant="outline" 
                onClick={handleCompleteOnboarding}
                className="mx-auto"
              >
                Skip to Dashboard
              </Button>
            </div>
          </>
        ) : (
          <div className="relative overflow-hidden bg-white">
            {/* Background Pattern - Purple Gradient */}
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
            
            <div className="container mx-auto px-4 py-12">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
                <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Dashboard
                </div>
                
                <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                  Manage Your Activities
                </h1>
                
                <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                  Track your projects, connections, and activities all in one place.
                </p>
              </div>

              {/* Dashboard overview stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Projects</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{projects.length}</div>
                    <p className="text-sm text-muted-foreground">Active projects</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Messages</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{messages.filter(m => m.unread).length}</div>
                    <p className="text-sm text-muted-foreground">Unread messages</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Events</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{events.length}</div>
                    <p className="text-sm text-muted-foreground">Upcoming events</p>
                  </CardContent>
                </Card>
              </div>

              {/* Projects section */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Active Projects
                  </h2>
                  <Button variant="outline" className="gap-1" onClick={() => navigate('/explore-projects')}>
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-600">
                            <Clock className="inline-block h-3 w-3 mr-1" />
                            Due: {project.deadline}
                          </div>
                          <Badge className={
                            project.status === "In Progress" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                            project.status === "Planning" ? "bg-purple-100 text-purple-800 hover:bg-purple-100" :
                            "bg-green-100 text-green-800 hover:bg-green-100"
                          }>
                            {project.status}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="default" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Messages section */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Recent Messages
                  </h2>
                  <Button variant="outline" className="gap-1" onClick={() => navigate('/messages')}>
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${message.unread ? 'bg-primary/5' : ''}`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                          <AvatarFallback>{message.sender.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium flex items-center gap-2">
                              {message.sender.name}
                              {message.unread && <span className="w-2 h-2 bg-primary rounded-full inline-block"></span>}
                            </div>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                          {message.project && (
                            <div className="mt-1">
                              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                                {message.project}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Events section */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                  </h2>
                  <Button variant="outline" className="gap-1" onClick={() => navigate('/community')}>
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {event.attendees} attendees
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
