
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

const TalentCard = ({ talent }: TalentCardProps) => {
  // Ensure all required props exist with fallbacks to prevent rendering issues
  const safeProps = {
    name: talent.name || 'Unknown',
    title: talent.title || 'Professional',
    location: talent.location || 'Remote',
    skills: Array.isArray(talent.skills) ? talent.skills : [],
    experience: talent.experience || 'New Member',
    rating: talent.rating || 4.5,
    availability: talent.availability || 'Available now',
    bio: talent.bio || 'No bio provided',
    image: talent.image || '/placeholder.svg',
    featured: Boolean(talent.featured)
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={safeProps.image} alt={safeProps.name} />
            <AvatarFallback>{safeProps.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {safeProps.name}
              {safeProps.featured && <Badge variant="secondary" className="bg-purple-100 text-purple-800 ml-2 text-xs">
                  Featured
                </Badge>}
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">{safeProps.title}</CardDescription>
            <div className="flex items-center text-xs text-gray-500 gap-2">
              <MapPin size={14} />
              <span>{safeProps.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-1 space-y-5">
        <p className="text-sm text-gray-700">{safeProps.bio}</p>
        <div className="flex flex-wrap gap-2">
          {safeProps.skills.slice(0, 2).map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-gray-50 text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-gray-400" />
            <span>Experience: {safeProps.experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-400" />
            <span>Rating: {safeProps.rating}/5.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span>{safeProps.availability}</span>
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

export default TalentCard;
