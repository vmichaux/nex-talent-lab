
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

interface ProfileActionButtonsProps {
  isProfileCompleted: boolean;
  onSave: () => void;
  onBackToDashboard: () => void;
}

const ProfileActionButtons = ({ 
  isProfileCompleted, 
  onSave, 
  onBackToDashboard 
}: ProfileActionButtonsProps) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row gap-4 justify-end">
      <Button 
        variant="outline" 
        onClick={onBackToDashboard}
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
  );
};

export default ProfileActionButtons;
