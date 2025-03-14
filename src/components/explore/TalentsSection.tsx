
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TalentCard } from "./TalentCard";
import { useTalents, Talent } from "@/hooks/useTalents";
import { Skeleton } from "@/components/ui/skeleton";

interface TalentsSectionProps {
  searchQuery?: string;
}

export const TalentsSection = ({ searchQuery = '' }: TalentsSectionProps) => {
  const [activeTab, setActiveTab] = React.useState("all-talents");
  
  const { talents, loading, error } = useTalents({
    limit: 6, // Limit to 6 talents
    filterFeatured: activeTab === "featured-talents",
    filterDesigners: activeTab === "designers",
    filterDevelopers: activeTab === "developers",
    searchQuery
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Loading state
  if (loading) {
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
            {/* Show 6 placeholders for loading state */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="mb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <h2 className="mb-6 text-3xl font-bold tracking-tight custom-gradient-text md:text-6xl">
            Explore Talents
          </h2>
          <div className="p-8 bg-red-50 rounded-lg text-red-600 mb-10">
            <p className="text-lg">Failed to load talents: {error}</p>
            <p className="mt-2">Please try again later or contact support.</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (talents.length === 0) {
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
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="mb-8 mx-auto flex justify-center">
            <TabsTrigger value="all-talents" className="px-6">All Talents</TabsTrigger>
            <TabsTrigger value="featured-talents" className="px-6">Featured</TabsTrigger>
            <TabsTrigger value="designers" className="px-6">Designers</TabsTrigger>
            <TabsTrigger value="developers" className="px-6">Developers</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="text-center py-12">
            <p className="text-gray-500 text-lg">No talents found matching your criteria.</p>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </TabsContent>
        </Tabs>
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

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
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
          {talents.map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
        
        <TabsContent value="designers" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talents.map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
        
        <TabsContent value="developers" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talents.map(talent => <TalentCard key={talent.id} talent={talent} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
