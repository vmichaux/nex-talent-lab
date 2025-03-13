
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RequirementsTabProps {
  skillsWithLevel: Array<{skill: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert"}>;
  setSkillsWithLevel: (skills: Array<{skill: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert"}>) => void;
  deliverables: string[];
  setDeliverables: (deliverables: string[]) => void;
  projectDuration: string;
  setProjectDuration: (duration: string) => void;
  projectDeadline: string;
  setProjectDeadline: (deadline: string) => void;
  collaboratorsNeeded: number;
  setCollaboratorsNeeded: (count: number) => void;
}

export function RequirementsTab({
  skillsWithLevel,
  setSkillsWithLevel,
  deliverables,
  setDeliverables,
  projectDuration,
  setProjectDuration,
  projectDeadline,
  setProjectDeadline,
  collaboratorsNeeded,
  setCollaboratorsNeeded
}: RequirementsTabProps) {
  const [skillsInput, setSkillsInput] = useState("");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<"Beginner" | "Intermediate" | "Advanced" | "Expert">("Intermediate");

  const handleAddSkill = () => {
    if (skillsInput.trim()) {
      setSkillsWithLevel([...skillsWithLevel, { skill: skillsInput.trim(), level: selectedSkillLevel }]);
      setSkillsInput("");
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    setSkillsWithLevel(skillsWithLevel.filter((_, index) => index !== indexToRemove));
  };

  const handleSkillLevelChange = (index: number, level: "Beginner" | "Intermediate" | "Advanced" | "Expert") => {
    const updatedSkills = [...skillsWithLevel];
    updatedSkills[index].level = level;
    setSkillsWithLevel(updatedSkills);
  };

  const handleAddDeliverable = (deliverable: string) => {
    if (deliverable.trim() && !deliverables.includes(deliverable.trim())) {
      setDeliverables([...deliverables, deliverable.trim()]);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="space-y-4">
        <Label>Required Skills & Experience Level <span className="text-red-500">*</span></Label>
        
        <div className="flex flex-wrap gap-2 p-3 border rounded-md">
          {skillsWithLevel.map((item, index) => (
            <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
              <span>{item.skill} ({item.level})</span>
              <button 
                type="button" 
                onClick={() => handleRemoveSkill(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="Add a required skill..."
            className="flex-1"
          />
          <select 
            className="w-40 rounded-md border border-input bg-background px-3 py-2"
            value={selectedSkillLevel}
            onChange={(e) => setSelectedSkillLevel(e.target.value as "Beginner" | "Intermediate" | "Advanced" | "Expert")}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <Button type="button" onClick={handleAddSkill}>
            Add
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="deliverables">Deliverables & Timeline</Label>
        <Textarea
          id="deliverables"
          placeholder="List the expected deliverables for this project, e.g., 'Website mockup, functional prototype, etc.'"
          value={deliverables.join(', ')}
          onChange={(e) => setDeliverables(e.target.value.split(',').map(item => item.trim()))}
          className="min-h-[80px]"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="project-duration">Duration <span className="text-red-500">*</span></Label>
          <Input
            id="project-duration"
            value={projectDuration}
            onChange={(e) => setProjectDuration(e.target.value)}
            placeholder="e.g., 3 months, 6 weeks"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project-deadline">Deadline</Label>
          <Input
            id="project-deadline"
            value={projectDeadline}
            onChange={(e) => setProjectDeadline(e.target.value)}
            placeholder="e.g., December 31, 2023"
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="collaborators">Number of Collaborators Needed</Label>
        <select
          id="collaborators"
          value={collaboratorsNeeded}
          onChange={(e) => setCollaboratorsNeeded(Number(e.target.value))}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          <option value="1">1 person</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="5">3-5 people</option>
          <option value="10">5-10 people</option>
          <option value="0">Open team (unlimited)</option>
        </select>
      </div>
    </div>
  );
}
