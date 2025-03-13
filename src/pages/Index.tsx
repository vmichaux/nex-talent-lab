
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ImpactSection } from "@/components/ImpactSection";
import { PricingSection } from "@/components/PricingSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";

const Index = () => {
  const {
    isLoggedIn
  } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="relative overflow-hidden bg-white">
          <div className="container mx-auto px-4">
            <FeatureSection />
            
            {/* Added title for How It Works section */}
            <div className="text-center max-w-2xl mx-auto mt-16 mb-8">
              <h2 className="text-3xl font-bold mb-4 my-[18px]">How It Works</h2>
              <p className="text-gray-600 px-[49px]">Our streamlined process makes finding and working with the perfect collaborators simple and effective.</p>
            </div>
            <HowItWorks />
            
            <TestimonialSection />
            <ImpactSection />
            <PricingSection />
            <CTASection />
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};

export default Index;
