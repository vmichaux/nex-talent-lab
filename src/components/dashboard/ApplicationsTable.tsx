
import { useState } from "react";
import { useApplicationsManager } from "./applications/useApplicationsManager";
import { ApplicationSummary } from "./applications/ApplicationTypes";
import { ApplicationsTableView } from "./applications/ApplicationsTableView";
import { ApplicationDetailsDialog } from "./applications/ApplicationDetailsDialog";

export function ApplicationsTable() {
  const {
    applications,
    loading,
    error,
    updateApplicationStatus
  } = useApplicationsManager();
  
  const [selectedApplication, setSelectedApplication] = useState<ApplicationSummary | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // View application details
  const handleViewDetails = (application: ApplicationSummary) => {
    setSelectedApplication(application);
    setDetailsOpen(true);
  };

  // Handle application status update
  const handleStatusUpdate = async (applicationId: string, newStatus: 'accepted' | 'declined') => {
    await updateApplicationStatus(applicationId, newStatus);
    
    // Close dialog if open
    if (detailsOpen) {
      setDetailsOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <ApplicationsTableView 
        applications={applications}
        loading={loading}
        error={error}
        onViewDetails={handleViewDetails}
      />
      
      <ApplicationDetailsDialog
        open={detailsOpen}
        setOpen={setDetailsOpen}
        application={selectedApplication}
        onAccept={(id) => handleStatusUpdate(id, 'accepted')}
        onDecline={(id) => handleStatusUpdate(id, 'declined')}
      />
    </div>
  );
}
