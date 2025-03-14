import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Rocket, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SimplifiedHeader } from "./SimplifiedHeader";
import { auth } from "@/lib/firebase";
import { updateUserRole } from "@/services/authService";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export function DashboardOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"talent" | "entrepreneur" | "both" | null>(null);
  const [initialCheckCompleted, setInitialCheckCompleted] = useState(false);
  const totalSteps = 2;
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  
  useEffect(() => {
    // Check if user is logged in
    if (currentUser && userData) {
      // First check if user has a role set in Firestore
      if (userData.userRole === "talent" || userData.userRole === "entrepreneur" || userData.userRole === "both") {
        // If role exists in Firestore, navigate to dashboard
        navigate("/dashboard");
        return;
      }
      
      // Fall back to localStorage if Firestore doesn't have the info
      const savedRole = localStorage.getItem("userRole");
      if (savedRole === "talent" || savedRole === "entrepreneur" || savedRole === "both") {
        // If role exists in localStorage, navigate to dashboard
        navigate("/dashboard");
        return;
      }
      
      // If we reach here, user needs to complete onboarding
      setInitialCheckCompleted(true);
    } else if (!currentUser) {
      // If user is not logged in, redirect to login
      navigate("/login");
      return;
    } else {
      // User is logged in but userData is still loading
      // We'll wait for it to load
      setInitialCheckCompleted(false);
    }
  }, [currentUser, userData, navigate]);

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save the selected role before navigating away
      if (selectedRole) {
        try {
          localStorage.setItem("userRole", selectedRole);

          // Save role to Firestore if user is authenticated
          if (currentUser) {
            await updateUserRole(currentUser, selectedRole);
            toast.success("Your profile has been updated!", {
              description: "Your role preferences have been saved.",
              duration: 6000
            });
          }

          // Navigate to signup with role info and fromOnboarding flag
          navigate(`/signup?role=${selectedRole}&fromOnboarding=true`);
        } catch (error) {
          console.error("Error saving role:", error);
          toast.error("Could not save your preferences", {
            description: "Please try again or contact support.",
            duration: 6000
          });
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate("/");
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <h1 className="font-bold mb-6 custom-gradient-text text-5xl py-[17px]">Welcome to NexTalent Lab</h1>
            <p className="text-lg mb-8 text-zinc-800">Let's get you started on your collaborative journey</p>
            
            <div className="mb-10 text-center max-w-prose">
              <p className="mb-6 py-0 px-[36px]">NexTalent Lab is a platform that connects emerging talents with project builders. Whether you're looking to build your portfolio or find the perfect collaborator for your project, we're here to help.</p>
              <p className="mb-8">Let's set up your profile !</p>
            </div>
            
            <Button onClick={handleNext} size="lg" className="w-full md:w-auto">
              Next Step
            </Button>
          </div>;
      case 2:
        return <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <h1 className="font-bold mb-6 custom-gradient-text text-5xl py-0">Choose Your Role</h1>
            <p className="text-lg mb-8 text-zinc-900 my-0 py-[16px]">Are you a talent looking for opportunities or an entrepreneur? Why not both?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
              {/* Talent Card */}
              <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === 'talent' ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedRole('talent')}>
                <CardContent className="flex flex-col items-center p-4 bg-[#EAE5FA] h-[180px] py-[9px]">
                  <div className="flex justify-start w-full mb-4 mt-2">
                    <GraduationCap className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <div className="mt-auto text-center">
                    <h3 className="text-xl font-semibold mb-1 py-0">Talent</h3>
                    <p className="text-center text-muted-foreground py-0 text-sm">Young professional or freelancer looking for exciting projects, meaningful collaborations or grow experience.</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Entrepreneur Card */}
              <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === 'entrepreneur' ? 'ring-2 ring-secondary' : ''}`} onClick={() => setSelectedRole('entrepreneur')}>
                <CardContent className="flex flex-col items-center p-4 bg-[#D9F7E8] h-[180px] py-[9px]">
                  <div className="flex justify-start w-full mb-4 mt-2">
                    <Rocket className="h-8 w-8 text-[#10B981]" />
                  </div>
                  <div className="mt-auto text-center">
                    <h3 className="text-xl font-semibold mb-1">Builder</h3>
                    <p className="text-center text-muted-foreground text-sm">Project builder, startup founder, business owner or just someone with an idea, looking for talented individuals to collaborate with.</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Talent & Builder Card */}
              <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === 'both' ? 'ring-2 ring-[#7C6ED9]' : ''}`} onClick={() => setSelectedRole('both')}>
                <CardContent className="flex flex-col items-center p-4 bg-[#E9E6FF] h-[180px] py-[9px]">
                  <div className="flex justify-start w-full mb-4 mt-2">
                    <Lightbulb className="h-8 w-8 text-[#7C6ED9]" />
                  </div>
                  <div className="mt-auto text-center">
                    <h3 className="text-xl font-semibold mb-1">Talent & Builder</h3>
                    <p className="text-center text-muted-foreground text-sm">The perfect dual role for ambitious creators interested in both contributing to projects and building your own ventures.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button onClick={handleNext} size="lg" className="w-full md:w-auto" disabled={!selectedRole}>
              Continue
            </Button>
          </div>;
      default:
        return null;
    }
  };

  if (!initialCheckCompleted) {
    return null; // Return null during the check to prevent UI flash
  }

  return <>
      <SimplifiedHeader currentStep={currentStep} totalSteps={totalSteps} onBackClick={handleBack} />
      <div className="min-h-[calc(100vh-75px)] flex flex-col justify-center items-center p-6 py-16 bg-white">
        {getStepContent()}
      </div>
    </>;
}
