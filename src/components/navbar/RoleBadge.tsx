
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Lightbulb } from "lucide-react";

interface RoleBadgeProps {
  userRole: "talent" | "entrepreneur" | "both" | null;
  isLoggedIn: boolean;
}

export function RoleBadge({ userRole, isLoggedIn }: RoleBadgeProps) {
  if (!isLoggedIn || !userRole) return null;
  
  switch(userRole) {
    case 'talent':
      return (
        <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30">
          <GraduationCap className="h-3 w-3 mr-1" />
          Talent
        </Badge>
      );
    case 'entrepreneur':
      return (
        <Badge className="ml-2 bg-secondary/20 text-secondary hover:bg-secondary/30">
          <Briefcase className="h-3 w-3 mr-1" />
          Builder
        </Badge>
      );
    case 'both':
      return (
        <Badge className="ml-2 bg-purple-200 text-purple-700 hover:bg-purple-300">
          <Lightbulb className="h-3 w-3 mr-1" />
          Dual Role
        </Badge>
      );
    default:
      return null;
  }
}
