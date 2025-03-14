
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfileBenefits = () => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Why Complete Your Profile?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Get Discovered</h3>
            <p className="text-sm text-gray-600">Startups and projects actively search for talent with your skills</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Better Matches</h3>
            <p className="text-sm text-gray-600">Our AI matches you with projects that fit your experience level</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Project Recommendations</h3>
            <p className="text-sm text-gray-600">Receive personalized project suggestions</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Growth Tracking</h3>
            <p className="text-sm text-gray-600">Track your skills development over time</p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p>Need help getting started? <Link to="/contact-sales#sales-title" className="text-primary font-medium">Contact our support team</Link></p>
      </div>
    </div>
  );
};
