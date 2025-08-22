"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Heart,
  Users,
  MessageCircle,
  Brain,
  Sparkles,
  TrendingUp,
  Calendar,
  Activity,
  Star,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { toast } from "sonner";

const initialFamilyMembers = [
  {
    id: 1,
    name: "Priya",
    role: "Mom",
    mood: "😊",
    status: "Happy",
    avatar: "👩‍💼",
    lastActive: "2 min ago",
    moodScore: 85,
  },
  {
    id: 2,
    name: "Raj",
    role: "Dad",
    mood: "😌",
    status: "Calm",
    avatar: "👨‍💼",
    lastActive: "1 hour ago",
    moodScore: 78,
  },
  {
    id: 3,
    name: "Aarav",
    role: "Son",
    mood: "😰",
    status: "Anxious",
    avatar: "👦",
    lastActive: "30 min ago",
    moodScore: 62,
  },
  {
    id: 4,
    name: "Diya",
    role: "Daughter",
    mood: "😄",
    status: "Excited",
    avatar: "👧",
    lastActive: "5 min ago",
    moodScore: 90,
  },
  {
    id: 5,
    name: "Asha",
    role: "Grandma",
    mood: "😊",
    status: "Happy",
    avatar: "👵",
    lastActive: "10 min ago",
    moodScore: 82,
  },
];

const moodOptions = [
  { emoji: "😊", label: "Happy", color: "bg-green-100 text-green-800" },
  { emoji: "😴", label: "Tired", color: "bg-blue-100 text-blue-800" },
  { emoji: "😰", label: "Anxious", color: "bg-yellow-100 text-yellow-800" },
  { emoji: "😢", label: "Sad", color: "bg-red-100 text-red-800" },
  { emoji: "😡", label: "Angry", color: "bg-red-100 text-red-800" },
  { emoji: "🤔", label: "Confused", color: "bg-purple-100 text-purple-800" },
  { emoji: "😌", label: "Calm", color: "bg-green-100 text-green-800" },
  { emoji: "😄", label: "Excited", color: "bg-yellow-100 text-yellow-800" },
];

// Recent activities data
const initialActivities = [
  {
    id: 1,
    type: "journal",
    person: "Diya",
    action: "shared a journal entry",
    time: "2 hours ago",
    color: "bg-green-500",
  },
  {
    id: 2,
    type: "mood",
    person: "Raj",
    action: "completed mood check-in",
    time: "4 hours ago",
    color: "bg-blue-500",
  },
  {
    id: 3,
    type: "trust",
    person: "Family",
    action: "trust score improved",
    time: "1 day ago",
    color: "bg-purple-500",
  },
  {
    id: 4,
    type: "activity",
    person: "Aarav",
    action: "started a meditation session",
    time: "1 day ago",
    color: "bg-orange-500",
  },
  {
    id: 5,
    type: "goal",
    person: "Priya",
    action: "set a new wellness goal",
    time: "2 days ago",
    color: "bg-pink-500",
  },
];

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [selectedMood, setSelectedMood] = useState("");
  const [moodNote, setMoodNote] = useState("");
  const [shareWithFamily, setShareWithFamily] = useState(true);
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [activities, setActivities] = useState(initialActivities);
  const [familyMoodScore, setFamilyMoodScore] = useState(78);

  useEffect(() => {
    // Simulate loading user data
    const userData = {
      name: "Priya",
      avatar: "👩‍💼",
      role: "Mom",
    };
    localStorage.setItem("famwell-user", JSON.stringify(userData));
    setUser(userData);

    // Calculate initial family mood score
    const averageScore = Math.round(
      familyMembers.reduce((sum, member) => sum + member.moodScore, 0) /
        familyMembers.length
    );
    setFamilyMoodScore(averageScore);
  }, []);

  const handleMoodSubmit = () => {
    if (selectedMood) {
      // Update user's mood in the family members list
      const updatedMembers = familyMembers.map((member) =>
        member.name === user.name
          ? {
              ...member,
              mood:
                moodOptions.find((m) => m.label === selectedMood)?.emoji ||
                "😊",
              status: selectedMood,
              lastActive: "Just now",
            }
          : member
      );
      setFamilyMembers(updatedMembers);

      // Add to activity feed
      const newActivity = {
        id: activities.length + 1,
        type: "mood",
        person: user.name,
        action: `checked in as ${selectedMood}`,
        time: "Just now",
        color: "bg-blue-500",
      };
      setActivities([newActivity, ...activities.slice(0, 4)]);

      // Update family mood score
      const newScore = Math.floor(Math.random() * 10) + 70;
      setFamilyMoodScore(newScore);

      // Reset form
      setSelectedMood("");
      setMoodNote("");

      // Show success message
      toast.success(
        `Mood submitted successfully! Family mood score is now ${newScore}%`
      );
    }
  };

  const getMoodColorClass = (status: string) => {
    return (
      moodOptions.find((m) => m.label === status)?.color ||
      "bg-gray-100 text-gray-800"
    );
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your family dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card className="famwell-card border-none shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  नमस्ते {user.name}, here's how your family is doing 👋
                </h1>
                <p className="text-gray-600">
                  Your family wellness score has improved by 12% this week
                </p>
                <div className="flex items-center mt-4">
                  <div className="flex -space-x-2">
                    {familyMembers.map((member) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center text-lg"
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>
                  <Badge className="ml-4 bg-green-100 text-green-800">
                    <TrendingUp className="w-3 h-3 mr-1" /> 5 members active
                    today
                  </Badge>
                </div>
              </div>
              <div className="text-5xl mt-4 md:mt-0">{user.avatar}</div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Family Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="famwell-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Family Overview
                </CardTitle>
                <CardDescription>
                  Current mood status of all family members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      Family Mood Score
                    </span>
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {familyMoodScore}%
                    </Badge>
                  </div>
                  <Progress value={familyMoodScore} className="h-2 mb-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {familyMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="text-2xl">{member.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {member.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({member.role})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg">{member.mood}</span>
                            <Badge className={getMoodColorClass(member.status)}>
                              {member.status}
                            </Badge>
                            <span className="text-xs text-gray-500 ml-auto">
                              {member.lastActive}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Mood score</span>
                              <span>{member.moodScore}%</span>
                            </div>
                            <Progress
                              value={member.moodScore}
                              className="h-1 mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="famwell-card hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 mt-2">
                    Trust Graph
                  </h3>
                  <p className="text-sm text-gray-600">
                    View family connections
                  </p>
                </CardContent>
              </Card>

              <Card className="famwell-card hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 mt-2">
                    Smart Nudges
                  </h3>
                  <p className="text-sm text-gray-600">3 pending suggestions</p>
                </CardContent>
              </Card>

              <Card className="famwell-card hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 mt-2">
                    Family Chat
                  </h3>
                  <p className="text-sm text-gray-600">2 new messages</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Mood Check-in Widget */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Quick Mood Check-In
                </CardTitle>
                <CardDescription>
                  How are you feeling right now?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {moodOptions.map((mood, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMood(mood.label)}
                      className={`mood-orb text-2xl p-2 rounded-full transition-all ${
                        selectedMood === mood.label
                          ? "ring-2 ring-purple-500 scale-110 bg-purple-50"
                          : "bg-gray-50 hover:bg-gray-100 hover:scale-105"
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
                      <Switch
                        id="share-mood"
                        checked={shareWithFamily}
                        onCheckedChange={setShareWithFamily}
                      />
                      <Label htmlFor="share-mood" className="text-sm">
                        Share with family
                      </Label>
                    </div>

                    <Button
                      onClick={handleMoodSubmit}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700"
                    >
                      Submit Check-In
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="famwell-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Recent Activity
                </CardTitle>
               
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`w-2 h-2 ${activity.color} rounded-full mt-2 flex-shrink-0`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.person}</span>{" "}
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card className="famwell-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Weekly Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Family meditation</span>
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </div>
                  <Progress value={100} className="h-1" />

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm">Evening walks</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      3/5 days
                    </Badge>
                  </div>
                  <Progress value={60} className="h-1" />

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm">Digital detox</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Not started
                    </Badge>
                  </div>
                  <Progress value={0} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
export { DashboardLayout };
