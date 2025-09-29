import { Card, CardContent } from "@/components/ui/card";

interface ActivityItemProps {
  title: string;
  description: string;
  amount: string;
  time: string;
  type: "positive" | "neutral";
}

export function ActivityItem({ title, description, amount, time, type }: ActivityItemProps) {
  const amountColor = type === "positive" ? "text-success" : "text-foreground";
  
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="text-right space-y-1">
            <p className={`font-bold ${amountColor}`}>{amount}</p>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}