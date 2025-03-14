
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Google = (props: React.ComponentProps<LucideIcon>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M17.8395 10.1333H12.6668V12.9333H15.7462C15.4002 14.8 13.8135 15.7333 12.0002 15.7333C9.74683 15.7333 7.9335 13.9333 7.9335 12C7.9335 10.0667 9.74683 8.26667 12.0002 8.26667C13.1868 8.26667 14.0002 8.73333 14.5735 9.26667L16.6002 7.06667C15.3735 5.93333 13.7868 5.33333 12.0002 5.33333C8.0535 5.33333 4.9335 8.4 4.9335 12C4.9335 15.6 8.0535 18.6667 12.0002 18.6667C15.5868 18.6667 18.6668 16.2667 18.6668 12C18.6668 11.4 18.7335 10.5333 18.5868 10.1333H17.8395Z" />
  </svg>;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log(`Login form submitted with email: ${email}`);
      await login(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error in component:", error);
      // Toast is already handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log("Google sign-in button clicked");
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Google sign-in error in component:", error);
      if (error.code === "auth/unauthorized-domain") {
        setAuthError("This website domain is not authorized for Google sign-in. You can only use Google sign-in on the production site or localhost.");
      }
      // Toast is already handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-white border-b border-gray-100 py-4 px-6">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center gap-1">
            <ArrowLeft className="h-5 w-5 text-gray-500 mr-2" />
            <span className="font-bold text-2xl bg-gradient-to-r from-[#6E59A5] to-[#2ECC71] bg-clip-text text-transparent">NexTalent</span>
            <span className="font-bold text-2xl text-zinc-900">Lab</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <div className="mb-8 text-center">
            <h1 className="font-bold bg-gradient-to-r from-[#6E59A5] to-[#2ECC71] bg-clip-text text-transparent text-5xl">Welcome back</h1>
            <p className="text-gray-500 mt-1 my-[12px]">Log in to your NexTalent Lab account</p>
          </div>

          {authError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
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
              <Button variant="outline" type="button" className="gap-2 w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                <Google className="h-4 w-4" />
                <span>Google</span>
              </Button>
            </div>
            
            <p className="mt-3 text-xs text-center text-gray-500">
              Note: Google sign-in only works on authorized domains
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>;
}
