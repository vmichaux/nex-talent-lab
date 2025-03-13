import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Tag, UserCircle, MessageSquare, ArrowLeft, MapPin, Share2, Pencil, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { Project } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserProfile } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditProjectForm } from "@/components/dashboard/EditProjectForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/useProjects";

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
  
  const handleCancelEdit = () => {
    navigate(`/project/${id}`);
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
            <p className="mb-8 text-gray-600">The project you're looking for doesn't exist or has been removed.</p>
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

  if (isEditing && project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6"
              onClick={() => navigate(`/project/${id}`)}
            >
              <ArrowLeft size={16} />
              Back to Project
            </Button>
            
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
        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Button>
              
              <div className="flex gap-3">
                {isOwner ? (
                  <>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={handleEditClick}
                    >
                      <Pencil size={16} className="mr-2" />
                      Edit Project
                    </Button>
                    
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete Project
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your project.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDeleteProject}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                ) : (
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleApplyClick}
                  >
                    Apply to Collaborate
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <Share2 size={16} className="mr-2" />
                  Share Project
                </Button>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  {isEditing ? (
                    <div className="space-y-4 max-w-2xl">
                      <div>
                        <Label htmlFor="title">Project Title</Label>
                        <Input 
                          id="title" 
                          name="title"
                          value={editedProject.title || ''}
                          onChange={handleInputChange}
                          className="text-2xl font-bold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          name="category"
                          value={editedProject.category || ''}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <Tag size={16} />
                        <span>{project.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.skills && project.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  {project.progress !== undefined && !isEditing && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border min-w-40">
                      <p className="text-sm text-gray-500 mb-2">Project Progress</p>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
              
              {isEditing ? (
                <div className="mb-4">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={editedProject.status || 'Open'}
                    onChange={handleInputChange}
                    className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="Open">Open</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              ) : (
                <Badge className={
                  project.status === "Urgent" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                  project.status === "Closed" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
                  "bg-green-100 text-green-800 hover:bg-green-100"
                }>
                  {project.status}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2 space-y-10">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isEditing ? (
                      <div>
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={editedProject.description || ''}
                          onChange={handleInputChange}
                          rows={6}
                          className="min-h-[150px]"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-700">{project.description}</p>
                    )}
                    
                    {isEditing ? (
                      <div>
                        <Label htmlFor="projectGoal">Project Goal</Label>
                        <Textarea
                          id="projectGoal"
                          name="projectGoal"
                          value={editedProject.projectGoal || ''}
                          onChange={handleInputChange}
                          rows={4}
                          className="min-h-[100px]"
                        />
                      </div>
                    ) : project.projectGoal ? (
                      <div>
                        <h3 className="font-semibold mb-3">Project Goal</h3>
                        <p className="text-gray-700">{project.projectGoal}</p>
                      </div>
                    ) : null}
                    
                    {!isEditing && project.deliverables && project.deliverables.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Deliverables</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          {project.deliverables.map((deliverable, index) => (
                            <li key={index}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {isEditing ? (
                      <div>
                        <Label htmlFor="duration">Timeline</Label>
                        <Input
                          id="duration"
                          name="duration"
                          value={editedProject.duration || ''}
                          onChange={handleInputChange}
                          placeholder="e.g., 3 months, 6 weeks"
                        />
                      </div>
                    ) : project.timeline ? (
                      <div>
                        <h3 className="font-semibold mb-3">Timeline</h3>
                        <div className="text-gray-700">
                          <p>{project.timeline}</p>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
                
                {!isEditing && (project.skills || project.desiredProfiles) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills and Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {project.skills && project.skills.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-3">Required Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50 px-3 py-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {project.skillsWithLevel && project.skillsWithLevel.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-3">Skills with Proficiency</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Skill</TableHead>
                                <TableHead>Level</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {project.skillsWithLevel.map((skillWithLevel, index) => (
                                <TableRow key={index}>
                                  <TableCell>{skillWithLevel.skill}</TableCell>
                                  <TableCell>{skillWithLevel.level}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                      
                      {project.desiredProfiles && project.desiredProfiles.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-3">Desired Profiles</h3>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {project.desiredProfiles.map((profile, index) => (
                              <li key={index}>{profile}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {!isEditing && (project.compensation || project.perks) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Compensation and Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {project.compensation && (
                        <div>
                          <h3 className="font-semibold mb-2">Compensation Type</h3>
                          <p className="text-gray-700">{project.compensation}</p>
                          {project.compensationDetails && (
                            <p className="text-gray-700 mt-2">{project.compensationDetails}</p>
                          )}
                        </div>
                      )}
                      
                      {project.budget && (
                        <div>
                          <h3 className="font-semibold mb-2">Budget</h3>
                          <p className="text-gray-700">{project.budget}</p>
                        </div>
                      )}
                      
                      {project.perks && project.perks.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-3">Additional Perks</h3>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {project.perks.map((perk, index) => (
                              <li key={index}>{perk}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {isEditing && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Compensation Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="compensation">Compensation Type</Label>
                        <select
                          id="compensation"
                          name="compensation"
                          value={editedProject.compensation || ''}
                          onChange={handleInputChange}
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
                      
                      <div>
                        <Label htmlFor="compensationDetails">Compensation Details</Label>
                        <Textarea
                          id="compensationDetails"
                          name="compensationDetails"
                          value={editedProject.compensationDetails || ''}
                          onChange={handleInputChange}
                          placeholder="Provide more details about the compensation..."
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="budget">Budget</Label>
                        <Input
                          id="budget"
                          name="budget"
                          value={editedProject.budget || ''}
                          onChange={handleInputChange}
                          placeholder="e.g., $500, $1000-2000, etc."
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={18} className="text-gray-400" />
                      <div>
                        <p className="font-medium">Deadline</p>
                        {isEditing ? (
                          <Input
                            id="deadline"
                            name="deadline"
                            value={editedProject.deadline || ''}
                            onChange={handleInputChange}
                            placeholder="e.g., December 31, 2023"
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm">{project.deadline || "Not specified"}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock size={18} className="text-gray-400" />
                      <div>
                        <p className="font-medium">Duration</p>
                        {isEditing ? (
                          <Input
                            id="duration"
                            name="duration"
                            value={editedProject.duration || ''}
                            onChange={handleInputChange}
                            placeholder="e.g., 3 months, 6 weeks"
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm">{project.duration || "Not specified"}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Tag size={18} className="text-gray-400" />
                      <div>
                        <p className="font-medium">Category</p>
                        <p className="text-sm">{project.category || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} className="text-gray-400" />
                      <div>
                        <p className="font-medium">Location</p>
                        {isEditing ? (
                          <select
                            id="location"
                            name="location"
                            value={editedProject.location || 'Remote'}
                            onChange={handleInputChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                          >
                            <option value="Remote">Fully Remote</option>
                            <option value="In-person">In-person</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                        ) : (
                          <p className="text-sm">{project.location || "Remote"}</p>
                        )}
                      </div>
                    </div>
                    {project.collaboratorsNeeded && !isEditing && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <UserCircle size={18} className="text-gray-400" />
                        <div>
                          <p className="font-medium">Collaborators Needed</p>
                          <p className="text-sm">{project.collaboratorsNeeded}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {owner && !isEditing ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Owner</CardTitle>
                      <CardDescription>About the project creator</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                          <AvatarImage src={owner.photoURL} alt={owner.displayName} />
                          <AvatarFallback>
                            {owner.firstName ? owner.firstName[0] + (owner.lastName ? owner.lastName[0] : '') : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {owner.firstName && owner.lastName 
                              ? `${owner.firstName} ${owner.lastName}`
                              : owner.displayName || 'User'}
                          </h3>
                          <p className="text-gray-600">{owner.title || 'Project Creator'}</p>
                        </div>
                      </div>
                      
                      {owner.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} className="text-gray-400" />
                          <span>{owner.location}</span>
                        </div>
                      )}
                      
                      {owner.bio && (
                        <div>
                          <h4 className="font-medium mb-2">Bio</h4>
                          <p className="text-gray-700 text-sm">{owner.bio}</p>
                        </div>
                      )}
                      
                      <Button className="w-full gap-2">
                        <MessageSquare size={16} />
                        Contact Owner
                      </Button>
                    </CardContent>
                  </Card>
                ) : !isEditing ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Owner</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{project.owner || "Project Creator"}</h3>
                        </div>
                      </div>
                      
                      <Button className="w-full gap-2 mt-6">
                        <MessageSquare size={16} />
                        Contact Owner
                      </Button>
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
