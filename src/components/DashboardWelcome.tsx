
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Step } from "@/components/dashboard/welcome/Step";
import { getWelcomeMessages, descriptions } from "@/components/dashboard/welcome/profileConstants";

export function DashboardWelcome() {
  const navigate = useNavigate();
  const {
    userData,
    currentUser
  } = useAuth();
  const [profileType, setProfileType] = useState<"talent" | "builder" | "both">("talent");
  const profileCompleted = userData?.hasCompletedProfile || false;
  
  const navigateToProfileEdit = () => {
    navigate('/profile/edit');
  };
  
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "entrepreneur") {
      setProfileType("builder");
    } else if (userRole === "talent" || userRole === "both") {
      setProfileType(userRole);
    }
  }, []);
  
  // Helper function to extract the user's first name
  const getUserFirstName = (): string => {
    // First priority: Check userData from Firestore
    if (userData?.firstName) {
      return userData.firstName;
    }
    
    // Second priority: Check displayName from Firebase Auth
    if (currentUser?.displayName) {
      return currentUser.displayName.split(' ')[0];
    }
    
    // Third priority: Extract from email
    if (currentUser?.email) {
      const emailUsername = currentUser.email.split('@')[0];
      const firstName = emailUsername.split(/[._-]/)[0];
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }
    
    return "";
  };
  
  const stepsByProfile = {
    talent: [
      {
        number: 1,
        title: profileCompleted ? "Update Your Profile" : "Complete Your Profile",
        description: "Add your skills, experience, and portfolio items to showcase your talents.",
        completed: profileCompleted,
        onClick: navigateToProfileEdit
      },
      {
        number: 2,
        title: "Explore Projects",
        description: "Discover projects that match your skills and interests.",
        completed: false
      },
      {
        number: 3,
        title: "Connect and Network",
        description: "Reach out to project builders, start collaborating and develop your network.",
        completed: false
      }
    ],
    builder: [
      {
        number: 1,
        title: profileCompleted ? "Update Your Profile" : "Complete Your Profile",
        description: "Add your professional details, project needs and the type of talent you are looking for.",
        completed: profileCompleted,
        onClick: navigateToProfileEdit
      },
      {
        number: 2,
        title: "Explore Talents",
        description: "Discover talents that match your needs and vision.",
        completed: false
      },
      {
        number: 3,
        title: "Connect and Network",
        description: "Reach out to talents and other project builders, start collaborating and develop your network.",
        completed: false
      }
    ],
    both: [
      {
        number: 1,
        title: profileCompleted ? "Update Your Profile" : "Complete Your Profile",
        description: "Add your skills, experience, project needs and the type of talent you are looking for.",
        completed: profileCompleted,
        onClick: navigateToProfileEdit
      },
      {
        number: 2,
        title: "Explore Talents & Projects",
        description: "Discover motivated talents and meaningful projects that match your vision.",
        completed: false
      },
      {
        number: 3,
        title: "Connect and Network",
        description: "Reach out to talents and other project builders, start collaborating and develop your network.",
        completed: false
      }
    ]
  };
  
  const currentSteps = stepsByProfile[profileType];
  const welcomeMessage = getWelcomeMessages(getUserFirstName())[profileType];
  const description = descriptions[profileType];
  
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 py-[66px]">
          <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            Welcome to NexTalent Lab
          </div>
          
          <h1 className="mb-4 text-3xl font-bold tracking-tight custom-gradient-text md:text-5xl">
            {welcomeMessage}
          </h1>
          
          <p className="text-lg text-gray-600 md:text-xl max-w-3xl mb-8">
            {description}
          </p>
          
          <div className="w-full max-w-3xl space-y-4 mb-10">
            {currentSteps.map(step => <Step key={step.number} {...step} />)}
          </div>
          
          <Button size="lg" onClick={() => navigate('/profile/edit')} className="gap-2">
            {profileCompleted ? "Modify Account" : "Setup Your Profile"} <ArrowRight className="h-4 w-4" />
          </Button>
          
          {!profileCompleted}
        </div>
      </div>
    </div>
  );
}
