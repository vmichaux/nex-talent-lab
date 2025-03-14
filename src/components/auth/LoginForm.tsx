
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { GoogleSignInButton } from "./GoogleSignInButton";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
  authError: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  onGoogleSignIn, 
  isLoading, 
  authError 
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
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

      <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={e => setEmail(e.target.value)} 
              required 
            />
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
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="pl-10" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Logging in...
            </span>
          ) : "Log in"}
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
          <GoogleSignInButton onClick={onGoogleSignIn} isLoading={isLoading} />
        </div>
        
        <p className="mt-3 text-xs text-center text-gray-500">
          Note: Make sure you're accessing from an authorized domain (e.g., localhost or your production domain)
        </p>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};
