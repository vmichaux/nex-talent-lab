
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: error.message,
        variant: "destructive"
      });
    }
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
