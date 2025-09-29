import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Star, Trophy, Crown, Zap, Target } from "lucide-react";
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";

const Bonuses = () => {
  const { user, addBonus } = useUser();
  const [bonusType, setBonusType] = useState("");
  const [bonusAmount, setBonusAmount] = useState("");
  const [bonusDesc, setBonusDesc] = useState("");

  const handleAddBonus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bonusType || !bonusAmount) return;
    addBonus({
      type: bonusType,
      amount: parseFloat(bonusAmount),
      date: new Date().toLocaleDateString(),
      description: bonusDesc,
    });
    setBonusType("");
    setBonusAmount("");
    setBonusDesc("");
  };

  // Calculate bonus summaries
  const totalBonuses = user.bonuses.reduce((sum, b) => sum + b.amount, 0);
  const thisMonthBonuses = user.bonuses.filter(b => new Date(b.date).getMonth() === new Date().getMonth()).reduce((sum, b) => sum + b.amount, 0);
  const milestoneBonuses = user.bonuses.filter(b => b.type.toLowerCase().includes("milestone")).reduce((sum, b) => sum + b.amount, 0);
  const specialRewards = user.bonuses.filter(b => b.type.toLowerCase().includes("special")).reduce((sum, b) => sum + b.amount, 0);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Bonuses & Rewards</h1>
              <p className="text-muted-foreground">
                Earn additional rewards through milestones, achievements, and special programs
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Bonus Earned</p>
              <p className="text-2xl font-bold text-success">{user.bonuses.length > 0 ? `$${totalBonuses.toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Bonus Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Total Bonuses"
              value={user.bonuses.length > 0 ? `$${totalBonuses.toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}
              icon={<Gift className="w-6 h-6 text-primary-foreground" />}
              variant="primary"
            />
            <MetricCard
              title="This Month"
              value={user.bonuses.length > 0 ? `$${thisMonthBonuses.toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}
              icon={<Star className="w-6 h-6 text-success-foreground" />}
              variant="success"
            />
            <MetricCard
              title="Milestone Bonuses"
              value={user.bonuses.length > 0 ? `$${milestoneBonuses.toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}
              icon={<Trophy className="w-6 h-6 text-purple-foreground" />}
              variant="purple"
            />
            <MetricCard
              title="Special Rewards"
              value={user.bonuses.length > 0 ? `$${specialRewards.toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}
              icon={<Crown className="w-6 h-6 text-orange-foreground" />}
              variant="orange"
            />
          </div>

          {/* Active Bonus Programs */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <CardTitle>Active Bonus Programs</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Current bonus opportunities available to you</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-primary">Team Building Bonus</h3>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Earn $100 for every 5 direct referrals who complete their first investment
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progress: 18/20</span>
                    <span className="font-bold text-primary">$400 Earned</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-success">Monthly Volume Bonus</h3>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get 2% bonus on team business volume above $10,000 per month
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Volume: $45,000</span>
                    <span className="font-bold text-success">$700 Potential</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-purple/10 border border-purple/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-purple">Leadership Bonus</h3>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reach Leader rank to unlock 5% bonus on all team earnings
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progress: 90%</span>
                    <span className="font-bold text-purple">$1,000 Reward</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-orange/10 border border-orange/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-orange">Loyalty Bonus</h3>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    1% bonus on all earnings for each month of consecutive activity
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Streak: 3 months</span>
                    <span className="font-bold text-orange">3% Bonus</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestone Achievements */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                <CardTitle>Milestone Achievements</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Special one-time bonuses for reaching major milestones</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Completed Milestones */}
                <div>
                  <h4 className="font-medium mb-3 text-success">✓ Completed Milestones</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-success" />
                        <p className="font-medium text-success">First Investment</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Complete your first investment</p>
                      <p className="font-bold text-success">$50 Earned</p>
                    </div>

                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-success" />
                        <p className="font-medium text-success">10 Referrals</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Refer 10 active users</p>
                      <p className="font-bold text-success">$200 Earned</p>
                    </div>

                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-4 h-4 text-success" />
                        <p className="font-medium text-success">Builder Rank</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Achieve Builder rank</p>
                      <p className="font-bold text-success">$250 Earned</p>
                    </div>
                  </div>
                </div>

                {/* Upcoming Milestones */}
                <div>
                  <h4 className="font-medium mb-3 text-primary">🎯 Upcoming Milestones</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-4 h-4 text-primary" />
                        <p className="font-medium text-primary">Leader Rank</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Progress: 90% complete</p>
                      <p className="font-bold text-primary">$500 Reward</p>
                    </div>

                    <div className="p-3 bg-purple/10 border border-purple/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-purple" />
                        <p className="font-medium text-purple">25 Referrals</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Progress: 18/25</p>
                      <p className="font-bold text-purple">$400 Reward</p>
                    </div>

                    <div className="p-3 bg-orange/10 border border-orange/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-orange" />
                        <p className="font-medium text-orange">$50K Team Business</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Progress: $45K/$50K</p>
                      <p className="font-bold text-orange">$750 Reward</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bonus History */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Bonus Payment History</CardTitle>
              <p className="text-sm text-muted-foreground">Your recent bonus payments and rewards</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.bonuses.length === 0 && <p className="text-muted-foreground">No bonuses yet.</p>}
                {user.bonuses.map((bonus, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{bonus.type}</p>
                      <p className="text-sm text-muted-foreground">{bonus.description || "-"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">+${bonus.amount.toLocaleString(undefined, {minimumFractionDigits:2})}</p>
                      <p className="text-xs text-muted-foreground">{bonus.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form className="mt-6 flex flex-col md:flex-row gap-2" onSubmit={handleAddBonus}>
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Bonus type (e.g. Milestone, Special)"
                  value={bonusType}
                  onChange={e => setBonusType(e.target.value)}
                  required
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Amount"
                  type="number"
                  min="1"
                  value={bonusAmount}
                  onChange={e => setBonusAmount(e.target.value)}
                  required
                />
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Description (optional)"
                  value={bonusDesc}
                  onChange={e => setBonusDesc(e.target.value)}
                />
                <Button type="submit" className="bg-gradient-success">Add Bonus</Button>
              </form>
            </CardContent>
          </Card>

          {/* Special Offers */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Special Offers</CardTitle>
              <p className="text-sm text-muted-foreground">Limited time bonus opportunities</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-primary/10 border border-primary rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">Weekend Warrior</h3>
                    <Badge variant="destructive">Limited Time</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Double referral commissions for all signups this weekend
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ends in: 2 days</span>
                    <Button size="sm" className="bg-gradient-primary">
                      Participate
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-success/10 to-orange/10 border border-success rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">March Madness</h3>
                    <Badge variant="secondary">Monthly Event</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Extra $50 bonus for every new referral who invests $1000+
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">March only</span>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bonuses;