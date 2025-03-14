
import { Button } from "@/components/ui/button";
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";
import { useNavigate } from "react-router-dom";

interface ProjectActionsProps {
  showProjectModal: boolean;
  setShowProjectModal: (show: boolean) => void;
}

export function ProjectActions({
  showProjectModal,
  setShowProjectModal
}: ProjectActionsProps) {
  const navigate = useNavigate();
  
  const handleNewProject = () => {
    navigate('/dashboard/new-project');
  };
  
  return <div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <AddProjectButton 
            open={showProjectModal} 
            setOpen={setShowProjectModal} 
            onClick={handleNewProject} 
          />
          <Button type="submit" variant="default" className="h-10">Search</Button>
        </div>
        <div className="flex-1">
          <ProjectSearch hideButton={true} />
        </div>
      </div>
    </div>;
}
