"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  SettingsIcon,
  User,
  Shield,
  Bell,
  Download,
  Trash2,
  Eye,
  Users,
  Heart,
  MessageCircle,
  BookOpen,
  Smartphone,
  Mail,
  Lock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const familyMembers = [
  { id: "sarah", name: "Sarah", role: "Mom", avatar: "👩‍💼" },
  { id: "david", name: "David", role: "Dad", avatar: "👨‍💼" },
  { id: "emma", name: "Emma", role: "Daughter", avatar: "👧" },
  { id: "jake", name: "Jake", role: "Son", avatar: "👦" },
]

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [settings, setSettings] = useState({
    // Profile settings
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Parent",
    bio: "Loving mother of two, passionate about family wellness",

    // Privacy settings
    moodVisibility: {
      sarah: true,
      david: true,
      emma: true,
      jake: false,
    },
    journalSharing: true,
    trustGraphVisibility: true,

    // Notification settings
    nudgeNotifications: true,
    moodReminders: true,
    familyActivity: true,
    crisisAlerts: true,
    emailNotifications: false,
    pushNotifications: true,

    // Data settings
    dataSharing: true,
    analytics: true,
    aiInsights: true,
  })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showDataExport, setShowDataExport] = useState(false)

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const updateMoodVisibility = (memberId: string, visible: boolean) => {
    setSettings((prev) => ({
      ...prev,
      moodVisibility: {
        ...prev.moodVisibility,
        [memberId]: visible,
      },
    }))
  }

  const handleExportData = () => {
    // Simulate data export
    const data = {
      profile: { name: settings.name, email: settings.email },
      moodData: "Sample mood tracking data...",
      journalEntries: "Sample journal entries...",
      familyConnections: "Sample trust graph data...",
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "famwell-data-export.json"
    a.click()
    URL.revokeObjectURL(url)
    setShowDataExport(false)
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "data", label: "Data & Export", icon: Download },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card className="famwell-card border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-serif">
              <SettingsIcon className="w-6 h-6 text-purple-600" />
              Settings & Privacy
            </CardTitle>
            <CardDescription className="text-base">
              Manage your account, privacy preferences, and data settings
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="famwell-card">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                        activeTab === tab.id ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and family role</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl text-white">
                        👩‍💼
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{settings.name}</h3>
                        <p className="text-gray-600">{settings.role}</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          Change Avatar
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={settings.name}
                          onChange={(e) => updateSetting("name", e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.email}
                          onChange={(e) => updateSetting("email", e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell your family a bit about yourself..."
                        value={settings.bio}
                        onChange={(e) => updateSetting("bio", e.target.value)}
                        className="rounded-xl"
                        rows={3}
                      />
                    </div>

                    <Button className="famwell-gradient text-white">Save Changes</Button>
                  </CardContent>
                </Card>

                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Family Role</CardTitle>
                    <CardDescription>Your role determines what features and permissions you have</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-purple-900">Parent/Guardian</h4>
                        <p className="text-sm text-purple-700">Full access to all family data and settings</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Current Role</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Mood Visibility</CardTitle>
                    <CardDescription>Choose which family members can see your mood updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {familyMembers
                      .filter((m) => m.id !== "sarah")
                      .map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{member.avatar}</span>
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-600">{member.role}</div>
                            </div>
                          </div>
                          <Switch
                            checked={settings.moodVisibility[member.id as keyof typeof settings.moodVisibility]}
                            onCheckedChange={(checked) => updateMoodVisibility(member.id, checked)}
                          />
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Content Sharing</CardTitle>
                    <CardDescription>Control what content you share with your family</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-medium text-gray-900">Journal Entries</div>
                          <div className="text-sm text-gray-600">Allow family to see shared journal entries</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.journalSharing}
                        onCheckedChange={(checked) => updateSetting("journalSharing", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">Trust Graph</div>
                          <div className="text-sm text-gray-600">Show your connections in the family trust graph</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.trustGraphVisibility}
                        onCheckedChange={(checked) => updateSetting("trustGraphVisibility", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="famwell-card border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900 mb-1">Privacy Protection</h4>
                        <p className="text-sm text-yellow-800">
                          Your private journal entries and personal data are always encrypted and secure. Only you can
                          decide what to share with your family.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Smart Nudges</CardTitle>
                    <CardDescription>Control when and how you receive AI-powered family nudges</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-red-500" />
                        <div>
                          <div className="font-medium text-gray-900">Nudge Notifications</div>
                          <div className="text-sm text-gray-600">Receive suggestions to check on family members</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.nudgeNotifications}
                        onCheckedChange={(checked) => updateSetting("nudgeNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium text-gray-900">Family Activity</div>
                          <div className="text-sm text-gray-600">Get notified about family member activities</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.familyActivity}
                        onCheckedChange={(checked) => updateSetting("familyActivity", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Wellness Reminders</CardTitle>
                    <CardDescription>Set up reminders for your mental wellness activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-pink-500" />
                        <div>
                          <div className="font-medium text-gray-900">Daily Mood Check-ins</div>
                          <div className="text-sm text-gray-600">Remind me to log my daily mood</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.moodReminders}
                        onCheckedChange={(checked) => updateSetting("moodReminders", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Delivery Methods</CardTitle>
                    <CardDescription>Choose how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-gray-900">Push Notifications</div>
                          <div className="text-sm text-gray-600">Receive notifications on your device</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">Email Notifications</div>
                          <div className="text-sm text-gray-600">Receive weekly summaries via email</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="famwell-card border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <div>
                          <div className="font-medium text-red-900">Crisis Alerts</div>
                          <div className="text-sm text-red-700">Always receive emergency notifications</div>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">Always On</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Data Tab */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Data Sharing</CardTitle>
                    <CardDescription>Control how your data is used to improve FamWell</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-gray-900">Anonymous Analytics</div>
                          <div className="text-sm text-gray-600">Help improve FamWell with anonymous usage data</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.analytics}
                        onCheckedChange={(checked) => updateSetting("analytics", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">AI Insights</div>
                          <div className="text-sm text-gray-600">
                            Allow AI to analyze patterns for better suggestions
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.aiInsights}
                        onCheckedChange={(checked) => updateSetting("aiInsights", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="famwell-card">
                  <CardHeader>
                    <CardTitle>Export Your Data</CardTitle>
                    <CardDescription>Download a copy of all your FamWell data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">What's included:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Profile information and settings</li>
                        <li>• Mood tracking data and trends</li>
                        <li>• Journal entries (private and shared)</li>
                        <li>• Family connection data</li>
                        <li>• Wellness activity history</li>
                      </ul>
                    </div>

                    <Button onClick={() => setShowDataExport(true)} variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download My Data
                    </Button>
                  </CardContent>
                </Card>

                <Card className="famwell-card border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-900">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions that affect your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                      <p className="text-sm text-red-700 mb-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button onClick={() => setShowDeleteConfirm(true)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2">Reset Mood History</h4>
                      <p className="text-sm text-yellow-700 mb-3">
                        Clear all your mood tracking data while keeping your account active.
                      </p>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Reset Mood Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Data Export Modal */}
        {showDataExport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="famwell-card w-full max-w-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Export Your Data</CardTitle>
                <CardDescription>Your data will be downloaded as a JSON file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Ready to Export</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Your data export includes all personal information, mood data, journal entries, and family
                    connections.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleExportData} className="famwell-gradient text-white flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
                  </Button>
                  <Button variant="outline" onClick={() => setShowDataExport(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="famwell-card w-full max-w-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-red-900">Delete Account</CardTitle>
                <CardDescription>
                  This action cannot be undone. All your data will be permanently deleted.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">This will permanently delete:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Your profile and account information</li>
                    <li>• All mood tracking data and history</li>
                    <li>• Private and shared journal entries</li>
                    <li>• Family connections and trust graph data</li>
                    <li>• Wellness activities and achievements</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="confirm-delete" className="text-sm font-medium">
                    Type "DELETE" to confirm:
                  </Label>
                  <Input id="confirm-delete" placeholder="DELETE" className="rounded-xl mt-2" />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    className="flex-1"
                    disabled={true} // Would be enabled when user types "DELETE"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Forever
                  </Button>
                  <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
