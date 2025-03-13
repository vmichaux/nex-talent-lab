
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

export function ErrorState({ errorMessage, onRetry }: ErrorStateProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center text-red-500">
          <p className="mb-4">{errorMessage}</p>
          <Button 
            variant="outline" 
            onClick={onRetry}
          >
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
