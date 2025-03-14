
import React from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "@/lib/chatbotService";

interface ChatContainerProps {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const ChatContainer = ({
  messages,
  input,
  setInput,
  isLoading,
  handleSendMessage,
  handleKeyDown
}: ChatContainerProps) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 py-12">
        <ChatHeader />

        {/* Chat UI */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <ChatMessages messages={messages} />
          <ChatInput 
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            handleKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};
