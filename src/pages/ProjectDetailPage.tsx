
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { Project } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { getUserProfile } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/useProjects";
import { ProjectLoading } from "@/components/project-detail/ProjectLoading";
import { ProjectNotFound } from "@/components/project-detail/ProjectNotFound";
import { ProjectContent } from "@/components/project-detail/ProjectContent";
import { EditProjectForm } from "@/components/dashboard/EditProjectForm";

interface ProjectDetailPageProps {
  isEditing?: boolean;
}

const ProjectDetailPage = ({ isEditing = false }: ProjectDetailPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [owner, setOwner] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { updateProject } = useProjects();
  
  const [editedProject, setEditedProject] = useState<Partial<Project>>({});

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
          
          if (currentUser && projectData.userId === currentUser.uid) {
            setIsOwner(true);
          }
          
          if (projectData.userId) {
            const ownerProfile = await getUserProfile(projectData.userId);
            setOwner(ownerProfile);
          }
        } else {
          toast({
            title: "Project not found",
            description: "The project you're looking for doesn't exist or has been removed.",
            variant: "destructive"
          });
          setProject(null);
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
  }, [id, toast, currentUser]);

  const handleEditClick = () => {
    navigate(`/project/edit/${id}`);
  };

  const handleDeleteProject = async () => {
    if (!id || !isOwner) return;
    
    try {
      setLoading(true);
      await deleteDoc(doc(db, "projects", id));
      
      toast({
        title: "Project deleted",
        description: "Your project has been successfully deleted.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete the project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleApplyClick = () => {
    navigate(`/apply-project/${id}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProject = async () => {
    if (!id || !isOwner || !project) return;
    
    try {
      setSaving(true);
      
      const result = await updateProject(id, editedProject);
      
      if (result.success) {
        toast({
          title: "Project updated",
          description: "Your project has been successfully updated."
        });
        
        setProject({
          ...project,
          ...editedProject
        });
        
        navigate(`/project/${id}`);
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update the project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  const navigateBack = () => navigate("/dashboard");

  if (loading) {
    return <ProjectLoading />;
  }

  if (!project) {
    return <ProjectNotFound onBackClick={navigateBack} />;
  }

  if (isEditing && project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            <button 
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6 bg-transparent border-none p-0 cursor-pointer"
              onClick={() => navigate(`/project/${id}`)}
            >
              ← Back to Project
            </button>
            
            <EditProjectForm project={project} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProjectContent 
          project={project}
          isEditing={isEditing}
          isOwner={isOwner}
          editedProject={editedProject}
          owner={owner}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleInputChange={handleInputChange}
          handleEditClick={handleEditClick}
          handleDeleteProject={handleDeleteProject}
          handleApplyClick={handleApplyClick}
          navigateBack={navigateBack}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
