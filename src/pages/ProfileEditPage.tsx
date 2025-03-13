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
  StarHalf
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
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

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
  }, [currentUser, toast]);
  
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
    fileInputRef.current?.click();
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
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving your profile.",
        variant: "destructive"
      });
    }
  };

  const renderProfilePicture = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="p-6 w-full max-w-md">
        <div className="flex flex-col items-center gap-6">
          <div className="relative group cursor-pointer" onClick={handleProfilePictureClick}>
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
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          
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
        </div>
      </Card>
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
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium">
            Bio
          </Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
            className="min-h-[100px] w-full"
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Building className="h-5 w-5 text-primary" />
        Business Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium">
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              value={profile.business.companyName}
              onChange={(e) => handleBusinessChange("companyName", e.target.value)}
              placeholder="Acme Inc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foundedYear" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Year Founded
              </div>
            </Label>
            <Input
              id="foundedYear"
              type="text"
              value={profile.business.foundedYear}
              onChange={(e) => handleBusinessChange("foundedYear", e.target.value)}
              placeholder="2015"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employees" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Employees
              </div>
            </Label>
            <Select
              value={profile.business.employees}
              onValueChange={(value) => handleBusinessChange("employees", value)}
            >
              <SelectTrigger id="employees" className="w-full">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1</SelectItem>
                <SelectItem value="1-10">1-10</SelectItem>
                <SelectItem value="10-50">10-50</SelectItem>
                <SelectItem value="50-200">50-200</SelectItem>
                <SelectItem value="200+">200+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Industry
              </div>
            </Label>
            <Input
              id="industry"
              type="text"
              value={profile.business.industry}
              onChange={(e) => handleBusinessChange("industry", e.target.value)}
              placeholder="Technology, Healthcare, Education, etc."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessDescription" className="text-sm font-medium">
              Company Description
            </Label>
            <Textarea
              id="businessDescription"
              value={profile.business.description}
              onChange={(e) => handleBusinessChange("description", e.target.value)}
              placeholder="Tell us about your business..."
              rows={3}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectNeeds" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Project Needs
              </div>
            </Label>
            <Textarea
              id="projectNeeds"
              value={profile.business.projectNeeds}
              onChange={(e) => handleBusinessChange("projectNeeds", e.target.value)}
              placeholder="Describe the types of projects or talent you're looking for..."
              rows={3}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billingDetails" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing Details
              </div>
            </Label>
            <Textarea
              id="billingDetails"
              value={profile.business.billingDetails}
              onChange={(e) => handleBusinessChange("billingDetails", e.target.value)}
              placeholder="Add information for payments and invoicing..."
              rows={3}
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillLevelIcon = (level: SkillLevel) => {
    switch(level) {
      case "Beginner":
        return <div className="flex"><Star className="h-4 w-4 text-yellow-400" /></div>;
      case "Intermediate":
        return <div className="flex"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /></div>;
      case "Advanced":
        return <div className="flex"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /></div>;
      case "Expert":
        return <div className="flex"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /></div>;
      default:
        return null;
    }
  };

  const renderSkills = () => (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-primary" />
        Skills
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {profile.skills.map((skill, index) => (
          <div key={`skill-${index}`} className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillNameChange(index, e.target.value)}
                placeholder="e.g., UI Design, JavaScript"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Select
                value={skill.level}
                onValueChange={(value) => handleSkillLevelChange(index, value as SkillLevel)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">
                    <div className="flex items-center gap-2">
                      <span>Beginner</span>
                      {renderSkillLevelIcon("Beginner")}
                    </div>
                  </SelectItem>
                  <SelectItem value="Intermediate">
                    <div className="flex items-center gap-2">
                      <span>Intermediate</span>
                      {renderSkillLevelIcon("Intermediate")}
                    </div>
                  </SelectItem>
                  <SelectItem value="Advanced">
                    <div className="flex items-center gap-2">
                      <span>Advanced</span>
                      {renderSkillLevelIcon("Advanced")}
                    </div>
                  </SelectItem>
                  <SelectItem value="Expert">
                    <div className="flex items-center gap-2">
                      <span>Expert</span>
                      {renderSkillLevelIcon("Expert")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => removeSkill(index)} 
                  variant="outline" 
                  size="sm" 
                  className="px-2"
                  type="button"
                >
                  ✕
                </Button>
                
                {index === profile.skills.length - 1 && (
                  <Button 
                    onClick={addSkill} 
                    variant="outline" 
                    size="sm" 
                    className="whitespace-nowrap"
                    type="button"
                  >
                    + Add Skill
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-primary" />
        Education
      </h3>
      <div className="space-y-6 mb-6">
        {profile.education.map((edu, index) => (
          <div key={`edu-${index}`} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                placeholder="School/University"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                placeholder="Degree"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                placeholder="Year"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {index === profile.education.length - 1 && (
                <Button onClick={addEducation} variant="outline" size="sm" className="whitespace-nowrap">
                  + Add Education
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-primary" />
        Experience
      </h3>
      <div className="space-y-6 mb-6">
        {profile.experience.map((exp, index) => (
          <div key={`exp-${index}`} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                placeholder="Company"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                placeholder="Position"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                placeholder="Duration (e.g., 2021-2023)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {index === profile.experience.length - 1 && (
                <Button onClick={addExperience} variant="outline" size="sm" className="whitespace-nowrap">
                  + Add Experience
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {isProfileCompleted ? "Account Management" : "Profile Setup"}
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
                Manage My Profile
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl mb-8">
                {isProfileCompleted 
                  ? "Update your information to keep your profile current and relevant."
                  : "Tell us about yourself so we can match you with the right opportunities."}
              </p>
            </div>
            
            {loading ? (
              <div className="max-w-3xl mx-auto text-center p-10">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-32 bg-gray-200 rounded w-full mx-auto"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
                <p className="mt-6 text-gray-500">Loading your profile...</p>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                <Tabs 
                  value={activeRole} 
                  onValueChange={(value) => handleRoleChange(value as "talent" | "builder" | "dual")}
                  className="w-full mb-8"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="talent">Talent Profile</TabsTrigger>
                    <TabsTrigger value="builder">Builder Profile</TabsTrigger>
                    <TabsTrigger value="dual">Dual Role Profile</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="talent" className="mt-6">
                    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                      {renderBasicInfo()}
                      {renderSkills()}
                      {renderEducation()}
                      {renderExperience()}
                      
                      <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row gap-4 justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => navigate('/dashboard')}
                          className="gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back to Dashboard
                        </Button>
                        <Button 
                          onClick={handleSaveProfile}
                          className="gap-2"
                        >
                          <Save className="h-4 w-4" />
                          {isProfileCompleted ? "Update Profile" : "Save Profile"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="builder" className="mt-6">
                    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                      {renderBasicInfo()}
                      {renderBusinessInfo()}
                      
                      <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row gap-4 justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => navigate('/dashboard')}
                          className="gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back to Dashboard
                        </Button>
                        <Button 
                          onClick={handleSaveProfile}
                          className="gap-2"
                        >
                          <Save className="h-4 w-4" />
                          {isProfileCompleted ? "Update Profile" : "Save Profile"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dual" className="mt-6">
                    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                      {renderBasicInfo()}
                      {renderBusinessInfo()}
                      {renderSkills()}
                      {renderEducation()}
                      {renderExperience()}
                      
                      <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row gap-4 justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => navigate('/dashboard')}
                          className="gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back to Dashboard
                        </Button>
                        <Button 
                          onClick={handleSaveProfile}
                          className="gap-2"
                        >
                          <Save className="h-4 w-4" />
                          {isProfileCompleted ? "Update Profile" : "Save Profile"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileEditPage;
