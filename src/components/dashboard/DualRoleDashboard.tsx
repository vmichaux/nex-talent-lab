
import { TabsContent } from "@/components/ui/tabs";
import { TalentDashboard } from "./TalentDashboard";
import { BuilderDashboard } from "./BuilderDashboard";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { ViewModeTabs } from "./dualrole/ViewModeTabs";
import { CombinedView } from "./dualrole/CombinedView";

export function DualRoleDashboard() {
  const [viewMode, setViewMode] = useState<"combined" | "talent" | "builder">("combined");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-primary" />
          Dual Role View
        </h2>
        
        <ViewModeTabs viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {viewMode === "combined" && <CombinedView />}

      <TabsContent value="talent" className="mt-0">
        <TalentDashboard />
      </TabsContent>
      
      <TabsContent value="builder" className="mt-0">
        <BuilderDashboard />
      </TabsContent>
    </div>
  );
}
