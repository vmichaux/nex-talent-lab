
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfileBenefits = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Why Complete Your Profile?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Better Visibility</h3>
          </div>
          <p className="text-gray-600">Complete profiles rank higher in search results and get more attention from potential partners.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Unlock Features</h3>
          </div>
          <p className="text-gray-600">Access all platform features including messaging, project exploration, and connections.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Personalized Matches</h3>
          </div>
          <p className="text-gray-600">Get matched with projects and talents that align with your skills, interests, and goals.</p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/profile/edit" className="text-primary font-medium hover:underline">
          Complete your profile now →
        </Link>
      </div>
    </div>
  );
};
