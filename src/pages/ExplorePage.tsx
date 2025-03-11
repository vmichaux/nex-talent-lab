
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExploreCTA } from "@/components/ExploreCTA";
import { PageHeader } from "@/components/PageHeader";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ExplorePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <PageHeader 
              label="Discover opportunities"
              title="Explore Our Network"
              description="Connect with top talent and find exciting projects that match your skills and interests."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-bold mb-4">Explore Projects</h2>
                <p className="text-gray-600 mb-6">
                  Discover exciting opportunities across various industries. Filter by category, skills required, 
                  project duration, and more to find the perfect match for your expertise.
                </p>
                <Link to="/explore-projects">
                  <Button className="w-full">Browse Projects</Button>
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-bold mb-4">Explore Talents</h2>
                <p className="text-gray-600 mb-6">
                  Connect with skilled professionals from around the world. Search by expertise, experience level,
                  location, and availability to build your dream team.
                </p>
                <Link to="/explore-talents">
                  <Button className="w-full">Browse Talents</Button>
                </Link>
              </div>
            </div>
            
            <ExploreCTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
