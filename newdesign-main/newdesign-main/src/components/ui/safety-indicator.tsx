
import { cn } from "@/lib/utils";
import { SafetyStatus } from "@/contexts/AllergyDataContext";
import { AlertCircle, Check, AlertTriangle } from "lucide-react";

interface SafetyIndicatorProps {
  status: SafetyStatus;
  className?: string;
  showText?: boolean;
}

export function SafetyIndicator({ status, className, showText = true }: SafetyIndicatorProps) {
  const statusConfig = {
    safe: {
      color: "text-green-600 bg-green-50 border-green-200",
      icon: Check,
      text: "Safe",
    },
    "may-contain": {
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      icon: AlertTriangle,
      text: "May Contain",
    },
    dangerous: {
      color: "text-red-600 bg-red-50 border-red-200",
      icon: AlertCircle,
      text: "Dangerous",
    },
  };

  const { color, icon: Icon, text } = statusConfig[status];

  return (
    <div className={cn("flex items-center gap-2 px-3 py-2 border rounded-md", color, className)}>
      <Icon size={16} className="flex-shrink-0" />
      {showText && <span className="text-sm font-medium">{text}</span>}
    </div>
  );
}
