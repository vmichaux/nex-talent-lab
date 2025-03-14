
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Lightbulb } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";

interface RoleBadgeProps {
  userRole: "talent" | "entrepreneur" | "both" | null;
  isLoggedIn: boolean;
}

export function RoleBadge({ userRole: propUserRole, isLoggedIn }: RoleBadgeProps) {
  const { userData } = useAuth();
  const [userRole, setUserRole] = useState<"talent" | "entrepreneur" | "both" | null>(propUserRole);
  
  useEffect(() => {
    // First check if we have the role from Firestore in userData
    if (userData?.userRole) {
      setUserRole(userData.userRole);
    } else if (propUserRole) {
      // Fall back to the prop if Firestore data isn't available
      setUserRole(propUserRole);
    } else if (isLoggedIn) {
      // Last resort: check localStorage if user is logged in but we don't have the role from props or Firestore
      const savedRole = localStorage.getItem("userRole") as "talent" | "entrepreneur" | "both" | null;
      if (savedRole === "talent" || savedRole === "entrepreneur" || savedRole === "both") {
        setUserRole(savedRole);
      }
    }
  }, [userData, propUserRole, isLoggedIn]);
  
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
