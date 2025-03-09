
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MessagesPage = () => {
  const { isLoggedIn, LogoutButton } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
              <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Messages
              </div>
              
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                Your Conversations
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                Connect with collaborators and project owners through direct messaging.
              </p>
              
              <div className="mt-6">
                <LogoutButton />
              </div>
            </div>

            {/* Messages content */}
            <div className="bg-white shadow-sm rounded-lg max-w-6xl mx-auto">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start px-4 pt-4">
                  <TabsTrigger value="all">All Messages</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="p-4">
                  <div className="text-center py-12">
                    <p className="text-gray-600">No messages yet. Start connecting with others!</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="unread" className="p-4">
                  <div className="text-center py-12">
                    <p className="text-gray-600">No unread messages.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="projects" className="p-4">
                  <div className="text-center py-12">
                    <p className="text-gray-600">No project messages.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="archived" className="p-4">
                  <div className="text-center py-12">
                    <p className="text-gray-600">No archived messages.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MessagesPage;
