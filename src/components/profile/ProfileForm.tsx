
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getUserProfile } from "@/lib/firebase/userService";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/Icons";

export function ProfileForm() {
  const { toast } = useToast();
  const { currentUser, activeTestProfile, testProfiles, switchToTestProfile, switchToMainProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(activeTestProfile ? activeTestProfile.id : "main");
  
  const [mainProfileData, setMainProfileData] = useState({
    firstName: "",
    lastName: "",
    email: currentUser?.email || "",
    phone: "",
    bio: ""
  });
  
  const [testProfileData, setTestProfileData] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Fetch the main profile data
    const fetchMainProfile = async () => {
      if (currentUser) {
        const profileData = await getUserProfile(currentUser.uid);
        if (profileData) {
          setMainProfileData({
            firstName: profileData.firstName || "",
            lastName: profileData.lastName || "",
            email: profileData.email || currentUser.email || "",
            phone: profileData.phone || "",
            bio: profileData.bio || ""
          });
        }
      }
    };
    
    fetchMainProfile();
    
    // Set up test profile data placeholders
    const testData: Record<string, any> = {};
    testProfiles.forEach(profile => {
      testData[profile.id] = {
        firstName: `${profile.name.split(' ')[0] || ""}`,
        lastName: `${profile.name.split(' ').slice(1).join(' ') || ""}`,
        email: profile.email || "",
        phone: "",
        bio: `Test profile for ${profile.name}`
      };
    });
    
    setTestProfileData(testData);
  }, [currentUser, testProfiles]);
  
  const handleProfileSwitch = (profileId: string) => {
    if (profileId === "main") {
      switchToMainProfile();
    } else {
      switchToTestProfile(profileId);
    }
    setActiveTab(profileId);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, profileId: string) => {
    const { name, value } = e.target;
    
    if (profileId === "main") {
      setMainProfileData(prev => ({ ...prev, [name]: value }));
    } else {
      setTestProfileData(prev => ({
        ...prev,
        [profileId]: {
          ...prev[profileId],
          [name]: value
        }
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent, profileId: string) => {
    e.preventDefault();
    
    toast({
      title: "Profile updated",
      description: `Your ${profileId === "main" ? "main" : "test"} profile information has been saved.`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Profile Information</h3>
        
        {testProfiles.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Select Active Profile</h4>
            <Tabs value={activeTab} onValueChange={handleProfileSwitch} className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <TabsTrigger value="main" className="flex items-center gap-2">
                  <Icons.user className="h-4 w-4" />
                  <span>Main Profile</span>
                  {!activeTestProfile && <Badge className="ml-2 bg-green-100 text-green-800 border-green-300">Active</Badge>}
                </TabsTrigger>
                
                {testProfiles.map((profile) => (
                  <TabsTrigger key={profile.id} value={profile.id} className="flex items-center gap-2">
                    <Icons.testingTools className="h-4 w-4" />
                    <span>{profile.name}</span>
                    {profile.isActive && <Badge className="ml-2 bg-green-100 text-green-800 border-green-300">Active</Badge>}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="main">
                <Card className="border-t-0 rounded-t-none p-4">
                  <form onSubmit={(e) => handleSubmit(e, "main")} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="main-firstName">First Name</Label>
                        <Input
                          id="main-firstName"
                          name="firstName"
                          value={mainProfileData.firstName}
                          onChange={(e) => handleChange(e, "main")}
                          placeholder="Enter your first name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="main-lastName">Last Name</Label>
                        <Input
                          id="main-lastName"
                          name="lastName"
                          value={mainProfileData.lastName}
                          onChange={(e) => handleChange(e, "main")}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="main-email">Email</Label>
                      <Input
                        id="main-email"
                        name="email"
                        type="email"
                        value={mainProfileData.email}
                        onChange={(e) => handleChange(e, "main")}
                        placeholder="Enter your email"
                        disabled={true}
                      />
                      <p className="text-xs text-gray-500">
                        Your email is linked to your account and cannot be changed.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="main-phone">Phone Number</Label>
                      <Input
                        id="main-phone"
                        name="phone"
                        value={mainProfileData.phone}
                        onChange={(e) => handleChange(e, "main")}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="main-bio">Bio</Label>
                      <Textarea
                        id="main-bio"
                        name="bio"
                        value={mainProfileData.bio}
                        onChange={(e) => handleChange(e, "main")}
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </form>
                </Card>
              </TabsContent>
              
              {testProfiles.map((profile) => (
                <TabsContent key={profile.id} value={profile.id}>
                  <Card className="border-t-0 rounded-t-none p-4">
                    <form onSubmit={(e) => handleSubmit(e, profile.id)} className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-md mb-4">
                        <p className="font-medium text-purple-800">Test Profile: {profile.name}</p>
                        <p className="text-purple-700 text-sm">Changes made in this profile won't affect your main account.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${profile.id}-firstName`}>First Name</Label>
                          <Input
                            id={`${profile.id}-firstName`}
                            name="firstName"
                            value={testProfileData[profile.id]?.firstName || ""}
                            onChange={(e) => handleChange(e, profile.id)}
                            placeholder="Enter first name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`${profile.id}-lastName`}>Last Name</Label>
                          <Input
                            id={`${profile.id}-lastName`}
                            name="lastName"
                            value={testProfileData[profile.id]?.lastName || ""}
                            onChange={(e) => handleChange(e, profile.id)}
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`${profile.id}-email`}>Email</Label>
                        <Input
                          id={`${profile.id}-email`}
                          name="email"
                          type="email"
                          value={testProfileData[profile.id]?.email || ""}
                          onChange={(e) => handleChange(e, profile.id)}
                          placeholder="Enter email"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`${profile.id}-phone`}>Phone Number</Label>
                        <Input
                          id={`${profile.id}-phone`}
                          name="phone"
                          value={testProfileData[profile.id]?.phone || ""}
                          onChange={(e) => handleChange(e, profile.id)}
                          placeholder="Enter phone number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`${profile.id}-bio`}>Bio</Label>
                        <Textarea
                          id={`${profile.id}-bio`}
                          name="bio"
                          value={testProfileData[profile.id]?.bio || ""}
                          onChange={(e) => handleChange(e, profile.id)}
                          placeholder="Tell us about this test profile"
                          rows={4}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full sm:w-auto">
                        Save Changes
                      </Button>
                    </form>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
