
import { useState, useEffect } from "react";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { ApplicationModal } from "./ApplicationModal";
import { ApplicationSummary } from "./applications/ApplicationTypes";
import { ApplicationsList } from "./applications/ApplicationsList";

export function ReviewApplications() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasProjects, setHasProjects] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationSummary | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchApplicationSummary = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // First, check if the user has any projects
      const projectsQuery = query(
        collection(db, "projects"),
        where("userId", "==", currentUser.uid)
      );
      
      const projectsSnapshot = await getDocs(projectsQuery);
      const hasUserProjects = !projectsSnapshot.empty;
      setHasProjects(hasUserProjects);
      
      if (!hasUserProjects) {
        setLoading(false);
        return;
      }
      
      // Get all projects created by this user
      const projectIds = projectsSnapshot.docs.map(doc => doc.id);
      
      console.log("Fetching applications for projects:", projectIds);
      
      if (projectIds.length === 0) {
        setLoading(false);
        return;
      }
      
      // To handle cases where there are many projects, chunk the array
      // Firestore "in" queries are limited to 10 values
      const fetchApplicationsForProjectIds = async (ids: string[]) => {
        const applicationsQuery = query(
          collection(db, "applications"),
          where("projectId", "in", ids)
        );
        
        const applicationsSnapshot = await getDocs(applicationsQuery);
        return applicationsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            projectId: data.projectId,
            projectTitle: data.projectTitle || "Untitled Project",
            userName: data.userName || "Anonymous User",
            userEmail: data.userEmail || "No email provided",
            userId: data.userId, // Make sure we have userId
            status: data.status || "pending",
            coverLetter: data.coverLetter,
            relevantExperience: data.relevantExperience,
            availabilityDate: data.availabilityDate,
            timeCommitment: data.timeCommitment,
            portfolioLink: data.portfolioLink,
            feedback: data.feedback,
            createdAt: data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate() 
              : new Date(data.createdAt || Date.now())
          } as ApplicationSummary;
        });
      };
      
      // Handle case where we have more than 10 projects (Firestore limit for 'in' queries)
      let allApplications: ApplicationSummary[] = [];
      
      // Process projects in chunks of 10
      for (let i = 0; i < projectIds.length; i += 10) {
        const chunk = projectIds.slice(i, i + 10);
        const chunkApplications = await fetchApplicationsForProjectIds(chunk);
        allApplications = [...allApplications, ...chunkApplications];
      }
      
      // Fetch user full names for each application
      // We'll import getUserProfile from firebase lib to get user's full name
      const { getUserProfile } = await import("@/lib/firebase");
      
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
      
      const applicationsWithFullNames = await Promise.all(
        allApplications.map(async (app) => {
          // Only fetch if we have a userId and the userName is "Anonymous User" or similar
          if (app.userId && (app.userName === "Anonymous User" || app.userName === "No email provided")) {
            const fullName = await getUserFullName(app.userId);
            return {
              ...app,
              userName: fullName
            };
          }
          return app;
        })
      );
      
      console.log("All fetched applications:", applicationsWithFullNames);
      
      // Sort by creation date (newest first) and take only the most recent ones
      applicationsWithFullNames.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setApplications(applicationsWithFullNames.slice(0, 4)); // Only show 4 items
      
      if (applicationsWithFullNames.length > 0) {
        toast.success("Applications Loaded", {
          description: `Found ${applicationsWithFullNames.length} application(s) for your projects`,
          duration: 6000,
        });
      }
    } catch (error) {
      console.error("Error fetching application summary:", error);
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
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
        applications={applications}
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
