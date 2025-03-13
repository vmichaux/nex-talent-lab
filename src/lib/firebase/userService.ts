
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./config";
import { UserProfile } from "./types";

// Helper function to get user profile data
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!userId) return null;
  
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
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Helper function to get the user's full name
export const getUserFullName = async (userId: string): Promise<string> => {
  const userProfile = await getUserProfile(userId);
  
  if (userProfile && userProfile.firstName && userProfile.lastName) {
    return `${userProfile.firstName} ${userProfile.lastName}`;
  } else if (userProfile && userProfile.displayName) {
    return userProfile.displayName;
  } else {
    const user = auth.currentUser;
    return user?.displayName || user?.email || "Anonymous";
  }
};
