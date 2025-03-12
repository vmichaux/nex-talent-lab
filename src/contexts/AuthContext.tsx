import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { auth, db } from "@/lib/firebase";

interface UserData {
  email: string;
  createdAt: Date;
  lastLogin: Date;
}

type AuthContextType = {
  currentUser: User | null;
  userData: UserData | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  LogoutButton: React.FC;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const updateUserData = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userData = {
      email: user.email,
      lastLogin: new Date(),
      createdAt: new Date(),
    };

    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
        setUserData({ ...docSnap.data() as UserData, lastLogin: new Date() });
      } else {
        await setDoc(userRef, userData);
        setUserData(userData);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      if (user) {
        await updateUserData(user);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const signup = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateUserData(result.user);
      toast({
        title: "Compte créé avec succès",
        description: "Bienvenue sur NexTalent Lab!",
      });
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast({
        title: "Google sign-in failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast({
        title: "GitHub sign-in failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté de votre compte",
      });
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
      await logout();
      navigate('/');
    };

    return (
      <Button 
        onClick={handleLogout} 
        variant="outline" 
        size="sm" 
        className="gap-2 bg-white hover:bg-gray-100"
      >
        <LogOut className="h-4 w-4" />
        Log Out
      </Button>
    );
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
    LogoutButton
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
