
import { doc, getDoc, setDoc, FirestoreError } from "firebase/firestore";
import { db, auth } from "./config";
import { UserProfile } from "./types";
import { toast } from "@/hooks/use-toast";

// Helper function to get user profile data
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!userId) {
    console.error("getUserProfile called without userId");
    toast({
      title: "Error fetching profile",
      description: "User ID is required",
      variant: "destructive",
    });
    return null;
  }
  
  try {
    const userProfileRef = doc(db, "userProfiles", userId);
    const docSnap = await getDoc(userProfileRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data() as Omit<UserProfile, 'id'>;
      
      // Handle potential old skills format (strings) vs new format (objects with name and level)
      if (userData.skills && Array.isArray(userData.skills)) {
        // Check if skills are in old format (strings)
        if (userData.skills.length > 0 && typeof userData.skills[0] === 'string') {
          // Convert string skills to object format
          userData.skills = (userData.skills as unknown as string[]).map(skill => ({
            name: skill,
            level: "Intermediate"
          }));
        }
      }
      
      // Ensure interests exists as an array
      if (!userData.interests || !Array.isArray(userData.interests)) {
        userData.interests = [];
      }
      
      return {
        id: docSnap.id,
        ...userData
      };
    } else {
      console.log("User profile not found for user:", userId);
      return null;
    }
  } catch (error) {
    const firestoreError = error as FirestoreError;
    console.error("Error fetching user profile:", firestoreError);
    toast({
      title: "Failed to load profile",
      description: `Error: ${firestoreError.code || "Unknown error"}`,
      variant: "destructive",
    });
    return null;
  }
};

// Helper function to save user profile data
export const saveUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<boolean> => {
  if (!userId) {
    console.error("saveUserProfile called without userId");
    toast({
      title: "Error saving profile",
      description: "User ID is required",
      variant: "destructive",
    });
    return false;
  }
  
  try {
    const userProfileRef = doc(db, "userProfiles", userId);
    await setDoc(userProfileRef, {
      ...profileData,
      lastUpdated: new Date()
    }, { merge: true });
    
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully",
    });
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    toast({
      title: "Failed to save profile",
      description: "Please try again later",
      variant: "destructive",
    });
    return false;
  }
};

// Helper function to get the user's full name
export const getUserFullName = async (userId: string): Promise<string> => {
  try {
    const userProfile = await getUserProfile(userId);
    
    if (userProfile && userProfile.firstName && userProfile.lastName) {
      return `${userProfile.firstName} ${userProfile.lastName}`;
    } else if (userProfile && userProfile.displayName) {
      return userProfile.displayName;
    } else {
      const user = auth.currentUser;
      return user?.displayName || user?.email || "Anonymous";
    }
  } catch (error) {
    console.error("Error getting user full name:", error);
    return "Anonymous";
  }
};
