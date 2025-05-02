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
  return;
}