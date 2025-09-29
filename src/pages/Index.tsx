import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { InvestmentCard } from "@/components/InvestmentCard";
import { ActivityItem } from "@/components/ActivityItem";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Award,
  Activity,
  BarChart3,
  User
} from "lucide-react";
import { useUser } from "@/context/UserContext";

const Index = () => {
  const { user } = useUser();

  // Metrics
  const totalInvestment = user.investments.reduce((sum, i) => sum + i.amount, 0);
  const dailyIncome = user.investments.reduce((sum, i) => sum + i.dailyReturn, 0);
  const teamBusiness = user.investments.reduce((sum, i) => sum + i.amount, 0); // Placeholder, adjust if you have team logic
  const totalEarnings = user.salary.totalEarned + user.bonuses.reduce((sum, b) => sum + b.amount, 0);

  // Daily Income Breakdown
  const investmentROI = dailyIncome;
  const referralIncome = user.referrals.length * 1; // Example: $1 per referral per day
  const totalDailyIncome = investmentROI + referralIncome;
  const investmentROIPercent = totalDailyIncome > 0 ? (investmentROI / totalDailyIncome) * 100 : 0;
  const referralIncomePercent = totalDailyIncome > 0 ? (referralIncome / totalDailyIncome) * 100 : 0;
  const monthlyProjection = totalDailyIncome * 30;
  const yearlyProjection = totalDailyIncome * 365;

  // Rank Progress
  const currentRank = user.salary.rank || "-";
  const nextRank = "-"; // You can compute next rank if you have a rank system
  const currentSalary = user.salary.amount || 0;
  const bonusesEarned = user.bonuses.reduce((sum, b) => sum + b.amount, 0);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to ODEFI</h1>
              <p className="text-muted-foreground">
                Your comprehensive investment platform with daily returns, cascading referrals, salary ranks, and milestone bonuses.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="text-lg font-bold">-</p>
              <p className="text-sm text-primary">{currentRank}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Investment"
              value={`$${totalInvestment.toLocaleString(undefined, {minimumFractionDigits:2})}`}
              icon={<DollarSign className="w-6 h-6 text-primary-foreground" />}
              variant="primary"
            />
            <MetricCard
              title="Daily Income"
              value={`$${dailyIncome.toLocaleString(undefined, {minimumFractionDigits:2})}`}
              icon={<TrendingUp className="w-6 h-6 text-success-foreground" />}
              variant="success"
            />
            <MetricCard
              title="Team Business"
              value={`$${teamBusiness.toLocaleString(undefined, {minimumFractionDigits:2})}`}
              icon={<Users className="w-6 h-6 text-purple-foreground" />}
              variant="purple"
            />
            <MetricCard
              title="Total Earnings"
              value={`$${totalEarnings.toLocaleString(undefined, {minimumFractionDigits:2})}`}
              icon={<Award className="w-6 h-6 text-orange-foreground" />}
              variant="orange"
            />
          </div>

          {/* Income Breakdown and Rank Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Income Breakdown */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-success" />
                  <CardTitle>Daily Income Breakdown</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Your daily earnings from different sources</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-success">{`$${totalDailyIncome.toLocaleString(undefined, {minimumFractionDigits:2})}`}</p>
                  <p className="text-sm text-muted-foreground">Total Daily Income</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Investment ROI</span>
                      <span className="font-bold">{`$${investmentROI.toLocaleString(undefined, {minimumFractionDigits:2})}`}</span>
                    </div>
                    <ProgressBar value={investmentROIPercent} variant="success" />
                    <p className="text-xs text-muted-foreground mt-1">{investmentROIPercent.toFixed(1)}% of total</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Referral Income</span>
                      <span className="font-bold">{`$${referralIncome.toLocaleString(undefined, {minimumFractionDigits:2})}`}</span>
                    </div>
                    <ProgressBar value={referralIncomePercent} variant="primary" />
                    <p className="text-xs text-muted-foreground mt-1">{referralIncomePercent.toFixed(1)}% of total</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Projection</p>
                    <p className="text-lg font-bold">{`$${monthlyProjection.toLocaleString(undefined, {minimumFractionDigits:2})}`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Yearly Projection</p>
                    <p className="text-lg font-bold">{`$${yearlyProjection.toLocaleString(undefined, {minimumFractionDigits:2})}`}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rank Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple" />
                  <CardTitle>Rank Progress</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Your progress towards the next salary rank</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Rank</p>
                    <p className="text-lg font-bold text-primary">{currentRank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Next Rank</p>
                    <p className="text-lg font-bold text-purple">{nextRank}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Self Business</span>
                      <span className="font-bold">0%</span>
                    </div>
                    <ProgressBar value={0} variant="success" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Team Business</span>
                      <span className="font-bold">0%</span>
                    </div>
                    <ProgressBar value={0} variant="purple" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Salary</p>
                    <p className="text-lg font-bold">{`$${currentSalary.toLocaleString(undefined, {minimumFractionDigits:2})}`}</p>
                    <p className="text-xs text-muted-foreground">per 10 days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bonuses Earned</p>
                    <p className="text-lg font-bold">{`$${bonusesEarned.toLocaleString(undefined, {minimumFractionDigits:2})}`}</p>
                    <p className="text-xs text-muted-foreground">total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Investments */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-success" />
                <CardTitle>Active Investments</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Overview of your current investment portfolio</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.investments.length === 0 ? (
                  <div className="text-muted-foreground text-center py-8 col-span-3">No active investments yet.</div>
                ) : (
                  user.investments.map((inv, idx) => (
                    <InvestmentCard
                      key={idx}
                      amount={`$${inv.amount.toLocaleString(undefined, {minimumFractionDigits:2})}`}
                      slab={inv.slab}
                      status={inv.status}
                      progress={inv.progress}
                      dailyReturn={`$${inv.dailyReturn.toLocaleString(undefined, {minimumFractionDigits:2})}`}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <CardTitle>Recent Activity</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Your latest platform activity and earnings</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Example: Show last 5 investments as activity */}
                {user.investments.length === 0 ? (
                  <div className="text-muted-foreground text-center py-8">No recent activity yet.</div>
                ) : (
                  user.investments.slice(-5).reverse().map((inv, idx) => (
                    <ActivityItem
                      key={idx}
                      title="Investment Added"
                      description={`Invested in ${inv.slab}`}
                      amount={`+$${inv.amount.toLocaleString(undefined, {minimumFractionDigits:2})}`}
                      time="Recent"
                      type="positive"
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
