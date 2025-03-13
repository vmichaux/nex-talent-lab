
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function NotificationsForm() {
  const { toast } = useToast();
  const { activeTestProfile } = useAuth();
  
  const [notifications, setNotifications] = useState({
    newProjects: true,
    applicationUpdates: true,
    messages: true,
    marketing: false,
  });
  
  const handleChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated."
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
        
        {activeTestProfile && (
          <div className="bg-yellow-50 p-4 rounded-md text-sm mb-4">
            <p className="font-medium text-yellow-800">
              You are currently using a test profile: {activeTestProfile.name}
            </p>
            <p className="text-yellow-700 mt-1">
              Changes made in this profile won't affect your main account.
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-projects" className="font-medium">New Projects</Label>
              <p className="text-sm text-gray-500">Get notified when new projects match your skills</p>
            </div>
            <Switch 
              id="new-projects" 
              checked={notifications.newProjects}
              onCheckedChange={() => handleChange('newProjects')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="application-updates" className="font-medium">Application Updates</Label>
              <p className="text-sm text-gray-500">Receive updates on your project applications</p>
            </div>
            <Switch 
              id="application-updates" 
              checked={notifications.applicationUpdates}
              onCheckedChange={() => handleChange('applicationUpdates')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="messages" className="font-medium">Messages</Label>
              <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
            </div>
            <Switch 
              id="messages" 
              checked={notifications.messages}
              onCheckedChange={() => handleChange('messages')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing" className="font-medium">Marketing</Label>
              <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
            </div>
            <Switch 
              id="marketing" 
              checked={notifications.marketing}
              onCheckedChange={() => handleChange('marketing')}
            />
          </div>
        </div>
      </div>
      
      <Button type="submit">
        Save Preferences
      </Button>
    </form>
  );
}
