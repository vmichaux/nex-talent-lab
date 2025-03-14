
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProfileRoleTabsProps {
  activeRole: "talent" | "builder" | "dual";
  onRoleChange: (role: "talent" | "builder" | "dual") => void;
  talentContent: React.ReactNode;
  builderContent: React.ReactNode;
  dualContent: React.ReactNode;
}

export const ProfileRoleTabs = ({ 
  activeRole, 
  onRoleChange, 
  talentContent, 
  builderContent, 
  dualContent 
}: ProfileRoleTabsProps) => {
  return (
    <Tabs 
      value={activeRole} 
      onValueChange={(value) => onRoleChange(value as "talent" | "builder" | "dual")}
      className="w-full mb-8"
    >
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="talent">Talent Profile</TabsTrigger>
        <TabsTrigger value="builder">Builder Profile</TabsTrigger>
        <TabsTrigger value="dual">Dual Role Profile</TabsTrigger>
      </TabsList>
      
      <TabsContent value="talent" className="mt-6">
        {talentContent}
      </TabsContent>
      
      <TabsContent value="builder" className="mt-6">
        {builderContent}
      </TabsContent>
      
      <TabsContent value="dual" className="mt-6">
        {dualContent}
      </TabsContent>
    </Tabs>
  );
};
