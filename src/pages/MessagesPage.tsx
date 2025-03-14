import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Fake message data
const fakeMessages = [{
  id: 1,
  sender: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    initials: "SJ"
  },
  unread: true,
  lastMessage: "Hi there! I saw your profile and I'm interested in collaborating on your eco-friendly app project.",
  timestamp: "10:30 AM",
  project: "Eco App"
}, {
  id: 2,
  sender: {
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    initials: "MC"
  },
  unread: false,
  lastMessage: "Thanks for your feedback on the design. I've made the changes you suggested.",
  timestamp: "Yesterday",
  project: "Portfolio Website"
}, {
  id: 3,
  sender: {
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg",
    initials: "AR"
  },
  unread: true,
  lastMessage: "When are you available for a quick call to discuss the project timeline?",
  timestamp: "Monday",
  project: "Mobile App"
}, {
  id: 4,
  sender: {
    name: "Emma Wilson",
    avatar: "/placeholder.svg",
    initials: "EW"
  },
  unread: false,
  lastMessage: "I've shared the project files with you. Let me know if you have any questions!",
  timestamp: "Last week",
  project: "Logo Design"
}];

// Filtered message lists
const unreadMessages = fakeMessages.filter(message => message.unread);
const projectMessages = fakeMessages.filter(message => message.project);
const archivedMessages = [{
  id: 5,
  sender: {
    name: "David Lee",
    avatar: "/placeholder.svg",
    initials: "DL"
  },
  unread: false,
  lastMessage: "Project completed successfully. Thanks for your collaboration!",
  timestamp: "March 15",
  project: "Website Redesign"
}];
const MessageItem = ({
  message
}) => <div className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${message.unread ? 'bg-primary/5' : ''}`}>
    <div className="flex items-start gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
        <AvatarFallback>{message.sender.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <div className="font-medium flex items-center gap-2">
            {message.sender.name}
            {message.unread && <span className="w-2 h-2 bg-primary rounded-full inline-block"></span>}
          </div>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
        {message.project && <div className="mt-1">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              {message.project}
            </Badge>
          </div>}
      </div>
    </div>
  </div>;
const EmptyState = ({
  message
}) => <div className="text-center py-12">
    <p className="text-gray-600">{message}</p>
  </div>;
const MessagesPage = () => {
  const {
    isLoggedIn
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 py-[64px]">
              <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Messages
              </div>
              
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                Your Conversations
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                Connect with collaborators and project owners through direct messaging.
              </p>
            </div>

            {/* Messages content */}
            <div className="bg-white shadow-sm rounded-lg max-w-6xl mx-auto">
              <Tabs defaultValue="all" className="w-full">
                <div className="border-b">
                  <TabsList className="w-full justify-start px-4 pt-4 pb-0 bg-transparent h-auto">
                    <TabsTrigger value="all" className="rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                      All Messages
                      <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                        {fakeMessages.length}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                      Unread
                      <span className="ml-2 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                        {unreadMessages.length}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                      Projects
                    </TabsTrigger>
                    <TabsTrigger value="archived" className="rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                      Archived
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="max-h-[600px] overflow-y-auto">
                  <div className="divide-y">
                    {fakeMessages.map(message => <MessageItem key={message.id} message={message} />)}
                  </div>
                </TabsContent>
                
                <TabsContent value="unread" className="max-h-[600px] overflow-y-auto">
                  {unreadMessages.length > 0 ? <div className="divide-y">
                      {unreadMessages.map(message => <MessageItem key={message.id} message={message} />)}
                    </div> : <EmptyState message="No unread messages." />}
                </TabsContent>
                
                <TabsContent value="projects" className="max-h-[600px] overflow-y-auto">
                  {projectMessages.length > 0 ? <div className="divide-y">
                      {projectMessages.map(message => <MessageItem key={message.id} message={message} />)}
                    </div> : <EmptyState message="No project messages." />}
                </TabsContent>
                
                <TabsContent value="archived" className="max-h-[600px] overflow-y-auto">
                  {archivedMessages.length > 0 ? <div className="divide-y">
                      {archivedMessages.map(message => <MessageItem key={message.id} message={message} />)}
                    </div> : <EmptyState message="No archived messages." />}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default MessagesPage;
