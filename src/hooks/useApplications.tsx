
import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs, Timestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
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
  const [indexError, setIndexError] = useState<string | null>(null);
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
      
      // Try fetching with both filtering and ordering
      try {
        const applicationsQuery = query(
          collection(db, "applications"),
          where("userId", "==", targetUserId),
          orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(applicationsQuery);
        const fetchedApplications = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Convert Firestore timestamp to Date
          const createdAt = data.createdAt instanceof Timestamp 
            ? data.createdAt.toDate() 
            : new Date();
          
          return {
            id: doc.id,
            ...data,
            createdAt,
          } as Application;
        });
        
        console.log("Fetched user applications:", fetchedApplications);
        setApplications(fetchedApplications);
        setError(null);
        setIndexError(null);
        return fetchedApplications;
      } catch (err: any) {
        // Check if it's an index error
        if (err.code === "failed-precondition" && err.message.includes("index")) {
          console.warn("Index error, falling back to simple query:", err);
          setIndexError(err.message);
          
          // Fallback to just filtering without ordering
          const simpleQuery = query(
            collection(db, "applications"),
            where("userId", "==", targetUserId)
          );
          
          const querySnapshot = await getDocs(simpleQuery);
          const fetchedApplications = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            
            // Convert Firestore timestamp to Date
            const createdAt = data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate() 
              : new Date();
            
            return {
              id: doc.id,
              ...data,
              createdAt,
            } as Application;
          });
          
          // Sort applications manually (newest first)
          fetchedApplications.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          
          console.log("Fetched user applications with fallback method:", fetchedApplications);
          setApplications(fetchedApplications);
          setError(null);
          return fetchedApplications;
        } else {
          // Re-throw if it's not an index error
          throw err;
        }
      }
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

  // Component to display index error if needed
  const FirestoreIndexError = () => {
    if (!indexError) return null;
    
    // Extract the URL from the error message
    const indexUrl = indexError.match(/https:\/\/console\.firebase\.google\.com[^\s]*/)?.[0];
    
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Missing Firestore Index</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Your query requires a database index to be created. As an administrator, please click the link below:
          </p>
          {indexUrl && (
            <a 
              href={indexUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              Create Firestore Index <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </AlertDescription>
      </Alert>
    );
  };

  return { 
    applications, 
    loading, 
    error,
    indexError,
    FirestoreIndexError, 
    refetchApplications: fetchUserApplications
  };
};

