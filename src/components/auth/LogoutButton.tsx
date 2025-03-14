
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error: any) {
      console.error("Logout error:", error.message);
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
