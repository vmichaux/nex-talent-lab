
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, User, MessageSquare, BookOpen, Globe, Calendar } from "lucide-react";

// Fake community data
const communityGroups = [
  {
    id: 1,
    name: "Web Developers",
    members: 1243,
    description: "A community for web developers to share knowledge, resources, and collaborate on projects.",
    category: "Development",
    activity: "Very Active",
    icon: <Globe className="h-8 w-8 text-primary" />
  },
  {
    id: 2,
    name: "UI/UX Designers",
    members: 876,
    description: "Connect with designers focused on creating beautiful and functional user interfaces.",
    category: "Design",
    activity: "Active",
    icon: <Users className="h-8 w-8 text-primary" />
  },
  {
    id: 3,
    name: "Mobile App Developers",
    members: 651,
    description: "Discussion and collaboration for iOS, Android, and cross-platform app developers.",
    category: "Development",
    activity: "Moderate",
    icon: <BookOpen className="h-8 w-8 text-primary" />
  },
  {
    id: 4,
    name: "Freelancers Hub",
    members: 1892,
    description: "Support network for independent professionals, focused on business growth and client acquisition.",
    category: "Business",
    activity: "Very Active",
    icon: <User className="h-8 w-8 text-primary" />
  },
  {
    id: 5,
    name: "AI & Machine Learning",
    members: 723,
    description: "Explore the cutting edge of artificial intelligence and its applications in tech projects.",
    category: "Technology",
    activity: "Active",
    icon: <Globe className="h-8 w-8 text-primary" />
  },
  {
    id: 6,
    name: "StartUp Founders",
    members: 512,
    description: "Connect with other founders to share experiences, challenges, and success stories.",
    category: "Business",
    activity: "Moderate",
    icon: <Users className="h-8 w-8 text-primary" />
  }
];

// Fake trending discussions
const trendingDiscussions = [
  {
    id: 1,
    title: "What tech stack are you using for your projects in 2023?",
    author: {
      name: "Thomas Wright",
      avatar: "/placeholder.svg",
      initials: "TW"
    },
    comments: 43,
    lastActive: "2 hours ago",
    tags: ["Discussion", "Technology"]
  },
  {
    id: 2,
    title: "How to balance client work with personal projects?",
    author: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg",
      initials: "SC"
    },
    comments: 28,
    lastActive: "5 hours ago",
    tags: ["Advice", "Freelancing"]
  },
  {
    id: 3,
    title: "Tips for presenting your portfolio during client meetings",
    author: {
      name: "James Peterson",
      avatar: "/placeholder.svg",
      initials: "JP"
    },
    comments: 17,
    lastActive: "Yesterday",
    tags: ["Portfolio", "Clients"]
  }
];

const CommunityPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
              <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Community
              </div>
              
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                Connect with Fellow Talents
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                Join communities, participate in discussions, and grow your network of like-minded professionals.
              </p>
            </div>

            {/* Community content */}
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="groups" className="w-full">
                <TabsList className="w-full justify-start px-4 py-2 bg-transparent">
                  <TabsTrigger value="groups" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                    Community Groups
                  </TabsTrigger>
                  <TabsTrigger value="discussions" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                    Trending Discussions
                  </TabsTrigger>
                  <TabsTrigger value="events" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                    Upcoming Events
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="groups" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communityGroups.map(group => (
                      <div key={group.id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                          {group.icon}
                          <div>
                            <h3 className="font-semibold text-lg">{group.name}</h3>
                            <p className="text-sm text-gray-500">{group.members} members</p>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{group.description}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {group.category}
                          </Badge>
                          <span className="text-sm text-gray-500">{group.activity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="discussions" className="mt-6">
                  <div className="space-y-4">
                    {trendingDiscussions.map(discussion => (
                      <div key={discussion.id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                              <AvatarFallback>{discussion.author.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{discussion.title}</h3>
                              <p className="text-sm text-gray-500">Started by {discussion.author.name} • {discussion.lastActive}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{discussion.comments}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          {discussion.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="events" className="mt-6">
                  <div className="bg-white border rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <Calendar className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                    <p className="text-gray-600 mb-4">
                      Check back soon for community events, workshops, and meetups.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;
