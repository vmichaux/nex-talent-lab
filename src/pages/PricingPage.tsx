
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient - Same as Hero */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              {/* New label above headline - similar to Hero */}
              <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Choose your perfect plan
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
                Simple, Transparent Pricing
              </h1>
              
              <p className="mb-10 text-lg text-gray-600 md:text-xl max-w-3xl whitespace-normal">
                Choose the plan that's right for you. All plans come with a 14-day free trial.
              </p>
            </div>
            <PricingSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
