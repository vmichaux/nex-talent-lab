
import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TalentsErrorProps {
  message: string;
  onRetry: () => void;
}

export const TalentsError = ({ message, onRetry }: TalentsErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Unable to Load Talents</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
};
