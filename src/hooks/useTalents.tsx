
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db, getUserProfile, UserProfile } from '@/lib/firebase';

export interface Talent {
  id: string;
  name: string;
  title?: string;
  location?: string;
  skills: string[];
  interests?: string[];
  experience?: string;
  rating?: number;
  availability?: string;
  bio?: string;
  image?: string;
  featured?: boolean;
}

interface UseTalentsOptions {
  limit?: number;
  filterFeatured?: boolean;
  filterDesigners?: boolean;
  filterDevelopers?: boolean;
  searchQuery?: string;
}

export const useTalents = ({
  limit: queryLimit = 50,
  filterFeatured = false,
  filterDesigners = false,
  filterDevelopers = false,
  searchQuery = '',
}: UseTalentsOptions = {}) => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        setLoading(true);
        
        // Fetch user profiles from Firestore
        const userProfilesCollection = collection(db, 'userProfiles');
        const userProfilesQuery = query(userProfilesCollection);
        const userProfilesSnapshot = await getDocs(userProfilesQuery);
        
        
        // Map user profiles to talents
        const fetchedTalents: Talent[] = [];
        
        for (const doc of userProfilesSnapshot.docs) {
          const profile = doc.data() as UserProfile;
          
          // Skip profiles without skills or names
          if (!profile.firstName || !profile.skills || profile.skills.length === 0) {
            continue;
          }
          
          // Determine if the user is "featured" (for demo, we'll consider users with 3+ skills as featured)
          const isFeatured = profile.skills.length >= 3;
          
          // Get title from first skill or default
          const title = profile.skills[0]?.name 
            ? `${profile.skills[0].name} ${profile.skills[0].level}`
            : "Professional";
            
          // Determine if user matches role filters
          const isDesigner = title.toLowerCase().includes('design');
          const isDeveloper = title.toLowerCase().includes('develop');
          
          // Apply filters
          if (filterFeatured && !isFeatured) continue;
          if (filterDesigners && !isDesigner) continue;
          if (filterDevelopers && !isDeveloper) continue;
          
          // Apply search filter
          const searchLower = searchQuery.toLowerCase();
          const matchesSearch = 
            !searchQuery || 
            (profile.firstName?.toLowerCase().includes(searchLower)) ||
            (profile.lastName?.toLowerCase().includes(searchLower)) ||
            (profile.location?.toLowerCase().includes(searchLower)) ||
            (profile.skills.some(skill => skill.name.toLowerCase().includes(searchLower)));
          
          if (searchQuery && !matchesSearch) continue;
          
          // Format the skills as strings
          const skillNames = profile.skills.map(skill => skill.name);
          
          // Calculate experience level based on number of skills (this is a demo approximation)
          const experienceLevel = profile.skills.length <= 2 
            ? '1-2 years' 
            : profile.skills.length <= 4 
              ? '3-5 years' 
              : '5+ years';
          
          // Create talent object
          const talent: Talent = {
            id: doc.id,
            name: `${profile.firstName} ${profile.lastName || ''}`.trim(),
            title: title,
            location: profile.location || 'Remote',
            skills: skillNames,
            // Carried through so the builder side can score a talent on the
            // same tags (skills + interests) the talent side uses for itself:
            // the same talent/project pair yields the same score on both
            // dashboards (VISION.md:53-55).
            interests: profile.interests ?? [],
            experience: experienceLevel,
            // No rating is fabricated: there is no ratings source yet, so the
            // field is left undefined and the UI shows "New" (VISION.md:56).
            availability: 'Available for work',
            bio: profile.bio || `Experienced ${title} looking for opportunities.`,
            image: profile.photoURL || '/placeholder.svg',
            featured: isFeatured
          };
          
          fetchedTalents.push(talent);
        }
        
        setTalents(fetchedTalents.slice(0, queryLimit));
        setError(null);
      } catch (err) {
        console.error('Error fetching talents:', err);
        setError('Failed to load talent profiles');
        setTalents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, [queryLimit, filterFeatured, filterDesigners, filterDevelopers, searchQuery]);

  return { talents, loading, error };
};
