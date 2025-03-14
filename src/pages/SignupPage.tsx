
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role');
  const fromOnboarding = searchParams.get('fromOnboarding') === 'true';
  const { signup, signInWithGoogle } = useAuth();

  const getWelcomeMessage = () => {
    if (!role) return "Create your account";
    
    switch(role) {
      case 'talent':
        return "Create your Talent account";
      case 'entrepreneur':
        return "Create your Builder account";
      case 'both':
        return "Create your Talent & Builder account";
      default:
        return "Create your account";
    }
  };
  
  const getDescription = () => {
    if (!role) return "Start your journey with NexTalent Lab";
    
    switch(role) {
      case 'talent':
        return "Start your journey as a Talent on NexTalent Lab";
      case 'entrepreneur':
        return "Start your journey as a Project Builder on NexTalent Lab";
      case 'both':
        return "Start your dual journey on NexTalent Lab";
      default:
        return "Start your journey with NexTalent Lab";
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    
    try {
      await signup(email, password);
      if (role) {
        localStorage.setItem("userRole", role);
      }
      toast({
        title: "Account created successfully!",
        description: "Welcome to NexTalent Lab. Let's set up your profile.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      await signInWithGoogle();
      if (role) {
        localStorage.setItem("userRole", role);
      }
      toast({
        title: "Account created successfully!",
        description: "Welcome to NexTalent Lab. Let's set up your profile.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      if (error.code === "auth/unauthorized-domain") {
        setAuthError("This website domain is not authorized for Google sign-in. You can only use Google sign-in on the production site or localhost.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">{getWelcomeMessage()}</h1>
        <p className="text-gray-500 mt-1">{getDescription()}</p>
      </div>

      {authError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-10"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="text-xs text-gray-500">
            Password must be at least 8 characters and include a number
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            type="button" 
            className="gap-2 w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M17.8395 10.1333H12.6668V12.9333H15.7462C15.4002 14.8 13.8135 15.7333 12.0002 15.7333C9.74683 15.7333 7.9335 13.9333 7.9335 12C7.9335 10.0667 9.74683 8.26667 12.0002 8.26667C13.1868 8.26667 14.0002 8.73333 14.5735 9.26667L16.6002 7.06667C15.3735 5.93333 13.7868 5.33333 12.0002 5.33333C8.0535 5.33333 4.9335 8.4 4.9335 12C4.9335 15.6 8.0535 18.6667 12.0002 18.6667C15.5868 18.6667 18.6668 16.2667 18.6668 12C18.6668 11.4 18.7335 10.5333 18.5868 10.1333H17.8395Z" />
            </svg>
            <span>Google</span>
          </Button>
        </div>
        
        <p className="mt-3 text-xs text-center text-gray-500">
          Note: Google sign-in only works on authorized domains
        </p>
      </div>

      {!fromOnboarding && (
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      )}
    </div>
  );
}
