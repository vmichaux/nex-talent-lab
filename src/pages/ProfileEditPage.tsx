
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BasicInfoForm } from "@/components/profile/BasicInfoForm";
import { BusinessInfoForm } from "@/components/profile/BusinessInfoForm";
import { SkillsForm } from "@/components/profile/SkillsForm";
import { EducationForm } from "@/components/profile/EducationForm";
import { ExperienceForm } from "@/components/profile/ExperienceForm";
import { InterestsForm } from "@/components/profile/InterestsForm";
import { RoleTabs } from "@/components/profile/RoleTabs";

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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeRole, setActiveRole] = useState<"talent" | "builder" | "dual">("talent");
  const [newInterest, setNewInterest] = useState("");
  
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

  const handleAddInterest = (interest: string) => {
    if (!interest.trim()) return;
    
    if (!profile.interests.includes(interest.trim()) && profile.interests.length < 6) {
      console.log("Adding interest:", interest);
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, interest.trim()]
      }));
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

  // Content for each tab
  const renderTalentContent = () => (
    <>
      <BasicInfoForm 
        profile={profile}
        uploadingImage={uploadingImage}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
      />
      <SkillsForm 
        skills={profile.skills}
        handleSkillNameChange={handleSkillNameChange}
        handleSkillLevelChange={handleSkillLevelChange}
        addSkill={addSkill}
        removeSkill={removeSkill}
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
        handleAddInterest={handleAddInterest}
        handleRemoveInterest={handleRemoveInterest}
      />
    </>
  );

  const renderBuilderContent = () => (
    <>
      <BasicInfoForm 
        profile={profile}
        uploadingImage={uploadingImage}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
      />
      <BusinessInfoForm 
        business={profile.business}
        handleBusinessChange={handleBusinessChange}
      />
      <InterestsForm 
        interests={profile.interests}
        handleAddInterest={handleAddInterest}
        handleRemoveInterest={handleRemoveInterest}
      />
    </>
  );

  const renderDualContent = () => (
    <>
      <BasicInfoForm 
        profile={profile}
        uploadingImage={uploadingImage}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
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
        handleAddInterest={handleAddInterest}
        handleRemoveInterest={handleRemoveInterest}
      />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <ProfileHeader isProfileCompleted={isProfileCompleted} />
            
            <div className="max-w-3xl mx-auto">
              <RoleTabs 
                activeRole={activeRole}
                handleRoleChange={handleRoleChange}
                talentContent={renderTalentContent()}
                builderContent={renderBuilderContent()}
                dualContent={renderDualContent()}
                isProfileCompleted={isProfileCompleted}
                handleSaveProfile={handleSaveProfile}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileEditPage;
