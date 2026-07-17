import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { DashboardWelcome } from "@/components/DashboardWelcome";
import { TalentDashboard } from "@/components/dashboard/TalentDashboard";
import { BuilderDashboard } from "@/components/dashboard/BuilderDashboard";
import { DualRoleDashboard } from "@/components/dashboard/DualRoleDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/explore/PageHeader";
import { toast } from "sonner";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProjects } from "@/hooks/useProjects";
import { ProjectFormData } from "@/components/dashboard/AddProjectButton";
import { Project } from "@/types/project";
import { getUserFullName } from "@/lib/firebase";

interface DashboardPageProps {
  newProject?: boolean;
}

const DashboardPage = ({ newProject = false }: DashboardPageProps) => {
  const {
    isLoggedIn,
    currentUser,
    userData
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeRole, setActiveRole] = useState<"talent" | "builder" | "both">("talent");
  const [showProjectModal, setShowProjectModal] = useState(newProject);
  const [loading, setLoading] = useState(false);
  const { createProject } = useProjects();
  
  const getUserFirstName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.split(' ')[0];
    }
    if (currentUser?.email) {
      const emailUsername = currentUser.email.split('@')[0];
      const firstName = emailUsername.split(/[._-]/)[0];
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }
    return "friend";
  };
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/onboarding");
      return;
    }
    
    if (userData?.userRole) {
      const mappedRole = userData.userRole === "entrepreneur" ? "builder" : userData.userRole;
      setActiveRole(mappedRole);
      localStorage.setItem("userRole", userData.userRole);
    } else {
      const savedRole = localStorage.getItem("userRole");
      if (savedRole === "talent" || savedRole === "entrepreneur" || savedRole === "both") {
        setActiveRole(savedRole === "entrepreneur" ? "builder" : savedRole);
      } else if (isLoggedIn && !savedRole) {
        toast.info("Let's set up your profile", {
          description: "Please select your role to continue.",
          duration: 6000,
        });
        navigate("/onboarding");
        return;
      }
    }
    
    if (userData?.hasCompletedProfile) {
      setShowWelcome(false);
    }
  }, [isLoggedIn, navigate, userData]);
  
  useEffect(() => {
    setShowProjectModal(newProject);
  }, [newProject]);
  
  useEffect(() => {
    if (location.pathname === "/dashboard/new-project" && !showProjectModal) {
      navigate("/dashboard");
    }
  }, [showProjectModal, location.pathname, navigate]);

  const handleCompleteOnboarding = () => {
    setShowWelcome(false);
  };
  
  const handleRoleChange = (role: "talent" | "builder" | "both") => {
    setActiveRole(role);
    const storageRole = role === "builder" ? "entrepreneur" : role;
    localStorage.setItem("userRole", storageRole);
    
    if (currentUser) {
      import("@/services/authService").then(({ updateUserRole }) => {
        updateUserRole(currentUser, storageRole as "talent" | "entrepreneur" | "both")
          .catch(error => {
            console.error("Error updating role:", error);
          });
      });
    }
  };
  
  const handleSubmit = async (formData: ProjectFormData) => {
    if (!currentUser) {
      toast.error("Authentication required. You must be logged in to create a project.", {
        duration: 6000,
      });
      return;
    }

    try {
      setLoading(true);

      const userFullName = await getUserFullName(currentUser.uid);
      const skills = formData.skillsWithLevel.map(item => item.skill);

      const newProject: Omit<Project, 'id' | 'createdAt'> = {
        title: formData.projectName,
        description: formData.projectDescription,
        category: formData.projectCategory,
        skills,
        deadline: formData.projectDeadline,
        duration: formData.projectDuration,
        owner: userFullName || currentUser.displayName || currentUser.email || "Anonymous",
        featured: false,
        status: formData.projectStatus,
        applicants: 0,
        progress: 0,
        projectType: formData.projectType,
        skillsWithLevel: formData.skillsWithLevel,
        deliverables: formData.deliverables,
        timeline: formData.projectDuration,
        compensation: formData.compensation,
        compensationDetails: formData.compensationDetails,
        perks: formData.perks,
        tools: formData.tools,
        collaboratorsNeeded: formData.collaboratorsNeeded,
        projectGoal: formData.projectGoal,
        targetAudience: formData.targetAudience,
        location: formData.location,
        legalConstraints: formData.legalConstraints,
        budget: formData.budget,
        desiredProfiles: formData.desiredProfiles,
        userId: currentUser.uid,
      };

      const result = await createProject(newProject);

      if (result.success) {
        toast.success("Project created successfully", {
          duration: 6000,
        });
        setShowProjectModal(false);
        navigate("/dashboard");
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.", {
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {showWelcome ? <>
            <DashboardWelcome />
            <div className="text-center mb-10">
              
            </div>
          </> : <div className="relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
            
            <div className="w-full px-4 py-16">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-6 py-[32px] px-[44px] my-0">
                <PageHeader
                  subtitle={`Let's go ${getUserFirstName()}!`}
                  title="Your Journey"
                  description="Track your projects, connections, and activities all in one place."
                />
              </div>

              <div className="flex justify-center mb-10">
                <Tabs value={activeRole} onValueChange={value => handleRoleChange(value as "talent" | "builder" | "both")} className="w-full max-w-[1800px]">
                  <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
                    <TabsTrigger value="talent" className="flex items-center gap-2">
                      <span className="hidden md:inline">Talent Dashboard</span>
                      <span className="md:hidden">Talent</span>
                    </TabsTrigger>
                    <TabsTrigger value="builder" className="flex items-center gap-2">
                      <span className="hidden md:inline">Builder Dashboard</span>
                      <span className="md:hidden">Builder</span>
                    </TabsTrigger>
                    <TabsTrigger value="both" className="flex items-center gap-2">
                      <span className="hidden md:inline">Dual Role Dashboard</span>
                      <span className="md:hidden">Dual Role</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="talent" className="mt-8 px-4 max-w-[1800px] mx-auto">
                    <TalentDashboard />
                  </TabsContent>
                  
                  <TabsContent value="builder" className="mt-8 px-4 max-w-[1800px] mx-auto">
                    <BuilderDashboard showProjectModal={showProjectModal} setShowProjectModal={setShowProjectModal} />
                  </TabsContent>
                  
                  <TabsContent value="both" className="mt-8 px-4 max-w-[1800px] mx-auto">
                    <DualRoleDashboard />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>}
      </main>
      <Footer />
      
      <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <ProjectForm 
            onSubmit={handleSubmit} 
            loading={loading} 
            submitLabel="Create Project" 
          />
        </DialogContent>
      </Dialog>
    </div>;
};
export default DashboardPage;
