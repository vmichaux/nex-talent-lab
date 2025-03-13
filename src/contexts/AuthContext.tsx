
import React, { createContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { 
  UserData, 
  updateUserData, 
  updateProfileCompletion as updateProfileCompletionService,
  signup as signupService,
  login as loginService,
  signInWithGoogle as signInWithGoogleService,
  signInWithGithub as signInWithGithubService
} from "@/services/authService";

type AuthContextType = {
  currentUser: User | null;
  userData: UserData | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileCompletion: (completed: boolean) => Promise<void>;
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
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      if (user) {
        const data = await updateUserData(user);
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const signup = async (email: string, password: string) => {
    try {
      await signupService(email, password);
    } catch (error: any) {
      throw error;
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      await loginService(email, password);
    } catch (error: any) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGoogleService();
    } catch (error: any) {
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithGithubService();
    } catch (error: any) {
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
      toast({
        title: "Logout error",
        description: error.message,
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
      toast({
        title: "Update error",
        description: error.message,
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
    signInWithGithub,
    signup,
    logout,
    updateProfileCompletion,
    LogoutButton
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Export AuthContext for direct import in the useAuth hook
