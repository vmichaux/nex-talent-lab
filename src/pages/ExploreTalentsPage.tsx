
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Briefcase, MessageSquare, MapPin, Star, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const ExploreTalentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Mock talent data for display purposes
  const talents = [
    {
      id: 1,
      name: "Emma Wilson",
      title: "UX/UI Designer",
      location: "San Francisco, CA",
      skills: ["UI Design", "User Research", "Figma", "Prototyping"],
      experience: "5+ years",
      rating: 4.9,
      availability: "Available for freelance",
      bio: "Award-winning UX/UI designer with expertise in creating intuitive and beautiful interfaces for web and mobile applications.",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 2,
      name: "Marcus Rivera",
      title: "Full Stack Developer",
      location: "Austin, TX",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      experience: "7+ years",
      rating: 4.8,
      availability: "Available from June",
      bio: "Full stack developer with a passion for building scalable applications. Specialized in React and Node.js ecosystems.",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 3,
      name: "Sophia Chen",
      title: "Product Manager",
      location: "New York, NY",
      skills: ["Product Strategy", "Agile", "Data Analysis", "User Stories"],
      experience: "6+ years",
      rating: 4.7,
      availability: "Open to part-time",
      bio: "Experienced product manager who has led multiple products from conception to launch. Strong focus on user-centered design principles.",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 4,
      name: "David Kumar",
      title: "AI/ML Engineer",
      location: "Seattle, WA",
      skills: ["Python", "TensorFlow", "Data Science", "NLP"],
      experience: "4+ years",
      rating: 4.6,
      availability: "Currently interviewing",
      bio: "AI/ML engineer specializing in natural language processing and computer vision. Previously worked at major tech companies.",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 5,
      name: "Olivia Martinez",
      title: "Digital Marketing Specialist",
      location: "Chicago, IL",
      skills: ["SEO", "Content Strategy", "Social Media", "Analytics"],
      experience: "3+ years",
      rating: 4.5,
      availability: "Full-time opportunities",
      bio: "Digital marketing expert with a track record of driving engagement and conversions through data-driven strategies and creative campaigns.",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 6,
      name: "James Thompson",
      title: "Mobile App Developer",
      location: "Boston, MA",
      skills: ["Swift", "Kotlin", "Flutter", "Firebase"],
      experience: "6+ years",
      rating: 4.9,
      availability: "Available now",
      bio: "Seasoned mobile developer with expertise in native and cross-platform development. Created apps with millions of downloads.",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 7,
      name: "Aisha Patel",
      title: "Data Scientist",
      location: "Toronto, Canada",
      skills: ["R", "Python", "Machine Learning", "Statistical Analysis"],
      experience: "4+ years",
      rating: 4.7,
      availability: "Remote only",
      bio: "Data scientist passionate about turning complex data into actionable insights. Background in fintech and healthcare analytics.",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 8,
      name: "Michael Johnson",
      title: "DevOps Engineer",
      location: "Denver, CO",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      experience: "8+ years",
      rating: 4.8,
      availability: "Contract work",
      bio: "DevOps professional specializing in cloud infrastructure and automation. Helped startups scale their operations efficiently.",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 9,
      name: "Elena Rodriguez",
      title: "Graphic Designer",
      location: "Miami, FL",
      skills: ["Illustrator", "Photoshop", "Brand Identity", "Typography"],
      experience: "5+ years",
      rating: 4.6,
      availability: "Freelance projects",
      bio: "Versatile designer with a strong portfolio in branding, print, and digital media. Combines creativity with strategic thinking.",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 10,
      name: "Thomas Lee",
      title: "Blockchain Developer",
      location: "Vancouver, Canada",
      skills: ["Solidity", "Smart Contracts", "Web3.js", "DeFi"],
      experience: "3+ years",
      rating: 4.5,
      availability: "Looking for startups",
      bio: "Blockchain engineer focused on developing secure and efficient smart contracts and decentralized applications.",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 11,
      name: "Sarah Williams",
      title: "Content Strategist",
      location: "Portland, OR",
      skills: ["Copywriting", "SEO", "Content Planning", "Analytics"],
      experience: "7+ years",
      rating: 4.9,
      availability: "Part-time available",
      bio: "Strategic content creator who helps brands tell compelling stories and connect with their audiences across multiple channels.",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 12,
      name: "Ryan Chang",
      title: "Game Developer",
      location: "Los Angeles, CA",
      skills: ["Unity", "C#", "3D Modeling", "Game Design"],
      experience: "4+ years",
      rating: 4.7,
      availability: "Seeking team projects",
      bio: "Passionate game developer with experience in indie and AAA titles. Focuses on creating engaging player experiences.",
      image: "/placeholder.svg",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Connect With Professionals
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
                Explore Talents
              </h1>
              
              <p className="mb-10 text-lg text-gray-600 md:text-xl max-w-3xl whitespace-normal">
                Discover skilled professionals ready to collaborate on your next big idea or join your team.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search talents by name, skill, or location..."
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

            {/* Talent Categories Tabs */}
            <Tabs defaultValue="all" className="mb-24">
              <TabsList className="mb-8 mx-auto flex justify-center">
                <TabsTrigger value="all" className="px-6">All Talents</TabsTrigger>
                <TabsTrigger value="featured" className="px-6">Featured</TabsTrigger>
                <TabsTrigger value="designers" className="px-6">Designers</TabsTrigger>
                <TabsTrigger value="developers" className="px-6">Developers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {talents.map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </TabsContent>
              
              <TabsContent value="featured" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {talents.filter(t => t.featured).map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </TabsContent>
              
              <TabsContent value="designers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {talents.filter(t => t.title.includes("Designer")).map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </TabsContent>
              
              <TabsContent value="developers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {talents.filter(t => t.title.includes("Developer")).map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Talent Card Component
const TalentCard = ({ talent }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={talent.image} alt={talent.name} />
            <AvatarFallback>{talent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {talent.name}
              {talent.featured && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 ml-2">
                  Featured
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-gray-600 font-medium">{talent.title}</CardDescription>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <MapPin size={14} />
              <span>{talent.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-1 space-y-5">
        <p className="text-sm text-gray-700">{talent.bio}</p>
        <div className="flex flex-wrap gap-2">
          {talent.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-gray-400" />
            <span>Experience: {talent.experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-400" />
            <span>Rating: {talent.rating}/5.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span>{talent.availability}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button variant="default" className="w-full flex items-center gap-1">
          <MessageSquare size={16} />
          Connect
        </Button>
        <Button variant="outline" className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default ExploreTalentsPage;
