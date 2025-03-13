
import { Link } from "react-router-dom";
import { LogIn, User, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  isLoggedIn: boolean;
  LogoutButton: React.FC;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export function AuthButtons({ isLoggedIn, LogoutButton, isMobile = false, onItemClick }: AuthButtonsProps) {
  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  if (isLoggedIn) {
    return (
      <div className={isMobile ? "pt-4" : "flex items-center gap-3"}>
        <Link to="/profile/edit" onClick={handleClick}>
          <Button 
            variant="outline" 
            size="sm" 
            className={isMobile ? "w-full gap-2" : "gap-2"}
          >
            <UserCog className="h-4 w-4" />
            My Account
          </Button>
        </Link>
        <div onClick={handleClick}>
          <LogoutButton />
        </div>
      </div>
    );
  }

  return (
    <div className={isMobile ? "pt-4 flex flex-col space-y-2" : "flex items-center space-x-4"}>
      <Link to="/login" onClick={handleClick}>
        <Button 
          variant="outline" 
          size="sm" 
          className={isMobile ? "w-full gap-2" : "gap-2"}
        >
          <LogIn className="h-4 w-4" />
          Login
        </Button>
      </Link>
      <Link to="/signup" onClick={handleClick}>
        <Button 
          size="sm" 
          className={isMobile ? "w-full gap-2" : "gap-2"}
        >
          <User className="h-4 w-4" />
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
