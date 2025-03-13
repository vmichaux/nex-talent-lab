
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

export interface UserData {
  email: string;
  createdAt: Date;
  lastLogin: Date;
  hasCompletedProfile?: boolean;
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

// Sign up with email and password
export const signup = async (email: string, password: string): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateUserData(result.user);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Login with email and password
export const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    throw error;
  }
};

// Sign in with GitHub
export const signInWithGithub = async (): Promise<void> => {
  try {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};
