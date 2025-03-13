
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function EmptyState() {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center text-gray-500">
          <p className="mb-4">No applications have been submitted to your projects yet.</p>
          <Button variant="outline" onClick={() => navigate('/explore-projects')}>
            Browse Projects
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
