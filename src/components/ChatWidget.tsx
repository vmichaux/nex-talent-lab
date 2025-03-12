
import { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  X, 
  Minimize2, 
  Maximize2, 
  Send, 
  Loader, 
  Bot 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  getUserChatHistory, 
  saveMessage, 
  sendMessageToOpenAI, 
  ChatMessage 
} from "@/lib/chatbotService";

export const ChatWidget = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load chat history when widget is opened
  useEffect(() => {
    if (isOpen && isLoggedIn) {
      loadChatHistory();
    }
  }, [isOpen, isLoggedIn]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatHistory = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const history = await getUserChatHistory();
      if (history.length === 0) {
        // Add welcome message if no history exists
        const welcomeMessage: ChatMessage = {
          content: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
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
        title: "Erreur",
        description: "Impossible de charger votre historique de conversation. Veuillez réessayer.",
        variant: "destructive",
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
      timestamp: new Date(),
    };

    // Optimistically add user message to UI
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setApiError(null);

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
      
      // Update error state for user feedback
      setApiError("Une erreur est survenue lors de la communication avec l'API. Veuillez réessayer.");
      
      toast({
        title: "Erreur",
        description: "Impossible d'obtenir une réponse. Veuillez réessayer.",
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

  // Don't render anything if user is not logged in
  if (!isLoggedIn) return null;

  return (
    <>
      {/* Chat button fixed in the bottom right */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={`fixed bottom-4 right-4 p-0 w-80 md:w-96 rounded-lg shadow-xl border-0 max-w-none ${
            isMinimized ? "h-16" : "h-[500px]"
          } transition-all duration-300 overflow-hidden transform-none bg-white`}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between bg-primary text-white p-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <DialogTitle className="text-white text-lg">Assistant IA</DialogTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary-foreground/20 text-white"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary-foreground/20 text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat content - only shown when not minimized */}
          {!isMinimized && (
            <>
              {/* API Error Message if needed */}
              {apiError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-2">
                  <p className="text-sm">{apiError}</p>
                </div>
              )}
              
              {/* Messages area - reduced height to give more room to input */}
              <div className="h-[320px] overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={message.id || index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-lg px-4 py-2 ${
                        message.role === "user" 
                          ? "bg-primary text-white" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content === "..." ? (
                        <div className="flex items-center space-x-2">
                          <Loader className="h-4 w-4 animate-spin" />
                          <span>Réflexion en cours...</span>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input area - improved spacing and padding for better button visibility */}
              <div className="border-t pt-3 pb-6 px-3">
                <div className="flex items-start space-x-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tapez votre message..."
                    className="flex-1 min-h-[80px] max-h-[120px] resize-none focus:outline-none text-sm p-2 border rounded-md"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="mt-1 h-10 w-10"
                  >
                    {isLoading ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
