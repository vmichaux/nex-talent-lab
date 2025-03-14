import { Briefcase, MessageSquare, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - in a real app, this would come from Firebase
const stats = {
  projects: 3,
  applications: 2,
  unreadMessages: 2
};
interface DashboardOverviewProps {
  role?: "talent" | "builder" | "both";
}
export function DashboardOverview({
  role = "talent"
}: DashboardOverviewProps) {
  const getSecondBoxTitle = () => {
    switch (role) {
      case "builder":
        return "Applications";
      case "talent":
      case "both":
      default:
        return "My Applications";
    }
  };
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/20 p-1.5 rounded-full">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-sm">Projects</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="text-2xl font-bold px-[222px]">{stats.projects}</div>
          <p className="text-xs text-muted-foreground text-right">Active Projects</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/20 p-1.5 rounded-full">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-sm">{getSecondBoxTitle()}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="text-2xl font-bold px-[221px]">{stats.applications}</div>
          <p className="text-xs text-muted-foreground text-right">Pending Applications</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/20 p-1.5 rounded-full">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-sm">Messages</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="text-2xl font-bold px-[221px]">{stats.unreadMessages}</div>
          <p className="text-xs text-muted-foreground text-right">Unread Messages</p>
        </CardContent>
      </Card>
    </div>;
}