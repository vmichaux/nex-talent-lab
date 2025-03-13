
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Plus, X } from "lucide-react";
import { ProficiencyLevel } from "@/types/profile";

interface LanguagesFormProps {
  languages: { name: string; proficiency: ProficiencyLevel }[];
  handleLanguageNameChange: (index: number, value: string) => void;
  handleLanguageProficiencyChange: (index: number, proficiency: ProficiencyLevel) => void;
  addLanguage: () => void;
  removeLanguage: (index: number) => void;
}

const LanguagesForm = ({
  languages,
  handleLanguageNameChange,
  handleLanguageProficiencyChange,
  addLanguage,
  removeLanguage
}: LanguagesFormProps) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Languages className="h-5 w-5 text-primary" />
        Language Proficiency
      </h3>
      <div className="space-y-6 mb-6">
        {languages.map((language, index) => (
          <div key={`language-${index}`} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-1">
              <Input
                type="text"
                value={language.name}
                onChange={(e) => handleLanguageNameChange(index, e.target.value)}
                placeholder="Language (e.g., English, Spanish)"
                className="w-full"
              />
            </div>
            
            <div className="md:col-span-1">
              <Select
                value={language.proficiency}
                onValueChange={(value) => handleLanguageProficiencyChange(index, value as ProficiencyLevel)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end md:col-span-1">
              <Button 
                onClick={() => removeLanguage(index)} 
                variant="outline" 
                size="sm" 
                className="px-2"
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
              
              {index === languages.length - 1 && (
                <Button 
                  onClick={addLanguage} 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 whitespace-nowrap"
                  type="button"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Language
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {languages.length === 0 && (
          <Button 
            onClick={addLanguage} 
            variant="outline" 
            size="sm" 
            className="whitespace-nowrap"
            type="button"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Language
          </Button>
        )}
      </div>
    </div>
  );
};

export default LanguagesForm;
