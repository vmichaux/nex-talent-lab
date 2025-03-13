
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function TestProfileIndicator() {
  const { activeTestProfile } = useAuth();
  const navigate = useNavigate();
  
  if (!activeTestProfile) return null;
  
  return (
    <div 
      className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 cursor-pointer hover:bg-purple-700 transition-colors"
      onClick={() => navigate('/profile/edit')}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <span className="font-medium">Test: {activeTestProfile.name}</span>
      </div>
    </div>
  );
}
