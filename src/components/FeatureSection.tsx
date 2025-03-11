import { Zap, Users, MessageSquare, TrendingUp, Shield, Check } from "lucide-react";
export function FeatureSection() {
  const features = [{
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "AI-Powered Matching",
    description: "Our advanced algorithm matches talents with projects based on skills, experience, and preferences for optimal collaboration."
  }, {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Talent Network",
    description: "Access a diverse community of skilled professionals across various creative and technical domains."
  }, {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Built-in Communication",
    description: "Seamless messaging and collaboration tools to keep your team connected throughout the project lifecycle."
  }, {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "Growth Opportunities",
    description: "Expand your portfolio, develop new skills, and connect with industry leaders through our platform."
  }, {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Secure Collaboration",
    description: "Advanced security features to protect your data, intellectual property, and communication."
  }, {
    icon: <Check className="h-10 w-10 text-primary" />,
    title: "Quality Assurance",
    description: "Verified profiles, skill assessments, and performance ratings to ensure high-quality collaborations."
  }];
  return <section className="bg-gray-50 py-[46px]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="block mb-1">Why Choose</span>
            <span className="block">NexTalent Lab</span>
          </h2>
          <p className="text-gray-600 py-0 my-[31px] mx-[46px]">
            Our platform offers innovative features designed to make talent discovery 
            and project collaboration seamless and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
}