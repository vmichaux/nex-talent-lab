
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TestimonialSection } from "@/components/TestimonialSection";
import { PricingSection } from "@/components/PricingSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureSection />
        <HowItWorks />
        <TestimonialSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
