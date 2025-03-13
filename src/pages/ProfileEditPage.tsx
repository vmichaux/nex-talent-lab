
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, UserPlus, Briefcase, GraduationCap, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ProfileEditPage = () => {
  const { isLoggedIn, updateProfileCompletion, userData, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isProfileCompleted = userData?.hasCompletedProfile || false;
  
  // State for user profile data
  const [profile, setProfile] = useState({
    fullName: "",
    title: "",
    location: "",
    bio: "",
    skills: [""],
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ company: "", position: "", duration: "" }]
  });
  
  // Load user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser?.uid) {
        const userProfileRef = doc(db, "userProfiles", currentUser.uid);
        try {
          const docSnap = await getDoc(userProfileRef);
          if (docSnap.exists()) {
            const profileData = docSnap.data();
            setProfile({
              fullName: profileData.fullName || "",
              title: profileData.title || "",
              location: profileData.location || "",
              bio: profileData.bio || "",
              skills: profileData.skills || [""],
              education: profileData.education || [{ school: "", degree: "", year: "" }],
              experience: profileData.experience || [{ company: "", position: "", duration: "" }]
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    
    fetchUserProfile();
  }, [currentUser]);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };

  // Handle skill changes
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = value;
    setProfile({
      ...profile,
      skills: updatedSkills
    });
  };

  // Add new skill field
  const addSkill = () => {
    setProfile({
      ...profile,
      skills: [...profile.skills, ""]
    });
  };

  // Handle education changes
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

  // Add new education field
  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { school: "", degree: "", year: "" }]
    });
  };

  // Handle experience changes
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

  // Add new experience field
  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { company: "", position: "", duration: "" }]
    });
  };

  const handleSaveProfile = async () => {
    try {
      // Save profile data to Firestore
      if (currentUser?.uid) {
        const userProfileRef = doc(db, "userProfiles", currentUser.uid);
        await setDoc(userProfileRef, profile);
      }
      
      // Mark the profile as completed
      await updateProfileCompletion(true);
      
      toast({
        title: "Profil sauvegardé",
        description: "Votre profil a été mis à jour avec succès.",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du profil.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
              <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {isProfileCompleted ? "Account Management" : "Profile Setup"}
              </div>
              
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                {isProfileCompleted ? "Modify Your Account" : "Complete Your Profile"}
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl mb-8">
                {isProfileCompleted 
                  ? "Update your information to keep your profile current and relevant."
                  : "Tell us about yourself so we can match you with the right opportunities."}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Professional Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={profile.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="UX Designer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={profile.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  Skills
                </h3>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {profile.skills.map((skill, index) => (
                    <div key={`skill-${index}`} className="flex gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        placeholder="e.g., UI Design, JavaScript"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      {index === profile.skills.length - 1 && (
                        <Button onClick={addSkill} variant="outline" size="sm" className="whitespace-nowrap">
                          + Add Skill
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileEditPage;
