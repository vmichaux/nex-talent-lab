
import { Navbar } from "@/components/Navbar";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How NexTalent Lab Works</h1>
            <p className="text-xl text-gray-600">
              Our platform connects talented individuals with exciting projects through a simple, 
              streamlined collaboration process.
            </p>
          </div>
          <HowItWorks />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
