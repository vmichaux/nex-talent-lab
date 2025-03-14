
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TalentCard } from "./TalentCard";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";

interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: string;
  rating: number;
  availability: string;
  bio: string;
  image: string;
  featured: boolean;
}

export const TalentsSection = () => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        setLoading(true);
        const talentsCollection = collection(db, "userProfiles");
        const talentsSnapshot = await getDocs(talentsCollection);
        
        const talentsList = talentsSnapshot.docs.map(doc => {
          const data = doc.data();
          // Map Firestore data to our Talent interface
          return {
            id: doc.id,
            name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.displayName || 'Anonymous',
            title: data.title || data.role || 'Professional',
            location: data.location || 'Remote',
            skills: data.skills ? (Array.isArray(data.skills) ? 
              data.skills.map(s => typeof s === 'string' ? s : s.name) : 
              []) : [],
            experience: data.experience || data.yearsOfExperience || '2+ years',
            rating: data.rating || 4.5,
            availability: data.availability || 'Available now',
            bio: data.bio || 'Talented professional looking for opportunities',
            image: data.photoURL || '/placeholder.svg',
            featured: Boolean(data.featured)
          };
        });
        
        setTalents(talentsList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching talents:", err);
        setError("Failed to load talents. Please try again later.");
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500">Loading talent profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-2">{error}</p>
        <p className="text-gray-500">Please try refreshing the page.</p>
      </div>
    );
  }

  if (talents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 mb-2">No talent profiles found.</p>
        <p className="text-gray-500">Check back later for new additions.</p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <h2 className="mb-6 text-3xl font-bold tracking-tight custom-gradient-text md:text-6xl">
          Explore Talents
        </h2>
        <p className="mb-10 text-lg text-gray-600 md:text-xl max-w-3xl whitespace-normal">
          Connect with skilled professionals ready to bring your projects to life. Browse profiles and find the perfect match for your team.
        </p>
      </div>

      <Tabs defaultValue="all-talents" className="mb-8">
        <TabsList className="mb-8 mx-auto flex justify-center">
          <TabsTrigger value="all-talents" className="px-6">All Talents</TabsTrigger>
          <TabsTrigger value="featured-talents" className="px-6">Featured</TabsTrigger>
          <TabsTrigger value="designers" className="px-6">Designers</TabsTrigger>
          <TabsTrigger value="developers" className="px-6">Developers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-talents" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talents.map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
        
        <TabsContent value="featured-talents" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talents.filter(t => t.featured).map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
        
        <TabsContent value="designers" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talents.filter(t => (typeof t.title === 'string' && t.title.toLowerCase().includes('design'))).map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
        
        <TabsContent value="developers" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talents.filter(t => (typeof t.title === 'string' && 
            (t.title.toLowerCase().includes('develop') || 
             t.title.toLowerCase().includes('engineer') ||
             t.title.toLowerCase().includes('program'))
          )).map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
