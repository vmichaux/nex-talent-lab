import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export function DashboardOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const navigate = useNavigate();
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
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
            <p className="text-lg mb-8">Let's get you started on your collaboration journey</p>
            
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
            <h1 className="text-4xl font-bold mb-6">Create Your Account</h1>
            <p className="text-lg mb-8">Join our community of talents and projects</p>
            
            <div className="mb-10 text-center max-w-prose">
              <p className="mb-6">
                To get started, you'll need to create an account. This will allow you to:
              </p>
              <ul className="text-left list-disc pl-6 mb-8 space-y-2">
                <li>Build and showcase your portfolio</li>
                <li>Connect with innovative projects</li>
                <li>Collaborate with other talents</li>
                <li>Track your progress and growth</li>
              </ul>
            </div>
            
            <Button onClick={() => navigate("/signup")} size="lg" className="w-full md:w-auto mb-4">
              Sign Up
            </Button>
            <Button onClick={() => navigate("/login")} variant="outline" size="lg" className="w-full md:w-auto">
              Log In
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