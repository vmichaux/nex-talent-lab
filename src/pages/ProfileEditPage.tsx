
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Profile, SkillLevel, ProficiencyLevel, Skill, Language, Certification } from "@/types/profile";

// Import refactored components
import BasicInfoForm from "@/components/profile/BasicInfoForm";
import BusinessInfoForm from "@/components/profile/BusinessInfoForm";
import SkillsForm from "@/components/profile/SkillsForm";
import EducationForm from "@/components/profile/EducationForm";
import ExperienceForm from "@/components/profile/ExperienceForm";
import LanguagesForm from "@/components/profile/LanguagesForm";
import CertificationsForm from "@/components/profile/CertificationsForm";
import InterestsForm from "@/components/profile/InterestsForm";
import ProfileActionButtons from "@/components/profile/ProfileActionButtons";

const ProfileEditPage = () => {
  const { isLoggedIn, updateProfileCompletion, userData, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isProfileCompleted = userData?.hasCompletedProfile || false;
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<"talent" | "builder" | "dual">("talent");
  
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    title: "",
    location: "",
    bio: "",
    profilePicture: "",
    dateOfBirth: null,
    email: "",
    phoneNumber: "",
    sex: "",
    interests: [],
    business: {
      companyName: "",
      foundedYear: "",
      description: "",
      employees: "",
      industry: "",
      projectNeeds: "",
      billingDetails: ""
    },
    skills: [{ name: "", level: "Intermediate" }],
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ company: "", position: "", duration: "" }],
    languages: [{ name: "", proficiency: "Intermediate" }],
    certifications: []
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
            const profileData = docSnap.data() as Partial<Profile>;
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
                    name: skill as string,
                    level: "Intermediate" as SkillLevel
                  }));
                } else {
                  skills = profileData.skills.map(skill => ({
                    name: (skill as Skill).name || "",
                    level: (skill as Skill).level || "Intermediate"
                  }));
                }
              }
            }
            
            if (skills.length === 0) {
              skills = [{ name: "", level: "Intermediate" }];
            }
            
            const loadedProfile: Profile = {
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
                : [{ company: "", position: "", duration: "" }],
              languages: Array.isArray(profileData.languages) && profileData.languages.length > 0
                ? profileData.languages
                : [{ name: "", proficiency: "Intermediate" }],
              certifications: Array.isArray(profileData.certifications)
                ? profileData.certifications
                : []
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

  const handleAddInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: [...profile.interests, interest]
    });
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter(item => item !== interest)
    });
  };

  // Language handlers
  const handleLanguageNameChange = (index: number, value: string) => {
    const updatedLanguages = [...profile.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      name: value
    };
    setProfile({
      ...profile,
      languages: updatedLanguages
    });
  };

  const handleLanguageProficiencyChange = (index: number, proficiency: ProficiencyLevel) => {
    const updatedLanguages = [...profile.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      proficiency
    };
    setProfile({
      ...profile,
      languages: updatedLanguages
    });
  };

  const addLanguage = () => {
    setProfile({
      ...profile,
      languages: [...profile.languages, { name: "", proficiency: "Intermediate" }]
    });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...profile.languages];
    updatedLanguages.splice(index, 1);
    if (updatedLanguages.length === 0) {
      updatedLanguages.push({ name: "", proficiency: "Intermediate" });
    }
    setProfile({
      ...profile,
      languages: updatedLanguages
    });
  };

  // Certification handlers
  const handleCertificationChange = (index: number, field: string, value: string) => {
    const updatedCertifications = [...profile.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    };
    setProfile({
      ...profile,
      certifications: updatedCertifications
    });
  };

  const addCertification = () => {
    setProfile({
      ...profile,
      certifications: [...profile.certifications, { 
        name: "", 
        issuer: "", 
        dateObtained: "" 
      }]
    });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = [...profile.certifications];
    updatedCertifications.splice(index, 1);
    setProfile({
      ...profile,
      certifications: updatedCertifications
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
                      <BasicInfoForm 
                        profile={profile} 
                        handleInputChange={handleInputChange}
                        userId={currentUser?.uid}
                      />
                      
                      <SkillsForm 
                        skills={profile.skills}
                        handleSkillNameChange={handleSkillNameChange}
                        handleSkillLevelChange={handleSkillLevelChange}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                      />
                      
                      <LanguagesForm
                        languages={profile.languages}
                        handleLanguageNameChange={handleLanguageNameChange}
                        handleLanguageProficiencyChange={handleLanguageProficiencyChange}
                        addLanguage={addLanguage}
                        removeLanguage={removeLanguage}
                      />
                      
                      <CertificationsForm
                        certifications={profile.certifications}
                        handleCertificationChange={handleCertificationChange}
                        addCertification={addCertification}
                        removeCertification={removeCertification}
                      />
                      
                      <EducationForm
                        education={profile.education}
                        handleEducationChange={handleEducationChange}
                        addEducation={addEducation}
                      />
                      
                      <ExperienceForm
                        experience={profile.experience}
                        handleExperienceChange={handleExperienceChange}
                        addExperience={addExperience}
                      />
                      
                      <InterestsForm
                        interests={profile.interests}
                        onAddInterest={handleAddInterest}
                        onRemoveInterest={handleRemoveInterest}
                      />
                      
                      <ProfileActionButtons
                        isProfileCompleted={isProfileCompleted}
                        onSave={handleSaveProfile}
                        onBackToDashboard={() => navigate('/dashboard')}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="builder" className="mt-6">
                    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                      <BasicInfoForm 
                        profile={profile} 
                        handleInputChange={handleInputChange}
                        userId={currentUser?.uid}
                      />
                      
                      <BusinessInfoForm
                        business={profile.business}
                        handleBusinessChange={handleBusinessChange}
                      />
                      
                      <InterestsForm
                        interests={profile.interests}
                        onAddInterest={handleAddInterest}
                        onRemoveInterest={handleRemoveInterest}
                      />
                      
                      <ProfileActionButtons
                        isProfileCompleted={isProfileCompleted}
                        onSave={handleSaveProfile}
                        onBackToDashboard={() => navigate('/dashboard')}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dual" className="mt-6">
                    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                      <BasicInfoForm 
                        profile={profile} 
                        handleInputChange={handleInputChange}
                        userId={currentUser?.uid}
                      />
                      
                      <BusinessInfoForm
                        business={profile.business}
                        handleBusinessChange={handleBusinessChange}
                      />
                      
                      <SkillsForm 
                        skills={profile.skills}
                        handleSkillNameChange={handleSkillNameChange}
                        handleSkillLevelChange={handleSkillLevelChange}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                      />
                      
                      <LanguagesForm
                        languages={profile.languages}
                        handleLanguageNameChange={handleLanguageNameChange}
                        handleLanguageProficiencyChange={handleLanguageProficiencyChange}
                        addLanguage={addLanguage}
                        removeLanguage={removeLanguage}
                      />
                      
                      <CertificationsForm
                        certifications={profile.certifications}
                        handleCertificationChange={handleCertificationChange}
                        addCertification={addCertification}
                        removeCertification={removeCertification}
                      />
                      
                      <EducationForm
                        education={profile.education}
                        handleEducationChange={handleEducationChange}
                        addEducation={addEducation}
                      />
                      
                      <ExperienceForm
                        experience={profile.experience}
                        handleExperienceChange={handleExperienceChange}
                        addExperience={addExperience}
                      />
                      
                      <InterestsForm
                        interests={profile.interests}
                        onAddInterest={handleAddInterest}
                        onRemoveInterest={handleRemoveInterest}
                      />
                      
                      <ProfileActionButtons
                        isProfileCompleted={isProfileCompleted}
                        onSave={handleSaveProfile}
                        onBackToDashboard={() => navigate('/dashboard')}
                      />
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
