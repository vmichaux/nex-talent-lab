
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface CompensationTabProps {
  compensation: string;
  setCompensation: (value: string) => void;
  compensationDetails: string;
  setCompensationDetails: (value: string) => void;
  budget: string;
  setBudget: (value: string) => void;
  perks: string[];
  setPerks: (perks: string[]) => void;
  tools: string[];
  setTools: (tools: string[]) => void;
}

export function CompensationTab({
  compensation,
  setCompensation,
  compensationDetails,
  setCompensationDetails,
  budget,
  setBudget,
  perks,
  setPerks,
  tools,
  setTools
}: CompensationTabProps) {
  const [toolInput, setToolInput] = useState("");
  
  const handleTogglePerk = (perk: string) => {
    if (perks.includes(perk)) {
      setPerks(perks.filter(p => p !== perk));
    } else {
      setPerks([...perks, perk]);
    }
  };

  const handleAddTool = () => {
    if (toolInput.trim() && !tools.includes(toolInput.trim())) {
      setTools([...tools, toolInput.trim()]);
      setToolInput("");
    }
  };

  const handleRemoveTool = (indexToRemove: number) => {
    setTools(tools.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="compensation">Compensation Type</Label>
        <select
          id="compensation"
          value={compensation}
          onChange={(e) => setCompensation(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          <option value="Volunteer">Volunteer (unpaid)</option>
          <option value="Fixed Payment">Fixed Payment</option>
          <option value="Hourly Rate">Hourly Rate</option>
          <option value="Revenue Share">Revenue Share</option>
          <option value="Equity">Equity</option>
          <option value="Negotiable">Negotiable</option>
        </select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="compensationDetails">Compensation Details</Label>
        <Textarea
          id="compensationDetails"
          value={compensationDetails}
          onChange={(e) => setCompensationDetails(e.target.value)}
          placeholder="Provide more details about the compensation..."
          className="min-h-[80px]"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="budget">Budget (if applicable)</Label>
        <Input
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g., $500, $1000-2000, etc."
        />
      </div>
      
      <div className="grid gap-2">
        <Label>Additional Perks</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Mentorship", "Networking", "Access to premium tools", "Certifications", "Learning opportunity", "Portfolio piece", "References"].map((perk) => (
            <div key={perk} className="flex items-center space-x-2">
              <Checkbox 
                id={`perk-${perk}`} 
                checked={perks.includes(perk)}
                onCheckedChange={() => handleTogglePerk(perk)}
              />
              <label
                htmlFor={`perk-${perk}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {perk}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tools Used</Label>
        <div className="flex flex-wrap gap-2 p-3 border rounded-md mb-2">
          {tools.map((tool, index) => (
            <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
              <span>{tool}</span>
              <button 
                type="button" 
                onClick={() => handleRemoveTool(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
          {tools.length === 0 && (
            <div className="text-muted-foreground text-sm py-1">
              No tools added yet
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            placeholder="Add a tool (e.g., React, Figma)..."
            className="flex-1"
          />
          <Button type="button" onClick={handleAddTool}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
