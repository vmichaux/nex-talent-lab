
import React from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom Google SVG icon
const Google = (props: React.ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M17.8395 10.1333H12.6668V12.9333H15.7462C15.4002 14.8 13.8135 15.7333 12.0002 15.7333C9.74683 15.7333 7.9335 13.9333 7.9335 12C7.9335 10.0667 9.74683 8.26667 12.0002 8.26667C13.1868 8.26667 14.0002 8.73333 14.5735 9.26667L16.6002 7.06667C15.3735 5.93333 13.7868 5.33333 12.0002 5.33333C8.0535 5.33333 4.9335 8.4 4.9335 12C4.9335 15.6 8.0535 18.6667 12.0002 18.6667C15.5868 18.6667 18.6668 16.2667 18.6668 12C18.6668 11.4 18.7335 10.5333 18.5868 10.1333H17.8395Z" />
  </svg>
);

interface GoogleSignInButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick, isLoading }) => {
  return (
    <Button 
      variant="outline" 
      type="button" 
      className="gap-2 w-full" 
      onClick={onClick} 
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader className="h-4 w-4 mr-2 animate-spin" />
          Connecting...
        </span>
      ) : (
        <>
          <Google className="h-4 w-4" />
          <span>Google</span>
        </>
      )}
    </Button>
  );
};
