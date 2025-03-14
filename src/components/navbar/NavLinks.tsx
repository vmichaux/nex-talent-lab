
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

interface NavLinksProps {
  isLoggedIn: boolean;
  handleDashboardClick: (e: React.MouseEvent) => void;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export function NavLinks({ isLoggedIn, handleDashboardClick, isMobile = false, onItemClick }: NavLinksProps) {
  const linkClass = isMobile 
    ? "block py-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
    : "font-medium hover:text-primary transition-colors flex items-center gap-1";

  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  if (isLoggedIn) {
    return (
      <>
        <Link to="/dashboard" className={linkClass} onClick={handleClick}>
          Dashboard
        </Link>
        <Link to="/explore-projects" className={linkClass} onClick={handleClick}>
          Explore Projects
        </Link>
        <Link to="/explore-talents" className={linkClass} onClick={handleClick}>
          Explore Talents
        </Link>
        <Link to="/messages" className={linkClass} onClick={handleClick}>
          Messages
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/" className={linkClass} onClick={handleClick}>
        Home
      </Link>
      <Link to="/explore" className={linkClass} onClick={handleClick}>
        Explore
      </Link>
      <Link 
        to="/onboarding" 
        className={linkClass} 
        onClick={(e) => {
          handleDashboardClick(e);
          handleClick();
        }}
      >
      </Link>
      <Link to="/how-it-works" className={linkClass} onClick={handleClick}>
        How It Works
      </Link>
      <Link to="/about" className={linkClass} onClick={handleClick}>
        About
      </Link>
      <Link to="/contact-sales" className={linkClass} onClick={handleClick}>
        <Phone className="h-4 w-4" />
        Contact Sales
      </Link>
    </>
  );
}
