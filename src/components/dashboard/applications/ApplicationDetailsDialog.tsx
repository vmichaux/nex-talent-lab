
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApplicationSummary } from "./ApplicationTypes";
import { ApplicationStatus } from "./ApplicationStatus";
import { ApplicationActions } from "./ApplicationActions";
import { ApplicationDetailContent } from "./ApplicationDetailContent";

interface ApplicationDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  application: ApplicationSummary | null;
  onOpenFeedback: () => void;
  onAccept: (applicationId: string) => Promise<void>;
  onReject: (applicationId: string) => Promise<void>;
  isSubmitting: boolean;
}

export function ApplicationDetailsDialog({
  open,
  setOpen,
  application,
  onOpenFeedback,
  onAccept,
  onReject,
  isSubmitting
}: ApplicationDetailsDialogProps) {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Application from {application.userName}</DialogTitle>
          <DialogDescription>
            For project: {application.projectTitle}
          </DialogDescription>
        </DialogHeader>
        
        <ApplicationDetailContent application={application} />
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="sm:order-1 order-2 flex justify-start">
            <ApplicationStatus status={application.status} />
          </div>
          
          {(application.status === "pending") && (
            <ApplicationActions 
              applicationId={application.id}
              onOpenFeedback={onOpenFeedback}
              onAccept={onAccept}
              onReject={onReject}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
