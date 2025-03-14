
import { Heart, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface InterestsFormProps {
  interests: string[];
  handleAddInterest: (interest: string) => void;
  handleRemoveInterest: (interest: string) => void;
}

export const InterestsForm = ({
  interests,
  handleAddInterest,
  handleRemoveInterest
}: InterestsFormProps) => {
  const [newInterest, setNewInterest] = useState("");

  const onAddInterest = () => {
    if (newInterest.trim()) {
      handleAddInterest(newInterest);
      setNewInterest("");
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary" />
        Interests (2-6)
      </h3>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {interests.map((interest, index) => (
            <div 
              key={`interest-${index}`}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full"
            >
              <span>{interest}</span>
              <button 
                type="button"
                onClick={() => handleRemoveInterest(interest)}
                className="text-primary hover:text-primary/70 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          {interests.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              Add at least 2 interests to help us match you with relevant opportunities
            </p>
          )}
        </div>
        
        {interests.length < 6 && (
          <div className="flex gap-2">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add an interest (e.g., Design, AI, Teaching)"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onAddInterest();
                }
              }}
            />
            <Button 
              type="button"
              onClick={onAddInterest}
              variant="outline"
              className="gap-1"
              disabled={!newInterest.trim()}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
