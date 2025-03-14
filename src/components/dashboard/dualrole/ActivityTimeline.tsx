
import React from "react";

export function ActivityTimeline() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-8">Recent Activity</h3>
      
      <div className="border-l-2 border-primary/30 pl-8 space-y-8 ml-6">
        <div className="relative">
          <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full bg-primary"></div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Today</div>
            <h4 className="font-medium text-lg mb-2">Applied to Frontend Developer Role</h4>
            <div className="text-xs inline-block bg-primary/10 text-primary px-3 py-1.5 rounded-full">Talent</div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full bg-secondary"></div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Yesterday</div>
            <h4 className="font-medium text-lg mb-2">New Application for Garden Platform</h4>
            <div className="text-xs inline-block bg-secondary/10 text-secondary px-3 py-1.5 rounded-full">Builder</div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full bg-primary"></div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500 mb-2">2 days ago</div>
            <h4 className="font-medium text-lg mb-2">Completed React Course</h4>
            <div className="text-xs inline-block bg-primary/10 text-primary px-3 py-1.5 rounded-full">Talent</div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full bg-secondary"></div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500 mb-2">3 days ago</div>
            <h4 className="font-medium text-lg mb-2">Project Milestone Achieved</h4>
            <div className="text-xs inline-block bg-secondary/10 text-secondary px-3 py-1.5 rounded-full">Builder</div>
          </div>
        </div>
      </div>
    </div>
  );
}
