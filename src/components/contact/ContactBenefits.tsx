
import React from "react";

const ContactBenefits = () => {
  return (
    <div className="bg-muted/50 p-6 rounded-lg h-full">
      <h2 className="text-2xl font-semibold mb-4 py-[26px]">Why Contact Sales?</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full mt-1">
            <span className="text-primary text-lg">1</span>
          </div>
          <div>
            <h3 className="font-medium">Custom Pricing</h3>
            <p className="text-muted-foreground">Get custom pricing tailored to your organization's needs.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full mt-1">
            <span className="text-primary text-lg">2</span>
          </div>
          <div>
            <h3 className="font-medium">Enterprise Solutions</h3>
            <p className="text-muted-foreground">Learn about our enterprise-grade features and support.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full mt-1">
            <span className="text-primary text-lg">3</span>
          </div>
          <div>
            <h3 className="font-medium">Personalized Demo</h3>
            <p className="text-muted-foreground">Schedule a demo customized to your specific requirements.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactBenefits;
