import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  variant?: "primary" | "success" | "purple" | "orange";
  className?: string;
}

export function MetricCard({ title, value, icon, variant = "primary", className }: MetricCardProps) {
  const variantStyles = {
    primary: "bg-gradient-primary",
    success: "bg-gradient-success", 
    purple: "bg-gradient-purple",
    orange: "bg-gradient-orange"
  };

  return (
    <Card className={cn("border-0 shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            variantStyles[variant]
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}