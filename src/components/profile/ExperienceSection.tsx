
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

interface Experience {
  company: string;
  position: string;
  duration: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
  onExperienceChange: (index: number, field: string, value: string) => void;
  addExperience: () => void;
}

export const ExperienceSection = ({
  experience,
  onExperienceChange,
  addExperience
}: ExperienceSectionProps) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-primary" />
        Experience
      </h3>
      <div className="space-y-6 mb-6">
        {experience.map((exp, index) => (
          <div key={`exp-${index}`} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => onExperienceChange(index, "company", e.target.value)}
                placeholder="Company"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => onExperienceChange(index, "position", e.target.value)}
                placeholder="Position"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => onExperienceChange(index, "duration", e.target.value)}
                placeholder="Duration (e.g., 2021-2023)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {index === experience.length - 1 && (
                <Button onClick={addExperience} variant="outline" size="sm" className="whitespace-nowrap">
                  + Add Experience
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
