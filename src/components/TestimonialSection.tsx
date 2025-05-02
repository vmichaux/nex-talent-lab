
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
  
  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center mb-6">
            <div className="flex space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-current h-5 w-5" />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-700 italic text-lg leading-relaxed">"{activeTestimonial.content}"</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={activeTestimonial.avatar} 
                alt={activeTestimonial.name}
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{activeTestimonial.name}</h4>
                <p className="text-sm text-gray-600">{activeTestimonial.role}, {activeTestimonial.company}</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-primary" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
