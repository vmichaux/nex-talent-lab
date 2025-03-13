
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewModeTabsProps {
  viewMode: "combined" | "talent" | "builder";
  setViewMode: (value: "combined" | "talent" | "builder") => void;
}

export function ViewModeTabs({ viewMode, setViewMode }: ViewModeTabsProps) {
  return (
    <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-auto">
      <TabsList>
        <TabsTrigger value="combined">Combined</TabsTrigger>
        <TabsTrigger value="talent">Talent Focus</TabsTrigger>
        <TabsTrigger value="builder">Builder Focus</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
