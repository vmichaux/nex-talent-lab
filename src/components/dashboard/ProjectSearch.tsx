
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProjectSearch() {
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
      <Button type="submit" className="h-10 bg-purple-600 hover:bg-purple-700">Search</Button>
    </form>
  );
}
