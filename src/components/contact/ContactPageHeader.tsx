
import React from "react";

const ContactPageHeader = () => {
  return <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 py-[64px]">
      <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
        We are Here for You
      </div>
      
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
        Contact Our Sales Team
      </h1>
      
      <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
        Have questions about our pricing, features, or need a custom solution? Our sales team is here to help.
      </p>
    </div>;
};

export default ContactPageHeader;
