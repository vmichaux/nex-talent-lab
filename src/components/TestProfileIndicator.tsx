
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

export function TestProfileIndicator() {
  const { activeTestProfile, switchToMainProfile } = useAuth();
  const navigate = useNavigate();
  
  if (!activeTestProfile) return null;
  
  return (
    <div 
      className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span className="font-medium">Test: {activeTestProfile.name}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 text-white hover:bg-purple-700" 
          onClick={() => navigate('/profile/edit')}
        >
          <Icons.userCog className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="text-xs bg-purple-700 text-white hover:bg-purple-800 border-purple-500"
        onClick={switchToMainProfile}
      >
        <Icons.user className="h-3 w-3 mr-1" />
        Switch to Main
      </Button>
    </div>
  );
}
