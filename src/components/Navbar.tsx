import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogIn, Search, MessageSquare, BookOpen, Globe, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isLoggedIn,
    LogoutButton
  } = useAuth();

  // Hide navbar on the onboarding route
  if (location.pathname === "/onboarding") {
    return null;
  }

  // Function to handle dashboard link click
  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/onboarding");
    }
  };
  return <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <span className="font-bold text-2xl gradient-text">NexTalent</span>
          <span className="font-bold text-2xl text-zinc-700">Lab</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isLoggedIn ?
        // Navigation for logged-in users
        <>
              <Link to="/dashboard" className="font-medium hover:text-primary transition-colors flex items-center gap-1">
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link to="/explore-projects" className="font-medium hover:text-primary transition-colors flex items-center gap-1">
                <Search className="h-4 w-4" />
                Explore Projects
              </Link>
              <Link to="/explore-talents" className="font-medium hover:text-primary transition-colors flex items-center gap-1">
                <User className="h-4 w-4" />
                Explore Talents
              </Link>
              <Link to="/messages" className="font-medium hover:text-primary transition-colors flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
            </> :
        // Navigation for non-logged-in users
        <>
              <Link to="/" className="font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/explore" className="font-medium hover:text-primary transition-colors">
                Explore
              </Link>
              <Link to="/onboarding" className="font-medium hover:text-primary transition-colors" onClick={handleDashboardClick}>
                Dashboard
              </Link>
              <Link to="/how-it-works" className="font-medium hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/about" className="font-medium hover:text-primary transition-colors">
                About
              </Link>
            </>}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ?
        // User is logged in - show dashboard and logout buttons
        <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <LogoutButton />
            </div> :
        // User is not logged in - show auth buttons
        <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden animate-fade-in">
          <div className="py-4 px-4 space-y-4 bg-white shadow-md">
            {isLoggedIn ?
        // Mobile navigation for logged-in users
        <>
                <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link to="/explore-projects" className="block py-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Search className="h-4 w-4" />
                  Explore Projects
                </Link>
                <Link to="/explore-talents" className="block py-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4" />
                  Explore Talents
                </Link>
                <Link to="/messages" className="block py-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <MessageSquare className="h-4 w-4" />
                  Messages
                </Link>
                <div className="pt-4" onClick={() => setIsMenuOpen(false)}>
                  <LogoutButton />
                </div>
              </> :
        // Mobile navigation for non-logged-in users 
        <>
                <Link to="/" className="block py-2 px-4 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/explore" className="block py-2 px-4 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Explore
                </Link>
                <Link to="/onboarding" className="block py-2 px-4 hover:bg-gray-50 rounded-md" onClick={e => {
            setIsMenuOpen(false);
            if (!isLoggedIn) {
              e.preventDefault();
              navigate("/onboarding");
            }
          }}>
                  Dashboard
                </Link>
                <Link to="/how-it-works" className="block py-2 px-4 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  How It Works
                </Link>
                <Link to="/pricing" className="block py-2 px-4 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </Link>
                <Link to="/about" className="block py-2 px-4 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <div className="pt-4 flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </>}
          </div>
        </div>}
    </header>;
}