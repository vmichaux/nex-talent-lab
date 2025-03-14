
import { User } from "firebase/auth";
import { LogoutButton } from "@/components/auth/LogoutButton";

export interface UserData {
  email: string;
  createdAt: Date;
  lastLogin: Date;
  hasCompletedProfile?: boolean;
  firstName?: string;
  lastName?: string;
  userRole?: "talent" | "entrepreneur" | "both";
}

export interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileCompletion: (completed: boolean) => Promise<void>;
  updateUserRole: (role: "talent" | "entrepreneur" | "both") => Promise<void>;
  LogoutButton: typeof LogoutButton;
}
