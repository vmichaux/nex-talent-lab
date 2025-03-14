
import React from "react";

export const ChatHeader = () => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
      <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
        AI Assistant
      </div>
      
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
        Chat with our AI
      </h1>
      
      <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
        Ask any questions or get assistance with your projects.
      </p>
    </div>
  );
};
