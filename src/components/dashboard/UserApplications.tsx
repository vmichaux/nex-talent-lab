
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ExternalLink, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Application, getUserApplications } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export function UserApplications() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const userApplications = await getUserApplications(currentUser.uid);
        setApplications(userApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [currentUser]);

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "pending":
      default:
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-[100px] bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="h-[100px] bg-gray-100 animate-pulse rounded-lg"></div>
      </div>
    );
  }
  
  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Applications Yet</h3>
            <p className="text-gray-500 mb-4">You haven't applied to any projects yet.</p>
            <Button asChild>
              <Link to="/explore-projects">Explore Projects</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{application.projectTitle}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Clock className="h-4 w-4" />
                  <span>Applied {format(application.createdAt, 'MMM d, yyyy')}</span>
                </div>
                
                {application.coverLetter && (
                  <p className="text-gray-600 mb-2 line-clamp-2 text-sm">
                    {application.coverLetter}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Badge className={`px-3 py-1 ${getStatusBadgeStyles(application.status)}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  asChild
                >
                  <Link to={`/project/${application.projectId}`}>
                    View Project <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
