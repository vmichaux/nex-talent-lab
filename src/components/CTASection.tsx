
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#D6BCFA] to-[#E2F7D9] rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center text-black/90 bg-transparent">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey ? </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">Join our community of innovators and creators. Whether you're a talent or a builder, NexTalent Lab has a place for you. Let's bring your ideas to life. </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/onboarding">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto gap-2">
                  Explore Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
