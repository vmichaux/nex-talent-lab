
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface Skill {
  name: string;
  level: SkillLevel;
}

interface BusinessInfo {
  companyName: string;
  foundedYear: string;
  description: string;
  employees: string;
  industry: string;
  projectNeeds: string;
  billingDetails: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  bio: string;
  profilePicture: string;
  dateOfBirth: Date | null;
  email: string;
  phoneNumber: string;
  sex: string;
  interests: string[];
  business: BusinessInfo;
  skills: Skill[];
  education: { school: string; degree: string; year: string }[];
  experience: { company: string; position: string; duration: string }[];
}

export const useProfileForm = () => {
  const { isLoggedIn, updateProfileCompletion, userData, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isProfileCompleted = userData?.hasCompletedProfile || false;
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<"talent" | "builder" | "dual">("talent");
  
  const [profile, setProfile] = useState<ProfileData>({
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
    experience: [{ company: "", position: "", duration: "" }]
  });
  
  // Fetch user profile
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
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  
  // Field handlers
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
      
      // Ensure user role is saved to localStorage
      const roleToSave = activeRole === "builder" ? "entrepreneur" : activeRole === "dual" ? "both" : "talent";
      localStorage.setItem("userRole", roleToSave);
      
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully.",
      });
      
      // Direct navigation to dashboard after profile is saved
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

  return {
    profile,
    activeRole,
    loading,
    isProfileCompleted,
    handleInputChange,
    handleBusinessChange,
    handleSkillNameChange,
    handleSkillLevelChange,
    addSkill,
    removeSkill,
    handleEducationChange,
    addEducation,
    handleExperienceChange,
    addExperience,
    handleRoleChange,
    handleAddInterest,
    handleRemoveInterest,
    handleSaveProfile
  };
};

export type { Skill, SkillLevel, ProfileData };
