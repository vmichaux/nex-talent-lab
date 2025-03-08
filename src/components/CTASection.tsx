
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-purple-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Collaboration?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of creative professionals and project owners already using NexTalent Lab to bring their ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto gap-2">
                  Explore Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
