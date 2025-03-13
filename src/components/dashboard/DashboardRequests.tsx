
import { UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { useNavigate } from "react-router-dom";

export function DashboardRequests() {
  const navigate = useNavigate();
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Collaboration Requests
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/requests')}>
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <ApplicationsTable />
    </div>
  );
}
