
import { useState } from "react";
import { Bell, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export function DashboardNotifications() {
  const { notifications, markAsRead } = useNotifications();
  const navigate = useNavigate();
  
  // Show only the latest 4 notifications in the dashboard
  const recentNotifications = notifications.slice(0, 4);
  
  const handleNotificationClick = (notificationId: string, link?: string) => {
    markAsRead(notificationId);
    
    if (link) {
      navigate(link);
    }
  };

  const formatTimeAgo = (date: Date) => {
    return formatDistanceToNow(date instanceof Date ? date : new Date(date), { addSuffix: true });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Bell className="h-4 w-4 text-primary" />
          Recent Notifications
        </h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/dashboard/notifications')}>
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {recentNotifications.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            recentNotifications.map(notification => (
              <div 
                key={notification.id}
                className={`flex gap-3 p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-primary/5' : ''}`}
                onClick={() => handleNotificationClick(notification.id, notification.link)}
              >
                {notification.sender?.avatar ? (
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={notification.sender.avatar} alt={notification.sender.name} />
                    <AvatarFallback>{notification.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Bell className="h-4 w-4" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium text-sm flex items-center">
                      {notification.title}
                      {!notification.read && <Badge className="ml-2 bg-primary h-1.5 w-1.5 p-0 rounded-full" />}
                    </div>
                    <span className="text-xs text-gray-500">{formatTimeAgo(notification.createdAt as Date)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 truncate">{notification.content}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
