
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { NavbarBrand } from "./navbar/NavbarBrand";
import { NavLinks } from "./navbar/NavLinks";
import { AuthButtons } from "./navbar/AuthButtons";
import { MobileMenu } from "./navbar/MobileMenu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"talent" | "entrepreneur" | "both" | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isLoggedIn,
    LogoutButton
  } = useAuth();

  useEffect(() => {
    // Get user role from localStorage
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole as "talent" | "entrepreneur" | "both");
    }
  }, []);

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
  
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavbarBrand userRole={userRole} isLoggedIn={isLoggedIn} />

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center ${isLoggedIn ? 'space-x-8' : 'space-x-6'}`}>
          <NavLinks isLoggedIn={isLoggedIn} handleDashboardClick={handleDashboardClick} />
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <AuthButtons isLoggedIn={isLoggedIn} LogoutButton={LogoutButton} />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        handleDashboardClick={handleDashboardClick}
        LogoutButton={LogoutButton}
        setIsMenuOpen={setIsMenuOpen}
      />
    </header>
  );
}
