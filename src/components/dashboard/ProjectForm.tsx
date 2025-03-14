
import { useProjectFormState } from "@/hooks/useProjectFormState";
import { ProjectFormData } from "./AddProjectButton";
import { ProjectFormNavigation } from "./project-form/ProjectFormNavigation";
import { BasicInfoTab } from "./project-form/BasicInfoTab";
import { RequirementsTab } from "./project-form/RequirementsTab";
import { CompensationTab } from "./project-form/CompensationTab";
import { AdditionalDetailsTab } from "./project-form/AdditionalDetailsTab";

interface ProjectFormProps {
  onSubmit: (formData: ProjectFormData) => Promise<void>;
  loading: boolean;
  initialData?: ProjectFormData;
  submitLabel?: string;
}

export function ProjectForm({ 
  onSubmit, 
  loading, 
  initialData,
  submitLabel = "Create Project" 
}: ProjectFormProps) {
  const formState = useProjectFormState(initialData);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.isFormValid()) {
      return;
    }
    
    await onSubmit(formState.getFormData());
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProjectFormNavigation 
        onSubmit={handleSubmit}
        loading={loading}
        isValid={formState.isFormValid()}
        submitLabel={submitLabel}
      >
        {/* Basic Info Tab */}
        <BasicInfoTab 
          projectName={formState.projectName}
          setProjectName={formState.setProjectName}
          projectDescription={formState.projectDescription}
          setProjectDescription={formState.setProjectDescription}
          projectCategory={formState.projectCategory}
          setProjectCategory={formState.setProjectCategory}
          projectType={formState.projectType}
          setProjectType={formState.setProjectType}
          projectStatus={formState.projectStatus}
          setProjectStatus={formState.setProjectStatus}
        />
        
        {/* Requirements Tab */}
        <RequirementsTab 
          skillsWithLevel={formState.skillsWithLevel}
          setSkillsWithLevel={formState.setSkillsWithLevel}
          deliverables={formState.deliverables}
          setDeliverables={formState.setDeliverables}
          projectDuration={formState.projectDuration}
          setProjectDuration={formState.setProjectDuration}
          projectDeadline={formState.projectDeadline}
          setProjectDeadline={formState.setProjectDeadline}
          collaboratorsNeeded={formState.collaboratorsNeeded}
          setCollaboratorsNeeded={formState.setCollaboratorsNeeded}
        />
        
        {/* Compensation Tab */}
        <CompensationTab 
          compensation={formState.compensation}
          setCompensation={formState.setCompensation}
          compensationDetails={formState.compensationDetails}
          setCompensationDetails={formState.setCompensationDetails}
          budget={formState.budget}
          setBudget={formState.setBudget}
          perks={formState.perks}
          setPerks={formState.setPerks}
          tools={formState.tools}
          setTools={formState.setTools}
        />
        
        {/* Additional Details Tab */}
        <AdditionalDetailsTab 
          projectGoal={formState.projectGoal}
          setProjectGoal={formState.setProjectGoal}
          targetAudience={formState.targetAudience}
          setTargetAudience={formState.setTargetAudience}
          location={formState.location}
          setLocation={formState.setLocation}
          legalConstraints={formState.legalConstraints}
          setLegalConstraints={formState.setLegalConstraints}
          desiredProfiles={formState.desiredProfiles}
          setDesiredProfiles={formState.setDesiredProfiles}
        />
      </ProjectFormNavigation>
    </form>
  );
}
