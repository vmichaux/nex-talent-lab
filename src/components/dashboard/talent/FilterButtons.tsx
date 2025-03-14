
import React from "react";
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function FilterButtons({ filter, setFilter }: FilterButtonsProps) {
  return (
    <div className="flex space-x-1">
      <Button 
        variant={filter === "all" ? "default" : "outline"} 
        size="sm"
        className="text-xs h-7 px-3"
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button 
        variant={filter === "remote" ? "default" : "outline"} 
        size="sm"
        className="text-xs h-7 px-3"
        onClick={() => setFilter("remote")}
      >
        Remote
      </Button>
      <Button 
        variant={filter === "hybrid" ? "default" : "outline"} 
        size="sm"
        className="text-xs h-7 px-3"
        onClick={() => setFilter("hybrid")}
      >
        Hybrid
      </Button>
    </div>
  );
}
