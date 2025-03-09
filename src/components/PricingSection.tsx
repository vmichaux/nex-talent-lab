
import { Check, X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for individuals just getting started",
      features: [
        "1 active project",
        "Basic AI matching",
        "Standard profile",
        "Community support",
        "Limited messaging"
      ],
      notIncluded: [
        "Advanced project tools",
        "Priority matching",
        "Premium support",
        "Analytics dashboard"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Professional",
      price: "29",
      description: "For serious professionals and small teams",
      features: [
        "5 active projects",
        "Advanced AI matching",
        "Enhanced profile",
        "Priority support",
        "Unlimited messaging",
        "Project analytics",
        "File storage (10GB)"
      ],
      notIncluded: [
        "Team collaboration tools"
      ],
      buttonText: "Choose Professional",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Enterprise",
      price: "99",
      description: "For teams and organizations with complex needs",
      features: [
        "Unlimited projects",
        "Premium AI matching",
        "Featured profile",
        "24/7 dedicated support",
        "Unlimited messaging",
        "Advanced analytics",
        "File storage (100GB)",
        "Team management tools",
        "API access"
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Incubator",
      price: "Custom",
      description: "Full-service support for high-potential projects",
      features: [
        "All Enterprise features",
        "Dedicated PR & communications",
        "Event planning & management",
        "Strategic partnerships",
        "Sponsorship acquisition",
        "Marketing campaign support",
        "Media outreach & coverage",
        "Community building",
        "Growth strategy consulting"
      ],
      notIncluded: [],
      buttonText: "Apply Now",
      buttonVariant: "outline",
      popular: false,
      special: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm ${
                plan.popular ? "border-primary border-2" : plan.special ? "border-purple-400 border-2" : "border border-gray-200"
              } overflow-hidden relative`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 absolute top-4 right-4 rounded-full">
                  Most Popular
                </div>
              )}
              {plan.special && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white border-0">
                  <Rocket className="h-3.5 w-3.5 mr-1" />
                  Incubator Program
                </Badge>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price === "0" ? "€0" : plan.price === "Custom" ? "" : `€${plan.price}`}</span>
                  <span className="text-gray-500 ml-2">{plan.price === "Custom" ? "Custom Pricing" : "/month"}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <Link to={plan.special ? "/contact" : "/signup"}>
                  <Button 
                    variant={plan.buttonVariant === "default" ? "default" : "outline"} 
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : plan.special ? "border-purple-400 text-purple-600 hover:bg-purple-50" : ""}`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
              
              <div className="border-t border-gray-100 p-6">
                <p className="font-medium mb-4">What's included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${plan.special ? "text-purple-500" : "text-green-500"}`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                  
                  {plan.notIncluded.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-400">
                      <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>Need a custom solution? <a href="#" className="text-primary font-medium">Contact our sales team</a></p>
        </div>
      </div>
    </section>
  );
}
