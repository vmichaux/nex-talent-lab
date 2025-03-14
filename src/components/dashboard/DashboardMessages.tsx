
import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Update the sample data
const messages = [
  {
    id: 1,
    sender: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg",
      initials: "EW"
    },
    preview: "I've uploaded the design files for the eco app. Let me know what you think!",
    timestamp: "2 hours ago",
    unread: true,
    project: "Eco-Friendly Mobile App"
  },
  {
    id: 2,
    sender: {
      name: "Marcus Rivera",
      avatar: "/placeholder.svg",
      initials: "MR"
    },
    preview: "Can we schedule a call to discuss the garden platform timeline?",
    timestamp: "Yesterday",
    unread: false,
    project: "Community Garden Platform"
  },
  {
    id: 3,
    sender: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg",
      initials: "SC"
    },
    preview: "The VR simulations are ready for testing. Would you like to try them?",
    timestamp: "2 days ago",
    unread: true,
    project: "Educational VR Experience"
  }
];

export function DashboardMessages() {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Recent Messages
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/messages')}>
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {messages.map((message) => (
          <div key={message.id} className={`p-6 border-b hover:bg-gray-50 cursor-pointer transition-colors ${message.unread ? 'bg-primary/5' : ''}`}>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                <AvatarFallback>{message.sender.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium flex items-center gap-2 text-lg">
                    {message.sender.name}
                    {message.unread && <span className="w-2 h-2 bg-primary rounded-full inline-block"></span>}
                  </div>
                  <span className="text-sm text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-gray-600 truncate mb-2">{message.preview}</p>
                {message.project && (
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {message.project}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
