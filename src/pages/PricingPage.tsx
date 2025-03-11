
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <PageHeader 
              label="Choose your perfect plan"
              title="Simple, Transparent Pricing"
              description="Choose the plan that's right for you. All plans come with a 14-day free trial."
            />
            <PricingSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
