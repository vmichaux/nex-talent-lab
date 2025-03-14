
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function SkillsProgress() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold category-title-gradient text-3xl">
          Skills Progress
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="shadow-md">
          <CardContent className="pt-8 pb-8 px-6">
            <div className="text-xl font-semibold mb-4">React</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: "85%" }}></div>
            </div>
            <div className="text-gray-600">85% - Advanced</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="pt-8 pb-8 px-6">
            <div className="text-xl font-semibold mb-4">TypeScript</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-gray-600">70% - Intermediate</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="pt-8 pb-8 px-6">
            <div className="text-xl font-semibold mb-4">UI/UX Design</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <div className="text-gray-600">65% - Intermediate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
