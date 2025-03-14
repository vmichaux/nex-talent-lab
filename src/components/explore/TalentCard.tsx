
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Clock, MapPin, MessageSquare, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: string;
  rating: number;
  availability: string;
  bio: string;
  image: string;
  featured: boolean;
}

interface TalentCardProps {
  talent: Talent;
}

export const TalentCard = ({ talent }: TalentCardProps) => {
  // Create a safe name for avatar fallback
  const getNameInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Ensure we have an array of skills
  const safeSkills = Array.isArray(talent.skills) ? talent.skills : [];

  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={talent.image} alt={talent.name} />
            <AvatarFallback>{getNameInitials(talent.name || 'User')}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {talent.name || 'Anonymous'}
              {talent.featured && <Badge variant="secondary" className="bg-purple-100 text-purple-800 ml-2 text-xs">
                  Featured
                </Badge>}
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">{talent.title || 'Professional'}</CardDescription>
            <div className="flex items-center text-xs text-gray-500 gap-2">
              <MapPin size={14} />
              <span>{talent.location || 'Remote'}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-1 space-y-5">
        <p className="text-sm text-gray-700">{talent.bio || 'No bio available'}</p>
        <div className="flex flex-wrap gap-2">
          {safeSkills.slice(0, 3).map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-gray-50 text-xs">
              {skill}
            </Badge>
          ))}
          {safeSkills.length === 0 && (
            <Badge variant="outline" className="bg-gray-50 text-xs">
              Various Skills
            </Badge>
          )}
        </div>
        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-gray-400" />
            <span>Experience: {talent.experience || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-400" />
            <span>Rating: {talent.rating?.toFixed(1) || '4.5'}/5.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span>{talent.availability || 'Available now'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button variant="default" className="w-full flex items-center gap-1 text-xs">
          <MessageSquare size={14} />
          Connect
        </Button>
        <Button variant="outline" className="w-full text-xs">View Profile</Button>
      </CardFooter>
    </Card>
  );
};
