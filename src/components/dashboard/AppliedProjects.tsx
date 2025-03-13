
import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, Clock, CheckCircle, XCircle, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useApplications, Application } from "@/hooks/useApplications";
import { format } from "date-fns";

export function AppliedProjects() {
  const { applications, loading, error, FirestoreIndexError } = useApplications();
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
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            My Applications
          </h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            My Applications
          </h2>
        </div>
        <FirestoreIndexError />
        <Card>
          <CardContent className="py-6">
            <p className="text-red-600">Error loading applications: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            My Applications
          </h2>
        </div>
        <FirestoreIndexError />
        <Card>
          <CardContent className="py-8 text-center">
            <ClipboardCheck className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-4">
              You haven't applied to any projects yet. Explore available opportunities to get started.
            </p>
            <Button onClick={() => navigate('/explore-projects')}>
              Explore Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-primary" />
          My Applications
        </h2>
      </div>

      <FirestoreIndexError />
      
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">
            Applied Projects ({applications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.projectTitle}</TableCell>
                  <TableCell>{format(application.createdAt, 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(application.status)}
                      {getStatusBadge(application.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-1"
                      onClick={() => navigate(`/project/${application.projectId}`)}
                    >
                      View <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
