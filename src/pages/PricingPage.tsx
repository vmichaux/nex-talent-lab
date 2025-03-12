
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingSection } from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-16 px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Pricing Plans</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Choose the right plan for your business or project. Need a custom solution?
            </p>
            <Link to="/contact-sales">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                Contact Sales for Custom Options
              </Button>
            </Link>
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
      </main>
      <Footer />
    </div>
  );
}
