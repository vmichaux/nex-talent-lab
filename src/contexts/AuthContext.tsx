
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  LogoutButton: React.FC;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Check localStorage on initialization
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isLoggedIn');
    if (storedAuthState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  // Logout button component that can be used anywhere in the app
  const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      logout();
      navigate('/');
    };

    return (
      <Button 
        onClick={handleLogout} 
        variant="outline" 
        size="sm" 
        className="gap-2 bg-white hover:bg-gray-100"
      >
        <LogOut className="h-4 w-4" />
        Log Out
      </Button>
    );
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, LogoutButton }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
