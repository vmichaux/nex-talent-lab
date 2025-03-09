
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ImpactSection } from "@/components/ImpactSection";
import { PricingSection } from "@/components/PricingSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="relative overflow-hidden bg-white">
          <div className="container mx-auto px-4">
            <FeatureSection />
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our streamlined process makes it easy to find the perfect collaboration 
                opportunities and bring your creative projects to life.
              </p>
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
    </div>
  );
};

export default Index;
