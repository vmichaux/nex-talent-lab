
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for you. All plans come with a 14-day free trial.
            </p>
          </div>
          <PricingSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
