
import { ApplicationSummary } from "./ApplicationTypes";
import { ApplicationItem } from "./ApplicationItem";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";

interface ApplicationsListProps {
  applications: ApplicationSummary[];
  loading: boolean;
  error: string | null;
  onReview: (application: ApplicationSummary) => void;
  onRetry: () => void;
}

export function ApplicationsList({ 
  applications, 
  loading, 
  error, 
  onReview,
  onRetry
}: ApplicationsListProps) {
  if (loading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState errorMessage={error} onRetry={onRetry} />;
  }
  
  if (applications.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <div className="space-y-3 bg-white rounded-lg border shadow-sm p-4">
      <div className="grid grid-cols-1 divide-y">
        {applications.map((app) => (
          <ApplicationItem 
            key={app.id} 
            application={app} 
            onReview={onReview}
          />
        ))}
      </div>
    </div>
  );
}
