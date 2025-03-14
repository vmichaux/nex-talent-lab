
import { Button } from "@/components/ui/button";
import { AddProjectButton } from "@/components/dashboard/AddProjectButton";
import { ProjectSearch } from "@/components/dashboard/ProjectSearch";

interface ProjectActionsProps {
  showProjectModal: boolean;
  setShowProjectModal: (show: boolean) => void;
}

export function ProjectActions({ showProjectModal, setShowProjectModal }: ProjectActionsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
      <div>
        <AddProjectButton open={showProjectModal} setOpen={setShowProjectModal} />
      </div>
      <div className="flex-1">
        <ProjectSearch />
      </div>
    </div>
  );
}
