
import React from "react";

export function RoleActivityCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-lg border border-primary/20">
        <h3 className="text-xl font-bold mb-6 text-primary">My Talent Activity</h3>
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium text-lg mb-2">New Opportunities</h4>
            <p className="text-gray-600">5 new projects match your skills</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium text-lg mb-2">Skills Progress</h4>
            <p className="text-gray-600">Your React skills are now at 85%</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium text-lg mb-2">Recent Applications</h4>
            <p className="text-gray-600">2 applications pending review</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-8 rounded-lg border border-secondary/20">
        <h3 className="text-xl font-bold mb-6 text-secondary">My Builder Activity</h3>
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium text-lg mb-2">Active Projects</h4>
            <p className="text-gray-600">3 projects in progress</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium text-lg mb-2">Talent Applications</h4>
            <p className="text-gray-600">8 new applications to review</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium text-lg mb-2">Project Metrics</h4>
            <p className="text-gray-600">2 projects ahead of schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
}
