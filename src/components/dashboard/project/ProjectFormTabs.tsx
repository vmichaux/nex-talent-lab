
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { RequirementsTab } from "./tabs/RequirementsTab";
import { CompensationTab } from "./tabs/CompensationTab";
import { AdditionalDetailsTab } from "./tabs/AdditionalDetailsTab";
import { ProjectFormData } from "@/types/project-form";

interface ProjectFormTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function ProjectFormTabs({
  activeTab,
  setActiveTab,
  formData,
  setFormData,
  loading,
  handleSubmit
}: ProjectFormTabsProps) {
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
        
        <BasicInfoTab 
          formData={formData} 
          setFormData={setFormData} 
          goToNextTab={goToNextTab} 
        />
        
        <RequirementsTab 
          formData={formData} 
          setFormData={setFormData} 
          goToNextTab={goToNextTab} 
          goToPreviousTab={goToPreviousTab} 
        />
        
        <CompensationTab 
          formData={formData} 
          setFormData={setFormData} 
          goToNextTab={goToNextTab} 
          goToPreviousTab={goToPreviousTab} 
        />
        
        <AdditionalDetailsTab 
          formData={formData} 
          setFormData={setFormData} 
          goToPreviousTab={goToPreviousTab} 
          loading={loading} 
        />
      </Tabs>
    </form>
  );
}
