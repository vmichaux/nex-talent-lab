
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface EducationFormProps {
  education: { school: string; degree: string; year: string }[];
  handleEducationChange: (index: number, field: string, value: string) => void;
  addEducation: () => void;
}

const EducationForm = ({ education, handleEducationChange, addEducation }: EducationFormProps) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-primary" />
        Education
      </h3>
      <div className="space-y-6 mb-6">
        {education.map((edu, index) => (
          <div key={`edu-${index}`} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                placeholder="School/University"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                placeholder="Degree"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                placeholder="Year"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {index === education.length - 1 && (
                <Button onClick={addEducation} variant="outline" size="sm" className="whitespace-nowrap">
                  + Add Education
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
