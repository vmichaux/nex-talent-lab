import { ArrowRight, Check, UserPlus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

type StepProps = {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed?: boolean;
};

const Step = ({
  number,
  title,
  description,
  icon,
  completed = false
}: StepProps) => <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${completed ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
      {completed ? <Check className="h-5 w-5" /> : <span className="font-semibold">{number}</span>}
    </div>
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="p-1 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>;

export function DashboardWelcome() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const profileCompleted = userData?.hasCompletedProfile || false;

  const steps = [{
    number: 1,
    title: profileCompleted ? "Update Your Profile" : "Complete Your Profile",
    description: "Add your skills, experience, and portfolio items to showcase your talents.",
    icon: <UserPlus className="h-4 w-4 text-primary" />,
    completed: profileCompleted
  }, {
    number: 2,
    title: "Explore Projects",
    description: "Discover projects that match your skills and interests.",
    icon: <Lightbulb className="h-4 w-4 text-primary" />,
    completed: false
  }, {
    number: 3,
    title: "Connect with Teams",
    description: "Reach out to project owners and start collaborating.",
    icon: <ArrowRight className="h-4 w-4 text-primary" />,
    completed: false
  }];

  return <div className="relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 py-[66px]">
          <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            Welcome to NexTalent Lab
          </div>
          
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
            Let's get you started on your collaboration journey
          </h1>
          
          <p className="text-lg text-gray-600 md:text-xl max-w-3xl mb-8">
        </p>
          
          <div className="w-full max-w-3xl space-y-4 mb-10">
            {steps.map(step => <Step key={step.number} {...step} />)}
          </div>
          
          <Button size="lg" onClick={() => navigate('/profile/edit')} className="gap-2">
            {profileCompleted ? "Modify Account" : "Setup Your Profile"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

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
      </div>
    </div>;
}
