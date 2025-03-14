
import { LineChart, Briefcase, UserPlus, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectMetricsProps {
  role?: "talent" | "builder" | "both";
}

export function ProjectMetrics({ role = "talent" }: ProjectMetricsProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          Project Metrics
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Open opportunities</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Collaborators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Review candidates</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
