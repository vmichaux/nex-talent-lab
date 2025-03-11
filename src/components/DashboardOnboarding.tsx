import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, GraduationCap, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export function DashboardOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"talent" | "entrepreneur" | null>(null);
  const totalSteps = 2;
  const navigate = useNavigate();
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save the selected role before navigating away
      if (selectedRole) {
        localStorage.setItem("userRole", selectedRole);
      }
      navigate("/login");
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
            <h1 className="text-4xl font-bold mb-6">Welcome to NexTalent Lab</h1>
            <p className="text-lg mb-8">Let's get you started on your collaboration journey.</p>
            
            <div className="mb-10 text-center max-w-prose">
              <p className="mb-6 px-[2px] py-[5px]">NexTalent Lab is a platform that connects emerging talent with project builders. Whether you're looking to build your portfolio or find the perfect collaborator for your project, we're here to help.</p>
              <p className="mb-8">
                Let's set up your profile and get you started on your journey.
              </p>
            </div>
            
            <Button onClick={handleNext} size="lg" className="w-full md:w-auto">
              Next Step
            </Button>
          </div>;
      case 2:
        return <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Choose Your Role</h1>
            <p className="text-lg mb-8 text-zinc-400">Are you a talent looking for opportunities or a project builder ?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
              {/* Talent Card */}
              <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === 'talent' ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedRole('talent')}>
                <CardContent className="flex flex-col items-center p-6 bg-[#F2E8FF] bg-opacity-40 h-full">
                  <div className="p-3 rounded-full bg-primary bg-opacity-10 mb-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Talent</h3>
                  <p className="text-center text-muted-foreground">
                    Young professional or freelancer looking for exciting projects and collaborations.
                  </p>
                </CardContent>
              </Card>
              
              {/* Entrepreneur Card */}
              <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === 'entrepreneur' ? 'ring-2 ring-secondary' : ''}`} onClick={() => setSelectedRole('entrepreneur')}>
                <CardContent className="flex flex-col items-center p-6 bg-[#F2FCE2] bg-opacity-40 h-full">
                  <div className="p-3 rounded-full bg-secondary bg-opacity-10 mb-4">
                    <Rocket className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Entrepreneur</h3>
                  <p className="text-center text-muted-foreground">
                    Startup founder or business owner looking for talented individuals to collaborate with.
                  </p>
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
  return <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center p-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 relative">
        {/* Step indicator */}
        <div className="absolute top-4 right-4 text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
        
        {/* Back button */}
        <button onClick={handleBack} className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back">
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        {/* Step content */}
        <div className="py-12">
          {getStepContent()}
        </div>
      </div>
    </div>;
}