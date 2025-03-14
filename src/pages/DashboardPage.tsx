
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { DashboardWelcome } from "@/components/DashboardWelcome";
import { TalentDashboard } from "@/components/dashboard/TalentDashboard";
import { BuilderDashboard } from "@/components/dashboard/BuilderDashboard";
import { DualRoleDashboard } from "@/components/dashboard/DualRoleDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const DashboardPage = () => {
  const {
    isLoggedIn,
    currentUser,
    userData
  } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeRole, setActiveRole] = useState<"talent" | "builder" | "both">("talent");
  
  const getUserFirstName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.split(' ')[0];
    }
    if (currentUser?.email) {
      const emailUsername = currentUser.email.split('@')[0];
      const firstName = emailUsername.split(/[._-]/)[0];
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }
    return "friend";
  };
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/onboarding");
      return;
    }
    
    // First check userData from Firestore (from auth context)
    if (userData?.userRole) {
      const mappedRole = userData.userRole === "entrepreneur" ? "builder" : userData.userRole;
      setActiveRole(mappedRole);
      // Also update localStorage for consistency
      localStorage.setItem("userRole", userData.userRole);
    } else {
      // Fall back to localStorage if Firestore doesn't have the info
      const savedRole = localStorage.getItem("userRole");
      if (savedRole === "talent" || savedRole === "entrepreneur" || savedRole === "both") {
        setActiveRole(savedRole === "entrepreneur" ? "builder" : savedRole);
      } else if (isLoggedIn && !savedRole) {
        // User is logged in but has no role set - redirect to onboarding
        toast.info("Let's set up your profile", {
          description: "Please select your role to continue.",
          duration: 6000,
        });
        navigate("/onboarding");
        return;
      }
    }
    
    if (userData?.hasCompletedProfile) {
      setShowWelcome(false);
    }
  }, [isLoggedIn, navigate, userData]);
  
  const handleCompleteOnboarding = () => {
    setShowWelcome(false);
  };
  
  const handleRoleChange = (role: "talent" | "builder" | "both") => {
    setActiveRole(role);
    // Update localStorage with the mapped value
    const storageRole = role === "builder" ? "entrepreneur" : role;
    localStorage.setItem("userRole", storageRole);
    
    // If the user is logged in, update the role in Firestore as well
    if (currentUser) {
      import("@/services/authService").then(({ updateUserRole }) => {
        updateUserRole(currentUser, storageRole as "talent" | "entrepreneur" | "both")
          .catch(error => {
            console.error("Error updating role:", error);
          });
      });
    }
  };
  
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {showWelcome ? <>
            <DashboardWelcome />
            <div className="text-center mb-10">
              
            </div>
          </> : <div className="relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
            
            <div className="w-full px-4 py-16">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 py-[64px]">
                <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">Let's go {getUserFirstName()}!</div>
                
                <h1 className="mb-4 text-3xl font-bold tracking-tight custom-gradient-text md:text-5xl">Your Journey</h1>
                
                <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                  Track your projects, connections, and activities all in one place.
                </p>
              </div>

              <div className="flex justify-center mb-10">
                <Tabs value={activeRole} onValueChange={value => handleRoleChange(value as "talent" | "builder" | "both")} className="w-full max-w-[1800px]">
                  <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
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

                  <TabsContent value="talent" className="mt-8 px-4 max-w-[1800px] mx-auto">
                    <TalentDashboard />
                  </TabsContent>
                  
                  <TabsContent value="builder" className="mt-8 px-4 max-w-[1800px] mx-auto">
                    <BuilderDashboard />
                  </TabsContent>
                  
                  <TabsContent value="both" className="mt-8 px-4 max-w-[1800px] mx-auto">
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
