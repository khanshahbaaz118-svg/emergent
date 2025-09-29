import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "./ProgressBar";

interface InvestmentCardProps {
  amount: string;
  slab: string;
  status: "Active" | "Completed" | "Pending";
  progress: number;
  dailyReturn: string;
}

export function InvestmentCard({ amount, slab, status, progress, dailyReturn }: InvestmentCardProps) {
  const statusVariant = status === "Active" ? "default" : status === "Completed" ? "secondary" : "outline";
  
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{amount}</CardTitle>
          <Badge variant={statusVariant} className="bg-accent">
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{slab}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <ProgressBar value={progress} variant="success" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">Daily Return:</span>
          <span className="font-bold text-success">{dailyReturn}</span>
        </div>
      </CardContent>
    </Card>
  );
}