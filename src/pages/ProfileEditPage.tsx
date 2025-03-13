
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

export default function ProfileEditPage() {
  const { isLoggedIn, activeTestProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-start mb-6">
            <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
            <p className="text-gray-600">
              Manage your profile information and account preferences
            </p>
            
            {activeTestProfile && (
              <Badge className="mt-2 bg-purple-100 text-purple-800 border-purple-300">
                Test Profile: {activeTestProfile.name}
              </Badge>
            )}
          </div>
          
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
