
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, Timestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExternalLink } from "lucide-react";

export interface Application {
  id: string;
  projectId: string;
  projectTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  coverLetter: string;
  relevantExperience: string;
  availabilityDate: string;
  timeCommitment: string;
  portfolioLink?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  feedback?: string;
}

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const fetchUserApplications = async (userId?: string) => {
    if (!userId && !currentUser?.uid) {
      console.log("No user ID provided for fetching applications");
      setLoading(false);
      return [];
    }

    const targetUserId = userId || currentUser?.uid;
    
    try {
      setLoading(true);
      console.log("Fetching applications for user:", targetUserId);
      
      // Simple query without ordering to avoid index requirements
      const applicationsQuery = query(
        collection(db, "applications"),
        where("userId", "==", targetUserId)
      );
      
      const querySnapshot = await getDocs(applicationsQuery);
      const fetchedApplications = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        
        // Convert Firestore timestamp to Date
        const createdAt = data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate() 
          : new Date(data.createdAt || Date.now());
        
        return {
          id: doc.id,
          ...data,
          createdAt,
        } as Application;
      });
      
      // Sort applications manually (newest first)
      const sortedApplications = fetchedApplications.sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      );
      
      console.log("Fetched and sorted user applications:", sortedApplications);
      setApplications(sortedApplications);
      setError(null);
      return sortedApplications;
    } catch (err) {
      console.error("Error fetching user applications:", err);
      setError("Failed to load applications. Please try again later.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      fetchUserApplications(currentUser.uid);
    }
  }, [currentUser?.uid]);

  return { 
    applications, 
    loading, 
    error,
    refetchApplications: fetchUserApplications
  };
};
