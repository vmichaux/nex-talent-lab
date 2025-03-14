
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProjectSearchProps {
  hideButton?: boolean;
}

export function ProjectSearch({ hideButton = false }: ProjectSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search for projects in Firebase
    console.log("Searching for:", searchTerm);
    
    // In a real application, this would navigate to search results or filter the current view
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search for projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
      {!hideButton && (
        <Button type="submit" variant="default" className="h-10">Search</Button>
      )}
    </form>
  );
}
