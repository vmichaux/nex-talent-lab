
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function TestProfileManager() {
  const { testProfiles, activeTestProfile, createTestProfile, switchToTestProfile, switchToMainProfile } = useAuth();
  const [newProfileName, setNewProfileName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleCreateProfile = async () => {
    if (!newProfileName.trim()) return;
    
    await createTestProfile(newProfileName.trim());
    setNewProfileName("");
    setIsDialogOpen(false);
  };

  const handleProfileSwitch = async (profileId: string) => {
    await switchToTestProfile(profileId);
  };

  const handleMainProfileSwitch = async () => {
    await switchToMainProfile();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          Test Profiles
        </CardTitle>
        <CardDescription>
          Create and manage test profiles to simulate different users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeTestProfile && (
          <div className="mb-4 p-3 bg-primary/10 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-primary">Active Test Profile</p>
                <p className="text-sm">{activeTestProfile.name}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleMainProfileSwitch}
              >
                Switch to Main
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {testProfiles.length > 0 ? (
            testProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.name}</span>
                    {profile.isActive && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Created: {format(new Date(profile.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={profile.isActive}
                    onCheckedChange={() => {
                      if (!profile.isActive) {
                        handleProfileSwitch(profile.id);
                      } else {
                        handleMainProfileSwitch();
                      }
                    }}
                  />
                  <Label htmlFor={`profile-${profile.id}`}>
                    {profile.isActive ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              No test profiles created yet
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Test Profile
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
      </CardFooter>
    </Card>
  );
}
