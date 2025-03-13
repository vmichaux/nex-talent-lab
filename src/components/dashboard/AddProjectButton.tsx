import { useState, useEffect } from "react";
import { Plus, Briefcase, Award, Users, Calendar, Clock, DollarSign, Target, MapPin, Scale, User } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Project } from "@/types/project";
import { Checkbox } from "@/components/ui/checkbox";

export function AddProjectButton() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basicInfo");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Basic Info
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("Technology");
  const [projectType, setProjectType] = useState("Short-term");

  // Skills with level
  const [skillsInput, setSkillsInput] = useState("");
  const [skillsWithLevel, setSkillsWithLevel] = useState<Array<{skill: string, level: "Beginner" | "Intermediate" | "Advanced" | "Expert"}>>([
    { skill: "React", level: "Intermediate" },
    { skill: "UI/UX Design", level: "Beginner" }
  ]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<"Beginner" | "Intermediate" | "Advanced" | "Expert">("Intermediate");

  // Requirements
  const [deliverables, setDeliverables] = useState<string[]>(["Website mockup", "Functional prototype"]);
  const [projectDuration, setProjectDuration] = useState("3 months");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [collaboratorsNeeded, setCollaboratorsNeeded] = useState(2);

  // Compensation & Benefits
  const [compensation, setCompensation] = useState("Volunteer");
  const [compensationDetails, setCompensationDetails] = useState("");
  const [perks, setPerks] = useState<string[]>(["Mentorship", "Networking"]);
  const [tools, setTools] = useState<string[]>(["React", "Figma"]);

  // Additional Details
  const [projectGoal, setProjectGoal] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [location, setLocation] = useState<"Remote" | "In-person" | "Hybrid">("Remote");
  const [legalConstraints, setLegalConstraints] = useState("");
  const [budget, setBudget] = useState("");
  const [desiredProfiles, setDesiredProfiles] = useState<string[]>(["Student", "Freelancer"]);
  const [projectStatus, setProjectStatus] = useState<"Open" | "Urgent" | "Closed">("Open");

  // Set default deadline to 3 months from now
  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    setProjectDeadline(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  }, []);

  const handleAddSkill = () => {
    if (skillsInput.trim()) {
      setSkillsWithLevel([...skillsWithLevel, { skill: skillsInput.trim(), level: selectedSkillLevel }]);
      setSkillsInput("");
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    setSkillsWithLevel(skillsWithLevel.filter((_, index) => index !== indexToRemove));
  };

  const handleSkillLevelChange = (index: number, level: "Beginner" | "Intermediate" | "Advanced" | "Expert") => {
    const updatedSkills = [...skillsWithLevel];
    updatedSkills[index].level = level;
    setSkillsWithLevel(updatedSkills);
  };

  const handleAddDeliverable = (deliverable: string) => {
    if (deliverable.trim() && !deliverables.includes(deliverable.trim())) {
      setDeliverables([...deliverables, deliverable.trim()]);
    }
  };

  const handleToggleProfile = (profile: string) => {
    if (desiredProfiles.includes(profile)) {
      setDesiredProfiles(desiredProfiles.filter(p => p !== profile));
    } else {
      setDesiredProfiles([...desiredProfiles, profile]);
    }
  };

  const handleTogglePerk = (perk: string) => {
    if (perks.includes(perk)) {
      setPerks(perks.filter(p => p !== perk));
    } else {
      setPerks([...perks, perk]);
    }
  };

  const handleToggleTool = (tool: string) => {
    if (tools.includes(tool)) {
      setTools(tools.filter(t => t !== tool));
    } else {
      setTools([...tools, tool]);
    }
  };

  const isFormValid = () => {
    return (
      projectName.trim() !== "" &&
      projectDescription.trim() !== "" &&
      skillsWithLevel.length > 0 &&
      projectGoal.trim() !== ""
    );
  };

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

    if (!isFormValid()) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Extract skills for backward compatibility
      const skills = skillsWithLevel.map(item => item.skill);
      
      // Create project object that matches the Project type
      const newProject: Omit<Project, 'id' | 'createdAt'> = {
        title: projectName,
        description: projectDescription,
        category: projectCategory,
        skills: skills,
        deadline: projectDeadline,
        duration: projectDuration,
        owner: currentUser.displayName || currentUser.email || "Anonymous",
        featured: false,
        status: projectStatus,
        applicants: 0,
        progress: 0,
        
        // New fields
        projectType,
        skillsWithLevel,
        deliverables,
        timeline: projectDuration, // For now, using the same value as duration
        compensation,
        compensationDetails,
        perks,
        tools,
        collaboratorsNeeded,
        projectGoal,
        targetAudience,
        location,
        legalConstraints,
        budget,
        desiredProfiles
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
      resetForm();
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

  const resetForm = () => {
    // Reset all form fields
    setProjectName("");
    setProjectDescription("");
    setProjectCategory("Technology");
    setProjectType("Short-term");
    setSkillsWithLevel([]);
    setDeliverables([]);
    setProjectDuration("3 months");
    setCollaboratorsNeeded(2);
    setCompensation("Volunteer");
    setCompensationDetails("");
    setPerks(["Mentorship", "Networking"]);
    setTools(["React", "Figma"]);
    setProjectGoal("");
    setTargetAudience("");
    setLocation("Remote");
    setLegalConstraints("");
    setBudget("");
    setDesiredProfiles(["Student", "Freelancer"]);
    setProjectStatus("Open");
    setActiveTab("basicInfo");
  };

  const goToNextTab = () => {
    if (activeTab === "basicInfo") setActiveTab("requirements");
    else if (activeTab === "requirements") setActiveTab("compensation");
    else if (activeTab === "compensation") setActiveTab("additionalDetails");
  };

  const goToPreviousTab = () => {
    if (activeTab === "additionalDetails") setActiveTab("compensation");
    else if (activeTab === "compensation") setActiveTab("requirements");
    else if (activeTab === "requirements") setActiveTab("basicInfo");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Describe your project in detail to find the perfect collaborators.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="basicInfo">Basic Info</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="compensation">Compensation</TabsTrigger>
              <TabsTrigger value="additionalDetails">Additional Details</TabsTrigger>
            </TabsList>
            
            {/* Basic Info Tab */}
            <TabsContent value="basicInfo" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project name <span className="text-red-500">*</span></Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Custom fitness application"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="project-category">Category <span className="text-red-500">*</span></Label>
                  <select
                    id="project-category"
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    required
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Writing">Writing</option>
                    <option value="Music">Music</option>
                    <option value="Video">Video</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="project-type">Project Type <span className="text-red-500">*</span></Label>
                  <select
                    id="project-type"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    required
                  >
                    <option value="Short-term">Short-term</option>
                    <option value="Internship">Internship</option>
                    <option value="Portfolio-building">Portfolio-building</option>
                    <option value="Long-term mission">Long-term mission</option>
                    <option value="Open-source">Open-source</option>
                    <option value="Research">Research</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Project description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="project-description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Briefly describe the project, its goals, and the type of collaborators you're looking for..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="project-status">Status <span className="text-red-500">*</span></Label>
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
              </div>
              
              <div className="flex justify-end mt-4">
                <Button type="button" onClick={goToNextTab}>
                  Next: Requirements
                </Button>
              </div>
            </TabsContent>
            
            {/* Requirements Tab */}
            <TabsContent value="requirements" className="space-y-4">
              <div className="grid gap-6">
                <div className="space-y-4">
                  <Label>Required Skills & Experience Level <span className="text-red-500">*</span></Label>
                  
                  <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                    {skillsWithLevel.map((item, index) => (
                      <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
                        <span>{item.skill} ({item.level})</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSkill(index)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      placeholder="Add a required skill..."
                      className="flex-1"
                    />
                    <select 
                      className="w-40 rounded-md border border-input bg-background px-3 py-2"
                      value={selectedSkillLevel}
                      onChange={(e) => setSelectedSkillLevel(e.target.value as "Beginner" | "Intermediate" | "Advanced" | "Expert")}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <Button type="button" onClick={handleAddSkill}>
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliverables">Deliverables & Timeline</Label>
                  <Textarea
                    id="deliverables"
                    placeholder="List the expected deliverables for this project, e.g., 'Website mockup, functional prototype, etc.'"
                    value={deliverables.join(', ')}
                    onChange={(e) => setDeliverables(e.target.value.split(',').map(item => item.trim()))}
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-duration">Duration <span className="text-red-500">*</span></Label>
                    <Input
                      id="project-duration"
                      value={projectDuration}
                      onChange={(e) => setProjectDuration(e.target.value)}
                      placeholder="e.g., 3 months, 6 weeks"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-deadline">Deadline</Label>
                    <Input
                      id="project-deadline"
                      value={projectDeadline}
                      onChange={(e) => setProjectDeadline(e.target.value)}
                      placeholder="e.g., December 31, 2023"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="collaborators">Number of Collaborators Needed</Label>
                  <select
                    id="collaborators"
                    value={collaboratorsNeeded}
                    onChange={(e) => setCollaboratorsNeeded(Number(e.target.value))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="5">3-5 people</option>
                    <option value="10">5-10 people</option>
                    <option value="0">Open team (unlimited)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={goToPreviousTab}>
                  Back
                </Button>
                <Button type="button" onClick={goToNextTab}>
                  Next: Compensation
                </Button>
              </div>
            </TabsContent>
            
            {/* Compensation Tab */}
            <TabsContent value="compensation" className="space-y-4">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="compensation">Compensation Type</Label>
                  <select
                    id="compensation"
                    value={compensation}
                    onChange={(e) => setCompensation(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="Volunteer">Volunteer (unpaid)</option>
                    <option value="Fixed Payment">Fixed Payment</option>
                    <option value="Hourly Rate">Hourly Rate</option>
                    <option value="Revenue Share">Revenue Share</option>
                    <option value="Equity">Equity</option>
                    <option value="Negotiable">Negotiable</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="compensationDetails">Compensation Details</Label>
                  <Textarea
                    id="compensationDetails"
                    value={compensationDetails}
                    onChange={(e) => setCompensationDetails(e.target.value)}
                    placeholder="Provide more details about the compensation..."
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget (if applicable)</Label>
                  <Input
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., $500, $1000-2000, etc."
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Additional Perks</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Mentorship", "Networking", "Access to premium tools", "Certifications", "Learning opportunity", "Portfolio piece", "References"].map((perk) => (
                      <div key={perk} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`perk-${perk}`} 
                          checked={perks.includes(perk)}
                          onCheckedChange={() => handleTogglePerk(perk)}
                        />
                        <label
                          htmlFor={`perk-${perk}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {perk}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Tools & Technologies</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["React", "Figma", "Adobe", "Python", "WordPress", "Node.js", "Notion", "Canva"].map((tool) => (
                      <div key={tool} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tool-${tool}`} 
                          checked={tools.includes(tool)}
                          onCheckedChange={() => handleToggleTool(tool)}
                        />
                        <label
                          htmlFor={`tool-${tool}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tool}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={goToPreviousTab}>
                  Back
                </Button>
                <Button type="button" onClick={goToNextTab}>
                  Next: Additional Details
                </Button>
              </div>
            </TabsContent>
            
            {/* Additional Details Tab */}
            <TabsContent value="additionalDetails" className="space-y-4">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="projectGoal">Project Goal & Expected Outcomes <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="projectGoal"
                    value={projectGoal}
                    onChange={(e) => setProjectGoal(e.target.value)}
                    placeholder="What are you hoping to achieve with this project?"
                    className="min-h-[80px]"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="targetAudience">Target Audience & Project Impact</Label>
                  <Textarea
                    id="targetAudience"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="Who is this project aimed at? What impact do you hope to have?"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Project Location</Label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value as "Remote" | "In-person" | "Hybrid")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="Remote">Fully Remote</option>
                    <option value="In-person">In-person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="legalConstraints">Legal Constraints</Label>
                  <Textarea
                    id="legalConstraints"
                    value={legalConstraints}
                    onChange={(e) => setLegalConstraints(e.target.value)}
                    placeholder="Any NDAs, confidentiality requirements, or IP considerations?"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Desired Profiles</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Student", "Freelancer", "Professional", "Teacher", "Startup", "Entrepreneur"].map((profile) => (
                      <div key={profile} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`profile-${profile}`} 
                          checked={desiredProfiles.includes(profile)}
                          onCheckedChange={() => handleToggleProfile(profile)}
                        />
                        <label
                          htmlFor={`profile-${profile}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {profile}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={goToPreviousTab}>
                  Back
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}
