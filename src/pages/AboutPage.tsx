
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <PageHeader 
              label="Our mission"
              title="About NexTalent Lab"
              description="We're on a mission to connect creative professionals with meaningful projects and opportunities."
            />
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                  <p className="text-gray-600 mb-4">
                    NexTalent Lab was founded in 2023 by a team of industry professionals who recognized the 
                    challenges that both talent and project creators face in finding the right collaborations.
                  </p>
                  <p className="text-gray-600">
                    Our platform is designed to bridge the gap between exceptional talent and innovative projects, 
                    creating opportunities for meaningful work and successful outcomes.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-gray-600 mb-4">
                    We envision a world where creative talent can easily find meaningful work that aligns with
                    their skills and passions, and where project creators can quickly assemble the perfect team
                    for their initiatives.
                  </p>
                  <p className="text-gray-600">
                    By fostering these connections, we aim to drive innovation and creativity across industries.
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-4 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Quality</h3>
                    <p className="text-gray-600">
                      We believe in connecting projects with the highest caliber of talent, ensuring exceptional results.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Opportunity</h3>
                    <p className="text-gray-600">
                      We're committed to creating fair access to opportunities for talent from all backgrounds.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Innovation</h3>
                    <p className="text-gray-600">
                      We foster innovation by connecting visionary ideas with the skilled professionals who can bring them to life.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  {/* Team members would go here - placeholder for now */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
