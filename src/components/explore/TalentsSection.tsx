
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TalentCard } from "./TalentCard";

interface Talent {
  id: number;
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

interface TalentsSectionProps {
  talents: Talent[];
}

export const TalentsSection = ({ talents }: TalentsSectionProps) => {
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
          {talents.filter(t => t.title.includes("Designer")).map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
        
        <TabsContent value="developers" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talents.filter(t => t.title.includes("Developer")).map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
