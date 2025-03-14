
import React from "react";

export function RoleActivityCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-lg border border-primary/20">
        <h3 className="text-sm font-bold mb-3 text-primary">My Talent Activity</h3>
        <div className="space-y-2">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium text-xs mb-1">New Opportunities</h4>
            <p className="text-gray-600 text-[10px]">5 new projects match your skills</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium text-xs mb-1">Recent Applications</h4>
            <p className="text-gray-600 text-[10px]">2 applications pending review</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium text-xs mb-1">Skill Progress</h4>
            <p className="text-gray-600 text-[10px]">Your React skills are now at 85%</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-4 rounded-lg border border-secondary/20">
        <h3 className="text-sm font-bold mb-3 text-secondary">My Builder Activity</h3>
        <div className="space-y-2">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium text-xs mb-1">Active Projects</h4>
            <p className="text-gray-600 text-[10px]">3 projects in progress</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium text-xs mb-1">Talent Applications</h4>
            <p className="text-gray-600 text-[10px]">8 new applications to review</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium text-xs mb-1">Projects Metrics</h4>
            <p className="text-gray-600 text-[10px]">2 projects ahead of schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
}
