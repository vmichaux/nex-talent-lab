
import { useEffect, useState, useCallback } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, updateProfile, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { LogoutButton } from "@/components/auth/LogoutButton";

export interface UserData {
  displayName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  hasCompletedProfile?: boolean;
  userRole?: "talent" | "entrepreneur" | "both";
  uid?: string;
  createdAt?: Date;
  role?: string;
}

export interface UserAuth {
  isLoggedIn: boolean;
  loading: boolean;
  currentUser: User | null;
  isAdmin: boolean;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<User>;
  error: string | null;
  LogoutButton: React.FC;
  updateProfileCompletion: (completed: boolean) => Promise<void>;
  updateUserRole: (role: "talent" | "entrepreneur" | "both") => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  signup: (email: string, password: string) => Promise<User>;
}

export const useAuth = (): UserAuth => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Check if user is admin
  const checkIfAdmin = useCallback(async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, "userProfiles", user.uid));
      if (userDoc.exists() && userDoc.data().role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
      // Set user data
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await checkIfAdmin(user);
      } else {
        setIsAdmin(false);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [checkIfAdmin]);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to login";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const signUp = async (email: string, password: string, displayName: string): Promise<User> => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Set display name
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName });
        // Create user document in Firestore
        await setDoc(doc(db, "userProfiles", result.user.uid), {
          displayName,
          email,
          createdAt: new Date(),
          role: "user", // Default role
          hasCompletedProfile: false,
        });
      }
      return result.user;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign up";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error: any) {
      const errorMessage = error.message || "Failed to logout";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const loginWithGoogle = async (): Promise<User> => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if this is a new user or first time login
      const userDoc = await getDoc(doc(db, "userProfiles", result.user.uid));
      
      if (!userDoc.exists()) {
        // Create user document in Firestore for new Google sign-ins
        await setDoc(doc(db, "userProfiles", result.user.uid), {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
          role: "user", // Default role
          hasCompletedProfile: false,
        });
      }
      
      return result.user;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to login with Google";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };
  
  // Alias methods to match the contexts
  const signInWithGoogle = loginWithGoogle;
  const signup = signUp;
  
  const updateProfileCompletion = async (completed: boolean): Promise<void> => {
    if (!currentUser) throw new Error("No user is logged in");
    
    try {
      await setDoc(doc(db, "userProfiles", currentUser.uid), {
        hasCompletedProfile: completed
      }, { merge: true });
      
      // Update local state
      setUserData(current => current ? {...current, hasCompletedProfile: completed} : null);
    } catch (error: any) {
      console.error("Error updating profile completion:", error);
      throw new Error("Failed to update profile completion");
    }
  };
  
  const updateUserRole = async (role: "talent" | "entrepreneur" | "both"): Promise<void> => {
    if (!currentUser) throw new Error("No user is logged in");
    
    try {
      await setDoc(doc(db, "userProfiles", currentUser.uid), {
        userRole: role
      }, { merge: true });
      
      // Update local state
      setUserData(current => current ? {...current, userRole: role} : null);
    } catch (error: any) {
      console.error("Error updating user role:", error);
      throw new Error("Failed to update user role");
    }
  };

  return {
    currentUser,
    isLoggedIn: !!currentUser,
    loading,
    isAdmin,
    userData,
    login,
    signUp,
    logout,
    loginWithGoogle,
    error,
    LogoutButton,
    updateProfileCompletion,
    updateUserRole,
    signInWithGoogle,
    signup,
  };
};
