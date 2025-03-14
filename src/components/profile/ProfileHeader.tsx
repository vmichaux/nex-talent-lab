
import React from "react";

interface ProfileHeaderProps {
  isProfileCompleted: boolean;
}

export const ProfileHeader = ({ isProfileCompleted }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
      <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
        {isProfileCompleted ? "Account Management" : "Profile Setup"}
      </div>
      
      <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
        Manage My Profile
      </h1>
      
      <p className="text-lg text-gray-600 md:text-xl max-w-3xl mb-8">
        {isProfileCompleted 
          ? "Update your information to keep your profile current and relevant."
          : "Tell us about yourself so we can match you with the right opportunities."}
      </p>
    </div>
  );
};
