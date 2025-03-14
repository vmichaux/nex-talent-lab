
import React from "react";

export function RoleActivityCards() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
        <h3 className="text-base font-bold mb-4 text-primary">My Talent Activity</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-sm mb-1">New Opportunities</h4>
            <p className="text-gray-600 text-xs">5 new projects match your skills</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-sm mb-1">Recent Applications</h4>
            <p className="text-gray-600 text-xs">2 applications pending review</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-sm mb-1">Skill Progress</h4>
            <p className="text-gray-600 text-xs">Your React skills are now at 85%</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-lg border border-secondary/20">
        <h3 className="text-base font-bold mb-4 text-secondary">My Builder Activity</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-sm mb-1">Active Projects</h4>
            <p className="text-gray-600 text-xs">3 projects in progress</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-sm mb-1">Talent Applications</h4>
            <p className="text-gray-600 text-xs">8 new applications to review</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-sm mb-1">Projects Metrics</h4>
            <p className="text-gray-600 text-xs">2 projects ahead of schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
}
