
import React from "react";
import { DashboardProjects } from "../DashboardProjects";
import { RoleActivityCards } from "./RoleActivityCards";
import { ActivityTimeline } from "./ActivityTimeline";
import { ReviewApplications } from "../ReviewApplications";
import { DashboardOverview } from "../DashboardOverview";
import { AppliedProjects } from "../AppliedProjects";
import { DashboardMessages } from "../DashboardMessages";

export function CombinedView() {
  return (
    <div className="space-y-16">
      {/* Overview metrics */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Your Overview</h2>
        <DashboardOverview />
      </div>
      
      {/* Role activity cards showing both roles */}
      <RoleActivityCards />
      
      {/* Show projects first in combined view */}
      <DashboardProjects />
      
      {/* Applied projects */}
      <AppliedProjects />
      
      {/* Review Applications section */}
      <ReviewApplications />
      
      {/* Messages */}
      <DashboardMessages />
      
      {/* Timeline section showing both roles */}
      <ActivityTimeline />
    </div>
  );
}
