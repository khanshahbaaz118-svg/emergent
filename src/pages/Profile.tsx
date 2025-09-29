import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Shield, 
  Key, 
  Bell,
  Eye,
  Edit,
  Download
} from "lucide-react";

const Profile = () => {
  const { user } = useUser();
  // Example editable profile fields (expand as needed)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editMode, setEditMode] = useState(false);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl font-bold bg-gradient-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{firstName || "-"} {lastName || ""}</h1>
                <p className="text-muted-foreground">{user.salary.rank || "-"}  Member since -</p>
                <div className="flex items-center gap-2 mt-1">
                  {/* No badges shown: user.active and user.verified do not exist */}
                </div>
              </div>
            </div>
            <Button className="bg-gradient-primary text-primary-foreground" onClick={() => setEditMode(e => !e)}>
              <Edit className="w-4 h-4 mr-2" />
              {editMode ? "Save" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Personal Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} readOnly={!editMode} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} readOnly={!editMode} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Input id="email" value={email} readOnly={!editMode} onChange={e => setEmail(e.target.value)} />
                    <Badge variant="secondary" className="whitespace-nowrap">Verified</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Input id="phone" value={phone} readOnly={!editMode} onChange={e => setPhone(e.target.value)} />
                    <Badge variant="outline" className="whitespace-nowrap">Pending</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" value="January 15, 2024" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastLogin">Last Login</Label>
                  <Input id="lastLogin" value="March 5, 2024 - 10:30 AM" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investment Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">Total Invested</span>
                  <span className="font-bold text-success">${user.investments.reduce((sum, i) => sum + i.amount, 0).toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">Total Earned</span>
                  <span className="font-bold text-primary">${user.salary.totalEarned.toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">Daily Income</span>
                  <span className="font-bold text-success">${user.investments.reduce((sum, i) => sum + i.dailyReturn, 0).toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">ROI Percentage</span>
                  <span className="font-bold text-purple">{user.investments.length > 0 ? ((user.salary.totalEarned / user.investments.reduce((sum, i) => sum + i.amount, 0)) * 100).toFixed(0) : 0}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Referral Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Referral Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">Total Referrals</span>
                  <span className="font-bold text-primary">{user.referrals.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">Active Referrals</span>
                  <span className="font-bold text-success">{user.referrals.filter(r => r.active).length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">Team Business</span>
                  <span className="font-bold text-purple">${user.investments.reduce((sum, i) => sum + i.amount, 0).toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">Referral Earnings</span>
                  <span className="font-bold text-orange">${(user.referrals.length * 20).toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <CardTitle>Security Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-success">Enabled via Email</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Manage 2FA</Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Login Sessions</p>
                    <p className="text-sm text-muted-foreground">2 active sessions</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Sessions</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Investment Updates</p>
                  <p className="text-sm text-muted-foreground">Daily ROI payments and investment status</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Referral Notifications</p>
                  <p className="text-sm text-muted-foreground">New referrals and commission updates</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Rank Progress</p>
                  <p className="text-sm text-muted-foreground">Salary rank updates and achievements</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Promotional offers and platform updates</p>
                </div>
                <Badge variant="outline">Disabled</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Account Data
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Activity Log
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Settings
                </Button>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-2">
                <h4 className="font-medium text-destructive">Danger Zone</h4>
                <p className="text-sm text-muted-foreground">
                  These actions will permanently affect your account. Please proceed with caution.
                </p>
                <div className="flex gap-4 mt-4">
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    Suspend Account
                  </Button>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;