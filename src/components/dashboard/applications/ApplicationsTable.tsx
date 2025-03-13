
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
import { User } from "lucide-react";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { formatDate, ApplicationSummary } from "./ApplicationTypes";

interface ApplicationsTableProps {
  applications: ApplicationSummary[];
  loading: boolean;
  error: string | null;
  onViewDetails: (application: ApplicationSummary) => void;
  hiddenColumns?: string[];
}

export function ApplicationsTable({ 
  applications, 
  loading, 
  error, 
  onViewDetails,
  hiddenColumns = []
}: ApplicationsTableProps) {
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState errorMessage={error} onRetry={() => window.location.reload()} />;
  }

  if (applications.length === 0) {
    return <EmptyState />;
  }

  const showStatus = !hiddenColumns.includes("status");

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Date Applied</TableHead>
            {showStatus && <TableHead>Status</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>
                <div className="font-medium flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  {application.userName}
                </div>
                <div className="text-sm text-gray-500">{application.userEmail}</div>
              </TableCell>
              <TableCell>{application.projectTitle}</TableCell>
              <TableCell>{formatDate(application.createdAt)}</TableCell>
              {showStatus && (
                <TableCell>
                  <Badge className={
                    application.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                    (application.status === "rejected" || application.status === "declined") ? "bg-red-100 text-red-800 hover:bg-red-100" :
                    "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }>
                    {application.status === "pending" ? "Pending" : 
                     application.status === "accepted" ? "Accepted" : "Rejected"}
                  </Badge>
                </TableCell>
              )}
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
