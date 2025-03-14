
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TalentCard from "./TalentCard";
import { useTalents } from "@/hooks/useTalents";
import { TalentsLoading } from "./TalentsLoading";
import { TalentsError } from "./TalentsError";

export const TalentsSection = () => {
  const [activeTab, setActiveTab] = useState("all-talents");
  const { talents: allTalents, loading: allLoading, error: allError } = useTalents();
  const { talents: featuredTalents, loading: featuredLoading, error: featuredError } = useTalents({ featured: true });
  const { talents: designerTalents, loading: designersLoading, error: designersError } = useTalents({ category: "Designer" });
  const { talents: developerTalents, loading: developersLoading, error: developersError } = useTalents({ category: "Developer" });

  console.log("All talents:", allTalents);
  console.log("Featured talents:", featuredTalents);
  console.log("Designer talents:", designerTalents);
  console.log("Developer talents:", developerTalents);

  // Fix for the blank screen issue - ensure the component doesn't crash on render
  useEffect(() => {
    console.log("TalentsSection mounted with activeTab:", activeTab);
    return () => console.log("TalentsSection unmounted");
  }, []);

  // Combine loading states based on active tab
  const isLoading = 
    (activeTab === "all-talents" && allLoading) ||
    (activeTab === "featured-talents" && featuredLoading) ||
    (activeTab === "designers" && designersLoading) ||
    (activeTab === "developers" && developersLoading);

  // Combine error states based on active tab
  const error = 
    (activeTab === "all-talents" && allError) ||
    (activeTab === "featured-talents" && featuredError) ||
    (activeTab === "designers" && designersError) ||
    (activeTab === "developers" && developersError);

  const handleTabChange = (value: string) => {
    console.log("Changing tab to:", value);
    setActiveTab(value);
  };

  const handleRetry = () => {
    // Force a re-fetch by changing the tab and then changing back
    const currentTab = activeTab;
    setActiveTab("all-talents");
    setTimeout(() => setActiveTab(currentTab), 100);
  };

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
        
        {isLoading ? (
          <TalentsLoading />
        ) : error ? (
          <TalentsError message={error} onRetry={handleRetry} />
        ) : (
          <>
            <TabsContent value="all-talents">
              {allTalents.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No talent profiles found. Check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allTalents.map(talent => (
                    <TalentCard key={talent.id} talent={talent} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="featured-talents">
              {featuredTalents.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No featured talent profiles found. Check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredTalents.map(talent => (
                    <TalentCard key={talent.id} talent={talent} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="designers">
              {designerTalents.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No designer profiles found. Check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {designerTalents.map(talent => (
                    <TalentCard key={talent.id} talent={talent} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="developers">
              {developerTalents.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No developer profiles found. Check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {developerTalents.map(talent => (
                    <TalentCard key={talent.id} talent={talent} />
                  ))}
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};
