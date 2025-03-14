
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
              error={typeof error === 'object' && error !== null ? (error as Error).message : String(error)} 
              searchQuery={searchQuery} 
            />
            <TalentsSection />

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
