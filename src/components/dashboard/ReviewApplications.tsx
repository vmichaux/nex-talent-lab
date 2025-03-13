
import { useState, useEffect } from "react";
import { FileText, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { ApplicationModal } from "./ApplicationModal";

interface ApplicationSummary {
  id: string;
  projectId: string;
  projectTitle: string;
  userName: string;
  userEmail: string;
  coverLetter?: string;
  relevantExperience?: string;
  availabilityDate?: string;
  timeCommitment?: string;
  portfolioLink?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  feedback?: string;
}

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
            status: data.status || "pending",
            coverLetter: data.coverLetter,
            relevantExperience: data.relevantExperience,
            availabilityDate: data.availabilityDate,
            timeCommitment: data.timeCommitment,
            portfolioLink: data.portfolioLink,
            feedback: data.feedback,
            createdAt: data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate() 
              : new Date()
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
      
      console.log("All fetched applications:", allApplications);
      
      // Sort by creation date (newest first) and take only the most recent ones
      allApplications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setApplications(allApplications.slice(0, 5));
      
      if (allApplications.length > 0) {
        toast({
          title: "Applications Loaded",
          description: `Found ${allApplications.length} application(s) for your projects`,
          duration: 3000,
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

  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleOpenModal = (application: ApplicationSummary) => {
    setSelectedApplication(application);
    setModalOpen(true);
  };

  // If the user has no projects, don't show this section
  if (!hasProjects && !loading) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Review Applications
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/requests')}>
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {loading ? (
        <Card>
          <CardContent className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              <p className="mb-4">{error}</p>
              <Button 
                variant="outline" 
                onClick={() => fetchApplicationSummary()}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : applications.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500">
              <p className="mb-4">No applications have been submitted to your projects yet.</p>
              <Button variant="outline" onClick={() => navigate('/explore-projects')}>
                Browse Projects
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 bg-white rounded-lg border shadow-sm p-6">
          <div className="grid grid-cols-1 divide-y">
            {applications.map((app) => (
              <div key={app.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-medium mb-1">
                      {app.userName} applied to <span className="text-primary">{app.projectTitle}</span>
                    </h3>
                    <p className="text-sm text-gray-500">{formatDate(app.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={
                      app.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                      app.status === "declined" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                      "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOpenModal(app)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
