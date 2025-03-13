
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
import { doc, setDoc, getDoc, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { auth, db } from "@/lib/firebase";

interface UserData {
  email: string;
  createdAt: Date;
  lastLogin: Date;
  hasCompletedProfile?: boolean;
}

interface TestProfile {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  parentUserId: string;
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
  updateProfileCompletion: (completed: boolean) => Promise<void>;
  LogoutButton: React.FC;
  testProfiles: TestProfile[];
  activeTestProfile: TestProfile | null;
  createTestProfile: (name: string) => Promise<void>;
  switchToTestProfile: (profileId: string) => Promise<void>;
  switchToMainProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [testProfiles, setTestProfiles] = useState<TestProfile[]>([]);
  const [activeTestProfile, setActiveTestProfile] = useState<TestProfile | null>(null);
  const { toast } = useToast();
  
  const updateUserData = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userData = {
      email: user.email,
      lastLogin: new Date(),
      createdAt: new Date(),
      hasCompletedProfile: false,
    };

    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
        setUserData({ ...docSnap.data() as UserData, lastLogin: new Date() });
      } else {
        await setDoc(userRef, userData);
        setUserData(userData);
        
        // Create a basic user profile with email to ensure all new accounts have one
        const userProfileRef = doc(db, "userProfiles", user.uid);
        await setDoc(userProfileRef, {
          email: user.email,
          createdAt: new Date(),
          lastUpdated: new Date()
        }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const fetchTestProfiles = async (userId: string) => {
    try {
      const testProfilesQuery = query(
        collection(db, "testProfiles"), 
        where("parentUserId", "==", userId)
      );
      const querySnapshot = await getDocs(testProfilesQuery);
      
      const profiles: TestProfile[] = [];
      querySnapshot.forEach((doc) => {
        profiles.push({ id: doc.id, ...doc.data() } as TestProfile);
      });
      
      setTestProfiles(profiles);
      
      // Check if any profile is active
      const activeProfile = profiles.find(profile => profile.isActive);
      if (activeProfile) {
        setActiveTestProfile(activeProfile);
      } else {
        setActiveTestProfile(null);
      }
    } catch (error) {
      console.error("Error fetching test profiles:", error);
      setTestProfiles([]);
      setActiveTestProfile(null);
    }
  };

  const updateProfileCompletion = async (completed: boolean) => {
    if (!currentUser) return;
    
    const userRef = doc(db, "users", currentUser.uid);
    try {
      await setDoc(userRef, { hasCompletedProfile: completed }, { merge: true });
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      if (user) {
        await updateUserData(user);
        await fetchTestProfiles(user.uid);
      } else {
        setUserData(null);
        setTestProfiles([]);
        setActiveTestProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const signup = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateUserData(result.user);
      // Toast will be handled by the component
    } catch (error: any) {
      // Let the component handle the error and toast
      throw error;
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Toast will be handled by the component
    } catch (error: any) {
      // Let the component handle the error and toast
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Toast will be handled by the component
    } catch (error: any) {
      // Let the component handle the error and toast
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      // Toast will be handled by the component
    } catch (error: any) {
      // Let the component handle the error and toast
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      // Clear test profile if active
      if (activeTestProfile) {
        await switchToMainProfile();
      }
      
      await signOut(auth);
      setUserData(null);
      setTestProfiles([]);
      setActiveTestProfile(null);
      
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

  const createTestProfile = async (name: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a test profile.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Set existing profiles to inactive
      if (activeTestProfile) {
        const activeProfileRef = doc(db, "testProfiles", activeTestProfile.id);
        await setDoc(activeProfileRef, { isActive: false }, { merge: true });
      }
      
      // Create new test profile
      const testProfileData: Omit<TestProfile, 'id'> = {
        name,
        email: currentUser.email || '',
        isActive: true,
        createdAt: new Date(),
        parentUserId: currentUser.uid
      };
      
      const testProfileRef = await addDoc(collection(db, "testProfiles"), testProfileData);
      
      const newProfile = {
        id: testProfileRef.id,
        ...testProfileData
      };
      
      // Update local state
      setTestProfiles(prev => [...prev, newProfile]);
      setActiveTestProfile(newProfile);
      
      toast({
        title: "Test profile created",
        description: `You are now using the test profile "${name}"`
      });
    } catch (error: any) {
      toast({
        title: "Error creating test profile",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const switchToTestProfile = async (profileId: string) => {
    const profileToSwitch = testProfiles.find(profile => profile.id === profileId);
    
    if (!profileToSwitch) {
      toast({
        title: "Profile not found",
        description: "The selected test profile could not be found.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Set all profiles to inactive
      const updatePromises = testProfiles.map(profile => {
        const profileRef = doc(db, "testProfiles", profile.id);
        return setDoc(profileRef, { isActive: profile.id === profileId }, { merge: true });
      });
      
      await Promise.all(updatePromises);
      
      // Update local state
      setTestProfiles(prev => 
        prev.map(profile => ({
          ...profile,
          isActive: profile.id === profileId
        }))
      );
      
      setActiveTestProfile(profileToSwitch);
      
      toast({
        title: "Profile switched",
        description: `You are now using the test profile "${profileToSwitch.name}"`
      });
    } catch (error: any) {
      toast({
        title: "Error switching profiles",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const switchToMainProfile = async () => {
    if (!activeTestProfile) return;
    
    try {
      // Update all test profiles to inactive
      const updatePromises = testProfiles.map(profile => {
        const profileRef = doc(db, "testProfiles", profile.id);
        return setDoc(profileRef, { isActive: false }, { merge: true });
      });
      
      await Promise.all(updatePromises);
      
      // Update local state
      setTestProfiles(prev => 
        prev.map(profile => ({
          ...profile,
          isActive: false
        }))
      );
      
      setActiveTestProfile(null);
      
      toast({
        title: "Main profile activated",
        description: "You have switched back to your main profile"
      });
    } catch (error: any) {
      toast({
        title: "Error switching profiles",
        description: error.message,
        variant: "destructive"
      });
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
    updateProfileCompletion,
    LogoutButton,
    testProfiles,
    activeTestProfile,
    createTestProfile,
    switchToTestProfile,
    switchToMainProfile
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
