
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Project } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ApplicationFormProps {
  project: Project;
  projectId: string;
}

export function ApplicationForm({ project, projectId }: ApplicationFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  // Application form state
  const [application, setApplication] = useState({
    coverLetter: "",
    relevantExperience: "",
    availabilityDate: "",
    timeCommitment: "",
    portfolioLink: ""
  });

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
    
    try {
      setSubmitting(true);
      
      // Create application in Firestore
      await addDoc(collection(db, "applications"), {
        projectId: projectId,
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
      
      navigate(`/project/${projectId}`);
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

  return (
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
  );
}
