
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApplicationSummary } from "@/components/dashboard/applications/ApplicationTypes";
import { ApplicationSearch } from "@/components/dashboard/applications/ApplicationSearch";
import { ApplicationTabs } from "@/components/dashboard/applications/ApplicationTabs";
import { ApplicationDetailsDialog } from "@/components/dashboard/applications/ApplicationDetailsDialog";
import { FeedbackDialog } from "@/components/dashboard/applications/FeedbackDialog";
import { useApplicationsData } from "@/hooks/useApplicationsData";

const ReviewApplicationsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("application");
  
  const {
    applications,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    isSubmitting,
    fetchApplications,
    updateApplicationStatus
  } = useApplicationsData();

  const [selectedApplication, setSelectedApplication] = useState<ApplicationSummary | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  // Check for applicationId in URL on page load
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    if (applicationId && applications.length > 0) {
      const application = applications.find(app => app.id === applicationId);
      if (application) {
        setSelectedApplication(application);
        setDetailsOpen(true);
      }
    }
  }, [applicationId, applications, currentUser, navigate]);

  const handleAccept = async (applicationId: string, feedback?: string) => {
    try {
      await updateApplicationStatus(applicationId, "accepted", feedback);
      setDetailsOpen(false);
      setMessageDialogOpen(false);
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleReject = async (applicationId: string, feedback?: string) => {
    try {
      await updateApplicationStatus(applicationId, "rejected", feedback);
      setDetailsOpen(false);
      setMessageDialogOpen(false);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Applications</h1>
          <p className="text-gray-600">
            Manage applications for your projects and connect with potential collaborators.
          </p>
        </div>

        <ApplicationSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <ApplicationTabs
          applications={applications}
          loading={loading}
          error={error}
          onViewDetails={(application) => {
            setSelectedApplication(application);
            setDetailsOpen(true);
          }}
        />
      </main>
      
      <ApplicationDetailsDialog
        open={detailsOpen}
        setOpen={setDetailsOpen}
        application={selectedApplication}
        onOpenFeedback={() => setMessageDialogOpen(true)}
        onAccept={handleAccept}
        onReject={handleReject}
        isSubmitting={isSubmitting}
      />
      
      <FeedbackDialog
        open={messageDialogOpen}
        setOpen={setMessageDialogOpen}
        application={selectedApplication}
        onAccept={handleAccept}
        onReject={handleReject}
        isSubmitting={isSubmitting}
      />
      
      <Footer />
    </div>
  );
};

export default ReviewApplicationsPage;
