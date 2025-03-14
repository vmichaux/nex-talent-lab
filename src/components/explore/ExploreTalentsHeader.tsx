
import React from "react";
import { PageHeader } from "./PageHeader";

export const ExploreTalentsHeader = () => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-6 py-[32px] px-[44px] my-0">
      <PageHeader 
        subtitle="Explore Talents"
        title="Find Your Next Collaborators"
        description="Discover skilled professionals ready to collaborate on your next big idea. Browse profiles and find the perfect match for your team."
      />
    </div>
  );
};
