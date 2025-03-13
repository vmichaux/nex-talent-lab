
import React from "react";
import { DashboardProjects } from "../DashboardProjects";
import { RoleActivityCards } from "./RoleActivityCards";
import { ActivityTimeline } from "./ActivityTimeline";
import { ReviewApplications } from "../ReviewApplications";

export function CombinedView() {
  return (
    <div className="space-y-10">
      {/* Show projects first in combined view */}
      <DashboardProjects />
      
      {/* Add Review Applications section */}
      <ReviewApplications />
      
      {/* Role activity cards */}
      <RoleActivityCards />
      
      {/* Timeline section showing both roles */}
      <ActivityTimeline />
    </div>
  );
}
