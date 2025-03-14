
import { useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Notification, NotificationType } from "@/types/notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type NotificationFilter = "all" | NotificationType;

export function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, loading } = useNotifications();
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const navigate = useNavigate();

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getFilteredNotifications = () => {
    if (filter === "all") return notifications;
    return notifications.filter(notification => notification.type === filter);
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <Bell className="h-4 w-4" />;
      case "application":
        return <Bell className="h-4 w-4" />;
      case "project_update":
        return <Bell className="h-4 w-4" />;
      case "connection":
        return <Bell className="h-4 w-4" />;
      case "review":
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case "message":
        return "Message";
      case "application":
        return "Application";
      case "project_update":
        return "Project Update";
      case "connection":
        return "Connection";
      case "review":
        return "Review";
      default:
        return type;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          Notifications
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={markAllAsRead}
          disabled={!notifications.some(n => !n.read)}
        >
          <Check className="h-3 w-3" />
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setFilter("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="messages" onClick={() => setFilter("message")}>
            Messages
          </TabsTrigger>
          <TabsTrigger value="applications" onClick={() => setFilter("application")}>
            Applications
          </TabsTrigger>
          <TabsTrigger value="projects" onClick={() => setFilter("project_update")}>
            Projects
          </TabsTrigger>
          <TabsTrigger value="connections" onClick={() => setFilter("connection")}>
            Connections
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="p-4 border-b">
          <CardTitle className="text-lg">
            {filter === "all" ? "All Notifications" : `${getTypeLabel(filter)} Notifications`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-10 text-center">
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-500">No notifications found</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-4">
                    {notification.sender?.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.sender.avatar} />
                        <AvatarFallback>
                          {notification.sender.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {getTypeIcon(notification.type)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={!notification.read ? "font-medium" : ""}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <Badge className="h-2 w-2 rounded-full p-0 bg-primary" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.content}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {format(
                            notification.createdAt instanceof Date
                              ? notification.createdAt
                              : new Date(notification.createdAt),
                            "MMM d, h:mm a"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge
                          variant="outline"
                          className="text-xs text-primary border-primary/20 bg-primary/5"
                        >
                          {getTypeLabel(notification.type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
