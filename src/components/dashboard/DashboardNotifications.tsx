
import { useState } from "react";
import { ArrowRight, Bell, MessageCircle, UserPlus, FileText, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export function DashboardNotifications() {
  const { notifications: realNotifications, markAsRead } = useNotifications();
  const navigate = useNavigate();
  
  // Mock notifications to show when there are no real notifications
  const mockNotifications = [
    {
      id: "mock1",
      title: "New Project Application",
      content: "Sarah Wilson applied to your Community Garden Platform project",
      createdAt: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      read: false,
      type: "application",
      link: "/requests",
      sender: {
        name: "Sarah Wilson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    },
    {
      id: "mock2",
      title: "New Message",
      content: "Michael Brown: Hi there! I'm interested in discussing the project requirements in more detail.",
      createdAt: new Date(Date.now() - 2 * 3600000), // 2 hours ago
      read: true,
      type: "message",
      link: "/messages",
      sender: {
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    },
    {
      id: "mock3",
      title: "Project Milestone Update",
      content: "UI Design phase for Eco-Friendly Mobile App is 75% complete",
      createdAt: new Date(Date.now() - 1 * 86400000), // 1 day ago
      read: false,
      type: "project_update",
      link: "/project-deadlines",
      sender: {
        name: "System",
        avatar: ""
      }
    },
    {
      id: "mock4",
      title: "New Connection Request",
      content: "Emily Davis wants to connect with you",
      createdAt: new Date(Date.now() - 2 * 86400000), // 2 days ago
      read: true,
      type: "connection",
      link: "/dashboard",
      sender: {
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg"
      }
    }
  ];
  
  // Show real notifications if available, otherwise show mock notifications
  const notifications = realNotifications.length > 0 ? realNotifications : mockNotifications;
  
  // Show only the latest 4 notifications in the dashboard
  const recentNotifications = notifications.slice(0, 4);
  
  const handleNotificationClick = (notificationId: string, link?: string) => {
    if (realNotifications.length > 0) {
      markAsRead(notificationId);
    }
    
    if (link) {
      navigate(link);
    }
  };

  const formatTimeAgo = (date: Date) => {
    return formatDistanceToNow(date instanceof Date ? date : new Date(date), { addSuffix: true });
  };

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-4 w-4" />;
      case "application":
        return <FileText className="h-4 w-4" />;
      case "project_update":
        return <Star className="h-4 w-4" />;
      case "connection":
        return <UserPlus className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold category-title-gradient text-3xl">
          Recent Notifications
        </h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/dashboard/notifications')}>
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {recentNotifications.map(notification => (
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
                  {getNotificationIcon(notification.type)}
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
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
