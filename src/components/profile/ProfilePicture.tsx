
import { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, ImagePlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface ProfilePictureProps {
  profilePicture: string;
  firstName: string;
  lastName: string;
  userId: string | undefined;
  onPictureChange: (url: string) => void;
}

const ProfilePicture = ({ 
  profilePicture, 
  firstName, 
  lastName, 
  userId,
  onPictureChange
}: ProfilePictureProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `profilePictures/${userId}/${Date.now()}_${file.name}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      onPictureChange(downloadURL);
      
      toast({
        title: "Image uploaded",
        description: "Your profile picture has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload error",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
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
              onChange={handleFileChange}
              disabled={uploadingImage}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePicture;
