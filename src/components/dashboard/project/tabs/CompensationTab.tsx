
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectFormData } from "@/types/project-form";

interface CompensationTabProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  goToNextTab: () => void;
  goToPreviousTab: () => void;
}

export function CompensationTab({ 
  formData, 
  setFormData, 
  goToNextTab, 
  goToPreviousTab 
}: CompensationTabProps) {
  const handleTogglePerk = (perk: string) => {
    if (formData.perks.includes(perk)) {
      setFormData({
        ...formData,
        perks: formData.perks.filter(p => p !== perk)
      });
    } else {
      setFormData({
        ...formData,
        perks: [...formData.perks, perk]
      });
    }
  };

  const handleToggleTool = (tool: string) => {
    if (formData.tools.includes(tool)) {
      setFormData({
        ...formData,
        tools: formData.tools.filter(t => t !== tool)
      });
    } else {
      setFormData({
        ...formData,
        tools: [...formData.tools, tool]
      });
    }
  };

  return (
    <TabsContent value="compensation" className="space-y-4">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="compensation">Compensation Type</Label>
          <select
            id="compensation"
            value={formData.compensation}
            onChange={(e) => setFormData({...formData, compensation: e.target.value})}
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
            value={formData.compensationDetails}
            onChange={(e) => setFormData({...formData, compensationDetails: e.target.value})}
            placeholder="Provide more details about the compensation..."
            className="min-h-[80px]"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="budget">Budget (if applicable)</Label>
          <Input
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
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
                  checked={formData.perks.includes(perk)}
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
                  checked={formData.tools.includes(tool)}
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
      
      <div className="flex justify-between mt-4">
        <Button type="button" variant="outline" onClick={goToPreviousTab}>
          Back
        </Button>
        <Button type="button" onClick={goToNextTab}>
          Next: Additional Details
        </Button>
      </div>
    </TabsContent>
  );
}
