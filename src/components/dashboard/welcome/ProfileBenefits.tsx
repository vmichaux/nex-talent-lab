
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfileBenefits = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Complete Your Profile to Unlock:</h3>
      <ul className="space-y-3">
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Access to all projects and opportunities</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Connect with other professionals</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Personalized project recommendations</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Enhanced visibility to potential clients</span>
        </li>
      </ul>
      <div className="mt-6">
        <Link 
          to="/profile/edit" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Complete Your Profile
        </Link>
      </div>
    </div>
  );
};
