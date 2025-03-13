
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
import { MessageSquare, Check, X, ExternalLink } from "lucide-react";
import { ApplicationSummary } from "./ApplicationTypes";

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
        
        <div className="space-y-6 py-4">
          {application.coverLetter && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
              <p className="mt-1 bg-gray-50 p-3 rounded">{application.coverLetter}</p>
            </div>
          )}
          
          {application.relevantExperience && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Relevant Experience</h4>
              <p className="mt-1 bg-gray-50 p-3 rounded">{application.relevantExperience}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {application.availabilityDate && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                <p className="mt-1 bg-gray-50 p-3 rounded">{application.availabilityDate}</p>
              </div>
            )}
            
            {application.timeCommitment && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Time Commitment</h4>
                <p className="mt-1 bg-gray-50 p-3 rounded">{application.timeCommitment}</p>
              </div>
            )}
          </div>
          
          {application.portfolioLink && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Portfolio</h4>
              <a 
                href={application.portfolioLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline mt-1 inline-flex items-center gap-1 bg-gray-50 p-3 rounded w-full"
              >
                {application.portfolioLink}
                <ExternalLink size={14} />
              </a>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Contact</h4>
            <p className="mt-1 bg-gray-50 p-3 rounded">{application.userEmail}</p>
          </div>
          
          {application.feedback && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Your Feedback</h4>
              <p className="mt-1 bg-gray-50 p-3 rounded">{application.feedback}</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="sm:order-1 order-2 flex justify-start">
            <Badge className={
              application.status === "accepted" ? "bg-green-100 text-green-800" :
              (application.status === "rejected" || application.status === "declined") ? "bg-red-100 text-red-800" :
              "bg-yellow-100 text-yellow-800"
            }>
              Status: {application.status === "pending" ? "Pending" : 
                     application.status === "accepted" ? "Accepted" : "Rejected"}
            </Badge>
          </div>
          
          {application.status === "pending" && (
            <div className="flex gap-2 w-full sm:w-auto justify-end sm:order-2 order-1">
              <Button 
                variant="outline" 
                className="gap-1"
                onClick={onOpenFeedback}
                disabled={isSubmitting}
              >
                <MessageSquare size={16} />
                Send Message
              </Button>
              <Button 
                variant="outline" 
                className="gap-1 border-red-300 text-red-600 hover:bg-red-50"
                disabled={isSubmitting}
                onClick={() => onReject(application.id)}
              >
                <X size={16} />
                Decline
              </Button>
              <Button 
                className="gap-1"
                disabled={isSubmitting}
                onClick={() => onAccept(application.id)}
              >
                <Check size={16} />
                Accept
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
