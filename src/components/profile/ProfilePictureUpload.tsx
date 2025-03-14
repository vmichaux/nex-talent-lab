
import { Camera, ImagePlus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

interface ProfilePictureUploadProps {
  profilePicture: string;
  firstName: string;
  lastName: string;
  uploadingImage: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePictureUpload = ({
  profilePicture,
  firstName,
  lastName,
  uploadingImage,
  onFileChange
}: ProfilePictureUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="p-6 w-full max-w-md">
        <div className="flex flex-col items-center gap-6">
          <div className="relative group cursor-pointer" onClick={handleProfilePictureClick}>
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              {profilePicture ? (
                <AvatarImage src={profilePicture} alt={`${firstName} ${lastName}`} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                  {firstName && lastName 
                    ? `${firstName[0]}${lastName[0]}`
                    : "?"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={handleProfilePictureClick}
              disabled={uploadingImage}
            >
              {uploadingImage ? (
                <div className="animate-pulse">Uploading...</div>
              ) : (
                <>
                  <ImagePlus className="h-4 w-4" />
                  {profilePicture ? "Change Picture" : "Add Picture"}
                </>
              )}
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={onFileChange}
              disabled={uploadingImage}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
