
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, AlertTriangle } from "lucide-react";
import { initializeOpenAIKey } from "@/lib/configService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const AdminConfigPage = () => {
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await initializeOpenAIKey(apiKey);
      
      if (result) {
        setSuccess(true);
        toast({
          title: "Success",
          description: "OpenAI API key has been saved",
          variant: "default",
        });
        // Clear the input after success
        setApiKey("");
      } else {
        toast({
          title: "Error",
          description: "Failed to save API key",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Configuration</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>OpenAI API Configuration</CardTitle>
            <CardDescription>
              Configure your OpenAI API key for the chatbot functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-700">Success</AlertTitle>
                <AlertDescription className="text-green-600">
                  Your API key has been saved successfully.
                </AlertDescription>
              </Alert>
            )}
            
            <Alert className="mb-4 bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-700">Security Notice</AlertTitle>
              <AlertDescription className="text-amber-600">
                This key is stored in Firestore. Only admins should have access to this page.
              </AlertDescription>
            </Alert>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">OpenAI API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="mt-4" 
                disabled={isSubmitting || !apiKey.trim()}
              >
                {isSubmitting ? "Saving..." : "Save API Key"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t px-6 py-3 text-sm text-gray-500">
            This key will be used for all chatbot interactions within the application.
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminConfigPage;
