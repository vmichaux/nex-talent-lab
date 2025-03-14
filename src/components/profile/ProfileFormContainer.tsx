
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileFormContainerProps {
  children: React.ReactNode;
  onSave: () => Promise<void>;
  isProfileCompleted?: boolean;
}

export const ProfileFormContainer = ({ 
  children, 
  onSave, 
  isProfileCompleted = false 
}: ProfileFormContainerProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
      {children}
      
      <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row gap-4 justify-end">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button 
          onClick={onSave}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {isProfileCompleted ? "Update Profile" : "Save Profile"}
        </Button>
      </div>
    </div>
  );
};
