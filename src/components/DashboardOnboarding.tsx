
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, GraduationCap, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
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

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Choose Your Role</h1>
            <p className="text-lg mb-8">
              Are you a talent looking for opportunities or an entrepreneur with a project?
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
              {/* Talent Card */}
              <Card 
                className={`p-8 hover:shadow-md transition-shadow cursor-pointer 
                  ${selectedRole === 'talent' ? 'border-2 border-primary' : 'border'}
                  bg-purple-50`}
                onClick={() => handleRoleSelect('talent')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-3">Talent</h2>
                  <p className="text-gray-600">
                    Young professional or freelancer looking for exciting projects 
                    and collaborations.
                  </p>
                </div>
              </Card>
              
              {/* Entrepreneur Card */}
              <Card 
                className={`p-8 hover:shadow-md transition-shadow cursor-pointer 
                  ${selectedRole === 'entrepreneur' ? 'border-2 border-secondary' : 'border'}
                  bg-green-50`}
                onClick={() => handleRoleSelect('entrepreneur')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Rocket className="h-6 w-6 text-secondary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-3">Entrepreneur</h2>
                  <p className="text-gray-600">
                    Startup founder or business owner looking for talented 
                    individuals to collaborate with.
                  </p>
                </div>
              </Card>
            </div>
            
            <Button 
              onClick={handleNext} 
              size="lg" 
              className="w-full md:w-auto"
              disabled={!selectedRole}
            >
              Continue
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center p-4 py-12">
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
    </div>
  );
}
