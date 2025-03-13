
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface AdditionalDetailsTabProps {
  projectGoal: string;
  setProjectGoal: (value: string) => void;
  targetAudience: string;
  setTargetAudience: (value: string) => void;
  location: "Remote" | "In-person" | "Hybrid";
  setLocation: (value: "Remote" | "In-person" | "Hybrid") => void;
  legalConstraints: string;
  setLegalConstraints: (value: string) => void;
  desiredProfiles: string[];
  setDesiredProfiles: (profiles: string[]) => void;
}

export function AdditionalDetailsTab({
  projectGoal,
  setProjectGoal,
  targetAudience,
  setTargetAudience,
  location,
  setLocation,
  legalConstraints,
  setLegalConstraints,
  desiredProfiles,
  setDesiredProfiles
}: AdditionalDetailsTabProps) {
  const handleToggleProfile = (profile: string) => {
    if (desiredProfiles.includes(profile)) {
      setDesiredProfiles(desiredProfiles.filter(p => p !== profile));
    } else {
      setDesiredProfiles([...desiredProfiles, profile]);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="projectGoal">Project Goal & Expected Outcomes <span className="text-red-500">*</span></Label>
        <Textarea
          id="projectGoal"
          value={projectGoal}
          onChange={(e) => setProjectGoal(e.target.value)}
          placeholder="What are you hoping to achieve with this project?"
          className="min-h-[80px]"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="targetAudience">Target Audience & Project Impact</Label>
        <Textarea
          id="targetAudience"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="Who is this project aimed at? What impact do you hope to have?"
          className="min-h-[80px]"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="location">Project Location</Label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value as "Remote" | "In-person" | "Hybrid")}
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
          value={legalConstraints}
          onChange={(e) => setLegalConstraints(e.target.value)}
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
                checked={desiredProfiles.includes(profile)}
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
  );
}
