
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApplicationSummary } from "./ApplicationTypes";

interface ApplicationItemProps {
  application: ApplicationSummary;
  onReview: (application: ApplicationSummary) => void;
}

export function ApplicationItem({ application, onReview }: ApplicationItemProps) {
  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="font-medium mb-1">
            {application.userName} applied to <span className="text-primary">{application.projectTitle}</span>
          </h3>
          <p className="text-sm text-gray-500">{formatDate(application.createdAt)}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className={
            application.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
            application.status === "declined" ? "bg-red-100 text-red-800 hover:bg-red-100" :
            "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          }>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onReview(application)}
          >
            Review
          </Button>
        </div>
      </div>
    </div>
  );
}
