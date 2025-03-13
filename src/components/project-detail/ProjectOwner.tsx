
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, MapPin } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectOwnerProps {
  project: Project;
  owner: any;
  isEditing: boolean;
}

export function ProjectOwner({ project, owner, isEditing }: ProjectOwnerProps) {
  if (isEditing) {
    return null;
  }

  if (owner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Owner</CardTitle>
          <CardDescription>About the project creator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={owner.photoURL} alt={owner.displayName} />
              <AvatarFallback>
                {owner.firstName ? owner.firstName[0] + (owner.lastName ? owner.lastName[0] : '') : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">
                {owner.firstName && owner.lastName 
                  ? `${owner.firstName} ${owner.lastName}`
                  : owner.displayName || 'User'}
              </h3>
              <p className="text-gray-600">{owner.title || 'Project Creator'}</p>
            </div>
          </div>
          
          {owner.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-gray-400" />
              <span>{owner.location}</span>
            </div>
          )}
          
          {owner.bio && (
            <div>
              <h4 className="font-medium mb-2">Bio</h4>
              <p className="text-gray-700 text-sm">{owner.bio}</p>
            </div>
          )}
          
          <Button className="w-full gap-2">
            <MessageSquare size={16} />
            Contact Owner
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Owner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{project.owner || "Project Creator"}</h3>
          </div>
        </div>
        
        <Button className="w-full gap-2 mt-6">
          <MessageSquare size={16} />
          Contact Owner
        </Button>
      </CardContent>
    </Card>
  );
}
