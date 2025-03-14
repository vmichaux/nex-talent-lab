
import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LearningResources() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Learning Resources
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="shadow-md">
          <CardContent className="p-8">
            <div className="text-xl font-semibold mb-3">Advanced React Patterns</div>
            <p className="text-gray-600 mb-6">Learn industry-standard React patterns to level up your development skills.</p>
            <Button variant="outline" className="w-full">View Course</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-8">
            <div className="text-xl font-semibold mb-3">TypeScript Masterclass</div>
            <p className="text-gray-600 mb-6">Comprehensive guide to TypeScript from basics to advanced concepts.</p>
            <Button variant="outline" className="w-full">View Course</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-8">
            <div className="text-xl font-semibold mb-3">UI/UX Design Principles</div>
            <p className="text-gray-600 mb-6">Learn how to create intuitive and beautiful user interfaces.</p>
            <Button variant="outline" className="w-full">View Course</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
