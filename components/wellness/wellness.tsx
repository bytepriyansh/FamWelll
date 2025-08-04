"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Star,
  Target,
  Users,
  Heart,
  BookOpen,
  MessageCircle,
  Award,
  Flame,
  Crown,
  Medal,
  Gift,
  TrendingUp,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const familyMembers = [
  {
    id: "sarah",
    name: "Sarah",
    avatar: "👩‍💼",
    points: 1250,
    level: 8,
    badges: ["Empathizer", "Streak Keeper", "Kind Soul"],
    weeklyGoal: 200,
    weeklyProgress: 180,
  },
  {
    id: "emma",
    name: "Emma",
    avatar: "👧",
    points: 980,
    level: 6,
    badges: ["Journal Master", "Mood Tracker"],
    weeklyGoal: 150,
    weeklyProgress: 165,
  },
  {
    id: "david",
    name: "David",
    avatar: "👨‍💼",
    points: 750,
    level: 5,
    badges: ["Supporter", "Check-in Champion"],
    weeklyGoal: 120,
    weeklyProgress: 95,
  },
  {
    id: "jake",
    name: "Jake",
    avatar: "👦",
    points: 650,
    level: 4,
    badges: ["Rising Star"],
    weeklyGoal: 100,
    weeklyProgress: 85,
  },
]

const challenges = [
  {
    id: 1,
    title: "Weekly Kindness Challenge",
    description: "Send 5 encouraging messages to family members",
    progress: 3,
    target: 5,
    points: 50,
    timeLeft: "3 days",
    type: "weekly",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: 2,
    title: "Daily Journal Streak",
    description: "Write in your journal for 7 consecutive days",
    progress: 5,
    target: 7,
    points: 75,
    timeLeft: "2 days",
    type: "streak",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 3,
    title: "Family Connection",
    description: "Have meaningful conversations with each family member",
    progress: 2,
    target: 4,
    points: 100,
    timeLeft: "5 days",
    type: "social",
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 4,
    title: "Mood Check-in Master",
    description: "Complete daily mood check-ins for a week",
    progress: 7,
    target: 7,
    points: 60,
    timeLeft: "Completed!",
    type: "completed",
    icon: Target,
    color: "bg-green-100 text-green-800",
  },
]

const badges = [
  { name: "Empathizer", description: "Sent 50+ supportive messages", icon: "💝", rarity: "rare" },
  { name: "Streak Keeper", description: "Maintained 30-day activity streak", icon: "🔥", rarity: "epic" },
  { name: "Kind Soul", description: "Received 100+ positive reactions", icon: "😇", rarity: "rare" },
  { name: "Journal Master", description: "Written 50+ journal entries", icon: "📖", rarity: "rare" },
  { name: "Mood Tracker", description: "Completed 100+ mood check-ins", icon: "📊", rarity: "common" },
  { name: "Supporter", description: "Helped family members 25+ times", icon: "🤝", rarity: "common" },
  { name: "Check-in Champion", description: "Never missed a daily check-in", icon: "✅", rarity: "rare" },
  { name: "Rising Star", description: "Earned first 500 points", icon: "⭐", rarity: "common" },
]

const activities = [
  { action: "Daily mood check-in", points: 10, icon: Heart },
  { action: "Journal entry", points: 15, icon: BookOpen },
  { action: "Send encouraging message", points: 20, icon: MessageCircle },
  { action: "Complete family challenge", points: 50, icon: Trophy },
  { action: "Help family member", points: 25, icon: Users },
  { action: "Share gratitude", points: 15, icon: Star },
]

export function Wellness() {
  const [selectedMember, setSelectedMember] = useState(familyMembers[0])
  const [activeTab, setActiveTab] = useState("challenges")

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100
    if (percentage >= 100) return "bg-green-500"
    if (percentage >= 75) return "bg-blue-500"
    if (percentage >= 50) return "bg-yellow-500"
    return "bg-gray-300"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card className="famwell-card border-none shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Family Wellness Hub
                </CardTitle>
                <CardDescription className="text-base">
                  Gamified wellness activities and family challenges
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-lg font-semibold">7 day streak!</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Family Leaderboard */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Family Leaderboard
                </CardTitle>
                <CardDescription>This week's wellness champions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyMembers
                    .sort((a, b) => b.points - a.points)
                    .map((member, index) => (
                      <div
                        key={member.id}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                          selectedMember.id === member.id
                            ? "bg-purple-50 border-2 border-purple-200"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedMember(member)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              index === 0
                                ? "bg-yellow-100 text-yellow-800"
                                : index === 1
                                  ? "bg-gray-100 text-gray-800"
                                  : index === 2
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-2xl">{member.avatar}</span>
                          <div>
                            <div className="font-semibold text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">Level {member.level}</div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Weekly Progress</span>
                            <span className="text-sm font-medium">
                              {member.weeklyProgress}/{member.weeklyGoal} pts
                            </span>
                          </div>
                          <Progress value={(member.weeklyProgress / member.weeklyGoal) * 100} className="h-2" />
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">{member.points}</div>
                          <div className="text-xs text-gray-500">total points</div>
                        </div>

                        <div className="flex gap-1">
                          {member.badges.slice(0, 3).map((badge, idx) => {
                            const badgeInfo = badges.find((b) => b.name === badge)
                            return (
                              <div key={idx} className="text-lg" title={badge}>
                                {badgeInfo?.icon}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: "challenges", label: "Challenges", icon: Target },
                { id: "badges", label: "Badges", icon: Award },
                { id: "activities", label: "Activities", icon: TrendingUp },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2"
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Challenges Tab */}
            {activeTab === "challenges" && (
              <div className="grid md:grid-cols-2 gap-4">
                {challenges.map((challenge) => {
                  const IconComponent = challenge.icon
                  const isCompleted = challenge.progress >= challenge.target

                  return (
                    <Card key={challenge.id} className={`famwell-card ${isCompleted ? "ring-2 ring-green-300" : ""}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${challenge.color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <Badge className={isCompleted ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                            {challenge.points} pts
                          </Badge>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {challenge.progress}/{challenge.target}
                            </span>
                          </div>
                          <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{challenge.timeLeft}</span>
                          {isCompleted && (
                            <div className="flex items-center gap-1 text-green-600">
                              <Medal className="w-4 h-4" />
                              <span className="text-sm font-medium">Completed!</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Badges Tab */}
            {activeTab === "badges" && (
              <div className="grid md:grid-cols-3 gap-4">
                {badges.map((badge, index) => {
                  const isEarned = selectedMember.badges.includes(badge.name)

                  return (
                    <Card
                      key={index}
                      className={`famwell-card transition-all ${
                        isEarned ? `border-2 ${getRarityColor(badge.rarity)}` : "opacity-50 grayscale"
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{badge.icon}</div>
                        <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                        <Badge
                          className={
                            badge.rarity === "common"
                              ? "bg-gray-100 text-gray-800"
                              : badge.rarity === "rare"
                                ? "bg-blue-100 text-blue-800"
                                : badge.rarity === "epic"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {badge.rarity}
                        </Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === "activities" && (
              <Card className="famwell-card">
                <CardHeader>
                  <CardTitle>Earn Points Through Activities</CardTitle>
                  <CardDescription>Complete these activities to earn wellness points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <activity.icon className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-medium text-gray-900">{activity.action}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">+{activity.points} pts</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Member Details */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selectedMember.avatar}</span>
                  {selectedMember.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{selectedMember.points}</div>
                  <div className="text-sm text-gray-500">Total Points</div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Level</span>
                  <Badge className="bg-blue-100 text-blue-800">{selectedMember.level}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Weekly Goal</span>
                    <span className="font-medium">
                      {selectedMember.weeklyProgress}/{selectedMember.weeklyGoal}
                    </span>
                  </div>
                  <Progress value={(selectedMember.weeklyProgress / selectedMember.weeklyGoal) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Earned Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.badges.map((badgeName, idx) => {
                      const badge = badges.find((b) => b.name === badgeName)
                      return (
                        <div key={idx} className="flex items-center gap-1 text-xs bg-gray-100 rounded-full px-2 py-1">
                          <span>{badge?.icon}</span>
                          <span>{badgeName}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-600" />
                  Special Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
                  <div className="text-2xl mb-2">🏆</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Family Unity Week</h3>
                  <p className="text-sm text-gray-600 mb-3">Work together to earn 1000 family points this week</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">750/1000</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 mt-2">250 pts bonus reward</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Emma earned "Journal Master" badge</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Family completed weekly challenge</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Sarah reached Level 8</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
