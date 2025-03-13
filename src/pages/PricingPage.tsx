
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingSection } from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
export default function PricingPage() {
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-[100px] md:py-32">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">Find the Perfect Plan</div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight custom-gradient-text md:text-6xl">
                Pricing Plans
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                Choose the right plan for your business or project. Need a custom solution?
              </p>
              
              <div className="mt-6">
                <Link to="/contact-sales">
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Sales for Custom Options
                  </Button>
                </Link>
              </div>
            </div>

            <PricingSection />
            
            <div className="mt-20 text-center">
              <Link to="/onboarding">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}
