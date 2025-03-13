
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

export function UploadButton() {
  const { toast } = useToast();
  const { activeTestProfile } = useAuth();
  
  const handleUpload = () => {
    toast({
      title: "Coming soon",
      description: "Photo upload functionality will be available soon."
    });
  };
  
  return (
    <div className="space-y-2">
      <Button type="button" variant="outline" onClick={handleUpload} className="gap-2">
        <Icons.upload className="h-4 w-4" />
        Upload Photo
        {activeTestProfile && (
          <Badge variant="outline" className="ml-1 text-xs bg-purple-50 text-purple-800 border-purple-300">
            Test
          </Badge>
        )}
      </Button>
      <p className="text-xs text-gray-500">
        JPG, GIF or PNG. 1MB max.
      </p>
    </div>
  );
}
