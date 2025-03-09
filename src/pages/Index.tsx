
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ImpactSection } from "@/components/ImpactSection";
import { PricingSection } from "@/components/PricingSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ExploreCTA } from "@/components/ExploreCTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="relative overflow-hidden bg-white">
          <div className="container mx-auto px-4">
            <FeatureSection />
            <ExploreCTA />
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
