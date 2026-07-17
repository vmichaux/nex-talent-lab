
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useApplications } from "@/hooks/useApplications";

const statusBadgeClass = (status: string) =>
  status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
  status === "rejected" ? "bg-red-100 text-red-800 hover:bg-red-100" :
  "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";

const statusLabel = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

export function AppliedProjects() {
  const { currentUser } = useAuth();
  const { applications, loading, refetchApplications } = useApplications();

  useEffect(() => {
    if (currentUser?.uid) {
      refetchApplications(currentUser.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold category-title-gradient text-3xl">
          My Applications
        </h2>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-sm text-gray-500">
              Loading your applications…
            </div>
          ) : applications.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">
              You haven't applied to any projects yet.
            </div>
          ) : (
            applications.map(application => (
              <div
                key={application.id}
                className="p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium">{application.projectTitle}</h3>
                  <Badge className={`text-xs ${statusBadgeClass(application.status)}`}>
                    {statusLabel(application.status)}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  Applied on {application.createdAt.toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
