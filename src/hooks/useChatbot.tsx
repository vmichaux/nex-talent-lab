
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfile } from "@/lib/user-service";
import { getUserChatHistory, saveMessage, sendMessageToOpenAI, ChatMessage } from "@/lib/chatbotService";
import { useToast } from "@/hooks/use-toast";

export const useChatbot = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  // Set this to false to stop saving to database
  const saveToDatabase = false;

  // Load chat history
  const loadChatHistory = async () => {
    if (isLoggedIn) {
      setIsLoading(true);
      try {
        // Only load from database if we want to save to database
        const history = saveToDatabase ? await getUserChatHistory() : [];
        
        if (history.length === 0) {
          // Get user profile to personalize welcome message
          let userName = "";
          if (currentUser) {
            const userProfile = await getUserProfile(currentUser.uid);
            if (userProfile && userProfile.firstName) {
              userName = userProfile.firstName;
            }
          }
          
          // Create personalized or default welcome message
          const welcomeContent = userName 
            ? `Hello ${userName}! I'm your AI assistant. How can I help you today?`
            : "Hello! I'm your AI assistant. How can I help you today?";
          
          const welcomeMessage: ChatMessage = {
            content: welcomeContent,
            role: "assistant",
            timestamp: new Date(),
          };
          
          setMessages([welcomeMessage]);
          
          // Only save to database if enabled
          if (saveToDatabase) {
            await saveMessage(welcomeMessage.content, welcomeMessage.role, saveToDatabase);
          }
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

  // Load chat history on component mount
  useEffect(() => {
    loadChatHistory();
  }, [isLoggedIn, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

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
      // Save user message to Firebase only if saveToDatabase is true
      if (saveToDatabase) {
        await saveMessage(userMessage.content, userMessage.role, saveToDatabase);
      }

      // Set a loading message
      const loadingMessage: ChatMessage = {
        content: "...",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, loadingMessage]);

      // Get AI response using current conversation context
      const aiResponse = await sendMessageToOpenAI(userMessage.content, messages);
      
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

      // Save AI response to Firebase only if saveToDatabase is true
      if (saveToDatabase) {
        await saveMessage(aiResponse, "assistant", saveToDatabase);
      }
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

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSendMessage,
    handleKeyDown
  };
};
