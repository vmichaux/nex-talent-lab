
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Set up your professional profile highlighting your skills, experience, and portfolio to showcase your expertise.",
      color: "bg-primary"
    },
    {
      number: "02",
      title: "Discover Opportunities",
      description: "Browse projects that match your skill set or post your own project to find the perfect collaborators.",
      color: "bg-secondary"
    },
    {
      number: "03",
      title: "Connect & Collaborate",
      description: "Use our built-in tools to communicate, share files, and work together seamlessly on your project.",
      color: "bg-primary/80"
    },
    {
      number: "04",
      title: "Grow Your Network",
      description: "Build lasting professional relationships and expand your career opportunities through successful collaborations.",
      color: "bg-secondary/80"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`${step.color} text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center mb-6`}>
                {step.number}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute h-0.5 bg-gray-200 w-full top-7 left-1/2 -z-10"></div>
              )}
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/signup">
            <Button size="lg" className="gap-2">
              Get Started Today <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
