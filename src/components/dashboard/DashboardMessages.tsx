
import React from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
export function DashboardMessages() {
  const navigate = useNavigate();

  // Sample messages data - in a real app, this would come from a data source like Firebase
  const recentMessages = [{
    id: 1,
    sender: "Emma Davis",
    avatar: "/placeholder.svg",
    initials: "ED",
    preview: "Hi there! I'm interested in discussing the project details further...",
    time: "10:45 AM",
    unread: true,
    projectName: "Eco App Development"
  }, {
    id: 2,
    sender: "Michael Wilson",
    avatar: "/placeholder.svg",
    initials: "MW",
    preview: "I've completed the wireframes for the dashboard. When can we meet?",
    time: "Yesterday",
    unread: true,
    projectName: "Dashboard Redesign"
  }, {
    id: 3,
    sender: "Sarah Johnson",
    avatar: "/placeholder.svg",
    initials: "SJ",
    preview: "Thanks for your feedback on the logo designs. I've made the revisions...",
    time: "Aug 12",
    unread: false,
    projectName: "Brand Identity"
  }, {
    id: 4,
    sender: "David Lee",
    avatar: "/placeholder.svg",
    initials: "DL",
    preview: "Just sent over the contract. Let me know if you have any questions...",
    time: "Aug 10",
    unread: false,
    projectName: "Legal Consultation"
  }];
  return <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-2xl font-semibold category-title-gradient">
          <MessageSquare className="h-4 w-4 text-primary" />
          Recent Messages
        </h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/messages')}>
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {recentMessages.map(message => <div key={message.id} className={`flex gap-3 p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${message.unread ? 'bg-primary/5' : ''}`} onClick={() => navigate('/messages')}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium text-sm flex items-center">
                    {message.sender}
                    {message.unread && <Badge className="ml-2 bg-primary h-1.5 w-1.5 p-0 rounded-full" />}
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-xs text-gray-600 mb-1 truncate">{message.preview}</p>
                <p className="text-xs text-gray-500 truncate">Re: {message.projectName}</p>
              </div>
            </div>)}
        </CardContent>
      </Card>
    </div>;
}
