
import { Button } from "@/components/ui/button";

interface ErrorViewProps {
  message: string;
}

export function ErrorView({ message }: ErrorViewProps) {
  return (
    <div className="text-center p-10 border rounded-md bg-red-50">
      <p className="text-red-600 mb-4">{message}</p>
      <Button
        onClick={() => window.location.reload()}
        variant="outline"
      >
        Try Again
      </Button>
    </div>
  );
}
