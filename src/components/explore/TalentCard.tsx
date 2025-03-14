
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Clock, MapPin, MessageSquare, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Talent } from "@/hooks/useTalents";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useLocation } from "react-router-dom";

interface TalentCardProps {
  talent: Talent;
}

export const TalentCard = ({ talent }: TalentCardProps) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the explore page
  const isExplorePage = location.pathname === "/explore";
  
  // Calculate initials for avatar fallback
  const initials = talent.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
    
  const handleButtonClick = (e: React.MouseEvent) => {
    // If user is not logged in and is on the explore page, redirect to onboarding
    if (!isLoggedIn && isExplorePage) {
      e.preventDefault();
      navigate("/onboarding");
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={talent.image || "/placeholder.svg"} alt={talent.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {talent.name}
              {talent.featured && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 ml-2 text-xs">
                  Featured
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              {talent.title || "Professional"}
            </CardDescription>
            <div className="flex items-center text-xs text-gray-500 gap-2">
              <MapPin size={14} />
              <span>{talent.location || "Remote"}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-1 space-y-5">
        <p className="text-sm text-gray-700">{talent.bio || "Available for projects and collaborations."}</p>
        <div className="flex flex-wrap gap-2">
          {(talent.skills || []).slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50 text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-gray-400" />
            <span>Experience: {talent.experience || "Not specified"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-400" />
            <span>Rating: {talent.rating?.toFixed(1) || "New"}/5.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span>{talent.availability || "Check availability"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button 
          variant="default" 
          className="w-full flex items-center gap-1 text-xs"
          onClick={handleButtonClick}
        >
          <MessageSquare size={14} />
          Connect
        </Button>
        <Button 
          variant="outline" 
          className="w-full text-xs"
          onClick={handleButtonClick}
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
