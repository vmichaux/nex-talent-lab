
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InterestsFormProps {
  interests: string[];
  onAddInterest: (interest: string) => void;
  onRemoveInterest: (interest: string) => void;
}

const InterestsForm = ({ interests, onAddInterest, onRemoveInterest }: InterestsFormProps) => {
  const { toast } = useToast();
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    
    if (!interests.includes(newInterest.trim()) && interests.length < 6) {
      onAddInterest(newInterest.trim());
      setNewInterest("");
    } else if (interests.length >= 6) {
      toast({
        title: "Maximum interests reached",
        description: "You can only add up to 6 interests",
        variant: "destructive"
      });
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
                onClick={() => onRemoveInterest(interest)}
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
                  handleAddInterest();
                }
              }}
            />
            <Button 
              type="button"
              onClick={handleAddInterest}
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

export default InterestsForm;
