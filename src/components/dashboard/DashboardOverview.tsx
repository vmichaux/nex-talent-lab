
import { Briefcase, MessageSquare, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - in a real app, this would come from Firebase
const stats = {
  projects: 3,
  unreadMessages: 2,
  upcomingEvents: 3
};

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Projects</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.projects}</div>
          <p className="text-sm text-muted-foreground">Active Projects</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Messages</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.unreadMessages}</div>
          <p className="text-sm text-muted-foreground">Unread Messages</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Events</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.upcomingEvents}</div>
          <p className="text-sm text-muted-foreground">Upcoming Events</p>
        </CardContent>
      </Card>
    </div>
  );
}
