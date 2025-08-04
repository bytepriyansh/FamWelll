"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Heart, Users, MessageCircle, Brain, Sparkles, TrendingUp } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const familyMembers = [
  { name: "Sarah", role: "Mom", mood: "😊", status: "Happy", avatar: "👩‍💼", lastActive: "2 min ago" },
  { name: "David", role: "Dad", mood: "😴", status: "Tired", avatar: "👨‍💼", lastActive: "1 hour ago" },
  { name: "Emma", role: "Daughter", mood: "😰", status: "Anxious", avatar: "👧", lastActive: "30 min ago" },
  { name: "Jake", role: "Son", mood: "😄", status: "Excited", avatar: "👦", lastActive: "5 min ago" },
]

const moodOptions = [
  { emoji: "😊", label: "Happy", color: "bg-green-100 text-green-800" },
  { emoji: "😴", label: "Tired", color: "bg-blue-100 text-blue-800" },
  { emoji: "😰", label: "Anxious", color: "bg-yellow-100 text-yellow-800" },
  { emoji: "😢", label: "Sad", color: "bg-red-100 text-red-800" },
  { emoji: "😡", label: "Angry", color: "bg-red-100 text-red-800" },
  { emoji: "🤔", label: "Confused", color: "bg-purple-100 text-purple-800" },
  { emoji: "😌", label: "Calm", color: "bg-green-100 text-green-800" },
  { emoji: "😄", label: "Excited", color: "bg-yellow-100 text-yellow-800" },
]

export function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [selectedMood, setSelectedMood] = useState("")
  const [moodNote, setMoodNote] = useState("")
  const [shareWithFamily, setShareWithFamily] = useState(true)
  const [familyMoodScore, setFamilyMoodScore] = useState(78)

  useEffect(() => {
    const userData = localStorage.getItem("famwell-user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleMoodSubmit = () => {
    if (selectedMood) {
      // Simulate mood submission
      console.log("Mood submitted:", { mood: selectedMood, note: moodNote, shared: shareWithFamily })
      setSelectedMood("")
      setMoodNote("")
      // Update family mood score
      setFamilyMoodScore(Math.floor(Math.random() * 20) + 70)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card className="famwell-card border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  Hi {user.name}, here's how your family is doing 👋
                </h1>
                <p className="text-gray-600">Your family wellness score has improved by 12% this week</p>
              </div>
              <div className="text-4xl">{user.avatar}</div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Family Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Family Overview
                </CardTitle>
                <CardDescription>Current mood status of all family members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Family Mood Score</span>
                    <Badge className="bg-green-100 text-green-800">{familyMoodScore}%</Badge>
                  </div>
                  <Progress value={familyMoodScore} className="h-2 mb-6" />

                  <div className="grid grid-cols-2 gap-4">
                    {familyMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="text-2xl">{member.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{member.name}</span>
                            <span className="text-sm text-gray-500">({member.role})</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg">{member.mood}</span>
                            <Badge
                              className={moodOptions.find((m) => m.label === member.status)?.color || "bg-gray-100"}
                            >
                              {member.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{member.lastActive}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="famwell-card hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 mb-1">Trust Graph</h3>
                  <p className="text-sm text-gray-600">View family connections</p>
                </CardContent>
              </Card>

              <Card className="famwell-card hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold text-gray-900 mb-1">Smart Nudges</h3>
                  <p className="text-sm text-gray-600">3 pending suggestions</p>
                </CardContent>
              </Card>

              <Card className="famwell-card hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold text-gray-900 mb-1">Family Chat</h3>
                  <p className="text-sm text-gray-600">2 new messages</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mood Check-in Widget */}
          <div className="space-y-6">
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Quick Mood Check-In
                </CardTitle>
                <CardDescription>How are you feeling right now?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {moodOptions.map((mood, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMood(mood.label)}
                      className={`mood-orb ${
                        selectedMood === mood.label
                          ? "ring-2 ring-purple-500 bg-purple-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>

                {selectedMood && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="What's on your mind? (optional)"
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      className="rounded-xl resize-none"
                      rows={3}
                    />

                    <div className="flex items-center space-x-2">
                      <Switch id="share-mood" checked={shareWithFamily} onCheckedChange={setShareWithFamily} />
                      <Label htmlFor="share-mood" className="text-sm">
                        Share with family
                      </Label>
                    </div>

                    <Button onClick={handleMoodSubmit} className="w-full famwell-gradient text-white rounded-xl">
                      Submit Check-In
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Emma shared a journal entry</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">David completed mood check-in</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Family trust score improved</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
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
