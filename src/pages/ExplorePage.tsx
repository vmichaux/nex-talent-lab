import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ExploreCTA } from "@/components/ExploreCTA";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/use-auth";
import { PageHeader } from "@/components/explore/PageHeader";
import { SearchBar } from "@/components/explore/SearchBar";
import { ProjectsSection } from "@/components/explore/ProjectsSection";
import { TalentsSection } from "@/components/explore/TalentsSection";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuth();
  const { projects, loading, error } = useProjects({
    excludeCurrentUser: true,
    userId: currentUser?.uid
  });
  
  // Talent data (could be moved to a hook or API call in the future)
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
  }];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <PageHeader />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ProjectsSection 
              projects={projects} 
              loading={loading} 
              error={error ? error.message : ""} 
              searchQuery={searchQuery} 
            />
            <TalentsSection talents={talents} />

            <div className="pt-16 py-[16px]">
              <TestimonialSection />
            </div>

            <div className="pt-16">
              <ExploreCTA />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
