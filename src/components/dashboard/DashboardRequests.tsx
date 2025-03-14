
import { UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { useNavigate } from "react-router-dom";

export function DashboardRequests() {
  const navigate = useNavigate();
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" />
          Collaboration Requests
        </h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/requests')}>
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <ApplicationsTable />
    </div>
  );
}
