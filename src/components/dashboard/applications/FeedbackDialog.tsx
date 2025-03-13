
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { ApplicationSummary } from "./ApplicationTypes";

interface FeedbackDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  application: ApplicationSummary | null;
  onAccept: (applicationId: string, feedback: string) => Promise<void>;
  onReject: (applicationId: string, feedback: string) => Promise<void>;
  isSubmitting: boolean;
}

export function FeedbackDialog({ 
  open, 
  setOpen, 
  application, 
  onAccept, 
  onReject,
  isSubmitting
}: FeedbackDialogProps) {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Message to {application.userName}</DialogTitle>
          <DialogDescription>
            Your message will be sent along with your decision.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Textarea 
            placeholder="Write your feedback or message here..."
            className="min-h-[150px]"
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
          />
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
            disabled={isSubmitting}
            onClick={() => onReject(application.id, feedbackMessage)}
          >
            <X size={16} className="mr-2" />
            Decline with Message
          </Button>
          <Button 
            disabled={isSubmitting}
            onClick={() => onAccept(application.id, feedbackMessage)}
          >
            <Check size={16} className="mr-2" />
            Accept with Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
