import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Crown, Star, Award, Users, DollarSign } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Salary = () => {
  const { user, updateSalary } = useUser();
  // Example: allow user to update salary rank
  const ranks = [
    { name: "Starter", requirement: "$500", salary: 25, color: "text-muted-foreground" },
    { name: "Builder", requirement: "$2,500", salary: 100, color: "text-primary" },
    { name: "Leader", requirement: "$10,000", salary: 500, color: "text-purple" },
    { name: "Manager", requirement: "$25,000", salary: 1500, color: "text-orange" },
    { name: "Director", requirement: "$50,000", salary: 3500, color: "text-success" },
    { name: "Executive", requirement: "$100,000", salary: 7500, color: "text-destructive" },
  ];
  const currentRankIndex = ranks.findIndex(r => r.name === user.salary.rank);
  const nextRank = ranks[currentRankIndex + 1];

  const promoteRank = () => {
    if (nextRank) {
      updateSalary({
        ...user.salary,
        rank: nextRank.name,
        amount: nextRank.salary,
        totalEarned: user.salary.totalEarned,
        nextPayment: "10 days",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Salary & Ranks</h1>
              <p className="text-muted-foreground">
                Track your rank progression and earn regular salary payments
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Rank</p>
              <p className="text-lg font-bold text-primary">{user.salary.rank}</p>
              <Badge variant="default" className="mt-1">Active</Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Rank Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Current Salary"
              value={user.salary.amount ? `$${user.salary.amount}` : "$0.00"}
              icon={<DollarSign className="w-6 h-6 text-primary-foreground" />}
              variant="primary"
            />
            <MetricCard
              title="Next Payment"
              value={user.salary.nextPayment || "-"}
              icon={<TrendingUp className="w-6 h-6 text-success-foreground" />}
              variant="success"
            />
            <MetricCard
              title="Total Earned"
              value={user.salary.totalEarned ? `$${user.salary.totalEarned}` : "$0.00"}
              icon={<Star className="w-6 h-6 text-purple-foreground" />}
              variant="purple"
            />
            <MetricCard
              title="Team Business"
              value={user.investments.length > 0 ? `$${user.investments.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}` : "$0.00"}
              icon={<Users className="w-6 h-6 text-orange-foreground" />}
              variant="orange"
            />
          </div>

          {/* Current Rank Progress */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                <CardTitle>Rank Progression</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Your progress towards the next salary rank</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Rank</p>
                  <p className="text-xl font-bold text-primary">{user.salary.rank}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Next Rank</p>
                  <p className="text-xl font-bold text-purple">{nextRank ? nextRank.name : "-"}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Self Business</span>
                    <span className="font-bold">${user.investments.reduce((sum, i) => sum + i.amount, 0)} / $2,500</span>
                  </div>
                  <ProgressBar value={100} variant="success" />
                  <p className="text-xs text-success mt-1">✓ Requirement met</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Team Business</span>
                    <span className="font-bold">${user.investments.reduce((sum, i) => sum + i.amount, 0)} / $50,000</span>
                  </div>
                  <ProgressBar value={90} variant="purple" />
                  <p className="text-xs text-muted-foreground mt-1">90% complete - $5,000 remaining</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Current Salary</p>
                  <p className="text-lg font-bold">${user.salary.amount}</p>
                  <p className="text-xs text-muted-foreground">per 10 days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Rank Salary</p>
                  <p className="text-lg font-bold text-purple">{nextRank ? `$${nextRank.salary}` : "-"}</p>
                  <p className="text-xs text-muted-foreground">per 10 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rank Structure */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Rank Structure</CardTitle>
              <p className="text-sm text-muted-foreground">Complete overview of all available ranks and their benefits</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ranks.map((rank, index) => (
                  <div
                    key={rank.name}
                    className={`p-4 rounded-lg border ${user.salary.rank === rank.name ? 'border-primary bg-primary/5' : 'border-border'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-accent flex items-center justify-center`}>
                          {index === 0 && <Star className="w-5 h-5" />}
                          {index === 1 && <Award className="w-5 h-5" />}
                          {index === 2 && <Crown className="w-5 h-5" />}
                          {index === 3 && <TrendingUp className="w-5 h-5" />}
                          {index === 4 && <Users className="w-5 h-5" />}
                          {index === 5 && <DollarSign className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className={`font-bold ${rank.color}`}>{rank.name}</p>
                          <p className="text-sm text-muted-foreground">Requirement: {rank.requirement}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${rank.color}`}>{`$${rank.salary}`}</p>
                        <p className="text-xs text-muted-foreground">per 10 days</p>
                        {user.salary.rank === rank.name && (
                          <Badge variant="default" className="mt-1">Current</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <Button onClick={promoteRank} disabled={!nextRank} className="bg-gradient-primary">Promote to Next Rank</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salary Payment History */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Salary Payment History</CardTitle>
              <p className="text-sm text-muted-foreground">Your recent salary payments and bonuses</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{user.salary.rank} Salary</p>
                    <p className="text-sm text-muted-foreground">Period: Last 10 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">+${user.salary.amount}</p>
                    <p className="text-xs text-muted-foreground">Paid</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Milestones */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Achievement Milestones</CardTitle>
              <p className="text-sm text-muted-foreground">Special bonuses for reaching milestones</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-success" />
                    <p className="font-bold text-success">First Investment</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Complete your first investment</p>
                  <p className="font-bold text-success">✓ Completed - $50 Bonus</p>
                </div>
                
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <p className="font-bold text-primary">10 Referrals</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Refer 10 active users</p>
                  <p className="font-bold text-primary">✓ Completed - $200 Bonus</p>
                </div>
                
                <div className="p-4 bg-muted border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-muted-foreground" />
                    <p className="font-bold text-muted-foreground">Leader Rank</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Reach Leader rank</p>
                  <p className="font-bold text-muted-foreground">90% Progress - $500 Bonus</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Salary;