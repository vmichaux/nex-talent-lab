
import { X, Check, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notifyApplicationStatus } from "@/lib/notificationService";

interface ApplicationModalProps {
  application: {
    id: string;
    projectId: string;
    projectTitle: string;
    userName: string;
    userEmail: string;
    userId?: string;
    coverLetter?: string;
    relevantExperience?: string;
    availabilityDate?: string;
    timeCommitment?: string;
    portfolioLink?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'declined';
    createdAt: Date;
    feedback?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export function ApplicationModal({ application, isOpen, onClose, onRefresh }: ApplicationModalProps) {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!application) return null;

  // Handle application status update
  const updateApplicationStatus = async (applicationId: string, newStatus: 'accepted' | 'rejected', feedback?: string) => {
    try {
      setIsSubmitting(true);
      const applicationRef = doc(db, "applications", applicationId);
      
      // Update fields based on the new status
      const updateData: Record<string, any> = { 
        status: newStatus 
      };
      
      // Add feedback if provided
      if (feedback) {
        updateData.feedback = feedback;
      }
      
      await updateDoc(applicationRef, updateData);

      // Notify the applicant of the decision (best-effort).
      if (application?.userId) {
        await notifyApplicationStatus({
          applicantId: application.userId,
          applicationId,
          projectId: application.projectId,
          projectTitle: application.projectTitle,
          status: newStatus,
          feedback,
        });
      }

      toast(
        newStatus === 'accepted'
          ? "Application accepted" 
          : "Application rejected", 
        {
          description: newStatus === 'accepted' 
            ? "You have accepted the application. The applicant will be notified." 
            : "You have rejected the application. The applicant will be notified.",
          duration: 6000,  // Changed from 10000 to 6000
        }
      );
      
      // Close dialogs
      setMessageDialogOpen(false);
      setFeedbackMessage("");
      if (onRefresh) onRefresh();
      onClose();
    } catch (error) {
      console.error("Error updating application status:", error);
      toast("Update failed", {
        description: "Failed to update application status. Please try again.",
        duration: 6000,  // Changed from 10000 to 6000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date instanceof Date ? date : new Date(date));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
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
                application.status === "rejected" || application.status === "declined" ? "bg-red-100 text-red-800" :
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
                  onClick={() => setMessageDialogOpen(true)}
                >
                  <MessageSquare size={16} />
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-1 border-red-300 text-red-600 hover:bg-red-50"
                  disabled={isSubmitting}
                  onClick={() => updateApplicationStatus(application.id, "rejected")}
                >
                  <X size={16} />
                  Decline
                </Button>
                <Button 
                  className="gap-1"
                  disabled={isSubmitting}
                  onClick={() => updateApplicationStatus(application.id, "accepted")}
                >
                  <Check size={16} />
                  Accept
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Message dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
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
              onClick={() => setMessageDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              disabled={isSubmitting}
              onClick={() => updateApplicationStatus(application.id, "rejected", feedbackMessage)}
            >
              Decline with Message
            </Button>
            <Button 
              disabled={isSubmitting}
              onClick={() => updateApplicationStatus(application.id, "accepted", feedbackMessage)}
            >
              Accept with Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
