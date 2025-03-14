
import { Check, X, Rocket, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function PricingSection() {
  const plans = [{
    name: "Talents",
    price: "0",
    description: "Perfect for individuals seeking collaborative opportunities",
    icon: <User className="h-5 w-5 text-primary mb-2 mr-2" />,
    features: ["Create a professional profile", "Apply to unlimited projects", "Basic AI matching algorithm", "Portfolio showcase", "Community support", "Standard messaging"],
    notIncluded: ["Advanced analytics", "Featured profile placement", "Priority support", "Team management tools"],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false
  }, {
    name: "Business",
    price: "Custom",
    description: "For organizations looking to find top talent and scale projects",
    icon: <Building2 className="h-5 w-5 text-primary mb-2 mr-2" />,
    features: ["Unlimited project postings", "Advanced AI talent matching", "Premium visibility in search", "Dedicated account manager", "Team collaboration tools", "Comprehensive analytics", "Priority support", "Bulk messaging capabilities"],
    notIncluded: [],
    buttonText: "Contact Sales",
    buttonVariant: "default",
    popular: true,
    linkTo: "/contact-sales#sales-title"
  }, {
    name: "Incubator",
    price: "Custom",
    description: "Full-service support for high-potential projects",
    icon: <Rocket className="h-5 w-5 text-purple-500 mb-2 mr-2" />,
    features: ["All Business features", "Strategic growth consulting", "Funding access and guidance", "Dedicated PR & communications", "Strategic partnerships", "Marketing campaign support", "Community building strategy", "Event planning & management", "Mentorship opportunities"],
    notIncluded: [],
    buttonText: "Apply Now",
    buttonVariant: "outline",
    popular: false,
    special: true,
    linkTo: "/contact-sales#sales-title"
  }];
  
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => <div key={index} className={`bg-white rounded-xl shadow-sm ${plan.popular ? "border-primary border-2" : plan.special ? "border-purple-400 border-2" : "border border-gray-200"} overflow-hidden relative`}>
              {plan.popular && <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 absolute top-4 right-4 rounded-full">
                  Most Popular
                </div>}
              {plan.special && <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white border-0">
                  <Rocket className="h-3.5 w-3.5 mr-1" />
                  Incubator Program
                </Badge>}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  {plan.icon}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price === "0" ? "€0" : plan.price === "Custom" ? "" : `€${plan.price}`}</span>
                  <span className="text-gray-500 ml-2">{plan.price === "Custom" ? "Custom Pricing" : "/month"}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <Link to={plan.linkTo || "/signup"}>
                  <Button variant={plan.buttonVariant === "default" ? "default" : "outline"} className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : plan.special ? "border-purple-400 text-purple-600 hover:bg-purple-50" : ""}`}>
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
              
              <div className="border-t border-gray-100 p-6">
                <p className="font-medium mb-4">What's included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => <li key={idx} className="flex items-start">
                      <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${plan.special ? "text-purple-500" : "text-green-500"}`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>)}
                  
                  {plan.notIncluded.map((feature, idx) => <li key={idx} className="flex items-start text-gray-400">
                      <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>)}
                </ul>
              </div>
            </div>)}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>Need a custom solution? <Link to="/contact-sales#sales-title" className="text-primary font-medium">Contact our sales team</Link></p>
        </div>
      </div>
    </section>;
}
