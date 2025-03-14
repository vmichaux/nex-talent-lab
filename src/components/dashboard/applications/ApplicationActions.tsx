
import { Button } from "@/components/ui/button";
import { MessageSquare, Check, X } from "lucide-react";

interface ApplicationActionsProps {
  applicationId: string;
  onOpenFeedback: () => void;
  onAccept: (applicationId: string) => Promise<void>;
  onReject: (applicationId: string) => Promise<void>;
  isSubmitting: boolean;
}

export function ApplicationActions({ 
  applicationId, 
  onOpenFeedback, 
  onAccept, 
  onReject, 
  isSubmitting 
}: ApplicationActionsProps) {
  return (
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
        onClick={() => onReject(applicationId)}
      >
        <X size={16} />
        Decline
      </Button>
      <Button 
        className="gap-1"
        disabled={isSubmitting}
        onClick={() => onAccept(applicationId)}
      >
        <Check size={16} />
        Accept
      </Button>
    </div>
  );
}
