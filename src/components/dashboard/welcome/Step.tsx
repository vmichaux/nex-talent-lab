
import { Check } from "lucide-react";
import { ReactNode } from "react";

export type StepProps = {
  number: number;
  title: string;
  description: string;
  completed?: boolean;
  onClick?: () => void;
};

export const Step = ({
  number,
  title,
  description,
  completed = false,
  onClick
}: StepProps) => {
  return (
    <div 
      className={`flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 w-full max-w-3xl ${onClick ? 'cursor-pointer' : ''}`} 
      onClick={onClick}
    >
      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${completed ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
        {completed ? <Check className="h-5 w-5" /> : <span className="font-semibold">{number}</span>}
      </div>
      <div className="space-y-1 text-left">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};
