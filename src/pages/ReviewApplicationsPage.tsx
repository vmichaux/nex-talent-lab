
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, X, MessageSquare, User, ExternalLink, Search } from "lucide-react";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Application } from "@/hooks/useApplications";

const ReviewApplicationsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const applicationId = searchParams.get("application");

  // Fetch applications for the current user's projects
  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) {
        navigate("/login");
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
          })) as Application[];
        };

        // Process projects in chunks of 10 (Firestore limit for 'in' queries)
        let allApplications: Application[] = [];
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
        
        // If there's an application ID in the URL, open that application's details
        if (applicationId) {
          const application = allApplications.find(app => app.id === applicationId);
          if (application) {
            setSelectedApplication(application);
            setDetailsOpen(true);
          } else {
            toast({
              title: "Application not found",
              description: "The specified application could not be found.",
              variant: "destructive"
            });
          }
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [currentUser, navigate, applicationId, toast]);

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
      
      // Close dialogs
      setDetailsOpen(false);
      setMessageDialogOpen(false);
      setFeedbackMessage("");
    } catch (error) {
      console.error("Error updating application status:", error);
      toast({
        title: "Update failed",
        description: "Failed to update application status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date instanceof Date ? date : new Date(date));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Applications</h1>
          <p className="text-gray-600">
            Manage applications for your projects and connect with potential collaborators.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search by applicant name or project..." 
                className="pl-10 h-12" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
          </TabsList>
          
          {loading ? (
            <div className="flex justify-center p-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <span className="ml-3 text-gray-600">Loading applications...</span>
            </div>
          ) : error ? (
            <div className="text-center p-10 border rounded-md bg-red-50">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center p-10 border rounded-md bg-gray-50">
              <p className="text-gray-600 mb-4">No applications found.</p>
              {searchQuery ? (
                <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
              ) : (
                <Button onClick={() => navigate("/explore-projects")}>Explore Projects</Button>
              )}
            </div>
          ) : (
            <>
              <TabsContent value="all">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div className="font-medium flex items-center gap-2">
                              <User size={16} className="text-gray-400" />
                              {application.userName}
                            </div>
                            <div className="text-sm text-gray-500">{application.userEmail}</div>
                          </TableCell>
                          <TableCell>{application.projectTitle}</TableCell>
                          <TableCell>{formatDate(application.createdAt)}</TableCell>
                          <TableCell>
                            <Badge className={
                              application.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                              application.status === "rejected" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                              "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }>
                              {application.status === "pending" ? "Pending" : 
                               application.status === "accepted" ? "Accepted" : "Rejected"}
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
              </TabsContent>
              
              <TabsContent value="pending">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.filter(app => app.status === "pending").map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div className="font-medium flex items-center gap-2">
                              <User size={16} className="text-gray-400" />
                              {application.userName}
                            </div>
                            <div className="text-sm text-gray-500">{application.userEmail}</div>
                          </TableCell>
                          <TableCell>{application.projectTitle}</TableCell>
                          <TableCell>{formatDate(application.createdAt)}</TableCell>
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
              </TabsContent>
              
              <TabsContent value="reviewed">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.filter(app => app.status !== "pending").map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div className="font-medium flex items-center gap-2">
                              <User size={16} className="text-gray-400" />
                              {application.userName}
                            </div>
                            <div className="text-sm text-gray-500">{application.userEmail}</div>
                          </TableCell>
                          <TableCell>{application.projectTitle}</TableCell>
                          <TableCell>
                            <Badge className={
                              application.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                              "bg-red-100 text-red-800 hover:bg-red-100"
                            }>
                              {application.status === "accepted" ? "Accepted" : "Rejected"}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(application.createdAt)}</TableCell>
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
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
      
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
                <p className="mt-1 bg-gray-50 p-3 rounded">{selectedApplication.coverLetter}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Relevant Experience</h4>
                <p className="mt-1 bg-gray-50 p-3 rounded">{selectedApplication.relevantExperience}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                  <p className="mt-1 bg-gray-50 p-3 rounded">{selectedApplication.availabilityDate}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Time Commitment</h4>
                  <p className="mt-1 bg-gray-50 p-3 rounded">{selectedApplication.timeCommitment}</p>
                </div>
              </div>
              
              {selectedApplication.portfolioLink && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Portfolio</h4>
                  <a 
                    href={selectedApplication.portfolioLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mt-1 inline-flex items-center gap-1 bg-gray-50 p-3 rounded w-full"
                  >
                    {selectedApplication.portfolioLink}
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                <p className="mt-1 bg-gray-50 p-3 rounded">{selectedApplication.userEmail}</p>
              </div>
              
              {selectedApplication.feedback && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Your Feedback</h4>
                  <p className="mt-1 bg-gray-50 p-3 rounded">{selectedApplication.feedback}</p>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="sm:order-1 order-2 flex justify-start">
                <Badge className={
                  selectedApplication.status === "accepted" ? "bg-green-100 text-green-800" :
                  selectedApplication.status === "rejected" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }>
                  Status: {selectedApplication.status === "pending" ? "Pending" : 
                         selectedApplication.status === "accepted" ? "Accepted" : "Rejected"}
                </Badge>
              </div>
              
              {selectedApplication.status === "pending" && (
                <div className="flex gap-2 w-full sm:w-auto justify-end sm:order-2 order-1">
                  <Button 
                    variant="outline" 
                    className="gap-1"
                    onClick={() => {
                      setMessageDialogOpen(true);
                    }}
                  >
                    <MessageSquare size={16} />
                    Send Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-1 border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => updateApplicationStatus(selectedApplication.id, "rejected")}
                  >
                    <X size={16} />
                    Decline
                  </Button>
                  <Button 
                    className="gap-1"
                    onClick={() => updateApplicationStatus(selectedApplication.id, "accepted")}
                  >
                    <Check size={16} />
                    Accept
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Message dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        {selectedApplication && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message to {selectedApplication.userName}</DialogTitle>
              <DialogDescription>
                Your message will be sent along with your decision.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Textarea 
                placeholder="Write your feedback or message here..."
                className="min-h-[150px]"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
              />
            </div>
            
            <DialogFooter className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setMessageDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => updateApplicationStatus(selectedApplication.id, "rejected", feedbackMessage)}
              >
                Decline with Message
              </Button>
              <Button 
                onClick={() => updateApplicationStatus(selectedApplication.id, "accepted", feedbackMessage)}
              >
                Accept with Message
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ReviewApplicationsPage;
