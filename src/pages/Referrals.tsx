import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Users, DollarSign, TrendingUp, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";

const Referrals = () => {
  const { user, addReferral } = useUser();
  const [newReferralName, setNewReferralName] = useState("");
  const referralCode = "ODEFI2025";
  const referralLink = `https://odefi.com/signup?ref=${referralCode}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const handleAddReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReferralName) return;
    addReferral({
      id: Math.random().toString(36).slice(2),
      name: newReferralName,
      joined: new Date().toLocaleDateString(),
      active: true,
    });
    toast.success("Referral added!");
    setNewReferralName("");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Referral Program</h1>
              <p className="text-muted-foreground">
                Earn commissions by inviting others to join the platform
              </p>
            </div>
            <Button className="bg-gradient-primary text-primary-foreground">
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Referral Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Total Referrals"
              value={user.referrals.length > 0 ? user.referrals.length.toString() : "0"}
              icon={<Users className="w-6 h-6 text-primary-foreground" />}
              variant="primary"
            />
            <MetricCard
              title="Active Referrals"
              value={user.referrals.length > 0 ? user.referrals.filter(r => r.active).length.toString() : "0"}
              icon={<UserPlus className="w-6 h-6 text-success-foreground" />}
              variant="success"
            />
            <MetricCard
              title="Referral Earnings"
              value={user.referrals.length > 0 ? `$${(user.referrals.length * 20).toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}
              icon={<DollarSign className="w-6 h-6 text-purple-foreground" />}
              variant="purple"
            />
            <MetricCard
              title="This Month"
              value={user.referrals.length > 0 ? `$${(user.referrals.length * 5).toLocaleString(undefined, {minimumFractionDigits:2})}` : "$0.00"}
              icon={<TrendingUp className="w-6 h-6 text-orange-foreground" />}
              variant="orange"
            />
          </div>

          {/* Referral Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Referral Code & Link */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Referral Tools</CardTitle>
                <p className="text-sm text-muted-foreground">Share these with potential referrals</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Referral Code</label>
                  <div className="flex gap-2">
                    <Input value={referralCode} readOnly className="font-mono" />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(referralCode, "Referral code")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Referral Link</label>
                  <div className="flex gap-2">
                    <Input value={referralLink} readOnly className="text-xs" />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(referralLink, "Referral link")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <form className="pt-4 flex gap-2" onSubmit={handleAddReferral}>
                  <Input
                    placeholder="New referral name"
                    value={newReferralName}
                    onChange={e => setNewReferralName(e.target.value)}
                  />
                  <Button type="submit" className="bg-gradient-success">Add Referral</Button>
                </form>
              </CardContent>
            </Card>

            {/* Commission Structure */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Commission Structure</CardTitle>
                <p className="text-sm text-muted-foreground">Earn cascading rewards from your network</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <p className="font-medium">Level 1 (Direct)</p>
                      <p className="text-sm text-muted-foreground">Your direct referrals</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">10%</p>
                      <p className="text-xs text-muted-foreground">Commission</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <p className="font-medium">Level 2</p>
                      <p className="text-sm text-muted-foreground">Referrals of referrals</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">5%</p>
                      <p className="text-xs text-muted-foreground">Commission</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <p className="font-medium">Level 3</p>
                      <p className="text-sm text-muted-foreground">Third level referrals</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple">3%</p>
                      <p className="text-xs text-muted-foreground">Commission</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Network */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Your Referral Network</CardTitle>
              <p className="text-sm text-muted-foreground">Track your referral tree and earnings</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Level 1 Referrals */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Level 1 - Direct Referrals ({user.referrals.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {user.referrals.map((ref) => (
                      <div key={ref.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{ref.name}</p>
                            <p className="text-xs text-muted-foreground">Joined {ref.joined}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={ref.active ? "default" : "secondary"} className="text-xs">{ref.active ? "Active" : "Inactive"}</Badge>
                            <p className="text-xs text-success mt-1">+${(ref.active ? 20 : 0).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Level 2 Referrals */}
                <div className="pt-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Level 2 - Indirect Referrals (8)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((ref) => (
                      <div key={ref} className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">User{(ref + 20).toString().padStart(3, '0')}</p>
                            <p className="text-xs text-muted-foreground">Feb {ref + 20}, 2024</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-xs">Active</Badge>
                            <p className="text-xs text-primary mt-1">+$7.75</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Referral Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Referral Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Latest referral actions and earnings</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.referrals.slice(0, 3).map((ref) => (
                  <div key={ref.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">New Referral Signup</p>
                      <p className="text-sm text-muted-foreground">{ref.name} joined via your link</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">+${(ref.active ? 20 : 0).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{ref.joined}</p>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Level 2 Commission</p>
                    <p className="text-sm text-muted-foreground">User015's referral invested</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">+$12.50</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Direct Referral ROI</p>
                    <p className="text-sm text-muted-foreground">Daily commission from User022</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">+$5.00</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
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

export default Referrals;