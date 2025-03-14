
import { ApplicationSummary, formatDate } from "./ApplicationTypes";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingView } from "./LoadingView";
import { ErrorView } from "./ErrorView";
import { EmptyView } from "./EmptyView";

interface ApplicationsTableViewProps {
  applications: ApplicationSummary[];
  loading: boolean;
  error: string | null;
  onViewDetails: (application: ApplicationSummary) => void;
}

export function ApplicationsTableView({
  applications,
  loading,
  error,
  onViewDetails
}: ApplicationsTableViewProps) {
  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView message={error} />;
  }

  if (applications.length === 0) {
    return <EmptyView />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.userName}</TableCell>
              <TableCell>{application.projectTitle}</TableCell>
              <TableCell>{formatDate(application.createdAt)}</TableCell>
              <TableCell>{application.availabilityDate}</TableCell>
              <TableCell>
                <ApplicationStatusBadge status={application.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  onClick={() => onViewDetails(application)}
                  className="mr-2"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Status badge component
function ApplicationStatusBadge({ status }: { status: ApplicationSummary['status'] }) {
  return (
    <Badge className={
      status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
      status === "declined" ? "bg-red-100 text-red-800 hover:bg-red-100" :
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    }>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
