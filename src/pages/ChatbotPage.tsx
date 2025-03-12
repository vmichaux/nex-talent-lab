
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Loader } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { getUserChatHistory, saveMessage, sendMessageToOpenAI, ChatMessage } from "@/lib/chatbotService";
import { useToast } from "@/hooks/use-toast";

const ChatbotPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Load chat history
  useEffect(() => {
    const loadChatHistory = async () => {
      if (isLoggedIn) {
        setIsLoading(true);
        try {
          const history = await getUserChatHistory();
          if (history.length === 0) {
            // Add welcome message if no history exists
            const welcomeMessage: ChatMessage = {
              content: "Hello! I'm your AI assistant. How can I help you today?",
              role: "assistant",
              timestamp: new Date(),
            };
            setMessages([welcomeMessage]);
            await saveMessage(welcomeMessage.content, welcomeMessage.role);
          } else {
            setMessages(history);
          }
        } catch (error) {
          console.error("Failed to load chat history:", error);
          toast({
            title: "Error",
            description: "Failed to load your chat history. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadChatHistory();
  }, [isLoggedIn, toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    // Optimistically add user message to UI
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Save user message to Firebase
      await saveMessage(userMessage.content, userMessage.role);

      // Set a loading message
      const loadingMessage: ChatMessage = {
        content: "...",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, loadingMessage]);

      // Get AI response
      const aiResponse = await sendMessageToOpenAI(userMessage.content);
      
      // Remove loading message and add real response
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => msg.content !== "...");
        const assistantMessage: ChatMessage = {
          content: aiResponse,
          role: "assistant",
          timestamp: new Date(),
        };
        return [...filteredMessages, assistantMessage];
      });

      // Save AI response to Firebase
      await saveMessage(aiResponse, "assistant");
    } catch (error) {
      console.error("Error in chat sequence:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      
      // Remove loading message if there was an error
      setMessages(prev => prev.filter(msg => msg.content !== "..."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
              <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                AI Assistant
              </div>
              
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                Chat with our AI
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                Ask any questions or get assistance with your projects.
              </p>
            </div>

            {/* Chat UI */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              {/* Messages area */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={message.id || index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user" 
                          ? "bg-primary text-white" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content === "..." ? (
                        <div className="flex items-center space-x-2">
                          <Loader className="h-4 w-4 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input area */}
              <div className="border-t p-4">
                <div className="flex items-end space-x-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 min-h-[80px] resize-none focus:outline-none"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="mb-1"
                  >
                    {isLoading ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
