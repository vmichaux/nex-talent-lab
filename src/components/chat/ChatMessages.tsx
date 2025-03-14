
import { useRef, useEffect } from "react";
import { Loader } from "lucide-react";
import { ChatMessage } from "@/lib/chatbotService";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
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
  );
};
