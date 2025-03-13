import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Save, 
  UserPlus, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Building, 
  Calendar, 
  Users, 
  Tag, 
  FileText, 
  CreditCard,
  Camera,
  Upload,
  ImagePlus,
  Mail,
  Phone,
  Star,
  StarHalf,
  Heart,
  Plus,
  Check,
  X,
  Pencil
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface Skill {
  name: string;
  level: SkillLevel;
}

const ProfileEditPage = () => {
  const { isLoggedIn, updateProfileCompletion, userData, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isProfileCompleted = userData?.hasCompletedProfile || false;
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeRole, setActiveRole] = useState<"talent" | "builder" | "dual">("talent");
  const [newInterest, setNewInterest] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    title: "",
    location: "",
    bio: "",
    profilePicture: "",
    dateOfBirth: null as Date | null,
    email: "",
    phoneNumber: "",
    sex: "",
    interests: [] as string[],
    business: {
      companyName: "",
      foundedYear: "",
      description: "",
      employees: "",
      industry: "",
      projectNeeds: "",
      billingDetails: ""
    },
    skills: [] as Skill[],
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ company: "", position: "", duration: "" }]
  });
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        console.log("Fetching profile for user:", currentUser.uid);
        const userProfileRef = doc(db, "userProfiles", currentUser.uid);
        try {
          const docSnap = await getDoc(userProfileRef);
          console.log("Document exists:", docSnap.exists());
          
          if (docSnap.exists()) {
            const profileData = docSnap.data();
            console.log("Raw profile data:", profileData);
            
            let firstName = "";
            let lastName = "";
            
            if (profileData.firstName && profileData.lastName) {
              firstName = profileData.firstName;
              lastName = profileData.lastName;
            } else if (profileData.fullName) {
              const nameParts = profileData.fullName.split(" ");
              firstName = nameParts[0] || "";
              lastName = nameParts.slice(1).join(" ") || "";
            }
            
            const business = {
              companyName: profileData.business?.companyName || "",
              foundedYear: profileData.business?.foundedYear || "",
              description: profileData.business?.description || "",
              employees: profileData.business?.employees || "",
              industry: profileData.business?.industry || "",
              projectNeeds: profileData.business?.projectNeeds || "",
              billingDetails: profileData.business?.billingDetails || ""
            };
            
            const dateOfBirth = profileData.dateOfBirth ? new Date(profileData.dateOfBirth.toDate?.() || profileData.dateOfBirth) : null;
            
            let skills: Skill[] = [];
            if (Array.isArray(profileData.skills)) {
              if (profileData.skills.length > 0) {
                if (typeof profileData.skills[0] === 'string') {
                  skills = profileData.skills.map(skill => ({
                    name: skill,
                    level: "Intermediate" as SkillLevel
                  }));
                } else {
                  skills = profileData.skills.map(skill => ({
                    name: skill.name || "",
                    level: skill.level || "Intermediate"
                  }));
                }
              }
            }
            
            if (skills.length === 0) {
              skills = [{ name: "", level: "Intermediate" }];
            }
            
            const loadedProfile = {
              firstName,
              lastName,
              title: profileData.title || "",
              location: profileData.location || "",
              bio: profileData.bio || "",
              profilePicture: profileData.profilePicture || "",
              dateOfBirth,
              email: profileData.email || currentUser.email || "",
              phoneNumber: profileData.phoneNumber || "",
              sex: profileData.sex || "",
              interests: Array.isArray(profileData.interests) ? profileData.interests : [],
              business,
              skills,
              education: Array.isArray(profileData.education) && profileData.education.length > 0 
                ? profileData.education.map(edu => ({
                    school: edu.school || "",
                    degree: edu.degree || "",
                    year: edu.year || ""
                  }))
                : [{ school: "", degree: "", year: "" }],
              experience: Array.isArray(profileData.experience) && profileData.experience.length > 0 
                ? profileData.experience.map(exp => ({
                    company: exp.company || "",
                    position: exp.position || "",
                    duration: exp.duration || ""
                  }))
                : [{ company: "", position: "", duration: "" }]
            };
            
            console.log("Structured profile data:", loadedProfile);
            setProfile(loadedProfile);
            
            const savedRole = localStorage.getItem("userRole");
            if (savedRole) {
              if (savedRole === "entrepreneur") {
                setActiveRole("builder");
              } else if (savedRole === "both") {
                setActiveRole("dual");
              } else {
                setActiveRole("talent");
              }
            }
            
            // Only set edit mode to false for completed profiles
            setIsEditing(!isProfileCompleted);
            
            toast({
              title: "Profile loaded",
              description: "Your profile information has been loaded successfully.",
            });
          } else {
            if (currentUser.email) {
              setProfile(prev => ({
                ...prev,
                email: currentUser.email || "",
                skills: [{ name: "", level: "Intermediate" }]
              }));
            }
            
            // If no profile, start in edit mode
            setIsEditing(true);
            
            console.log("No profile data found, using empty profile");
            toast({
              title: "No profile found",
              description: "No previous profile data was found. You can create your profile now.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast({
            title: "Error",
            description: "Failed to load profile data. Please try again.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchUserProfile();
  }, [currentUser, toast, isProfileCompleted]);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };

  const handleBusinessChange = (field, value) => {
    setProfile({
      ...profile,
      business: {
        ...profile.business,
        [field]: value
      }
    });
  };

  const handleSkillNameChange = (index, value) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      name: value
    };
    setProfile({
      ...profile,
      skills: updatedSkills
    });
  };

  const handleSkillLevelChange = (index, level: SkillLevel) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      level
    };
    setProfile({
      ...profile,
      skills: updatedSkills
    });
  };

  const addSkill = () => {
    setProfile({
      ...profile,
      skills: [...profile.skills, { name: "", level: "Intermediate" }]
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...profile.skills];
    updatedSkills.splice(index, 1);
    if (updatedSkills.length === 0) {
      updatedSkills.push({ name: "", level: "Intermediate" });
    }
    setProfile({
      ...profile,
      skills: updatedSkills
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...profile.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setProfile({
      ...profile,
      education: updatedEducation
    });
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { school: "", degree: "", year: "" }]
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...profile.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setProfile({
      ...profile,
      experience: updatedExperience
    });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { company: "", position: "", duration: "" }]
    });
  };

  const handleRoleChange = (role: "talent" | "builder" | "dual") => {
    setActiveRole(role);
    localStorage.setItem("userRole", role === "builder" ? "entrepreneur" : role === "dual" ? "both" : "talent");
  };

  const handleProfilePictureClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `profilePictures/${currentUser.uid}/${Date.now()}_${file.name}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setProfile(prev => ({
        ...prev,
        profilePicture: downloadURL
      }));
      
      toast({
        title: "Image uploaded",
        description: "Your profile picture has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload error",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    
    if (!profile.interests.includes(newInterest.trim()) && profile.interests.length < 6) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()]
      });
      setNewInterest("");
    } else if (profile.interests.length >= 6) {
      toast({
        title: "Maximum interests reached",
        description: "You can only add up to 6 interests",
        variant: "destructive"
      });
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter(item => item !== interest)
    });
  };

  const handleSaveProfile = async () => {
    try {
      if (currentUser?.uid) {
        const fullName = `${profile.firstName} ${profile.lastName}`.trim();
        
        const userProfileRef = doc(db, "userProfiles", currentUser.uid);
        console.log("Saving profile data:", { ...profile, fullName });
        await setDoc(userProfileRef, {
          ...profile,
          fullName,
          lastUpdated: new Date()
        });
      }
      
      await updateProfileCompletion(true);
      
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully.",
      });
      
      // Switch to view mode after saving
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving your profile.",
        variant: "destructive"
      });
    }
  };

  // View Mode Component
  const renderProfileView = () => {
    return (
      <div className="space-y-8">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="outline"
                  className="gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Modify Profile
                </Button>
              </div>
              
              {profile.title && (
                <div className="text-lg text-muted-foreground font-medium">
                  {profile.title}
                </div>
              )}
              
              <div className="space-y-3 mt-4">
                {profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                )}
                
                {profile.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.phoneNumber}</span>
                  </div>
                )}
                
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
              
              {profile.bio && (
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Bio</h3>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  {profile.profilePicture ? (
                    <AvatarImage src={profile.profilePicture} alt={`${profile.firstName} ${profile.lastName}`} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                      {profile.firstName && profile.lastName 
                        ? `${profile.firstName[0]}${profile.lastName[0]}`
                        : "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Skills */}
        {activeRole === "talent" || activeRole === "dual" ? (
          <>
            {profile.skills.length > 0 && profile.skills.some(skill => skill.name) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => 
                      skill.name ? (
                        <div key={index} className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full">
                          <span>{skill.name}</span>
                          <span className="flex">
                            {Array.from({ length: 
                              skill.level === "Beginner" ? 1 : 
                              skill.level === "Intermediate" ? 2 : 
                              skill.level === "Advanced" ? 3 : 4 
                            }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400" fill="#facc15" />
                            ))}
                          </span>
                        </div>
                      ) : null
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Education */}
            {profile.education.length > 0 && profile.education.some(edu => edu.school) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => 
                      edu.school ? (
                        <div key={index} className="border-l-2 border-primary/30 pl-4 py-1">
                          <h4 className="font-semibold">{edu.school}</h4>
                          <div className="text-sm text-muted-foreground">
                            {edu.degree}
                            {edu.year && ` • ${edu.year}`}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Experience */}
            {profile.experience.length > 0 && profile.experience.some(exp => exp.company) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.experience.map((exp, index) => 
                      exp.company ? (
                        <div key={index} className="border-l-2 border-primary/30 pl-4 py-1">
                          <h4 className="font-semibold">{exp.company}</h4>
                          <div className="text-sm text-muted-foreground">
                            {exp.position}
                            {exp.duration && ` • ${exp.duration}`}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : null}
        
        {/* Business Information */}
        {(activeRole === "builder" || activeRole === "dual") && profile.business.companyName && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">{profile.business.companyName}</h4>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                    {profile.business.foundedYear && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Founded {profile.business.foundedYear}
                      </div>
                    )}
                    {profile.business.industry && (
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        {profile.business.industry}
                      </div>
                    )}
                    {profile.business.employees && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {profile.business.employees} employees
                      </div>
                    )}
                  </div>
                </div>
                
                {profile.business.description && (
                  <div>
                    <h5 className="font-medium mb-1">Description</h5>
                    <p className="text-sm text-muted-foreground">{profile.business.description}</p>
                  </div>
                )}
                
                {profile.business.projectNeeds && (
                  <div>
                    <h5 className="font-medium mb-1">Project Needs</h5>
                    <p className="text-sm text-muted-foreground">{profile.business.projectNeeds}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Interests */}
        {profile.interests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-end mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  };

  const renderProfilePicture = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="p-6 w-full max-w-md">
        <div className="flex flex-col items-center gap-6">
          <div className={cn(
            "relative group", 
            isEditing && "cursor-pointer"
          )} onClick={handleProfilePictureClick}>
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              {profile.profilePicture ? (
                <AvatarImage src={profile.profilePicture} alt={`${profile.firstName} ${profile.lastName}`} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                  {profile.firstName && profile.lastName 
                    ? `${profile.firstName[0]}${profile.lastName[0]}`
                    : "?"}
                </AvatarFallback>
              )}
            </Avatar>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          
          {isEditing && (
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleProfilePictureClick}
                disabled={uploadingImage}
              >
                {uploadingImage ? (
                  <div className="animate-pulse">Uploading...</div>
                ) : (
                  <>
                    <ImagePlus className="h-4 w-4" />
                    {profile.profilePicture ? "Change Picture" : "Add Picture"}
                  </>
                )}
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
                disabled={uploadingImage}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  const renderInterests = () => (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary" />
        Interests (2-6)
      </h3>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.interests.map((interest, index) => (
            <div 
              key={`interest-${index}`}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full"
            >
              <span>{interest}</span>
              <button 
                type="button"
                onClick={() => handleRemoveInterest(interest)}
                className="text-primary hover:text-primary/70 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          {profile.interests.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              Add at least 2 interests to help us match you with relevant opportunities
            </p>
          )}
        </div>
        
        {profile.interests.length < 6 && (
          <div className="flex gap-2">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add an interest (e.g., Design, AI, Teaching)"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddInterest();
                }
              }}
            />
            <Button 
              type="button"
              onClick={handleAddInterest}
              variant="outline"
              className="gap-1"
              disabled={!newInterest.trim()}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Contact information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={profile.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          {renderProfilePicture()}
        </div>
      </div>
      
      {/* Additional profile information - below the photo */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        {/* Professional Title and Location on the same line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Professional Title
            </Label>
            <Input
              id="title"
              type="text"
              value={profile.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="UX Designer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input
              id="location"
              type="text"
              value={profile.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        {/* Date of Birth and Sex on the same line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date of Birth
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !profile.dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {profile.dateOfBirth ? format(profile.dateOfBirth, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={profile.dateOfBirth || undefined}
                  onSelect={(date) => handleInputChange("dateOfBirth", date)}
                  initialFocus
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sex" className="text-sm font-medium">
              Sex
            </Label>
            <Select
              value={profile.sex}
              onValueChange={(value) => handleInputChange("sex", value)}
            >
              <SelectTrigger id="sex" className="w-full">
                <SelectValue placeholder="Select your sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="nonbinary">Non-binary</SelectItem>
                <SelectItem value="preferNotToSay">Prefer not to say</SelectItem>
