
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast-sonner";
import { ApplicationSummary } from "./ApplicationTypes";

export function useApplicationsManager() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch applications for the current user's projects
  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // First, get all projects created by this user
        const projectsQuery = query(
          collection(db, "projects"),
          where("userId", "==", currentUser.uid)
        );
        
        const projectsSnapshot = await getDocs(projectsQuery);
        const projectIds = projectsSnapshot.docs.map(doc => doc.id);
        
        if (projectIds.length === 0) {
          setApplications([]);
          setLoading(false);
          return;
        }
        
        // Then, get all applications for these projects
        const applicationsQuery = query(
          collection(db, "applications"),
          where("projectId", "in", projectIds)
        );
        
        const applicationsSnapshot = await getDocs(applicationsQuery);
        const fetchedApplications = applicationsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            projectId: data.projectId,
            projectTitle: data.projectTitle,
            userId: data.userId,
            userName: data.userName,
            userEmail: data.userEmail,
            coverLetter: data.coverLetter,
            relevantExperience: data.relevantExperience,
            availabilityDate: data.availabilityDate,
            timeCommitment: data.timeCommitment,
            portfolioLink: data.portfolioLink,
            status: data.status,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
          };
        }) as ApplicationSummary[];
        
        // Sort by creation date (newest first)
        fetchedApplications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        
        setApplications(fetchedApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [currentUser]);

  // Handle application status update
  const updateApplicationStatus = async (applicationId: string, newStatus: 'accepted' | 'declined') => {
    try {
      const applicationRef = doc(db, "applications", applicationId);
      await updateDoc(applicationRef, { status: newStatus });
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: newStatus } 
            : app
        )
      );
      
      toast.success(`Application ${newStatus}`, {
        description: `You have ${newStatus} the application.`
      });
      
      return true;
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Update failed", {
        description: "Failed to update application status. Please try again."
      });
      return false;
    }
  };

  return {
    applications,
    loading,
    error,
    updateApplicationStatus
  };
}
