import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export function HowItWorks({
  showDetails = false
}) {
  const steps = [{
    number: "01",
    title: "Create Your Profile",
    description: "Set up your professional profile highlighting your skills, experience, and portfolio to showcase your expertise.",
    details: ["Build a comprehensive profile with your skills, education, and work history", "Upload portfolio samples to showcase your previous work", "Set your availability and preferred project types", "Get verified to increase your visibility and trustworthiness"],
    color: "bg-primary"
  }, {
    number: "02",
    title: "Discover Opportunities",
    description: "Browse projects that match your skill set or post your own project to find the perfect collaborators.",
    details: ["Use AI-powered matching to find projects suited to your skills", "Filter opportunities by industry, duration, and compensation", "Save interesting projects to review later", "Create project listings when you need to find collaborators"],
    color: "bg-secondary"
  }, {
    number: "03",
    title: "Connect & Collaborate",
    description: "Use our built-in tools to communicate, share files, and work together seamlessly on your project.",
    details: ["Direct messaging with potential collaborators", "Virtual meeting spaces for team discussions", "Secure file sharing and version control", "Collaborative project management tools"],
    color: "bg-primary/80"
  }, {
    number: "04",
    title: "Grow Your Network",
    description: "Build lasting professional relationships and expand your career opportunities through successful collaborations.",
    details: ["Receive and give feedback after project completion", "Build a reputation through ratings and reviews", "Join industry-specific communities", "Access career development resources and mentorship"],
    color: "bg-secondary/80"
  }];
  return <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Removed duplicate title and description that were in this div */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => <div key={index} className="relative">
              <div className={`${step.color} text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center mb-6`}>
                {step.number}
              </div>
              
              {index < steps.length - 1 && <div className="hidden lg:block absolute h-0.5 bg-gray-200 w-full top-7 left-1/2 -z-10"></div>}
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              
              {/* Only show details on the dedicated page */}
              {showDetails && <ul className="space-y-2 text-sm text-gray-600">
                  {step.details.map((detail, i) => <li key={i} className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span className="py-0 my-[3px]">{detail}</span>
                    </li>)}
                </ul>}
            </div>)}
        </div>

        {showDetails && <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-center">Why Our Process Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-primary my-[40px]">For Talent</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Access to diverse projects that match your interests and skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Build your portfolio with meaningful work experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Connect with industry professionals and expand your network</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Develop new skills through diverse project experiences</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-secondary py-0 my-[40px]">For Project Creators</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2">✓</span>
                    <span>Find verified, skilled professionals for your specific needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2">✓</span>
                    <span>Streamlined collaboration tools for efficient project management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2">✓</span>
                    <span>Quality assurance through our verification and review systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2">✓</span>
                    <span>Build a trusted network of collaborators for future projects</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>}

        <div className="text-center mt-12">
          <Link to="/onboarding">
            <Button size="lg" className="gap-2 bg-primary py-[8px] my-[48px]">
              Get Started Today <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>;
}