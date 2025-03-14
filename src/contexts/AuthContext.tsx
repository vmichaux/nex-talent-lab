
import React, { createContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { 
  UserData, 
  updateUserData, 
  updateProfileCompletion as updateProfileCompletionService,
  updateUserRole as updateUserRoleService,
  signup as signupService,
  login as loginService,
  signInWithGoogle as signInWithGoogleService,
  formatAuthError
} from "@/services/authService";

type AuthContextType = {
  currentUser: User | null;
  userData: UserData | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileCompletion: (completed: boolean) => Promise<void>;
  updateUserRole: (role: "talent" | "entrepreneur" | "both") => Promise<void>;
  LogoutButton: React.FC;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? `User: ${user.email}` : "No user");
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      if (user) {
        try {
          const data = await updateUserData(user);
          setUserData(data);
        } catch (error) {
          console.error("Error updating user data after auth state change:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const signup = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      await signupService(email, password, firstName, lastName);
      toast({
        title: "Account created successfully!",
        description: "Welcome to NexTalent Lab."
      });
    } catch (error: any) {
      const errorMessage = formatAuthError(error);
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      console.log(`Attempting to login with email: ${email}`);
      await loginService(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to NexTalent Lab!"
      });
    } catch (error: any) {
      console.error("Login error in context:", error);
      const errorMessage = formatAuthError(error);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Attempting Google sign-in from context");
      await signInWithGoogleService();
      toast({
        title: "Login successful",
        description: "Welcome to NexTalent Lab!"
      });
    } catch (error: any) {
      console.error("Google sign-in error in context:", error);
      const errorMessage = formatAuthError(error);
      toast({
        title: "Google sign-in failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await auth.signOut();
      setUserData(null);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error: any) {
      const errorMessage = formatAuthError(error);
      toast({
        title: "Logout error",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateProfileCompletion = async (completed: boolean) => {
    if (!currentUser) return;
    
    try {
      await updateProfileCompletionService(currentUser, completed);
      setUserData(userData => userData ? { ...userData, hasCompletedProfile: completed } : null);
      
      if (completed) {
        toast({
          title: "Profile completed",
          description: "Your profile has been successfully updated",
        });
      }
    } catch (error: any) {
      const errorMessage = formatAuthError(error);
      toast({
        title: "Update error",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  // Add new function to update user role
  const updateUserRole = async (role: "talent" | "entrepreneur" | "both") => {
    if (!currentUser) return;
    
    try {
      await updateUserRoleService(currentUser, role);
      setUserData(userData => userData ? { ...userData, userRole: role } : null);
      
      toast({
        title: "Role updated",
        description: "Your role has been successfully updated",
      });
    } catch (error: any) {
      const errorMessage = formatAuthError(error);
      toast({
        title: "Update error",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const value = {
    currentUser,
    userData,
    isLoggedIn,
    login,
    signInWithGoogle,
    signup,
    logout,
    updateProfileCompletion,
    updateUserRole,
    LogoutButton
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
