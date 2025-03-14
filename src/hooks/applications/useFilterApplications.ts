
import { useState, useEffect } from "react";
import { ApplicationSummary } from "@/components/dashboard/applications/ApplicationTypes";

export function useFilterApplications(applications: ApplicationSummary[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApplications, setFilteredApplications] = useState<ApplicationSummary[]>(applications);

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

  return {
    filteredApplications,
    searchQuery,
    setSearchQuery,
  };
}
