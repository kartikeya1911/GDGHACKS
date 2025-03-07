
import { cn } from "@/lib/utils";
import { AllergySeverity } from "@/contexts/AuthContext";

interface AllergenTagProps {
  name: string;
  severity: AllergySeverity;
  onRemove?: () => void;
  className?: string;
}

export function AllergenTag({ name, severity, onRemove, className }: AllergenTagProps) {
  const severityColor = {
    mild: "bg-green-100 text-green-800 border-green-200",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    severe: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm border",
        severityColor[severity],
        className
      )}
    >
      <span>{name}</span>
      {onRemove && (
        <button 
          onClick={onRemove} 
          className="ml-2 rounded-full hover:bg-black/10 w-4 h-4 inline-flex items-center justify-center"
          aria-label={`Remove ${name}`}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7M1 7L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
