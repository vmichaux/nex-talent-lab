
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { collection, query, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface Talent {
  id: number | string;
  name: string;
  role: string;
  skills: string[];
  matchScore: number;
  availability: string;
  location: string;
}

export function RecommendedTalents() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecommendedTalents = async () => {
      try {
        setLoading(true);
        
        // Query the top 3 user profiles
        const userProfilesRef = collection(db, "userProfiles");
        const talentsQuery = query(
          userProfilesRef,
          orderBy("lastUpdated", "desc"), // Assuming newer profiles might be more complete
          limit(3)
        );
        
        const snapshot = await getDocs(talentsQuery);
        
        const fetchedTalents = snapshot.docs
          .filter(doc => {
            const data = doc.data();
            // Only include profiles that have essential information
            return data.firstName && data.email;
          })
          .map(doc => {
            const data = doc.data();
            
            // Generate a random match score between 85 and 98
            const matchScore = Math.floor(85 + Math.random() * 14);
            
            // Format the user data into our Talent interface
            return {
              id: doc.id,
              name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
              role: data.title || "Professional",
              skills: Array.isArray(data.skills) 
                ? data.skills.map((skill: any) => typeof skill === 'object' ? skill.name : skill).slice(0, 3)
                : [],
              matchScore,
              availability: data.availability || "Available now",
              location: data.location || "Remote"
            };
          });
        
        setTalents(fetchedTalents);
        console.log("Fetched recommended talents:", fetchedTalents.length);
      } catch (err) {
        console.error("Error fetching recommended talents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedTalents();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Recommended Talent
        </h2>
        <Button variant="outline" className="gap-1" asChild>
          <Link to="/explore-talents">View All</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {loading ? (
          // Loading state
          Array.from({ length: 3 }, (_, i) => (
            <Card key={`skeleton-${i}`} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4">
                  <div className="w-full">
                    <Skeleton className="h-5 w-2/3 mb-1" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    
                    <div className="flex flex-col gap-2 mb-4">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center w-full">
                    <Skeleton className="h-7 w-full mb-3" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : talents.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 py-10">
            No recommended talents found. Check back soon!
          </div>
        ) : (
          talents.map(talent => (
            <Card key={talent.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{talent.name}</h3>
                    <p className="text-gray-600 mb-2">{talent.role}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {talent.skills.slice(0, 2).map(skill => (
                        <span key={skill} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Availability:</span> {talent.availability}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Location:</span> {talent.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center w-full">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3 w-full text-center">
                      {talent.matchScore}% Match
                    </div>
                    <Button className="w-full">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
