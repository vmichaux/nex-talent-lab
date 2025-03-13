
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Project } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const ApplyProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Application form state
  const [application, setApplication] = useState({
    coverLetter: "",
    relevantExperience: "",
    availabilityDate: "",
    timeCommitment: "",
    portfolioLink: ""
  });

  // Fetch project details
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const projectRef = doc(db, "projects", id);
        const projectSnap = await getDoc(projectRef);
        
        if (projectSnap.exists()) {
          const projectData = {
            id: projectSnap.id,
            ...projectSnap.data()
          } as Project;
          
          setProject(projectData);
        } else {
          toast({
            title: "Project not found",
            description: "The project you're trying to apply to doesn't exist or has been removed.",
            variant: "destructive"
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast({
          title: "Error",
          description: "Failed to load project details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplication(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Login required",
        description: "Please log in to apply for this project.",
        variant: "destructive"
      });
      return;
    }
    
    if (!project) return;
    
    try {
      setSubmitting(true);
      
      // Create application in Firestore
      await addDoc(collection(db, "applications"), {
        projectId: id,
        projectTitle: project.title,
        userId: currentUser.uid,
        userName: currentUser.displayName,
        userEmail: currentUser.email,
        ...application,
        status: "pending",
        createdAt: serverTimestamp()
      });
      
      toast({
        title: "Application submitted",
        description: "Your application has been successfully submitted. Project owner will review it shortly.",
      });
      
      navigate(`/project/${id}`);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading project details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-8 text-gray-600">The project you're trying to apply to doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="mr-2" size={16} />
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-1 text-gray-600 hover:text-gray-900"
            onClick={() => navigate(`/project/${id}`)}
          >
            <ArrowLeft size={16} />
            Back to Project
          </Button>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Apply to Collaborate</h1>
              <p className="text-gray-600 mb-4">Submit your application for the project:</p>
              <div className="inline-block">
                <Badge className="text-lg py-1 px-4 bg-purple-100 text-purple-800 hover:bg-purple-100">
                  {project.title}
                </Badge>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Why are you interested in this project? *</Label>
                    <Textarea 
                      id="coverLetter"
                      name="coverLetter"
                      placeholder="Explain why you're interested and what you can bring to this project..."
                      value={application.coverLetter}
                      onChange={handleInputChange}
                      required
                      className="min-h-32"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="relevantExperience">Relevant experience *</Label>
                    <Textarea 
                      id="relevantExperience"
                      name="relevantExperience"
                      placeholder="Describe your relevant skills and experience for this project..."
                      value={application.relevantExperience}
                      onChange={handleInputChange}
                      required
                      className="min-h-24"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="availabilityDate">When can you start? *</Label>
                      <Input 
                        id="availabilityDate"
                        name="availabilityDate"
                        placeholder="e.g., Immediately, Next week, After June 1..."
                        value={application.availabilityDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeCommitment">Time commitment *</Label>
                      <Input 
                        id="timeCommitment"
                        name="timeCommitment"
                        placeholder="e.g., 10 hours/week, Full-time..."
                        value={application.timeCommitment}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portfolioLink">Portfolio or relevant work samples (optional)</Label>
                    <Input 
                      id="portfolioLink"
                      name="portfolioLink"
                      placeholder="URL to your portfolio, GitHub, or relevant work samples"
                      value={application.portfolioLink}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-purple-600 hover:bg-purple-700 text-white" 
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplyProjectPage;
