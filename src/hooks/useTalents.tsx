
import { useState, useEffect } from "react";
import { collection, query, getDocs, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Talent } from "@/components/explore/TalentCard";

export const useTalents = (options: { featured?: boolean, category?: string } = {}) => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        setLoading(true);
        
        // Create a reference to the userProfiles collection
        const userProfilesRef = collection(db, "userProfiles");
        
        // Start building a query
        let talentsQuery = query(userProfilesRef);
        
        // Add additional query constraints based on options
        if (options.category) {
          talentsQuery = query(
            talentsQuery, 
            where("title", "array-contains", options.category)
          );
        }
        
        // If featured is specified, query for featured profiles
        if (options.featured) {
          talentsQuery = query(
            talentsQuery,
            where("featured", "==", true)
          );
        }
        
        // Execute the query
        const snapshot = await getDocs(talentsQuery);
        
        // Process results
        const fetchedTalents: Talent[] = snapshot.docs
          .filter(doc => {
            const data = doc.data();
            // Only include profiles that have essential information
            return data.firstName && data.email;
          })
          .map(doc => {
            const data = doc.data();
            
            // Calculate a rating (either from data or generate a placeholder)
            const rating = data.rating || generateRandomRating();
            
            // Format the user data into our Talent interface
            return {
              id: doc.id,
              name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
              title: data.title || "Professional",
              location: data.location || "Remote",
              skills: Array.isArray(data.skills) 
                ? data.skills.map((skill: any) => typeof skill === 'object' ? skill.name : skill)
                : [],
              experience: data.experience || "New Member",
              rating,
              availability: data.availability || "Available now",
              bio: data.bio || "No bio provided",
              image: data.photoURL || "/placeholder.svg",
              featured: data.featured || false
            } as Talent;
          });
        
        setTalents(fetchedTalents);
        setError(null);
        console.log("Fetched talents:", fetchedTalents.length);
      } catch (err) {
        console.error("Error fetching talents:", err);
        setError("Failed to load talents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, [options.featured, options.category]);

  // Generate a random rating between 4.0 and 5.0 for profiles without ratings
  const generateRandomRating = (): number => {
    return Number((4 + Math.random()).toFixed(1));
  };

  return { talents, loading, error };
};
