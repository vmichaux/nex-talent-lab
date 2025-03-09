
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
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="relative overflow-hidden bg-white">
          <div className="container mx-auto px-4">
            <FeatureSection />
            <HowItWorks />
            <TestimonialSection />
            <ImpactSection />
            <PricingSection />
            <CTASection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
