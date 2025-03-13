import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Rocket, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SimplifiedHeader } from "./SimplifiedHeader";
export function DashboardOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"talent" | "entrepreneur" | "both" | null>(null);
  const totalSteps = 2;
  const navigate = useNavigate();
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save the selected role before navigating away
      if (selectedRole) {
        localStorage.setItem("userRole", selectedRole);
        // Navigate to signup with role info and fromOnboarding flag
        navigate(`/signup?role=${selectedRole}&fromOnboarding=true`);
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
            <h1 className="text-4xl font-bold mb-6 custom-gradient-text">Welcome to NexTalent Lab</h1>
            <p className="text-lg mb-8 text-zinc-500">Let's get you started on your collaboration journey</p>
            
            <div className="mb-10 text-center max-w-prose">
              <p className="mb-6 px-px py-0">NexTalent Lab is a platform that connects emerging talent with project builders. Whether you're looking to build your portfolio or find the perfect collaborator for your project, we're here to help.</p>
              <p className="mb-8">Let's set up your profile !</p>
            </div>
            
            <Button onClick={handleNext} size="lg" className="w-full md:w-auto">
              Next Step
            </Button>
          </div>;
      case 2:
        return <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 custom-gradient-text">Choose Your Role</h1>
            <p className="text-lg mb-8 text-zinc-900">Are you a talent looking for opportunities or a project builder? Why not both?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
              {/* Talent Card */}
              <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === 'talent' ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedRole('talent')}>
                <CardContent className="flex flex-col items-center p-4 bg-[#F5EEFF] h-[180px] py-[9px]">
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
                <CardContent className="flex flex-col items-center p-4 bg-[#ECFDF3] h-[180px] py-[9px]">
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
                <CardContent className="flex flex-col items-center p-4 bg-[#F3F1FF] h-[180px] py-[9px]">
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
  return <>
      <SimplifiedHeader currentStep={currentStep} totalSteps={totalSteps} onBackClick={handleBack} />
      <div className="min-h-[calc(100vh-75px)] flex flex-col justify-center items-center p-6 py-16 bg-white">
        {getStepContent()}
      </div>
    </>;
}