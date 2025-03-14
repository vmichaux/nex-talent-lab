
import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs, doc, updateDoc, Timestamp, getDoc } from "firebase/firestore";
import { db, getUserProfile } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { ApplicationSummary } from "@/components/dashboard/applications/ApplicationTypes";

export function useApplicationsData() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get user's full name from their profile
  const getUserFullName = async (userId: string): Promise<string> => {
    try {
      if (!userId) return "Anonymous User";
      
      const userProfile = await getUserProfile(userId);
      
      if (userProfile && userProfile.firstName && userProfile.lastName) {
        return `${userProfile.firstName} ${userProfile.lastName}`;
      } else if (userProfile && userProfile.displayName) {
        return userProfile.displayName;
      }
      
      // If no profile data is found, return the default value
      return "Anonymous User";
    } catch (error) {
      console.error("Error fetching user full name:", error);
      return "Anonymous User";
    }
  };

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
            : new Date(doc.data().createdAt || Date.now())
        })) as ApplicationSummary[];
      };

      // Process projects in chunks of 10 (Firestore limit for 'in' queries)
      let allApplications: ApplicationSummary[] = [];
      for (let i = 0; i < projectIds.length; i += 10) {
        const chunk = projectIds.slice(i, i + 10);
        const chunkApplications = await fetchApplicationsChunk(chunk);
        allApplications = [...allApplications, ...chunkApplications];
      }
      
      // Fetch user full names for each application
      const applicationsWithFullNames = await Promise.all(
        allApplications.map(async (app) => {
          // Only fetch if we have a userId and the userName is "Anonymous User" or similar
          if (app.userId && (app.userName === "Anonymous User" || !app.userFullName)) {
            const fullName = await getUserFullName(app.userId);
            return {
              ...app,
              userFullName: fullName,
              // Only replace userName if it's the default "Anonymous User"
              userName: app.userName === "Anonymous User" ? fullName : app.userName
            };
          }
          return app;
        })
      );
      
      // Sort by creation date (newest first)
      applicationsWithFullNames.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setApplications(applicationsWithFullNames);
      setFilteredApplications(applicationsWithFullNames);
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
      (app.userFullName || app.userName).toLowerCase().includes(searchQuery.toLowerCase()) ||
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
