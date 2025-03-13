
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Star } from "lucide-react";
import { SkillLevel } from "@/types/profile";

interface SkillFormProps {
  skills: { name: string; level: SkillLevel }[];
  handleSkillNameChange: (index: number, value: string) => void;
  handleSkillLevelChange: (index: number, level: SkillLevel) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
}

const SkillsForm = ({ 
  skills, 
  handleSkillNameChange, 
  handleSkillLevelChange, 
  addSkill, 
  removeSkill 
}: SkillFormProps) => {
  const renderSkillLevelIcon = (level: SkillLevel) => {
    switch(level) {
      case "Beginner":
        return <div className="flex"><Star className="h-4 w-4 text-yellow-400" /></div>;
      case "Intermediate":
        return <div className="flex"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /></div>;
      case "Advanced":
        return <div className="flex"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /></div>;
      case "Expert":
        return <div className="flex"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-primary" />
        Skills
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {skills.map((skill, index) => (
          <div key={`skill-${index}`} className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillNameChange(index, e.target.value)}
                placeholder="e.g., UI Design, JavaScript"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Select
                value={skill.level}
                onValueChange={(value) => handleSkillLevelChange(index, value as SkillLevel)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">
                    <div className="flex items-center gap-2">
                      <span>Beginner</span>
                      {renderSkillLevelIcon("Beginner")}
                    </div>
                  </SelectItem>
                  <SelectItem value="Intermediate">
                    <div className="flex items-center gap-2">
                      <span>Intermediate</span>
                      {renderSkillLevelIcon("Intermediate")}
                    </div>
                  </SelectItem>
                  <SelectItem value="Advanced">
                    <div className="flex items-center gap-2">
                      <span>Advanced</span>
                      {renderSkillLevelIcon("Advanced")}
                    </div>
                  </SelectItem>
                  <SelectItem value="Expert">
                    <div className="flex items-center gap-2">
                      <span>Expert</span>
                      {renderSkillLevelIcon("Expert")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => removeSkill(index)} 
                  variant="outline" 
                  size="sm" 
                  className="px-2"
                  type="button"
                >
                  ✕
                </Button>
                
                {index === skills.length - 1 && (
                  <Button 
                    onClick={addSkill} 
                    variant="outline" 
                    size="sm" 
                    className="whitespace-nowrap"
                    type="button"
                  >
                    + Add Skill
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
