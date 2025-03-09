
import { User, Search, Code, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HowItWorks() {
  const steps = [
    {
      icon: User,
      title: "Create Your Profile",
      description: "Set up your talent profile or startup project with all the essential details",
      color: "bg-primary/10"
    },
    {
      icon: Search,
      title: "Discover Opportunities",
      description: "Browse projects or talents with our intelligent matching system",
      color: "bg-primary/10"
    },
    {
      icon: Code,
      title: "Collaborate Effectively",
      description: "Use our built-in tools to manage projects and track progress",
      color: "bg-primary/10"
    },
    {
      icon: BarChart3,
      title: "Grow Your Network",
      description: "Build your portfolio and expand your professional connections",
      color: "bg-primary/10"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="block mb-1">How NexTalent Lab</span>
            <span className="block">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform simplifies collaboration between emerging talent and innovative startups
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="border rounded-lg p-6 transition-all duration-300 hover:shadow-md flex flex-col items-center text-center">
              <div className={`${step.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/signup">
            <Button size="lg" className="gap-2">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
