
import { Plus } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row gap-3">
        <AddProjectButton open={showProjectModal} setOpen={setShowProjectModal} />
      </div>
      <div className="w-full md:w-2/3 lg:w-2/3">
        <ProjectSearch />
      </div>
    </div>
  );
}
