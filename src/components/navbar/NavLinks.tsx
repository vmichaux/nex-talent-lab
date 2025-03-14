
import { Link, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";

interface NavLinksProps {
  isLoggedIn: boolean;
  handleDashboardClick: (e: React.MouseEvent) => void;
  isMobile?: boolean;
  onItemClick?: () => void;
  showSimplified?: boolean;
}

export function NavLinks({ 
  isLoggedIn, 
  handleDashboardClick, 
  isMobile = false, 
  onItemClick,
  showSimplified = false
}: NavLinksProps) {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { toast } = useToast();
  const profileCompleted = userData?.hasCompletedProfile || false;
  
  const linkClass = isMobile 
    ? "block py-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
    : "font-medium hover:text-primary transition-colors flex items-center gap-1";

  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  const handleProfileGatedNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    
    if (!profileCompleted) {
      toast({
        title: "Profile completion required",
        description: "Please complete your profile to access this feature.",
        variant: "destructive",
      });
      navigate('/profile/edit');
    } else {
      navigate(path);
    }
    
    if (onItemClick) onItemClick();
  };

  // For simplified view (only shown for logged-in users who haven't completed their profile on dashboard)
  if (isLoggedIn && showSimplified) {
    return null; // Return nothing here as the simplified layout will be handled in Navbar.tsx
  }

  if (isLoggedIn) {
    return (
      <>
        <Link to="/dashboard" className={linkClass} onClick={handleClick}>
          Dashboard
        </Link>
        <a href="#" className={linkClass} onClick={(e) => handleProfileGatedNavigation(e, '/explore-projects')}>
          Explore Projects
        </a>
        <a href="#" className={linkClass} onClick={(e) => handleProfileGatedNavigation(e, '/explore-talents')}>
          Explore Talents
        </a>
        <a href="#" className={linkClass} onClick={(e) => handleProfileGatedNavigation(e, '/messages')}>
          Messages
        </a>
      </>
    );
  }

  // For non-logged-in users, use evenly spaced links without the empty onboarding link
  return (
    <>
      <div className="flex items-center">
        <Link to="/" className={`${linkClass} px-4`} onClick={handleClick}>
          Home
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/explore" className={`${linkClass} px-4`} onClick={handleClick}>
          Explore
        </Link>
      </div>
      <div className="flex items-center">
        <Link 
          to="/how-it-works" 
          className={`${linkClass} px-4`} 
          onClick={handleClick}
        >
          How It Works
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/about" className={`${linkClass} px-4`} onClick={handleClick}>
          About
        </Link>
      </div>
      <div className="flex items-center">
        <Link 
          to="/contact-sales" 
          className={`${linkClass} px-4`} 
          onClick={handleClick}
        >
          <Phone className="h-4 w-4 mr-1" />
          Contact Sales
        </Link>
      </div>
    </>
  );
}
