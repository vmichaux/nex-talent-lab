
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 custom-gradient-text">
              <span className="block mb-2">How</span>
              <span className="block">NexTalent Lab Works</span>
            </h1>
            <p className="text-xl text-gray-600">
              Our streamlined process makes it easy to find the perfect collaboration 
              opportunities and bring your creative projects to life.
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
