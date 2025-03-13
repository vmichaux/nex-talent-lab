
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, UserPlus, Briefcase, GraduationCap, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ProfileEditPage = () => {
  const { isLoggedIn, updateProfileCompletion, userData, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isProfileCompleted = userData?.hasCompletedProfile || false;
  const [loading, setLoading] = useState(true);
  
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    title: "",
    location: "",
    bio: "",
    skills: [""],
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
            
            // Handle converting fullName to firstName and lastName if needed
            let firstName = "";
            let lastName = "";
            
            if (profileData.firstName && profileData.lastName) {
              firstName = profileData.firstName;
              lastName = profileData.lastName;
            } else if (profileData.fullName) {
              // Split the full name into first and last name
              const nameParts = profileData.fullName.split(" ");
              firstName = nameParts[0] || "";
              lastName = nameParts.slice(1).join(" ") || "";
            }
            
            // Create a properly structured profile object with fallbacks
            const loadedProfile = {
              firstName,
              lastName,
              title: profileData.title || "",
              location: profileData.location || "",
              bio: profileData.bio || "",
              skills: Array.isArray(profileData.skills) && profileData.skills.length > 0 
                ? profileData.skills 
                : [""],
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
            
            // Notify the user that their profile data has loaded
            toast({
              title: "Profile loaded",
              description: "Your profile information has been loaded successfully.",
            });
          } else {
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

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = value;
    setProfile({
      ...profile,
      skills: updatedSkills
    });
  };

  const addSkill = () => {
    setProfile({
      ...profile,
      skills: [...profile.skills, ""]
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

  const handleSaveProfile = async () => {
    try {
      if (currentUser?.uid) {
        // Combine first and last name for backward compatibility
        const fullName = `${profile.firstName} ${profile.lastName}`.trim();
        
        const userProfileRef = doc(db, "userProfiles", currentUser.uid);
        console.log("Saving profile data:", { ...profile, fullName });
        await setDoc(userProfileRef, {
          ...profile,
          fullName, // Include fullName for backward compatibility
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
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </Label>
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
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileEditPage;
