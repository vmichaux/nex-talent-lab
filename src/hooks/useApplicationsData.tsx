
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useFetchApplications } from "./applications/useFetchApplications";
import { useFilterApplications } from "./applications/useFilterApplications";
import { useApplicationStatus } from "./applications/useApplicationStatus";

export function useApplicationsData() {
  const { currentUser } = useAuth();
  const { 
    applications, 
    loading, 
    error, 
    fetchApplications,
    setApplications 
  } = useFetchApplications();
  
  const {
    filteredApplications,
    searchQuery,
    setSearchQuery,
  } = useFilterApplications(applications);
  
  const {
    isSubmitting,
    updateApplicationStatus: updateStatus
  } = useApplicationStatus();

  // Fetch applications on component mount or when currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchApplications(currentUser.uid);
    }
  }, [fetchApplications, currentUser]);

  // Handle application status update
  const updateApplicationStatus = async (applicationId: string, newStatus: 'accepted' | 'rejected', feedback?: string) => {
    return updateStatus(
      applicationId,
      newStatus,
      feedback,
      applications,
      setApplications
    );
  };

  return {
    applications: filteredApplications,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    isSubmitting,
    fetchApplications: () => fetchApplications(currentUser?.uid || null),
    updateApplicationStatus
  };
}
