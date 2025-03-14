
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    } catch (error) {
      console.error("Google sign-in error:", error);
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
            <Linkedin className="h-4 w-4" />
            <span>Google</span>
          </Button>
        </div>
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
