
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ApplicationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ApplicationSearch({ searchQuery, setSearchQuery }: ApplicationSearchProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Search by applicant name or project..." 
            className="pl-10 h-12" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>
    </div>
  );
}
