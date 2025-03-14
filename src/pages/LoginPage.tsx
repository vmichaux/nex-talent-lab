
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast-sonner";
import { useAuth } from "@/hooks/use-auth";
import { formatAuthError } from "@/services/authService";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLoadingScreen } from "@/components/auth/AuthLoadingScreen";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, signInWithGoogle, userData, currentUser } = useAuth();

  // Monitor user data loading to handle navigation
  useEffect(() => {
    if (isLoading && currentUser && userData) {
      console.log("Navigation triggered with user data:", userData);
      handleRedirectAfterAuth();
    }
  }, [userData, currentUser, isLoading]);

  const handleRedirectAfterAuth = () => {
    // Check if user has already completed profile setup
    if (userData?.hasCompletedProfile) {
      console.log("User has completed profile, navigating to dashboard");
      navigate("/dashboard");
    } else if (userData?.userRole) {
      // User has selected a role but hasn't completed profile
      console.log("User has selected role but not completed profile");
      navigate("/dashboard");
    } else {
      // User has not selected a role yet
      console.log("User has not selected a role, navigating to onboarding");
      navigate("/onboarding");
    }
    
    // Reset loading state after successful redirect
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log(`Login form submitted with email: ${email}`);
      await login(email, password);
      
      // The useEffect will handle the navigation when userData is available
    } catch (error: any) {
      console.error("Login error in component:", error);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log("Google sign-in button clicked");
      await signInWithGoogle();
      
      // The useEffect will handle the navigation when userData is available
    } catch (error: any) {
      console.error("Google sign-in error in component:", error);
      if (error.code === "auth/unauthorized-domain") {
        setAuthError("This domain is not registered as an authorized domain in Firebase. Please ensure you're using an authorized domain such as localhost or the production domain.");
      } else {
        setAuthError(formatAuthError(error));
      }
      setIsLoading(false);
    }
  };

  // Show loading indicator during login process but only after authentication has started
  if (isLoading && currentUser) {
    return <AuthLoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
        <LoginForm
          onLogin={handleLogin}
          onGoogleSignIn={handleGoogleSignIn}
          isLoading={isLoading}
          authError={authError}
        />
      </div>
    </div>
  );
}
