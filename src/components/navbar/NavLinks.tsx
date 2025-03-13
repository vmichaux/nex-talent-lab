
import { Link } from "react-router-dom";
import { Home, Search, User, MessageSquare, Phone } from "lucide-react";

interface NavLinksProps {
  isLoggedIn: boolean;
  handleDashboardClick: (e: React.MouseEvent) => void;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export function NavLinks({ isLoggedIn, handleDashboardClick, isMobile = false, onItemClick }: NavLinksProps) {
  const linkClass = isMobile 
    ? "block py-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
    : "font-medium hover:text-primary transition-colors flex items-center gap-2";

  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  if (isLoggedIn) {
    return (
      <>
        <Link to="/dashboard" className={linkClass} onClick={handleClick}>
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <Link to="/explore-projects" className={linkClass} onClick={handleClick}>
          <Search className="h-4 w-4" />
          <span>Explore Projects</span>
        </Link>
        <Link to="/explore-talents" className={linkClass} onClick={handleClick}>
          <User className="h-4 w-4" />
          <span>Explore Talents</span>
        </Link>
        <Link to="/messages" className={linkClass} onClick={handleClick}>
          <MessageSquare className="h-4 w-4" />
          <span>Messages</span>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/" className={linkClass} onClick={handleClick}>
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <Link to="/explore" className={linkClass} onClick={handleClick}>
        <Search className="h-4 w-4" />
        <span>Explore</span>
      </Link>
      <Link 
        to="/onboarding" 
        className={linkClass} 
        onClick={(e) => {
          handleDashboardClick(e);
          handleClick();
        }}
      >
        <User className="h-4 w-4" />
        <span>Get Started</span>
      </Link>
      <Link to="/how-it-works" className={linkClass} onClick={handleClick}>
        <MessageSquare className="h-4 w-4" />
        <span>How It Works</span>
      </Link>
      <Link to="/pricing" className={linkClass} onClick={handleClick}>
        <Search className="h-4 w-4" />
        <span>Pricing</span>
      </Link>
      <Link to="/about" className={linkClass} onClick={handleClick}>
        <User className="h-4 w-4" />
        <span>About</span>
      </Link>
      <Link to="/contact-sales" className={linkClass} onClick={handleClick}>
        <Phone className="h-4 w-4" />
        <span>Contact Sales</span>
      </Link>
    </>
  );
}
