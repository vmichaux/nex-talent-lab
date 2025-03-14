
import { ApplicationSummary } from "./ApplicationTypes";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ApplicationDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  application: ApplicationSummary | null;
  onAccept: (applicationId: string) => Promise<void>;
  onDecline: (applicationId: string) => Promise<void>;
}

export function ApplicationDetailsDialog({ 
  open, 
  setOpen, 
  application, 
  onAccept, 
  onDecline 
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
        
        <ApplicationDetailsContent application={application} />
        
        <DialogFooter className="flex sm:justify-between">
          <div className="hidden sm:block">
            <Badge className={
              application.status === "accepted" ? "bg-green-100 text-green-800" :
              application.status === "declined" ? "bg-red-100 text-red-800" :
              "bg-yellow-100 text-yellow-800"
            }>
              Status: {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </div>
          
          {application.status === "pending" && (
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button 
                variant="outline" 
                onClick={() => onDecline(application.id)}
              >
                Decline
              </Button>
              <Button 
                onClick={() => onAccept(application.id)}
              >
                Accept
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Application details content component
function ApplicationDetailsContent({ application }: { application: ApplicationSummary }) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
        <p className="mt-1">{application.coverLetter}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-500">Relevant Experience</h4>
        <p className="mt-1">{application.relevantExperience}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Availability</h4>
          <p className="mt-1">{application.availabilityDate}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Time Commitment</h4>
          <p className="mt-1">{application.timeCommitment}</p>
        </div>
      </div>
      
      {application.portfolioLink && (
        <div>
          <h4 className="text-sm font-medium text-gray-500">Portfolio</h4>
          <a 
            href={application.portfolioLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline mt-1 inline-block"
          >
            {application.portfolioLink}
          </a>
        </div>
      )}
      
      <div>
        <h4 className="text-sm font-medium text-gray-500">Contact</h4>
        <p className="mt-1">{application.userEmail}</p>
      </div>
    </div>
  );
}
