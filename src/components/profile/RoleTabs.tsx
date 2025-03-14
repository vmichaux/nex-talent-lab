
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileFormLayout } from "./ProfileFormLayout";

interface RoleTabsProps {
  activeRole: "talent" | "builder" | "dual";
  handleRoleChange: (role: "talent" | "builder" | "dual") => void;
  talentContent: React.ReactNode;
  builderContent: React.ReactNode;
  dualContent: React.ReactNode;
  isProfileCompleted: boolean;
  handleSaveProfile: () => void;
  loading: boolean;
}

export const RoleTabs = ({
  activeRole,
  handleRoleChange,
  talentContent,
  builderContent,
  dualContent,
  isProfileCompleted,
  handleSaveProfile,
  loading
}: RoleTabsProps) => {
  return (
    <Tabs 
      value={activeRole} 
      onValueChange={(value) => handleRoleChange(value as "talent" | "builder" | "dual")}
      className="w-full mb-8"
    >
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="talent">Talent Profile</TabsTrigger>
        <TabsTrigger value="builder">Builder Profile</TabsTrigger>
        <TabsTrigger value="dual">Dual Role Profile</TabsTrigger>
      </TabsList>
      
      <TabsContent value="talent" className="mt-6">
        <ProfileFormLayout
          isProfileCompleted={isProfileCompleted}
          onSave={handleSaveProfile}
          loading={loading}
        >
          {talentContent}
        </ProfileFormLayout>
      </TabsContent>
      
      <TabsContent value="builder" className="mt-6">
        <ProfileFormLayout
          isProfileCompleted={isProfileCompleted}
          onSave={handleSaveProfile}
          loading={loading}
        >
          {builderContent}
        </ProfileFormLayout>
      </TabsContent>
      
      <TabsContent value="dual" className="mt-6">
        <ProfileFormLayout
          isProfileCompleted={isProfileCompleted}
          onSave={handleSaveProfile}
          loading={loading}
        >
          {dualContent}
        </ProfileFormLayout>
      </TabsContent>
    </Tabs>
  );
};
