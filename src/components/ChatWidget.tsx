import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Minimize2, Maximize2, Send, Loader, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getUserChatHistory, saveMessage, sendMessageToOpenAI, ChatMessage } from "@/lib/chatbotService";

export const ChatWidget = () => {
  const {
    isLoggedIn
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (isLoggedIn) {
        loadChatHistory();
      } else {
        // Add welcome message for logged out users
        const welcomeMessage: ChatMessage = {
          content: "Hello! I'm your AI assistant. How can I help you today?",
          role: "assistant",
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [isOpen, isLoggedIn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const loadChatHistory = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const history = await getUserChatHistory();
      if (history.length === 0) {
        const welcomeMessage: ChatMessage = {
          content: "Hello! I'm your AI assistant. How can I help you today?",
          role: "assistant",
          timestamp: new Date()
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
        description: "Unable to load your conversation history. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: ChatMessage = {
      content: input.trim(),
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setApiError(null);
    
    try {
      // Only save messages to database if logged in
      if (isLoggedIn) {
        await saveMessage(userMessage.content, userMessage.role);
      }

      const loadingMessage: ChatMessage = {
        content: "...",
        role: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, loadingMessage]);

      const aiResponse = await sendMessageToOpenAI(userMessage.content);

      setMessages(prev => {
        const filteredMessages = prev.filter(msg => msg.content !== "...");
        const assistantMessage: ChatMessage = {
          content: aiResponse,
          role: "assistant",
          timestamp: new Date()
        };
        return [...filteredMessages, assistantMessage];
      });

      // Only save messages to database if logged in
      if (isLoggedIn) {
        await saveMessage(aiResponse, "assistant");
      }
    } catch (error) {
      console.error("Error in chat sequence:", error);

      setApiError("An error occurred while communicating with the API. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });

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

  return <>
      {!isOpen && <Button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-20 z-50 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300" size="icon">
          <Bot className="h-6 w-6" />
        </Button>}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`fixed bottom-4 right-20 p-0 w-80 md:w-96 rounded-lg shadow-xl border-0 max-w-none ${isMinimized ? "h-16" : "h-[550px]"} transition-all duration-300 overflow-hidden transform-none bg-white`}>
          <div className="flex items-center justify-between bg-primary text-white p-3 sticky top-0 z-10 py-0 px-[11px]">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <DialogTitle className="text-white text-lg font-semibold font-century-gothic">AI Assistant</DialogTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary-foreground/20 text-white" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary-foreground/20 text-white" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && <>
              {apiError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-2">
                  <p className="text-sm">{apiError}</p>
                </div>}
              
              <div className="h-[340px] overflow-y-auto p-4 space-y-4 py-0 px-[12px]">
                {messages.map((message, index) => <div key={message.id || index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}>
                      {message.content === "..." ? <div className="flex items-center space-x-2">
                          <Loader className="h-4 w-4 animate-spin" />
                          <span>Thinking...</span>
                        </div> : <p className="whitespace-pre-wrap text-sm">{message.content}</p>}
                    </div>
                  </div>)}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-t pt-3 pb-5 px-3 mb-3">
                <div className="flex items-start space-x-2">
                  <Textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your message..." className="flex-1 min-h-[60px] max-h-[120px] resize-none focus:outline-none text-sm p-2 border rounded-md" disabled={isLoading} />
                  <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} size="icon" className="mt-1 h-10 w-10">
                    {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </>}
        </DialogContent>
      </Dialog>
    </>;
};
