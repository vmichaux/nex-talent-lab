
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users, Heart, Target, Award } from "lucide-react";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section with updated styling to match other pages */}
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient - Same as other pages */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              {/* New label above headline - similar to other pages */}
              <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Our journey
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
                Our Story
              </h1>
              
              <p className="mb-10 text-lg text-gray-600 md:text-xl max-w-3xl whitespace-normal">
                From a small idea to a platform that connects talent with meaningful projects around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  At NexTalent Lab, we believe everyone has unique talents that deserve the right platform to shine. 
                  We started with a simple vision: to create a space where talented individuals can connect with 
                  meaningful projects that challenge them and help them grow.
                </p>
                <p className="text-gray-700 mb-6">
                  Our mission is to democratize access to opportunities, regardless of location, background, or 
                  traditional credentials. We're building a future where skills and passion matter more than degrees.
                </p>
                <div className="flex items-center gap-4">
                  <Target className="h-10 w-10 text-primary" />
                  <p className="font-medium text-lg">Connecting talent with purpose since 2020</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <span>Our Values</span>
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Excellence</h4>
                      <p className="text-gray-600">Setting high standards for every project and interaction</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Inclusivity</h4>
                      <p className="text-gray-600">Creating equal opportunities for talent everywhere</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Continuous Learning</h4>
                      <p className="text-gray-600">Embracing growth and development in everything we do</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
            <div className="space-y-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 font-bold text-xl text-primary">2020</div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                  <p className="text-gray-700">
                    NexTalent Lab was founded with the mission to bridge the gap between talented individuals 
                    and meaningful projects. Our small team started with big dreams.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 font-bold text-xl text-primary">2021</div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Growing Community</h3>
                  <p className="text-gray-700">
                    We launched our beta platform and welcomed our first 1,000 users. The community grew 
                    rapidly as more people discovered the value of meaningful connections.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 font-bold text-xl text-primary">2023</div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Global Expansion</h3>
                  <p className="text-gray-700">
                    With over 100,000 users across 50 countries, we expanded our platform to support 
                    multiple languages and regional project hubs.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 font-bold text-xl text-primary">Today</div>
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

        {/* Team section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-xl">Alex Johnson</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-xl">Jamie Chen</h3>
                <p className="text-gray-600">Chief Product Officer</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-xl">Taylor Morgan</h3>
                <p className="text-gray-600">Head of Community</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be part of our growing network of talented individuals and exciting projects.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="font-semibold">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
