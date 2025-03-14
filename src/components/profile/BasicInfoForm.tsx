
import { Mail, Phone, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ProfilePictureUpload } from "./ProfilePictureUpload";

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
}

interface BasicInfoFormProps {
  profile: ProfileData;
  uploadingImage: boolean;
  handleInputChange: (field: string, value: any) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInfoForm = ({
  profile,
  uploadingImage,
  handleInputChange,
  handleFileChange
}: BasicInfoFormProps) => {
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
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
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
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <ProfilePictureUpload 
            profilePicture={profile.profilePicture}
            firstName={profile.firstName}
            lastName={profile.lastName}
            uploadingImage={uploadingImage}
            onFileChange={handleFileChange}
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
                  onSelect={(date) => handleInputChange("dateOfBirth", date)}
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
              onValueChange={(value) => handleInputChange("sex", value)}
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
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
            className="min-h-[100px] w-full"
          />
        </div>
      </div>
    </div>
  );
};
