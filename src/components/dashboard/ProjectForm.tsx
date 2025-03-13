
import { useState, useEffect } from "react";
import { ProjectFormData } from "./AddProjectButton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoTab } from "./project-form/BasicInfoTab";
import { RequirementsTab } from "./project-form/RequirementsTab";
import { CompensationTab } from "./project-form/CompensationTab";
import { AdditionalDetailsTab } from "./project-form/AdditionalDetailsTab";

interface ProjectFormProps {
  onSubmit: (formData: ProjectFormData) => Promise<void>;
  loading: boolean;
}

export function ProjectForm({ onSubmit, loading }: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState("basicInfo");
  
  // Basic Info
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("Technology");
  const [projectType, setProjectType] = useState("Short-term");
  const [projectStatus, setProjectStatus] = useState<"Open" | "Urgent" | "Closed">("Open");

  // Skills with level
  const [skillsWithLevel, setSkillsWithLevel] = useState<Array<{skill: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert"}>>([
    { skill: "React", level: "Intermediate" },
    { skill: "UI/UX Design", level: "Beginner" }
  ]);

  // Requirements
  const [deliverables, setDeliverables] = useState<string[]>(["Website mockup", "Functional prototype"]);
  const [projectDuration, setProjectDuration] = useState("3 months");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [collaboratorsNeeded, setCollaboratorsNeeded] = useState(2);

  // Compensation & Benefits
  const [compensation, setCompensation] = useState("Volunteer");
  const [compensationDetails, setCompensationDetails] = useState("");
  const [perks, setPerks] = useState<string[]>(["Mentorship", "Networking"]);
  const [tools, setTools] = useState<string[]>(["React", "Figma"]);

  // Additional Details
  const [projectGoal, setProjectGoal] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [location, setLocation] = useState<"Remote" | "In-person" | "Hybrid">("Remote");
  const [legalConstraints, setLegalConstraints] = useState("");
  const [budget, setBudget] = useState("");
  const [desiredProfiles, setDesiredProfiles] = useState<string[]>(["Student", "Freelancer"]);

  // Set default deadline to 3 months from now
  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    setProjectDeadline(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  }, []);

  const isFormValid = () => {
    return (
      projectName.trim() !== "" &&
      projectDescription.trim() !== "" &&
      skillsWithLevel.length > 0 &&
      projectGoal.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      return;
    }
    
    const formData: ProjectFormData = {
      projectName,
      projectDescription,
      projectCategory,
      projectType,
      skillsWithLevel,
      deliverables,
      projectDuration,
      projectDeadline,
      collaboratorsNeeded,
      compensation,
      compensationDetails,
      perks,
      tools,
      projectGoal,
      targetAudience,
      location,
      legalConstraints,
      budget,
      desiredProfiles,
      projectStatus
    };
    
    await onSubmit(formData);
  };

  const goToNextTab = () => {
    if (activeTab === "basicInfo") setActiveTab("requirements");
    else if (activeTab === "requirements") setActiveTab("compensation");
    else if (activeTab === "compensation") setActiveTab("additionalDetails");
  };

  const goToPreviousTab = () => {
    if (activeTab === "additionalDetails") setActiveTab("compensation");
    else if (activeTab === "compensation") setActiveTab("requirements");
    else if (activeTab === "requirements") setActiveTab("basicInfo");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basicInfo">Basic Info</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="additionalDetails">Additional Details</TabsTrigger>
        </TabsList>
        
        {/* Basic Info Tab */}
        <TabsContent value="basicInfo" className="space-y-4">
          <BasicInfoTab 
            projectName={projectName}
            setProjectName={setProjectName}
            projectDescription={projectDescription}
            setProjectDescription={setProjectDescription}
            projectCategory={projectCategory}
            setProjectCategory={setProjectCategory}
            projectType={projectType}
            setProjectType={setProjectType}
            projectStatus={projectStatus}
            setProjectStatus={setProjectStatus}
          />
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={goToNextTab}>
              Next: Requirements
            </Button>
          </div>
        </TabsContent>
        
        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-4">
          <RequirementsTab 
            skillsWithLevel={skillsWithLevel}
            setSkillsWithLevel={setSkillsWithLevel}
            deliverables={deliverables}
            setDeliverables={setDeliverables}
            projectDuration={projectDuration}
            setProjectDuration={setProjectDuration}
            projectDeadline={projectDeadline}
            setProjectDeadline={setProjectDeadline}
            collaboratorsNeeded={collaboratorsNeeded}
            setCollaboratorsNeeded={setCollaboratorsNeeded}
          />
          <div className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={goToPreviousTab}>
              Back
            </Button>
            <Button type="button" onClick={goToNextTab}>
              Next: Compensation
            </Button>
          </div>
        </TabsContent>
        
        {/* Compensation Tab */}
        <TabsContent value="compensation" className="space-y-4">
          <CompensationTab 
            compensation={compensation}
            setCompensation={setCompensation}
            compensationDetails={compensationDetails}
            setCompensationDetails={setCompensationDetails}
            budget={budget}
            setBudget={setBudget}
            perks={perks}
            setPerks={setPerks}
            tools={tools}
            setTools={setTools}
          />
          <div className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={goToPreviousTab}>
              Back
            </Button>
            <Button type="button" onClick={goToNextTab}>
              Next: Additional Details
            </Button>
          </div>
        </TabsContent>
        
        {/* Additional Details Tab */}
        <TabsContent value="additionalDetails" className="space-y-4">
          <AdditionalDetailsTab 
            projectGoal={projectGoal}
            setProjectGoal={setProjectGoal}
            targetAudience={targetAudience}
            setTargetAudience={setTargetAudience}
            location={location}
            setLocation={setLocation}
            legalConstraints={legalConstraints}
            setLegalConstraints={setLegalConstraints}
            desiredProfiles={desiredProfiles}
            setDesiredProfiles={setDesiredProfiles}
          />
          <div className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={goToPreviousTab}>
              Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
