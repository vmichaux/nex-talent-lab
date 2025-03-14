import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { TalentCard } from "@/components/explore/TalentCard";
import { PageHeader } from "@/components/explore/PageHeader";

const ExploreTalentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Authentication required", {
        description: "Please sign in to explore talents",
        duration: 10000,
      });
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Mock talent data for display purposes
  const talents = [{
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }];

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <PageHeader
              subtitle="Explore Talents"
              title="Find Your Next Collaborators"
              description="Discover skilled professionals ready to collaborate on your next big idea or join your team."
            />

            {/* Search and Filter Section */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input type="text" placeholder="Search talents by name, skill, or location..." className="pl-10 h-12" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <Button variant="outline" className="flex items-center gap-2 h-12 px-6">
                  <Filter size={16} />
                  Filters
                </Button>
              </div>
            </div>

            {/* Talent Categories Tabs */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-8 mx-auto flex justify-center">
                <TabsTrigger value="all" className="px-6">All Talents</TabsTrigger>
                <TabsTrigger value="featured" className="px-6">Featured</TabsTrigger>
                <TabsTrigger value="designers" className="px-6">Designers</TabsTrigger>
                <TabsTrigger value="developers" className="px-6">Developers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {talents.map(talent => <TalentCard key={talent.id} talent={talent} />)}
              </TabsContent>
              
              <TabsContent value="featured" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {talents.filter(t => t.featured).map(talent => <TalentCard key={talent.id} talent={talent} />)}
              </TabsContent>
              
              <TabsContent value="designers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {talents.filter(t => t.title.includes("Designer")).map(talent => <TalentCard key={talent.id} talent={talent} />)}
              </TabsContent>
              
              <TabsContent value="developers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {talents.filter(t => t.title.includes("Developer")).map(talent => <TalentCard key={talent.id} talent={talent} />)}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreTalentsPage;
