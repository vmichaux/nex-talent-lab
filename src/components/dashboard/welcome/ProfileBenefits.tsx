
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfileBenefits = () => {
  const benefits = [
    "Showcase your skills and experience to potential collaborators",
    "Find projects that match your interests and expertise",
    "Connect with other innovators and entrepreneurs",
    "Build your professional network in the innovation ecosystem",
    "Track your progress and growth over time"
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-8 mb-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Complete Your Profile to Unlock These Benefits
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Why Complete Your Profile?</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Getting Started Is Easy</h3>
            <p className="mb-4">
              Your profile is your digital representation in the NexTalent ecosystem. 
              A complete profile increases your visibility and chances of finding the 
              right opportunities or collaborators.
            </p>
            <p className="mb-6">
              It takes less than 10 minutes to complete your profile, and you can 
              always update it later as your skills and interests evolve.
            </p>
            <Link 
              to="/profile/edit" 
              className="block w-full bg-primary text-white text-center py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Complete Your Profile Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
