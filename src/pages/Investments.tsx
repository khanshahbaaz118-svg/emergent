import { DashboardLayout } from "@/components/DashboardLayout";
import { InvestmentCard } from "@/components/InvestmentCard";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Plus, TrendingUp, Clock, CheckCircle, Star, Gem, Award, Crown } from "lucide-react";

const Investments = () => {
  const [amount, setAmount] = useState("");
  const [selectedSlab, setSelectedSlab] = useState<string | null>(null);
  const { user, addInvestment } = useUser();

  // Slab logic
  let slab = "";
  let slabLabel = "";
  let dailyReturn = 0;
  let roi = 0;
  let maxReturn = 0;
  const num = parseFloat(amount);
  if (!isNaN(num)) {
    if (num >= 100 && num <= 500) {
      slab = "slab1";
      slabLabel = "Slab 1";
      roi = 0.015;
      maxReturn = 2;
    } else if (num > 500 && num <= 2500) {
      slab = "slab2";
      slabLabel = "Slab 2";
      roi = 0.02;
      maxReturn = 2.5;
    } else if (num > 2500 && num <= 5000) {
      slab = "slab3";
      slabLabel = "Slab 3";
      roi = 0.025;
      maxReturn = 3;
    } else if (num > 5000) {
      slab = "slab4";
      slabLabel = "Slab 4";
      roi = 0.03;
      maxReturn = 4;
    }
    dailyReturn = num * roi;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slab) return;
    addInvestment({
      amount: parseFloat(amount),
      slab: slabLabel,
      status: "Active",
      progress: 0,
      dailyReturn: dailyReturn,
    });
    toast({
      title: "Investment Created",
      description: `You have invested $${amount} in ${slabLabel}`,
    });
    setAmount("");
  };
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Available Investment Slabs - themed card */}
        <div className="p-6">
          <div className="bg-card border-0 shadow-lg rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-1">Available Investment Slabs</h2>
              <p className="text-sm text-muted-foreground mb-6">Choose from different investment packages</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Slab Data */}
                {[
                  {
                    key: "slab1",
                    label: "Slab 1",
                    icon: <Star className="w-8 h-8 text-blue-500 mb-2" />, 
                    color: "bg-blue-100 text-blue-700",
                    roi: "1.50%",
                    range: "$100 - $500",
                    daily: "1.50%",
                    max: "2x",
                    min: 100,
                  },
                  {
                    key: "slab2",
                    label: "Slab 2",
                    icon: <Gem className="w-8 h-8 text-green-500 mb-2" />, 
                    color: "bg-green-100 text-green-700",
                    roi: "2.00%",
                    range: "$501 - $2,500",
                    daily: "2.00%",
                    max: "2.5x",
                    min: 501,
                  },
                  {
                    key: "slab3",
                    label: "Slab 3",
                    icon: <Award className="w-8 h-8 text-purple-500 mb-2" />, 
                    color: "bg-purple-100 text-purple-700",
                    roi: "2.50%",
                    range: "$2,501 - $5,000",
                    daily: "2.50%",
                    max: "3x",
                    min: 2501,
                  },
                  {
                    key: "slab4",
                    label: "Slab 4",
                    icon: <Crown className="w-8 h-8 text-orange-500 mb-2" />, 
                    color: "bg-orange-100 text-orange-700",
                    roi: "3.00%",
                    range: "$5,001 - No Limit",
                    daily: "3.00%",
                    max: "4x",
                    min: 5001,
                  },
                ].map((slab) => (
                  <button
                    key={slab.key}
                    type="button"
                    className={`transition-all bg-background border rounded-xl shadow p-6 flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 hover:shadow-xl gap-1
                      ${selectedSlab === slab.key ? 'ring-2 ring-primary border-primary' : 'border-border'}`}
                    onClick={() => {
                      setSelectedSlab(slab.key);
                      setAmount(slab.min.toString());
                    }}
                  >
                    <span className={`px-4 py-1 rounded-full font-semibold mb-2 ${slab.color}`}>{slab.label}</span>
                    {slab.icon}
                    <div className="text-2xl font-bold mb-1">{slab.roi}</div>
                    <div className="text-muted-foreground mb-2">{slab.range}</div>
                    <div className="flex flex-col gap-1 w-full text-sm">
                      <div className="flex justify-between"><span>Daily ROI:</span><span className="font-semibold">{slab.daily}</span></div>
                      <div className="flex justify-between"><span>Max Return:</span><span className="font-semibold">{slab.max}</span></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Header and New Investment Form */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Investment Portfolio</h1>
              <p className="text-muted-foreground">
                Manage your investments and track returns across different slabs
              </p>
            </div>
            {/* New Investment Form */}
            <form
              className="bg-card border border-border rounded-lg shadow p-6 flex flex-col gap-4 min-w-[320px] text-foreground"
              onSubmit={handleSubmit}
              style={{ maxWidth: 400 }}
            >
              <h2 className="text-lg font-semibold mb-2">Make New Investment</h2>
              <label className="block text-sm font-medium text-foreground">Investment Amount (USD)</label>
              <input
                type="number"
                className="w-full border border-border rounded px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter amount"
                min="0"
                required
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <div className="bg-muted rounded p-3 text-sm space-y-1 border border-border">
                <div>Investment: <span className="font-semibold">{amount ? `$${parseFloat(amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-'}</span></div>
                <div>Daily Return: <span className="font-semibold text-success">{slab ? `$${dailyReturn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-'}</span></div>
                <div>Expected Tier: <span className="font-semibold">{slabLabel || '-'}</span></div>
              </div>
              <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={!slab}>Invest Now</Button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Investment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Invested"
              value={user.investments.length > 0 ? `$${user.investments.reduce((sum, i) => sum + i.amount, 0).toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}
              icon={<DollarSign className="w-6 h-6 text-primary-foreground" />}
              variant="primary"
            />
            <MetricCard
              title="Total Returns"
              value={user.investments.length > 0 ? `$${user.investments.reduce((sum, i) => sum + (i.dailyReturn * i.progress), 0).toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}
              icon={<TrendingUp className="w-6 h-6 text-success-foreground" />}
              variant="success"
            />
            <MetricCard
              title="ROI Percentage"
              value={user.investments.length > 0 ? `${Math.round((user.investments.reduce((sum, i) => sum + (i.dailyReturn * i.progress), 0) / Math.max(1, user.investments.reduce((sum, i) => sum + i.amount, 0))) * 100)}%` : "0%"}
              icon={<CheckCircle className="w-6 h-6 text-purple-foreground" />}
              variant="purple"
            />
          </div>



          {/* Active Investments */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <CardTitle>Your Active Investments</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Track your current investment progress</p>
            </CardHeader>
            <CardContent>
              {user.investments.length === 0 ? (
                <div className="text-muted-foreground text-center py-8">No active investments yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.investments.map((inv, idx) => (
                    <InvestmentCard
                      key={idx}
                      amount={`$${inv.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                      slab={inv.slab}
                      status={inv.status as any}
                      progress={inv.progress}
                      dailyReturn={`$${inv.dailyReturn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Investment History */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Investment History</CardTitle>
              <p className="text-sm text-muted-foreground">Your completed and ongoing investments</p>
            </CardHeader>
            <CardContent>
              {user.investments.length === 0 ? (
                <div className="text-muted-foreground text-center py-8">No investment history yet.</div>
              ) : (
                <div className="space-y-3">
                  {user.investments.map((inv, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{inv.slab} Investment</p>
                        <p className="text-sm text-muted-foreground">Started: --</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${inv.amount.toLocaleString(undefined, {minimumFractionDigits:2})}</p>
                        <Badge variant={inv.status === 'Completed' ? 'secondary' : 'default'}>{inv.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Investments;