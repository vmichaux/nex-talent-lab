
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectFormNavigationProps {
  children: React.ReactNode;
  onSubmit: (e?: React.FormEvent) => void;
  loading: boolean;
  isValid: boolean;
  submitLabel?: string;
}

export function ProjectFormNavigation({ 
  children, 
  onSubmit, 
  loading, 
  isValid,
  submitLabel = "Create Project" 
}: ProjectFormNavigationProps) {
  const [activeTab, setActiveTab] = useState("basicInfo");

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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="basicInfo">Basic Info</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
        <TabsTrigger value="compensation">Compensation</TabsTrigger>
        <TabsTrigger value="additionalDetails">Additional Details</TabsTrigger>
      </TabsList>
      
      {/* Basic Info Tab */}
      <TabsContent value="basicInfo" className="space-y-4">
        {/* Basic Info content will be provided as children */}
        {children[0]}
        <div className="flex justify-end mt-4">
          <Button type="button" onClick={goToNextTab}>
            Next: Requirements
          </Button>
        </div>
      </TabsContent>
      
      {/* Requirements Tab */}
      <TabsContent value="requirements" className="space-y-4">
        {/* Requirements content will be provided as children */}
        {children[1]}
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
        {/* Compensation content will be provided as children */}
        {children[2]}
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
        {/* Additional Details content will be provided as children */}
        {children[3]}
        <div className="flex justify-between mt-4">
          <Button type="button" variant="outline" onClick={goToPreviousTab}>
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={loading || !isValid} 
            onClick={(e) => onSubmit(e)}
          >
            {loading ? "Saving..." : submitLabel}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
