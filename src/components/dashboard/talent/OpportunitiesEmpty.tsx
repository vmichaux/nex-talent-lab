
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

interface OpportunitiesEmptyProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function OpportunitiesEmpty({ filter, setFilter }: OpportunitiesEmptyProps) {
  return (
    <Card className="p-8 text-center">
      <FileSearch className="h-10 w-10 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
      <p className="text-gray-500 mb-4">
        {filter !== "all" 
          ? `No ${filter} opportunities match your profile yet.` 
          : "No opportunities match your profile yet."}
      </p>
      <Button onClick={() => setFilter("all")}>Show All Opportunities</Button>
    </Card>
  );
}
