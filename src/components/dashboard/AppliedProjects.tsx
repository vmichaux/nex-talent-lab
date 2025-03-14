
import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, Clock, CheckCircle, XCircle, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApplications, Application } from "@/hooks/useApplications";
import { format } from "date-fns";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
export function AppliedProjects() {
  const {
    applications,
    loading,
    error
  } = useApplications();
  const navigate = useNavigate();
  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };
  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      case "rejected":
        return <XCircle className="h-3 w-3 text-red-600" />;
      default:
        return <Clock className="h-3 w-3 text-yellow-600" />;
    }
  };
  if (loading) {
    return <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            My Applications
          </h2>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/requests')}>
            View All
          </Button>
        </div>
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading your applications...</p>
        </div>
      </div>;
  }
  if (error) {
    return <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            My Applications
          </h2>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/requests')}>
            View All
          </Button>
        </div>
        <Card>
          <CardContent className="py-6">
            <p className="text-red-600 text-sm">Error loading applications: {error}</p>
          </CardContent>
        </Card>
      </div>;
  }
  if (applications.length === 0) {
    return <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            My Applications
          </h2>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/requests')}>
            View All
          </Button>
        </div>
        <Card>
          <CardContent className="py-10 text-center">
            <ClipboardCheck className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base font-medium mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-4 text-sm max-w-md mx-auto">
              You haven't applied to any projects yet. Explore available opportunities to get started.
            </p>
            <Button onClick={() => navigate('/explore-projects')} size="sm">
              Explore Projects
            </Button>
          </CardContent>
        </Card>
      </div>;
  }

  // Show only the first 4 applications
  const displayedApplications = applications.slice(0, 4);
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <ClipboardCheck className="h-4 w-4 text-primary" />
          My Applications
        </h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/requests')}>
          View All
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-0 pt-4 px-4">
          <CardTitle className="text-base">
            Applied Projects ({applications.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm">Project</TableHead>
                <TableHead className="text-sm">Applied On</TableHead>
                <TableHead className="text-sm">Status</TableHead>
                <TableHead className="text-right text-sm">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedApplications.map(application => <TableRow key={application.id}>
                  <TableCell className="font-medium text-sm py-3">{application.projectTitle}</TableCell>
                  <TableCell className="py-3 text-xs">{format(application.createdAt, 'MMM d, yyyy')}</TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(application.status)}
                      <span className="text-xs">{getStatusBadge(application.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-3">
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-7" onClick={() => navigate(`/project/${application.projectId}`)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
}
