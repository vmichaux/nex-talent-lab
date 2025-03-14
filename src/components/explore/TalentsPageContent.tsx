
import React from "react";
import { ExploreTalentsHeader } from "./ExploreTalentsHeader";
import { TalentsSearchBar } from "./TalentsSearchBar";
import { TalentsSection } from "./TalentsSection";

interface TalentsPageContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const TalentsPageContent = ({ searchQuery, setSearchQuery }: TalentsPageContentProps) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Pattern - Purple Gradient */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 py-12">
        <ExploreTalentsHeader />
        <TalentsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TalentsSection searchQuery={searchQuery} />
      </div>
    </div>
  );
};
