
import { useState, useCallback } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { ApplicationSummary } from "@/components/dashboard/applications/ApplicationTypes";
import { getUserFullName, formatApplication } from "./applicationUtils";

export function useFetchApplications() {
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch applications for the provided project IDs
  const fetchApplications = useCallback(async (userId: string | null) => {
    if (!userId) {
      setLoading(false);
      return [];
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // First, get all projects created by this user
      const projectsQuery = query(
        collection(db, "projects"),
        where("userId", "==", userId)
      );
      
      const projectsSnapshot = await getDocs(projectsQuery);
      const projectIds = projectsSnapshot.docs.map(doc => doc.id);
      
      if (projectIds.length === 0) {
        setApplications([]);
        setLoading(false);
        return [];
      }
      
      // Handle Firestore's limit of 10 values in 'in' queries
      const fetchApplicationsChunk = async (projectIdsChunk: string[]) => {
        const applicationsQuery = query(
          collection(db, "applications"),
          where("projectId", "in", projectIdsChunk)
        );
        
        const applicationsSnapshot = await getDocs(applicationsQuery);
        return applicationsSnapshot.docs.map(doc => 
          formatApplication(doc.id, doc.data())
        );
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
          if (app.userId && (!app.userFullName || app.userName === "Anonymous User")) {
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
      setLoading(false);
      return applicationsWithFullNames;
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications. Please try again later.");
      setLoading(false);
      return [];
    }
  }, []);

  return {
    applications,
    loading,
    error,
    fetchApplications,
    setApplications
  };
}
