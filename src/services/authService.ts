
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  AuthError
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

export interface UserData {
  email: string;
  createdAt: Date;
  lastLogin: Date;
  hasCompletedProfile?: boolean;
  firstName?: string;
  lastName?: string;
}

// Update user data in Firestore
export const updateUserData = async (user: User): Promise<UserData> => {
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
      return { ...docSnap.data() as UserData, lastLogin: new Date() };
    } else {
      await setDoc(userRef, userData);
      
      const userProfileRef = doc(db, "userProfiles", user.uid);
      await setDoc(userProfileRef, {
        email: user.email,
        createdAt: new Date(),
        lastUpdated: new Date()
      }, { merge: true });
      
      return userData;
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

// Update profile completion status
export const updateProfileCompletion = async (user: User, completed: boolean): Promise<void> => {
  if (!user) return;
  
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, { hasCompletedProfile: completed }, { merge: true });
};

// Format Firebase auth error messages
export const formatAuthError = (error: any): string => {
  if (!error || !error.code) {
    return "An unknown error occurred. Please try again.";
  }

  // Handle common Firebase auth error codes
  switch (error.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return "Invalid email or password. Please try again.";
    case 'auth/email-already-in-use':
      return "This email is already in use. Please use a different email or log in.";
    case 'auth/weak-password':
      return "Password should be at least 6 characters long.";
    case 'auth/invalid-email':
      return "Please enter a valid email address.";
    case 'auth/popup-closed-by-user':
      return "Sign-in was cancelled. Please try again.";
    case 'auth/cancelled-popup-request':
      return "Sign-in was cancelled. Please try again.";
    case 'auth/popup-blocked':
      return "Sign-in popup was blocked by your browser. Please allow popups for this site.";
    case 'auth/account-exists-with-different-credential':
      return "An account already exists with the same email but different sign-in credentials. Please sign in using the original method.";
    case 'auth/network-request-failed':
      return "Network error. Please check your internet connection and try again.";
    case 'auth/too-many-requests':
      return "Too many unsuccessful login attempts. Please try again later.";
    case 'auth/unauthorized-domain':
      return "Google sign-in failed: This website domain is not authorized for Firebase authentication. Please ensure you're accessing from an authorized domain.";
    default:
      return error.message || "Authentication failed. Please try again.";
  }
};

// Sign up with email and password
export const signup = async (email: string, password: string): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateUserData(result.user);
    return result.user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Login with email and password
export const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<void> => {
  try {
    console.log("Attempting Google sign in");
    // Add prompt: 'select_account' to force the account selection dialog
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    await signInWithPopup(auth, googleProvider);
    console.log("Google sign in successful");
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};
