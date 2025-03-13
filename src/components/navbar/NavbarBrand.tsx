
import { Link } from "react-router-dom";
import { RoleBadge } from "./RoleBadge";

interface NavbarBrandProps {
  userRole: "talent" | "entrepreneur" | "both" | null;
  isLoggedIn: boolean;
}

export function NavbarBrand({ userRole, isLoggedIn }: NavbarBrandProps) {
  return (
    <Link to="/" className="flex items-center gap-1">
      <span className="font-bold text-2xl gradient-text">NexTalent</span>
      <span className="font-bold text-2xl text-zinc-700">Lab</span>
      <RoleBadge userRole={userRole} isLoggedIn={isLoggedIn} />
    </Link>
  );
}
