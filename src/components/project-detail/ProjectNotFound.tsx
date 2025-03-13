
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProjectNotFoundProps {
  onBackClick: () => void;
}

export function ProjectNotFound({ onBackClick }: ProjectNotFoundProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-8 text-gray-600">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={onBackClick}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Dashboard
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
