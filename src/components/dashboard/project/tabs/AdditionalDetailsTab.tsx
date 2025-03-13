
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectFormData } from "@/types/project-form";

interface AdditionalDetailsTabProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  goToPreviousTab: () => void;
  loading: boolean;
}

export function AdditionalDetailsTab({ 
  formData, 
  setFormData, 
  goToPreviousTab,
  loading
}: AdditionalDetailsTabProps) {
  const handleToggleProfile = (profile: string) => {
    if (formData.desiredProfiles.includes(profile)) {
      setFormData({
        ...formData, 
        desiredProfiles: formData.desiredProfiles.filter(p => p !== profile)
      });
    } else {
      setFormData({
        ...formData, 
        desiredProfiles: [...formData.desiredProfiles, profile]
      });
    }
  };

  return (
    <TabsContent value="additionalDetails" className="space-y-4">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="projectGoal">Project Goal & Expected Outcomes <span className="text-red-500">*</span></Label>
          <Textarea
            id="projectGoal"
            value={formData.projectGoal}
            onChange={(e) => setFormData({...formData, projectGoal: e.target.value})}
            placeholder="What are you hoping to achieve with this project?"
            className="min-h-[80px]"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="targetAudience">Target Audience & Project Impact</Label>
          <Textarea
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
            placeholder="Who is this project aimed at? What impact do you hope to have?"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">Project Location</Label>
          <select
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({
              ...formData, 
              location: e.target.value as "Remote" | "In-person" | "Hybrid"
            })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="Remote">Fully Remote</option>
            <option value="In-person">In-person</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="legalConstraints">Legal Constraints</Label>
          <Textarea
            id="legalConstraints"
            value={formData.legalConstraints}
            onChange={(e) => setFormData({...formData, legalConstraints: e.target.value})}
            placeholder="Any NDAs, confidentiality requirements, or IP considerations?"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="grid gap-2">
          <Label>Desired Profiles</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Student", "Freelancer", "Professional", "Teacher", "Startup", "Entrepreneur"].map((profile) => (
              <div key={profile} className="flex items-center space-x-2">
                <Checkbox 
                  id={`profile-${profile}`} 
                  checked={formData.desiredProfiles.includes(profile)}
                  onCheckedChange={() => handleToggleProfile(profile)}
                />
                <label
                  htmlFor={`profile-${profile}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {profile}
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
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </TabsContent>
  );
}
