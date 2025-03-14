
import { Timestamp } from "firebase/firestore";
import { getUserProfile } from "@/lib/user-service";
import { ApplicationSummary } from "@/components/dashboard/applications/ApplicationTypes";

// Helper function to get user's full name from their profile
export const getUserFullName = async (userId: string): Promise<string> => {
  try {
    if (!userId) return "Anonymous User";
    
    const userProfile = await getUserProfile(userId);
    
    if (userProfile && userProfile.firstName && userProfile.lastName) {
      return `${userProfile.firstName} ${userProfile.lastName}`;
    } else if (userProfile && userProfile.displayName) {
      return userProfile.displayName;
    }
    
    // If no profile data is found, return the default value
    return "Anonymous User";
  } catch (error) {
    console.error("Error fetching user full name:", error);
    return "Anonymous User";
  }
};

// Format Firestore application data into ApplicationSummary
export const formatApplication = (docId: string, data: any): ApplicationSummary => {
  return {
    id: docId,
    ...data,
    createdAt: data.createdAt instanceof Timestamp 
      ? data.createdAt.toDate() 
      : new Date(data.createdAt || Date.now())
  } as ApplicationSummary;
};
