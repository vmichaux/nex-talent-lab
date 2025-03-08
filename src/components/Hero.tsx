
import { ArrowRight, Sparkles, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Pattern - Purple Gradient */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          {/* New label above headline */}
          <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            Launching the future of collaboration
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            <span className="text-black">Connect </span>
            <span className="text-black">Talent </span>
            <span className="text-black">with</span>
            <br className="hidden sm:block" />
            <span className="opportunity-gradient">Opportunity</span>
          </h1>
          
          <p className="mb-10 text-lg text-gray-600 md:text-xl max-w-2xl">
            NexTalent Lab connects creative talent with innovative projects through 
            AI-powered matching. Discover meaningful collaborations that elevate your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards - More spaced out */}
        <div className="grid md:grid-cols-2 gap-10 mt-16">
          {/* Stats Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">Our Impact</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm text-gray-500 mt-2">Talents</p>
              </div>
              <div className="text-center p-4 border-x border-gray-200">
                <p className="text-3xl font-bold text-primary">2400+</p>
                <p className="text-sm text-gray-500 mt-2">Projects</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-gray-500 mt-2">Success Rate</p>
              </div>
            </div>
          </div>
          
          {/* Feature Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg">
            <div className="relative">
              <div className="absolute -top-4 -right-4 bg-secondary text-white p-3 rounded-lg shadow-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">AI Powered</span>
              </div>
              
              <div className="space-y-6 mt-6">
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Talent Matching</h3>
                    <p className="text-sm text-gray-500">Our AI finds the perfect talent for your projects based on skills and experience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Project Collaboration</h3>
                    <p className="text-sm text-gray-500">Seamless tools to create, share and manage projects with your team</p>
                  </div>
                </div>
                
                {/* User Testimonial Card */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                      {/* Avatar placeholder */}
                      <div className="h-full w-full bg-gradient-to-br from-primary/70 to-secondary/70"></div>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">UX Designer • San Francisco</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    "NexTalent Lab helped me find the perfect collaborators for my startup's design system. The AI matching is incredibly accurate!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
