
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

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
  const handleTogglePerk = (perk: string) => {
    if (perks.includes(perk)) {
      setPerks(perks.filter(p => p !== perk));
    } else {
      setPerks([...perks, perk]);
    }
  };

  const handleToggleTool = (tool: string) => {
    if (tools.includes(tool)) {
      setTools(tools.filter(t => t !== tool));
    } else {
      setTools([...tools, tool]);
    }
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
      
      <div className="grid gap-2">
        <Label>Tools & Technologies</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["React", "Figma", "Adobe", "Python", "WordPress", "Node.js", "Notion", "Canva"].map((tool) => (
            <div key={tool} className="flex items-center space-x-2">
              <Checkbox 
                id={`tool-${tool}`} 
                checked={tools.includes(tool)}
                onCheckedChange={() => handleToggleTool(tool)}
              />
              <label
                htmlFor={`tool-${tool}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {tool}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
