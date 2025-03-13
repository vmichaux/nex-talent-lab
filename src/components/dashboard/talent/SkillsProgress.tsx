
import React from "react";
import { Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SkillsProgress() {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Skills Progress
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="text-lg font-semibold mb-2">React</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
            </div>
            <div className="text-sm text-gray-600">85% - Advanced</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="text-lg font-semibold mb-2">TypeScript</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-sm text-gray-600">70% - Intermediate</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="text-lg font-semibold mb-2">UI/UX Design</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <div className="text-sm text-gray-600">65% - Intermediate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
