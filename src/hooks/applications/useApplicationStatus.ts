
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { toast } from "sonner";
import { ApplicationSummary } from "@/components/dashboard/applications/ApplicationTypes";

export function useApplicationStatus() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update application status in Firestore
  const updateApplicationStatus = async (
    applicationId: string, 
    newStatus: 'accepted' | 'rejected', 
    feedback?: string,
    applications?: ApplicationSummary[],
    setApplications?: (apps: ApplicationSummary[]) => void,
    setFilteredApplications?: (apps: ApplicationSummary[]) => void
  ) => {
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
      
      // Update local state if provided
      if (applications && setApplications) {
        setApplications(
          applications.map(app => 
            app.id === applicationId 
              ? { ...app, status: newStatus, feedback: feedback || app.feedback } 
              : app
          )
        );
      }
      
      if (setFilteredApplications) {
        setFilteredApplications(prev => 
          prev.map(app => 
            app.id === applicationId 
              ? { ...app, status: newStatus, feedback: feedback || app.feedback } 
              : app
          )
        );
      }
      
      if (newStatus === 'accepted') {
        toast.success("Application accepted", {
          description: "The applicant will be notified.",
          duration: 6000,
        });
      } else {
        toast.error("Application rejected", {
          description: "The applicant will be notified.",
          duration: 6000,
        });
      }
      
      return;
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status", {
        description: "Please try again.",
        duration: 6000,
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    updateApplicationStatus
  };
}
