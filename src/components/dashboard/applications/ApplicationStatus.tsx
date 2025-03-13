
import { Badge } from "@/components/ui/badge";
import { ApplicationSummary } from "./ApplicationTypes";

interface ApplicationStatusProps {
  status: ApplicationSummary['status'];
}

export function ApplicationStatus({ status }: ApplicationStatusProps) {
  return (
    <Badge className={
      status === "accepted" ? "bg-green-100 text-green-800" :
      (status === "rejected" || status === "declined") ? "bg-red-100 text-red-800" :
      "bg-yellow-100 text-yellow-800"
    }>
      Status: {status === "pending" ? "Pending" : 
              status === "accepted" ? "Accepted" : "Rejected"}
    </Badge>
  );
}
