
import React from "react";
import { Loader } from "lucide-react";

interface AuthLoadingScreenProps {
  message?: string;
}

export const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({ 
  message = "Preparing your dashboard..." 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <Loader className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
};
