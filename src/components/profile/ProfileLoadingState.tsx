
import React from "react";

export const ProfileLoadingState = () => {
  return (
    <div className="max-w-3xl mx-auto text-center p-10">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-32 bg-gray-200 rounded w-full mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <p className="mt-6 text-gray-500">Loading your profile...</p>
    </div>
  );
};
