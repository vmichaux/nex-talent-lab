
import { useState, useEffect } from "react";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ApplicationModal } from "./ApplicationModal";
import { ApplicationSummary } from "./applications/ApplicationTypes";
import { ApplicationsList } from "./applications/ApplicationsList";
import { useFetchApplications } from "@/hooks/applications/useFetchApplications";

export function ReviewApplications() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [hasProjects, setHasProjects] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationSummary | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const { 
    applications, 
    loading, 
    error, 
    fetchApplications 
  } = useFetchApplications();

  const fetchApplicationSummary = async () => {
    if (!currentUser) return;
    
    try {
      const apps = await fetchApplications(currentUser.uid);
      setHasProjects(apps.length > 0);
      
    } catch (error) {
      console.error("Error in fetchApplicationSummary:", error);
    }
  };

  useEffect(() => {
    fetchApplicationSummary();
  }, [currentUser]);

  const handleOpenModal = (application: ApplicationSummary) => {
    setSelectedApplication(application);
    setModalOpen(true);
  };

  // If the user has no projects, don't show this section
  if (!hasProjects && !loading) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Review Applications
        </h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/requests')}>
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <ApplicationsList
        applications={applications.slice(0, 4)} // Only show 4 items
        loading={loading}
        error={error}
        onReview={handleOpenModal}
        onRetry={fetchApplicationSummary}
      />

      {/* Application Modal */}
      <ApplicationModal 
        application={selectedApplication}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRefresh={fetchApplicationSummary}
      />
    </div>
  );
}
