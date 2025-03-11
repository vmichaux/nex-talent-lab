
import React from "react";

interface PageHeaderProps {
  label?: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
      {label && (
        <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          {label}
        </div>
      )}
      
      <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
        {title}
      </h1>
      
      {description && (
        <p className="mb-10 text-lg text-gray-600 md:text-xl max-w-3xl whitespace-normal">
          {description}
        </p>
      )}
    </div>
  );
}
