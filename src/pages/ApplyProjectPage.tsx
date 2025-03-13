
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Project } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ProjectLoadingState } from "@/components/project/ProjectLoadingState";
import { ProjectNotFound } from "@/components/project/ProjectNotFound";
import { ApplicationForm } from "@/components/project/ApplicationForm";

const ApplyProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <ProjectLoadingState />;
  }

  if (!project) {
    return <ProjectNotFound />;
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
            
            <ApplicationForm project={project} projectId={id || ''} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplyProjectPage;
