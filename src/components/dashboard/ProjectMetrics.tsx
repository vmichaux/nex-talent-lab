
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface ProjectMetricsProps {
  role?: "talent" | "builder" | "both";
}

export function ProjectMetrics({
  role = "talent"
}: ProjectMetricsProps) {
  const { currentUser } = useAuth();
  const [activeProjects, setActiveProjects] = useState(0);
  const [collaborators, setCollaborators] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);

  useEffect(() => {
    if (!currentUser?.uid) {
      setActiveProjects(0);
      setCollaborators(0);
      setPendingApplications(0);
      return;
    }

    let cancelled = false;

    const loadMetrics = async () => {
      try {
        // The current user's own projects.
        const projectsSnapshot = await getDocs(
          query(collection(db, "projects"), where("userId", "==", currentUser.uid))
        );
        const projectIds = projectsSnapshot.docs.map(doc => doc.id);
        const activeCount = projectsSnapshot.docs.filter(
          doc => doc.data().status !== "Closed"
        ).length;

        // Applications to those projects, chunked (Firestore caps "in" at 30 ids).
        let pending = 0;
        let accepted = 0;
        for (let i = 0; i < projectIds.length; i += 10) {
          const chunk = projectIds.slice(i, i + 10);
          const appsSnapshot = await getDocs(
            query(collection(db, "applications"), where("projectId", "in", chunk))
          );
          appsSnapshot.forEach(doc => {
            const status = doc.data().status;
            if (status === "pending") pending += 1;
            else if (status === "accepted") accepted += 1;
          });
        }

        if (!cancelled) {
          setActiveProjects(activeCount);
          setCollaborators(accepted);
          setPendingApplications(pending);
        }
      } catch (error) {
        console.error("Error loading project metrics:", error);
      }
    };

    loadMetrics();
    return () => {
      cancelled = true;
    };
  }, [currentUser?.uid]);

  return <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold category-title-gradient text-3xl">
          Project Metrics
        </h2>
        <Button variant="outline" size="sm" className="gap-1">
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Active Projects</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">Open opportunities</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Total Collaborators</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">{collaborators}</div>
            <p className="text-xs text-muted-foreground">Accepted applications</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Pending Applications</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">{pendingApplications}</div>
            <p className="text-xs text-muted-foreground">Review candidates</p>
          </CardContent>
        </Card>
      </div>
    </div>;
}
