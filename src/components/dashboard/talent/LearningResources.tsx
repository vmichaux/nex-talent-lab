
import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LearningResources() {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Learning Resources
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="text-lg font-semibold mb-2">Advanced React Patterns</div>
            <p className="text-gray-600 text-sm mb-4">Learn industry-standard React patterns to level up your development skills.</p>
            <Button variant="outline" className="w-full">View Course</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="text-lg font-semibold mb-2">TypeScript Masterclass</div>
            <p className="text-gray-600 text-sm mb-4">Comprehensive guide to TypeScript from basics to advanced concepts.</p>
            <Button variant="outline" className="w-full">View Course</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="text-lg font-semibold mb-2">UI/UX Design Principles</div>
            <p className="text-gray-600 text-sm mb-4">Learn how to create intuitive and beautiful user interfaces.</p>
            <Button variant="outline" className="w-full">View Course</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
