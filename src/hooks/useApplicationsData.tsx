
import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ApplicationSummary } from "@/components/dashboard/applications/ApplicationTypes";

export function useApplicationsData() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch applications for the current user's projects
  const fetchApplications = useCallback(async () => {
    if (!currentUser) {
      return;
    }
    
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
        setFilteredApplications([]);
        setLoading(false);
        return;
      }
      
      // Handle Firestore's limit of 10 values in 'in' queries
      const fetchApplicationsChunk = async (projectIdsChunk: string[]) => {
        const applicationsQuery = query(
          collection(db, "applications"),
          where("projectId", "in", projectIdsChunk)
        );
        
        const applicationsSnapshot = await getDocs(applicationsQuery);
        return applicationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt instanceof Timestamp 
            ? doc.data().createdAt.toDate() 
            : new Date(doc.data().createdAt)
        })) as ApplicationSummary[];
      };

      // Process projects in chunks of 10 (Firestore limit for 'in' queries)
      let allApplications: ApplicationSummary[] = [];
      for (let i = 0; i < projectIds.length; i += 10) {
        const chunk = projectIds.slice(i, i + 10);
        const chunkApplications = await fetchApplicationsChunk(chunk);
        allApplications = [...allApplications, ...chunkApplications];
      }
      
      // Sort by creation date (newest first)
      allApplications.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setApplications(allApplications);
      setFilteredApplications(allApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Filter applications based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredApplications(applications);
      return;
    }
    
    const filtered = applications.filter(app => 
      app.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredApplications(filtered);
  }, [searchQuery, applications]);

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
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: newStatus, feedback: feedback || app.feedback } 
            : app
        )
      );
      
      setFilteredApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: newStatus, feedback: feedback || app.feedback } 
            : app
        )
      );
      
      toast({
        title: `Application ${newStatus}`,
        description: newStatus === 'accepted' 
          ? "You have accepted the application. The applicant will be notified." 
          : "You have rejected the application. The applicant will be notified.",
        variant: newStatus === 'accepted' ? "default" : "destructive"
      });
      
      return;
    } catch (error) {
      console.error("Error updating application status:", error);
      toast({
        title: "Update failed",
        description: "Failed to update application status. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications: filteredApplications,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    isSubmitting,
    fetchApplications,
    updateApplicationStatus
  };
}
