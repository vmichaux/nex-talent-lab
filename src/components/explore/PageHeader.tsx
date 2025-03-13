
import React from "react";

interface PageHeaderProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

export const PageHeader = ({ 
  subtitle = "Find Your Next Venture",
  title = "Explore Projects",
  description = "Discover thrilling projects seeking talented collaborators or find your next creative challenge."
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
      <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">{subtitle}</div>
      
      <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
        {title}
      </h1>
      
      <p className="mb-10 text-lg text-gray-600 md:text-xl max-w-3xl whitespace-normal px-0">
        {description}
      </p>
    </div>
  );
};
