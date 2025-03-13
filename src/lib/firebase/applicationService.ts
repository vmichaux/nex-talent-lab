
import { collection, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./config";
import { Application } from "./types";

// Helper function to get user applications
export const getUserApplications = async (userId: string): Promise<Application[]> => {
  if (!userId) {
    console.error("getUserApplications called without userId");
    return [];
  }
  
  try {
    const applicationsCollection = collection(db, "applications");
    const applicationsQuery = query(
      applicationsCollection, 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const applicationsSnapshot = await getDocs(applicationsQuery);
    
    const applications = applicationsSnapshot.docs.map(doc => {
      const data = doc.data();
      // Convert Firestore timestamp to Date if present
      let createdAt;
      if (data.createdAt instanceof Timestamp) {
        createdAt = data.createdAt.toDate();
      } else if (data.createdAt && typeof data.createdAt.toDate === 'function') {
        createdAt = data.createdAt.toDate();
      } else {
        createdAt = new Date();
      }
      
      return {
        id: doc.id,
        ...data,
        createdAt
      } as Application;
    });
    
    return applications;
  } catch (error) {
    console.error("Error in getUserApplications:", error);
    return [];
  }
};
