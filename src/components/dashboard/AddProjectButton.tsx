
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Project } from "@/types/project";

export function AddProjectButton() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("Technology");
  const [projectDuration, setProjectDuration] = useState("3 months");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectSkills, setProjectSkills] = useState<string[]>(["React", "UI/UX Design", "Firebase"]);
  const [projectStatus, setProjectStatus] = useState<"Open" | "Urgent" | "Closed">("Open");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Set default deadline to 3 months from now
  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    setProjectDeadline(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a project.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Create project object that matches the Project type
      const newProject: Omit<Project, 'id' | 'createdAt'> = {
        title: projectName,
        description: projectDescription,
        category: projectCategory,
        skills: projectSkills,
        deadline: projectDeadline,
        duration: projectDuration,
        owner: currentUser.displayName || currentUser.email || "Anonymous",
        featured: false,
        status: projectStatus,
        applicants: 0,
        progress: 0 // Set initial progress to 0
      };
      
      // Create new project in Firestore
      const projectRef = await addDoc(collection(db, "projects"), {
        ...newProject,
        createdAt: serverTimestamp()
      });
      
      console.log("Project added with ID: ", projectRef.id);
      
      toast({
        title: "Project created",
        description: "Your new project has been successfully created."
      });
      
      // Reset form and close dialog
      setProjectName("");
      setProjectDescription("");
      setOpen(false);
      
      // Navigate to explore projects page to see the new project
      navigate("/explore-projects");
      
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Describe your project and what you need to accomplish it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Custom fitness application"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-category">Category</Label>
              <Input
                id="project-category"
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                placeholder="e.g., Technology, Education, Health"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-duration">Duration</Label>
              <Input
                id="project-duration"
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
                placeholder="e.g., 3 months, 6 weeks"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-status">Status</Label>
              <select
                id="project-status"
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value as "Open" | "Urgent" | "Closed")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              >
                <option value="Open">Open</option>
                <option value="Urgent">Urgent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-description">Project description</Label>
              <Textarea
                id="project-description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Briefly describe the project, its goals, and the type of collaborators you're looking for..."
                className="min-h-[120px]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
