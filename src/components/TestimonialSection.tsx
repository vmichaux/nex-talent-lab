import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
export function TestimonialSection() {
  const testimonials = [{
    id: 1,
    name: "Sarah Johnson",
    role: "UX Designer",
    company: "DesignCraft",
    content: "NexTalent Lab transformed how I collaborate with developers. The AI matching algorithm found me the perfect team for my app redesign project. The built-in tools made communication and file sharing seamless.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  }, {
    id: 2,
    name: "David Chen",
    role: "Full Stack Developer",
    company: "TechInnovate",
    content: "As a freelance developer, finding quality projects used to be challenging. With NexTalent Lab, I'm consistently matched with exciting opportunities that align with my skills and interests. The platform has significantly increased my productivity.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  }, {
    id: 3,
    name: "Emma Rodriguez",
    role: "Creative Director",
    company: "MediaPulse",
    content: "The talent we've found through NexTalent Lab has been exceptional. The platform's verification process ensures we only work with qualified professionals, and the collaboration tools have streamlined our entire creative process.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }];
  const [activeIndex, setActiveIndex] = useState(0);
  const nextTestimonial = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 px-[77px]">Hear from creative professionals and project builders who have found success on our platform.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3">
              <div className="p-2 bg-primary text-white rounded-full">
                <Star className="h-4 w-4 fill-white" />
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3">
              <div className="p-2 bg-secondary text-white rounded-full">
                <Star className="h-4 w-4 fill-white" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                  <img src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <div className="flex items-center mb-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonials[activeIndex].content}"</p>
                <div>
                  <p className="font-bold">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[activeIndex].role} • {testimonials[activeIndex].company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 gap-4">
            <button onClick={prevTestimonial} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => <button key={index} onClick={() => setActiveIndex(index)} className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-6 bg-primary" : "w-2 bg-gray-300"}`} aria-label={`Go to testimonial ${index + 1}`} />)}
            </div>
            <button onClick={nextTestimonial} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>;
}