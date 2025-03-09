
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Search, PaperclipIcon, Send } from "lucide-react";

// Mock conversation data
const mockConversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastSeen: "2 min ago",
      role: "UX Designer"
    },
    lastMessage: "Hey, I saw your project proposal and I'd love to collaborate!",
    time: "10:32 AM",
    unread: 2,
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Samantha Lee",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastSeen: "1 hour ago",
      role: "Web Developer"
    },
    lastMessage: "The latest updates look great. Can we discuss the timeline?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastSeen: "3 hours ago",
      role: "Project Manager"
    },
    lastMessage: "Just shared the budget breakdown with you. Let me know your thoughts.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastSeen: "Just now",
      role: "Content Strategist"
    },
    lastMessage: "I've prepared the content outline for your review.",
    time: "Monday",
    unread: 0,
  },
  {
    id: 5,
    user: {
      id: 105,
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastSeen: "5 min ago",
      role: "Frontend Developer"
    },
    lastMessage: "Do you have time to review the UI components I created?",
    time: "Monday",
    unread: 1,
  },
  {
    id: 6,
    user: {
      id: 106,
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=6",
      lastSeen: "2 days ago",
      role: "Illustrator"
    },
    lastMessage: "I finished the illustrations for the landing page. What do you think?",
    time: "Last week",
    unread: 0,
  },
];

// Mock messages for a sample conversation
const mockMessages = [
  {
    id: 1,
    senderId: 101,
    text: "Hey, I saw your project proposal and I'd love to collaborate!",
    timestamp: "10:32 AM",
    isRead: true,
  },
  {
    id: 2,
    senderId: "me",
    text: "Thanks! I'm excited about the concept and would welcome collaboration. What aspects are you interested in?",
    timestamp: "10:34 AM",
    isRead: true,
  },
  {
    id: 3,
    senderId: 101,
    text: "I really like the user experience design you outlined. I have expertise in creating intuitive interfaces and have worked on similar projects before.",
    timestamp: "10:36 AM",
    isRead: true,
  },
  {
    id: 4,
    senderId: "me",
    text: "That sounds perfect! I was hoping to find someone with UX expertise. Would you be interested in joining a call to discuss the project in more detail?",
    timestamp: "10:40 AM",
    isRead: true,
  },
  {
    id: 5,
    senderId: 101,
    text: "Absolutely! I'm free tomorrow afternoon or Friday morning. Would either of those work for you?",
    timestamp: "10:45 AM",
    isRead: true,
  },
  {
    id: 6,
    senderId: "me",
    text: "Friday morning works great for me. How about 10 AM?",
    timestamp: "10:48 AM",
    isRead: true,
  },
  {
    id: 7,
    senderId: 101,
    text: "Perfect! I'll send a calendar invite with a meeting link. Looking forward to it!",
    timestamp: "10:50 AM",
    isRead: false,
  },
];

const MessagesPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // In a real app, you would send the message to an API
    console.log("Sending message:", newMessage);
    
    // For this demo, we'll just clear the input
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(conv => 
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUser = conversations.find(c => c.id === activeConversation)?.user;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh]">
        {/* Conversations List */}
        <div className="col-span-1 border rounded-lg overflow-hidden bg-white h-full flex flex-col">
          <div className="p-4 border-b">
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              prefix={<Search className="h-4 w-4 text-gray-500" />}
            />
          </div>
          
          <Tabs defaultValue="all" className="px-4 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread 
                <Badge variant="secondary" className="ml-2">
                  {conversations.reduce((acc, conv) => acc + conv.unread, 0)}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="overflow-y-auto flex-grow">
            <TabsContent value="all" className="m-0">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                      activeConversation === conversation.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <Avatar className="h-12 w-12">
                      <img src={conversation.user.avatar} alt={conversation.user.name} />
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium truncate">
                          {conversation.user.name}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {conversation.user.role}
                        </span>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="m-0">
              {filteredConversations.filter(c => c.unread > 0).length > 0 ? (
                filteredConversations
                  .filter(c => c.unread > 0)
                  .map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                        activeConversation === conversation.id ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <Avatar className="h-12 w-12">
                        <img src={conversation.user.avatar} alt={conversation.user.name} />
                      </Avatar>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium truncate">
                            {conversation.user.name}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {conversation.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">
                            {conversation.user.role}
                          </span>
                          <Badge variant="default" className="text-xs">
                            {conversation.unread}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No unread messages
                </div>
              )}
            </TabsContent>
          </div>
        </div>
        
        {/* Active Conversation */}
        <div className="col-span-2 border rounded-lg overflow-hidden bg-white h-full flex flex-col">
          {activeUser ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={activeUser.avatar} alt={activeUser.name} />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeUser.name}</h3>
                    <p className="text-xs text-gray-500">{activeUser.lastSeen} • {activeUser.role}</p>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.senderId === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div
                        className={`text-xs mt-1 flex justify-end ${
                          message.senderId === "me"
                            ? "text-primary-foreground/80"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" type="button">
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                  <Input
                    className="flex-grow"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ""}
                    type="button"
                  >
                    <Send className="h-5 w-5 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare className="h-16 w-16 mb-4 text-gray-300" />
              <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
              <p className="text-sm">Choose a conversation from the list to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
