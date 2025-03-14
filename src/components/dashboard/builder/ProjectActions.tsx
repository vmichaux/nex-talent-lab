
import { Button } from "@/components/ui/button";
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";
import { useNavigate } from "react-router-dom";

interface ProjectActionsProps {
  showProjectModal: boolean;
  setShowProjectModal: (show: boolean) => void;
}

export function ProjectActions({ showProjectModal, setShowProjectModal }: ProjectActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <AddProjectButton open={showProjectModal} setOpen={setShowProjectModal} />
      </div>
      <div className="md:w-1/2 lg:w-1/3">
        <ProjectSearch />
      </div>
    </div>
  );
}
