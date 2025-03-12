
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface SimplifiedHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBackClick?: () => void;
}

export function SimplifiedHeader({ currentStep, totalSteps, onBackClick }: SimplifiedHeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {onBackClick ? (
            <button 
              onClick={onBackClick} 
              className="mr-3 p-2 rounded-full hover:bg-gray-50 transition-colors" 
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : (
            <Link 
              to="/" 
              className="mr-3 p-2 rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Go to homepage"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          )}
          <Link to="/" className="flex items-center gap-1">
            <span className="font-bold text-2xl gradient-text">NexTalent</span>
            <span className="font-bold text-2xl text-zinc-900">Lab</span>
          </Link>
        </div>
        
        <div className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    </header>
  );
}
