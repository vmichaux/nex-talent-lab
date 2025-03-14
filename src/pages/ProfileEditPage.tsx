
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Import the refactored components
import { BasicInfo } from "@/components/profile/BasicInfo";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { EducationSection } from "@/components/profile/EducationSection";
import { ExperienceSection } from "@/components/profile/ExperienceSection";
import { InterestsSection } from "@/components/profile/InterestsSection";
import { BusinessInfo } from "@/components/profile/BusinessInfo";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface Skill {
  name: string;
  level: SkillLevel;
}

const ProfileEditPage = () => {
  const { isLoggedIn, updateProfileCompletion, userData, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isProfileCompleted = userData?.hasCompletedProfile || false;
  const [loading, setLoading] = useState(true);
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
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBusinessChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      business: {
        ...prev.business,
        [field]: value
      }
    }));
  };

  const handleSkillNameChange = (index, value) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      name: value
    };
    setProfile(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const handleSkillLevelChange = (index, level: SkillLevel) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      level
    };
    setProfile(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const addSkill = () => {
    console.log("Adding skill");
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, { name: "", level: "Intermediate" }]
    }));
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...profile.skills];
    updatedSkills.splice(index, 1);
    if (updatedSkills.length === 0) {
      updatedSkills.push({ name: "", level: "Intermediate" });
    }
    setProfile(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...profile.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setProfile(prev => ({
      ...prev,
      education: updatedEducation
    }));
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", year: "" }]
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...profile.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setProfile(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", position: "", duration: "" }]
    }));
  };

  const handleRoleChange = (role: "talent" | "builder" | "dual") => {
    setActiveRole(role);
    localStorage.setItem("userRole", role === "builder" ? "entrepreneur" : role === "dual" ? "both" : "talent");
  };

  const handleAddInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: [...prev.interests, interest]
    }));
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(item => item !== interest)
    }));
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
                      <BasicInfo 
                        profile={profile} 
                        currentUserId={currentUser?.uid || ''} 
                        onInputChange={handleInputChange} 
                      />
                      
                      <SkillsSection 
                        skills={profile.skills}
                        onSkillNameChange={handleSkillNameChange}
                        onSkillLevelChange={handleSkillLevelChange}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                      />
                      
                      <EducationSection 
                        education={profile.education}
                        onEducationChange={handleEducationChange}
                        addEducation={addEducation}
                      />
                      
                      <ExperienceSection 
                        experience={profile.experience}
                        onExperienceChange={handleExperienceChange}
                        addExperience={addExperience}
                      />
                      
                      <InterestsSection 
                        interests={profile.interests}
                        onAddInterest={handleAddInterest}
                        onRemoveInterest={handleRemoveInterest}
                      />
                      
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
                      <BasicInfo 
                        profile={profile} 
                        currentUserId={currentUser?.uid || ''} 
                        onInputChange={handleInputChange} 
                      />
                      
                      <BusinessInfo 
                        business={profile.business}
                        onBusinessChange={handleBusinessChange}
                      />
                      
                      <InterestsSection 
                        interests={profile.interests}
                        onAddInterest={handleAddInterest}
                        onRemoveInterest={handleRemoveInterest}
                      />
                      
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
                      <BasicInfo 
                        profile={profile} 
                        currentUserId={currentUser?.uid || ''} 
                        onInputChange={handleInputChange} 
                      />
                      
                      <BusinessInfo 
                        business={profile.business}
                        onBusinessChange={handleBusinessChange}
                      />
                      
                      <SkillsSection 
                        skills={profile.skills}
                        onSkillNameChange={handleSkillNameChange}
                        onSkillLevelChange={handleSkillLevelChange}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                      />
                      
                      <EducationSection 
                        education={profile.education}
                        onEducationChange={handleEducationChange}
                        addEducation={addEducation}
                      />
                      
                      <ExperienceSection 
                        experience={profile.experience}
                        onExperienceChange={handleExperienceChange}
                        addExperience={addExperience}
                      />
                      
                      <InterestsSection 
                        interests={profile.interests}
                        onAddInterest={handleAddInterest}
                        onRemoveInterest={handleRemoveInterest}
                      />
                      
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
