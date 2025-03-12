import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { DashboardWelcome } from "@/components/DashboardWelcome";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { DashboardMessages } from "@/components/dashboard/DashboardMessages";
import { DashboardRequests } from "@/components/dashboard/DashboardRequests";
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";

const DashboardPage = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  
  useEffect(() => {
    // Redirect non-logged-in users to the onboarding route
    if (!isLoggedIn) {
      navigate("/onboarding");
      return;
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
                Passer au tableau de bord
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
                  Tableau de bord
                </div>
                
                <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                  Gérer vos activités
                </h1>
                
                <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                  Suivez vos projets, vos connexions et vos activités en un seul endroit.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <AddProjectButton />
                <div className="md:w-1/2 lg:w-1/3">
                  <ProjectSearch />
                </div>
              </div>

              {/* Dashboard overview stats */}
              <DashboardOverview />

              {/* Projects section */}
              <DashboardProjects />
              
              {/* Messages section */}
              <DashboardMessages />
              
              {/* Requests section */}
              <DashboardRequests />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
