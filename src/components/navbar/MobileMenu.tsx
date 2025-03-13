
import { NavLinks } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";

interface MobileMenuProps {
  isMenuOpen: boolean;
  isLoggedIn: boolean;
  handleDashboardClick: (e: React.MouseEvent) => void;
  LogoutButton: React.FC;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export function MobileMenu({ 
  isMenuOpen, 
  isLoggedIn, 
  handleDashboardClick, 
  LogoutButton, 
  setIsMenuOpen 
}: MobileMenuProps) {
  if (!isMenuOpen) return null;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="md:hidden animate-fade-in">
      <div className="py-4 px-4 space-y-4 bg-white shadow-md">
        <NavLinks 
          isLoggedIn={isLoggedIn} 
          handleDashboardClick={handleDashboardClick} 
          isMobile={true}
          onItemClick={closeMenu}
        />
        <AuthButtons 
          isLoggedIn={isLoggedIn} 
          LogoutButton={LogoutButton} 
          isMobile={true} 
          onItemClick={closeMenu}
        />
      </div>
    </div>
  );
}
