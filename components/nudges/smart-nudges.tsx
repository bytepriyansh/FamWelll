"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  Send,
  Clock,
  Heart,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Edit3,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const nudges = [
  {
    id: 1,
    type: "check-in",
    priority: "high",
    title: "Check on Emma",
    description: "Emma has been quiet for the past 3 hours and marked herself as anxious.",
    target: { name: "Emma", avatar: "👧", role: "Daughter" },
    suggestedActions: [
      "Hey Emma, how are you feeling? Want to talk?",
      "I noticed you seemed a bit anxious earlier. I'm here if you need me.",
      "Would you like to do something together to help you feel better?",
    ],
    aiConfidence: 87,
    timeGenerated: "15 min ago",
    reason: "Mood pattern analysis detected prolonged anxiety state",
  },
  {
    id: 2,
    type: "connection",
    priority: "medium",
    title: "Strengthen bond with David",
    description: "You and David haven't had quality time together in 2 days.",
    target: { name: "David", avatar: "👨‍💼", role: "Dad" },
    suggestedActions: [
      "Hey David, want to grab coffee and catch up?",
      "I miss our conversations. Free for a walk later?",
      "How about we watch that show we started together?",
    ],
    aiConfidence: 72,
    timeGenerated: "1 hour ago",
    reason: "Connection strength analysis shows declining interaction frequency",
  },
  {
    id: 3,
    type: "appreciation",
    priority: "low",
    title: "Appreciate Jake's efforts",
    description: "Jake has been consistently positive and supportive this week.",
    target: { name: "Jake", avatar: "👦", role: "Son" },
    suggestedActions: [
      "Jake, I really appreciate how positive you've been lately!",
      "Thank you for being such a bright light in our family this week.",
      "Your good energy has been noticed and appreciated!",
    ],
    aiConfidence: 94,
    timeGenerated: "2 hours ago",
    reason: "Positive behavior pattern recognition",
  },
  {
    id: 4,
    type: "family-activity",
    priority: "medium",
    title: "Plan family bonding time",
    description: "Family group activities have decreased by 40% this month.",
    target: { name: "Everyone", avatar: "👨‍👩‍👧‍👦", role: "Family" },
    suggestedActions: [
      "How about a family game night this weekend?",
      "Should we plan a family outing together?",
      "Let's cook dinner together tonight!",
    ],
    aiConfidence: 81,
    timeGenerated: "3 hours ago",
    reason: "Family engagement metrics analysis",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "check-in":
      return Heart
    case "connection":
      return MessageCircle
    case "appreciation":
      return CheckCircle
    case "family-activity":
      return Sparkles
    default:
      return AlertTriangle
  }
}

export function SmartNudges() {
  const [selectedNudge, setSelectedNudge] = useState<any>(null)
  const [customMessage, setCustomMessage] = useState("")
  const [sentNudges, setSentNudges] = useState<number[]>([])

  const handleSendNudge = (nudgeId: number, message: string) => {
    setSentNudges([...sentNudges, nudgeId])
    setSelectedNudge(null)
    setCustomMessage("")
    // Simulate sending nudge
    console.log("Nudge sent:", { nudgeId, message })
  }

  const handleCustomizeMessage = (nudge: any) => {
    setSelectedNudge(nudge)
    setCustomMessage(nudge.suggestedActions[0])
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
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  Smart Nudge Center
                </CardTitle>
                <CardDescription className="text-base">
                  AI-powered suggestions to strengthen family connections
                </CardDescription>
              </div>
              <Badge className="bg-purple-100 text-purple-800">
                {nudges.filter((n) => !sentNudges.includes(n.id)).length} Active Nudges
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Nudge Queue */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nudge Queue</h3>

            {nudges.map((nudge) => {
              const TypeIcon = getTypeIcon(nudge.type)
              const isSent = sentNudges.includes(nudge.id)

              return (
                <Card
                  key={nudge.id}
                  className={`famwell-card transition-all ${isSent ? "opacity-50" : "hover:shadow-lg"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            nudge.priority === "high"
                              ? "bg-red-100"
                              : nudge.priority === "medium"
                                ? "bg-yellow-100"
                                : "bg-green-100"
                          }`}
                        >
                          <TypeIcon
                            className={`w-5 h-5 ${
                              nudge.priority === "high"
                                ? "text-red-600"
                                : nudge.priority === "medium"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{nudge.title}</h4>
                            <Badge className={getPriorityColor(nudge.priority)}>{nudge.priority}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{nudge.description}</p>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {nudge.timeGenerated}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {nudge.aiConfidence}% confidence
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{nudge.target.avatar}</span>
                        <div className="text-right">
                          <div className="font-medium text-sm">{nudge.target.name}</div>
                          <div className="text-xs text-gray-500">{nudge.target.role}</div>
                        </div>
                      </div>
                    </div>

                    {/* AI Confidence Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>AI Confidence</span>
                        <span>{nudge.aiConfidence}%</span>
                      </div>
                      <Progress value={nudge.aiConfidence} className="h-1" />
                    </div>

                    {/* Suggested Actions */}
                    <div className="space-y-2 mb-4">
                      <h5 className="text-sm font-medium text-gray-700">Suggested Messages:</h5>
                      {nudge.suggestedActions.slice(0, 2).map((action, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                          "{action}"
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    {!isSent ? (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSendNudge(nudge.id, nudge.suggestedActions[0])}
                          className="famwell-gradient text-white flex-1"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Nudge
                        </Button>
                        <Button variant="outline" onClick={() => handleCustomizeMessage(nudge)} className="flex-1">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Nudge sent!</span>
                      </div>
                    )}

                    {/* Reason */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        <strong>AI Reasoning:</strong> {nudge.reason}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nudge Stats */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Nudge Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <Badge className="bg-blue-100 text-blue-800">12 sent</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <Badge className="bg-green-100 text-green-800">89%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <Badge className="bg-purple-100 text-purple-800">~15 min</Badge>
                </div>

                <div className="pt-3 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Most Effective</h4>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">Check-in nudges: 94%</div>
                    <div className="text-xs text-gray-600">Appreciation: 91%</div>
                    <div className="text-xs text-gray-600">Connection: 85%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timing Insights */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Timing Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">Best Time to Nudge</div>
                  <div className="text-xs text-blue-600">Evenings (6-8 PM) show highest response rates</div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800">Avoid Nudging</div>
                  <div className="text-xs text-yellow-600">Early mornings and late nights have lower engagement</div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Optimal Frequency</div>
                  <div className="text-xs text-green-600">2-3 nudges per family member per week</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Nudge Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Emma responded to check-in</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">David appreciated nudge</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Family activity planned</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customize Message Modal */}
        {selectedNudge && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="famwell-card w-full max-w-md">
              <CardHeader>
                <CardTitle>Customize Your Message</CardTitle>
                <CardDescription>Personalize the nudge for {selectedNudge.target.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Write your personalized message..."
                  className="rounded-xl"
                  rows={4}
                />

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleSendNudge(selectedNudge.id, customMessage)}
                    className="famwell-gradient text-white flex-1"
                    disabled={!customMessage.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Custom Nudge
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedNudge(null)}>
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
