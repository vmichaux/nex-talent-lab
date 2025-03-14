
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { useChatbot } from "@/hooks/useChatbot";
import { ChatContainer } from "@/components/chat/ChatContainer";

const ChatbotPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { 
    messages, 
    input, 
    setInput, 
    isLoading, 
    handleSendMessage, 
    handleKeyDown 
  } = useChatbot();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ChatContainer
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
