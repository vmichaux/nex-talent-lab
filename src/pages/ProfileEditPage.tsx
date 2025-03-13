
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { NotificationsForm } from "@/components/profile/NotificationsForm";
import { TestProfileManager } from "@/components/profile/TestProfileManager";
import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/components/profile/UploadButton";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileEditPage() {
  const { isLoggedIn, activeTestProfile, testProfiles, switchToTestProfile, switchToMainProfile, createTestProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [newProfileName, setNewProfileName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleCreateProfile = async () => {
    if (!newProfileName.trim()) return;
    
    await createTestProfile(newProfileName.trim());
    setNewProfileName("");
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
              <p className="text-gray-600">
                Manage your profile information and account preferences
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                    <Icons.userPlus className="h-4 w-4" />
                    New Test Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Test Profile</DialogTitle>
                    <DialogDescription>
                      Create a test profile to simulate different users when testing your project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-name">Profile Name</Label>
                      <Input 
                        id="profile-name" 
                        placeholder="Victoria 2" 
                        value={newProfileName}
                        onChange={(e) => setNewProfileName(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={handleCreateProfile}
                      disabled={!newProfileName.trim()}
                    >
                      Create Profile
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {testProfiles.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Icons.testingTools className="h-4 w-4 text-purple-600" />
                    <h3 className="font-semibold">Active Profile</h3>
                  </div>
                  
                  <ToggleGroup type="single" value={activeTestProfile?.id || "main"}>
                    <div className="flex flex-wrap gap-2">
                      <ToggleGroupItem 
                        value="main" 
                        onClick={switchToMainProfile}
                        className={`flex items-center gap-2 p-2 border rounded-md ${!activeTestProfile ? 'bg-green-50 border-green-200 text-green-800' : 'bg-white'}`}
                      >
                        <div className="flex items-center gap-2">
                          <Icons.user className="h-4 w-4" />
                          <span>Main Profile</span>
                          {!activeTestProfile && <Icons.circleCheck className="h-4 w-4 text-green-600" />}
                        </div>
                      </ToggleGroupItem>
                      
                      {testProfiles.map((profile) => (
                        <ToggleGroupItem 
                          key={profile.id} 
                          value={profile.id}
                          onClick={() => switchToTestProfile(profile.id)}
                          className={`flex items-center gap-2 p-2 border rounded-md ${profile.isActive ? 'bg-purple-50 border-purple-200 text-purple-800' : 'bg-white'}`}
                        >
                          <div className="flex items-center gap-2">
                            <Icons.testingTools className="h-4 w-4" />
                            <span>{profile.name}</span>
                            {profile.isActive && <Icons.circleCheck className="h-4 w-4 text-purple-600" />}
                          </div>
                        </ToggleGroupItem>
                      ))}
                    </div>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="grid md:grid-cols-[240px_1fr] gap-6">
            <Card>
              <CardContent className="p-4">
                <Tabs 
                  defaultValue="profile" 
                  orientation="vertical" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="h-full"
                >
                  <TabsList className="flex flex-col items-start h-auto gap-2 bg-transparent">
                    <TabsTrigger
                      value="profile"
                      className="w-full justify-start px-2 py-1 data-[state=active]:bg-gray-100"
                    >
                      <Icons.user className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="w-full justify-start px-2 py-1 data-[state=active]:bg-gray-100"
                    >
                      <Icons.bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="testProfiles"
                      className="w-full justify-start px-2 py-1 data-[state=active]:bg-gray-100"
                    >
                      <Icons.testingTools className="mr-2 h-4 w-4" />
                      Test Profiles
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              {activeTab === "profile" && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Profile Picture</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Upload a photo to personalize your profile
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <Icons.user className="h-12 w-12 text-gray-400" />
                          </div>
                          <UploadButton />
                        </div>
                      </div>
                      <Separator />
                      <ProfileForm />
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === "notifications" && (
                <Card>
                  <CardContent className="p-6">
                    <NotificationsForm />
                  </CardContent>
                </Card>
              )}
              
              {activeTab === "testProfiles" && (
                <TestProfileManager />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
