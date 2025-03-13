
import React from "react";

export function ActivityTimeline() {
  return (
    <div className="border-l-2 border-primary/30 pl-6 space-y-6 ml-4">
      <h3 className="text-xl font-bold -ml-10">Recent Activity</h3>
      
      <div className="relative">
        <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full bg-primary"></div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Today</div>
          <h4 className="font-medium">Applied to Frontend Developer Role</h4>
          <div className="text-xs inline-block bg-primary/10 text-primary px-2 py-1 rounded-full mt-1">Talent</div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full bg-secondary"></div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Yesterday</div>
          <h4 className="font-medium">New Application for Garden Platform</h4>
          <div className="text-xs inline-block bg-secondary/10 text-secondary px-2 py-1 rounded-full mt-1">Builder</div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full bg-primary"></div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">2 days ago</div>
          <h4 className="font-medium">Completed React Course</h4>
          <div className="text-xs inline-block bg-primary/10 text-primary px-2 py-1 rounded-full mt-1">Talent</div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full bg-secondary"></div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">3 days ago</div>
          <h4 className="font-medium">Project Milestone Achieved</h4>
          <div className="text-xs inline-block bg-secondary/10 text-secondary px-2 py-1 rounded-full mt-1">Builder</div>
        </div>
      </div>
    </div>
  );
}
