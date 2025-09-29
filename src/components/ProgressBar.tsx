import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  variant?: "primary" | "success" | "purple" | "orange";
}

export function ProgressBar({ value, max = 100, className, variant = "primary" }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantStyles = {
    primary: "bg-primary",
    success: "bg-success",
    purple: "bg-purple",
    orange: "bg-orange"
  };

  return (
    <div className={cn("w-full bg-muted rounded-full h-2", className)}>
      <div
        className={cn("h-2 rounded-full transition-all duration-300", variantStyles[variant])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}