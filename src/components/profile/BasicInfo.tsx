
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ProfilePicture } from "./ProfilePicture";

interface BasicInfoProps {
  profile: {
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
  };
  currentUserId: string;
  onInputChange: (field: string, value: any) => void;
}

export const BasicInfo = ({ profile, currentUserId, onInputChange }: BasicInfoProps) => {
  const handlePictureUpdate = (url: string) => {
    onInputChange("profilePicture", url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Contact information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={profile.firstName}
                onChange={(e) => onInputChange("firstName", e.target.value)}
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
                onChange={(e) => onInputChange("lastName", e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={profile.phoneNumber}
              onChange={(e) => onInputChange("phoneNumber", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <ProfilePicture 
            profilePicture={profile.profilePicture}
            firstName={profile.firstName}
            lastName={profile.lastName}
            currentUserId={currentUserId}
            onPictureUpdate={handlePictureUpdate}
          />
        </div>
      </div>
      
      {/* Additional profile information - below the photo */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        {/* Professional Title and Location on the same line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Professional Title
            </Label>
            <Input
              id="title"
              type="text"
              value={profile.title}
              onChange={(e) => onInputChange("title", e.target.value)}
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
              onChange={(e) => onInputChange("location", e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        {/* Date of Birth and Sex on the same line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date of Birth
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !profile.dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {profile.dateOfBirth ? format(profile.dateOfBirth, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={profile.dateOfBirth || undefined}
                  onSelect={(date) => onInputChange("dateOfBirth", date)}
                  initialFocus
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sex" className="text-sm font-medium">
              Sex
            </Label>
            <Select
              value={profile.sex}
              onValueChange={(value) => onInputChange("sex", value)}
            >
              <SelectTrigger id="sex" className="w-full">
                <SelectValue placeholder="Select your sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="nonbinary">Non-binary</SelectItem>
                <SelectItem value="preferNotToSay">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium">
            Bio
          </Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => onInputChange("bio", e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
            className="min-h-[100px] w-full"
          />
        </div>
      </div>
    </div>
  );
};
