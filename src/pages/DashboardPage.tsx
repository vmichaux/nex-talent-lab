
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { DashboardWelcome } from "@/components/DashboardWelcome";
import { TalentDashboard } from "@/components/dashboard/TalentDashboard";
import { BuilderDashboard } from "@/components/dashboard/BuilderDashboard";
import { DualRoleDashboard } from "@/components/dashboard/DualRoleDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardPage = () => {
  const {
    isLoggedIn,
    currentUser,
    userData
  } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeRole, setActiveRole] = useState<"talent" | "builder" | "both">("talent");

  // Get user's first name from email or display name
  const getUserFirstName = () => {
    if (currentUser?.displayName) {
      // Get first name from display name (first word)
      return currentUser.displayName.split(' ')[0];
    }
    if (currentUser?.email) {
      // Get username part of email and capitalize first letter
      const emailUsername = currentUser.email.split('@')[0];
      const firstName = emailUsername.split(/[._-]/)[0]; // Split by common username separators
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }
    return "friend"; // Fallback if no name or email is available
  };
  
  useEffect(() => {
    // Redirect non-logged-in users to the onboarding route
    if (!isLoggedIn) {
      navigate("/onboarding");
      return;
    }

    // Get saved role preference from localStorage
    const savedRole = localStorage.getItem("userRole");
    if (savedRole === "talent" || savedRole === "entrepreneur" || savedRole === "both") {
      setActiveRole(savedRole === "entrepreneur" ? "builder" : savedRole);
    }

    // Automatically show dashboard if the user has completed their profile
    if (userData?.hasCompletedProfile) {
      setShowWelcome(false);
    }
  }, [isLoggedIn, navigate, userData]);

  // Complete onboarding and show dashboard
  const handleCompleteOnboarding = () => {
    setShowWelcome(false);
  };
  
  const handleRoleChange = (role: "talent" | "builder" | "both") => {
    setActiveRole(role);
    localStorage.setItem("userRole", role === "builder" ? "entrepreneur" : role);
  };

  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {showWelcome ? <>
            <DashboardWelcome />
            {/* For demo purposes only - allows toggling between views */}
            <div className="text-center mb-10">
              <Button variant="outline" onClick={handleCompleteOnboarding} className="mx-auto">
                Go to Dashboard
              </Button>
            </div>
          </> : <div className="relative overflow-hidden bg-white">
            {/* Background Pattern - Purple Gradient */}
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
            
            <div className="container mx-auto px-4 py-12">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-6 py-[64px]">
                <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">Let's go {getUserFirstName()}!</div>
                
                <h1 className="mb-4 text-3xl font-bold tracking-tight custom-gradient-text md:text-5xl">
                  My Journey
                </h1>
                
                <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                  Track your projects, connections, and activities all in one place.
                </p>
              </div>

              {/* Role switcher tabs */}
              <div className="flex justify-center mb-8">
                <Tabs value={activeRole} onValueChange={value => handleRoleChange(value as "talent" | "builder" | "both")} className="w-full max-w-3xl">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="talent" className="flex items-center gap-2">
                      <span className="hidden md:inline">Talent Dashboard</span>
                      <span className="md:hidden">Talent</span>
                    </TabsTrigger>
                    <TabsTrigger value="builder" className="flex items-center gap-2">
                      <span className="hidden md:inline">Builder Dashboard</span>
                      <span className="md:hidden">Builder</span>
                    </TabsTrigger>
                    <TabsTrigger value="both" className="flex items-center gap-2">
                      <span className="hidden md:inline">Dual Role Dashboard</span>
                      <span className="md:hidden">Dual Role</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="talent" className="mt-6">
                    <TalentDashboard />
                  </TabsContent>
                  
                  <TabsContent value="builder" className="mt-6">
                    <BuilderDashboard />
                  </TabsContent>
                  
                  <TabsContent value="both" className="mt-6">
                    <DualRoleDashboard />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>}
      </main>
      <Footer />
    </div>;
};

export default DashboardPage;
