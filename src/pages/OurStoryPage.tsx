import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users, Heart, Target, Award, Star, ArrowRight } from "lucide-react";

export default function OurStoryPage() {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 md:py-32 py-[64px]">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Discover
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
                NexTalent Lab
              </h1>
              
              <p className="mb-10 text-lg text-gray-600 md:text-xl max-w-3xl whitespace-normal">
                From a small idea to a platform that connects talent with<br />
                meaningful projects around the world.
              </p>
            </div>
          </div>
        </div>

        <section className="py-0">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-bold mb-6 text-center text-4xl">Our Mission</h2>
              <p className="text-gray-700 mb-4 text-center">
                At NexTalent Lab, we believe everyone has unique talents that deserve the right platform to shine. 
                We started with a simple vision: to create a space where talented individuals can connect with 
                meaningful projects that challenge them and help them grow.
              </p>
              <p className="text-gray-700 mb-6 text-center">
                Our mission is to democratize access to opportunities, regardless of location, background, or 
                traditional credentials. We're building a future where skills and passion matter more than degrees.
              </p>
              <div className="flex items-center gap-4 justify-center">
                
                
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 py-[68px]">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold mb-8 text-center flex items-center gap-2 justify-center">
                
                <span className="text-4xl font-bold">Our Values</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-primary flex-shrink-0" />
                    <h4 className="font-medium">Excellence</h4>
                  </div>
                  <p className="text-gray-600 text-left">Setting high standards for every project and interaction</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-6 w-6 text-primary flex-shrink-0" />
                    <h4 className="font-medium">Inclusivity</h4>
                  </div>
                  <p className="text-gray-600">Creating equal opportunities for talent everywhere</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
                    <h4 className="font-medium">Continuous Learning</h4>
                  </div>
                  <p className="text-gray-600">Embracing growth and development in everything we do</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center gap-2 justify-center">
              
              <span className="text-4xl font-bold">The Story Behind NexTalent Lab</span>
            </h2>
            <div className="prose prose-lg max-w-2xl mx-auto text-gray-700 space-y-6">
              <p className="leading-relaxed text-center">In the heart of Paris, four creatives came together with one goal: to build something extraordinary. A music producer, an artistic director, a fashion designer, and a communication strategist—all driven by a shared passion for innovation. What started as an idea quickly turned into a full-fledged mission: organizing an unforgettable fashion show, despite having no budget and no guarantees.</p>
              <p className="leading-relaxed text-center">But what they did have was determination, talent, and the power of collaboration. The team grew their collective intelligence, with over 100 volunteers—some of the best in their fields—coming together to make the impossible happen. No money exchanged hands. Just skill, passion, and the belief that together, they could create something greater than themselves.</p>
              <p className="leading-relaxed text-center">
                That moment was proof of something revolutionary: when driven people unite around an idea, they can 
                defy all odds. The only thing missing in the world today isn't money, but the right people coming 
                together at the right time.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
            <div className="space-y-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 font-bold text-xl text-primary">2024</div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                  <p className="text-gray-700">
                    NexTalent Lab was founded with the mission to bridge the gap between talented individuals 
                    and meaningful projects. Our small team started with big dreams.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 font-bold text-xl text-primary">2025</div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Growing Community</h3>
                  <p className="text-gray-700">
                    We launched our beta platform and welcomed our first 1,000 users. The community grew 
                    rapidly as more people discovered the value of meaningful connections.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 font-bold text-xl text-primary">2026</div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Global Expansion</h3>
                  <p className="text-gray-700">
                    With over 100,000 users across 50 countries, we expanded our platform to support 
                    multiple languages and regional project hubs.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 font-bold text-xl text-primary">2027</div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Looking Forward</h3>
                  <p className="text-gray-700">
                    We continue to innovate and grow, with a focus on creating more opportunities for 
                    talent everywhere. The journey has just begun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 rounded-xl bg-gradient-to-r from-[#c8b6f8] to-[#a7f3d0] my-8 mx-auto max-w-6xl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-black">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-black">
              Join our community of innovators and creators. Whether you're a talent or a builder,
              NexTalent Lab has a place for you. Let's bring your ideas to life.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/onboarding">
                <Button size="lg" variant="default" className="font-semibold bg-primary hover:bg-primary/90 text-white">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="font-semibold border-primary text-primary hover:bg-primary/10 flex items-center">
                  Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
}
