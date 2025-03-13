
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export function ExploreCTA() {
  // Sample popular skills for the badges
  const popularSkills = ["React", "UI/UX Design", "Product Management", "Machine Learning", "Full Stack", "Mobile Development", "Data Science", "Graphic Design", "Marketing"];
  return <section className="py-[46px]">
      <div className="container mx-auto px-4">
        <div className="rounded-xl overflow-hidden relative">
          {/* Gradient background */}
          <div className="bg-gradient-to-br from-secondary to-purple-600 p-8 md:p-12 lg:p-16 relative z-10 px-[98px] py-[33px]">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
            
            <div className="max-w-3xl relative z-20">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                Ready to showcase your talent or find your perfect collaborator?
              </h2>
              
              <p className="text-white/90 mb-8 text-base">
                Create your profile today and join thousands of creative professionals building the future together. Access personalized project recommendations and connect with like-minded innovators.
              </p>
              
              <div className="mb-8">
                <p className="text-white font-medium mb-3">Popular skills on our platform:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map(skill => <Badge key={skill} variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                      {skill}
                    </Badge>)}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-white text-secondary hover:bg-gray-100">
                  <Link to="/onboarding">
                    Create Your Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/how-it-works">
                    How It Works
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
