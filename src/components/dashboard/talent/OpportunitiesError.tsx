
import React from "react";
import { Card } from "@/components/ui/card";

export function OpportunitiesError() {
  return (
    <Card className="p-6 text-center">
      <p className="text-red-500">Error loading project recommendations.</p>
      <p>Please try again later.</p>
    </Card>
  );
}
