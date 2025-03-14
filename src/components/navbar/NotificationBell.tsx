
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/hooks/useNotifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notification } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    markAsRead(notification.id);
    
    // Navigate to the related page if link is provided
    if (notification.link) {
      navigate(notification.link);
    }
    
    // Close the popover
    setOpen(false);
  };

  const formatTimeAgo = (date: Date) => {
    return formatDistanceToNow(date instanceof Date ? date : new Date(date), { addSuffix: true });
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.slice(0, 5).map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-primary/5' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    {notification.sender?.avatar ? (
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={notification.sender.avatar} />
                        <AvatarFallback>
                          {notification.sender.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {notification.type === 'message' && <Bell className="h-4 w-4" />}
                        {notification.type === 'application' && <Bell className="h-4 w-4" />}
                        {notification.type === 'project_update' && <Bell className="h-4 w-4" />}
                        {notification.type === 'connection' && <Bell className="h-4 w-4" />}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">{notification.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTimeAgo(notification.createdAt as Date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-gray-500">
              No notifications yet
            </div>
          )}
        </div>

        {notifications.length > 5 && (
          <div className="border-t p-2">
            <Button 
              variant="ghost" 
              className="w-full text-sm" 
              onClick={() => {
                navigate('/dashboard/notifications');
                setOpen(false);
              }}
            >
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
