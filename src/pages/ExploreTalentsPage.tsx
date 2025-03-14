
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { TalentsPageContent } from "@/components/explore/TalentsPageContent";

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

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <TalentsPageContent 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default ExploreTalentsPage;
