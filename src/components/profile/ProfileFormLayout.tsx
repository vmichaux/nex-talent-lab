
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileFormLayoutProps {
  children: React.ReactNode;
  isProfileCompleted: boolean;
  onSave: () => void;
  loading?: boolean;
}

export const ProfileFormLayout = ({
  children,
  isProfileCompleted,
  onSave,
  loading = false
}: ProfileFormLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-32 bg-gray-200 rounded w-full mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
