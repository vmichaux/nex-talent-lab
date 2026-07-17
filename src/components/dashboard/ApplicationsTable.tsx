import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notifyApplicationStatus } from "@/lib/notificationService";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define ApplicationData interface
interface ApplicationData {
  id: string;
  projectId: string;
  projectTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  coverLetter: string;
  relevantExperience: string;
  availabilityDate: string;
  timeCommitment: string;
  portfolioLink?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Timestamp;
}

export function ApplicationsTable() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Fetch applications for the current user's projects
  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        // First, get all projects created by this user
        const projectsQuery = query(
          collection(db, "projects"),
          where("userId", "==", currentUser.uid)
        );
        
        const projectsSnapshot = await getDocs(projectsQuery);
        const projectIds = projectsSnapshot.docs.map(doc => doc.id);
        
        if (projectIds.length === 0) {
          setApplications([]);
          return;
        }
        
        // Fetch applications in chunks — Firestore caps "in" queries at 30 ids,
        // so a builder with more projects than the cap would otherwise error out
        // and see nothing. Chunk by 10 to match the other application views.
        const fetchApplicationsChunk = async (idsChunk: string[]) => {
          const applicationsQuery = query(
            collection(db, "applications"),
            where("projectId", "in", idsChunk)
          );
          const applicationsSnapshot = await getDocs(applicationsQuery);
          return applicationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ApplicationData[];
        };

        let fetchedApplications: ApplicationData[] = [];
        for (let i = 0; i < projectIds.length; i += 10) {
          const chunk = projectIds.slice(i, i + 10);
          const chunkApplications = await fetchApplicationsChunk(chunk);
          fetchedApplications = [...fetchedApplications, ...chunkApplications];
        }
        
        // Sort by creation date (newest first)
        fetchedApplications.sort((a, b) => {
          const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date();
          const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date();
          return dateB.getTime() - dateA.getTime();
        });
        
        setApplications(fetchedApplications);
        console.log("Fetched applications:", fetchedApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [currentUser]);

  // Handle application status update
  const updateApplicationStatus = async (applicationId: string, newStatus: 'accepted' | 'rejected') => {
    try {
      const applicationRef = doc(db, "applications", applicationId);
      await updateDoc(applicationRef, { status: newStatus });

      // Notify the applicant of the decision (best-effort).
      const target = applications.find(app => app.id === applicationId);
      if (target?.userId) {
        await notifyApplicationStatus({
          applicantId: target.userId,
          applicationId,
          projectId: target.projectId,
          projectTitle: target.projectTitle,
          status: newStatus,
        });
      }

      // Update local state
      setApplications(prev =>
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: newStatus } 
            : app
        )
      );
      
      toast({
        title: `Application ${newStatus}`,
        description: `You have ${newStatus} the application.`,
      });
      
      // Close dialog if open
      if (detailsOpen) {
        setDetailsOpen(false);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      toast({
        title: "Update failed",
        description: "Failed to update application status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "Unknown";
    
    const date = timestamp instanceof Timestamp 
      ? timestamp.toDate() 
      : new Date(timestamp);
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center p-10 border rounded-md bg-gray-50">
          <p className="text-gray-600">No applications have been submitted to your projects yet.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.userName}</TableCell>
                  <TableCell>{application.projectTitle}</TableCell>
                  <TableCell>{formatDate(application.createdAt)}</TableCell>
                  <TableCell>{application.availabilityDate}</TableCell>
                  <TableCell>
                    <Badge className={
                      application.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                      application.status === "rejected" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                      "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedApplication(application);
                        setDetailsOpen(true);
                      }}
                      className="mr-2"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Application details dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedApplication && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Application from {selectedApplication.userName}</DialogTitle>
              <DialogDescription>
                For project: {selectedApplication.projectTitle}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
                <p className="mt-1">{selectedApplication.coverLetter}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Relevant Experience</h4>
                <p className="mt-1">{selectedApplication.relevantExperience}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                  <p className="mt-1">{selectedApplication.availabilityDate}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Time Commitment</h4>
                  <p className="mt-1">{selectedApplication.timeCommitment}</p>
                </div>
              </div>
              
              {selectedApplication.portfolioLink && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Portfolio</h4>
                  <a 
                    href={selectedApplication.portfolioLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mt-1 inline-block"
                  >
                    {selectedApplication.portfolioLink}
                  </a>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                <p className="mt-1">{selectedApplication.userEmail}</p>
              </div>
            </div>
            
            <DialogFooter className="flex sm:justify-between">
              <div className="hidden sm:block">
                <Badge className={
                  selectedApplication.status === "accepted" ? "bg-green-100 text-green-800" :
                  selectedApplication.status === "rejected" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }>
                  Status: {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                </Badge>
              </div>
              
              {selectedApplication.status === "pending" && (
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => updateApplicationStatus(selectedApplication.id, "rejected")}
                  >
                    Decline
                  </Button>
                  <Button 
                    onClick={() => updateApplicationStatus(selectedApplication.id, "accepted")}
                  >
                    Accept
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
