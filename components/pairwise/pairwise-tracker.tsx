"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Heart,
  MessageCircle,
  Users,
  Zap,
  Target,
  Clock,
  BarChart3,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const pairwiseData = [
  {
    id: 1,
    members: ["Sarah", "Emma"],
    avatars: ["👩‍💼", "👧"],
    relationship: "Mother-Daughter",
    status: "attention_needed",
    confidence: 87,
    trend: "declining",
    lastInteraction: "4 hours ago",
    emotionalDistance: 65,
    previousDistance: 45,
    insights: [
      "Communication frequency has decreased by 40% this week",
      "Emma's mood has been consistently anxious when interacting with Sarah",
      "Suggested intervention: Schedule one-on-one time",
    ],
    riskFactors: ["Decreased communication", "Mood mismatch", "Avoidance patterns"],
    recommendations: [
      "Send a gentle check-in message",
      "Suggest a shared activity",
      "Consider family counseling session",
    ],
  },
  {
    id: 2,
    members: ["Emma", "Jake"],
    avatars: ["👧", "👦"],
    relationship: "Siblings",
    status: "strong",
    confidence: 94,
    trend: "improving",
    lastInteraction: "15 minutes ago",
    emotionalDistance: 20,
    previousDistance: 35,
    insights: [
      "Sibling bond has strengthened significantly this month",
      "Mutual support patterns detected in recent interactions",
      "Positive emotional contagion observed",
    ],
    riskFactors: [],
    recommendations: ["Encourage continued positive interactions", "Use as model for other family relationships"],
  },
  {
    id: 3,
    members: ["David", "Jake"],
    avatars: ["👨‍💼", "👦"],
    relationship: "Father-Son",
    status: "stable",
    confidence: 78,
    trend: "stable",
    lastInteraction: "45 minutes ago",
    emotionalDistance: 35,
    previousDistance: 38,
    insights: [
      "Consistent interaction patterns maintained",
      "Shared interests in sports creating positive connections",
      "Communication style well-matched",
    ],
    riskFactors: ["Limited emotional depth in conversations"],
    recommendations: ["Encourage deeper emotional sharing", "Plan more one-on-one activities"],
  },
  {
    id: 4,
    members: ["Sarah", "David"],
    avatars: ["👩‍💼", "👨‍💼"],
    relationship: "Spouses",
    status: "strong",
    confidence: 91,
    trend: "stable",
    lastInteraction: "2 hours ago",
    emotionalDistance: 25,
    previousDistance: 28,
    insights: [
      "Strong partnership foundation remains solid",
      "Effective co-parenting communication observed",
      "Mutual support during family challenges",
    ],
    riskFactors: [],
    recommendations: ["Continue current positive patterns", "Schedule regular date nights"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "strong":
      return "bg-green-100 text-green-800 border-green-200"
    case "stable":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "attention_needed":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "at_risk":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "strong":
      return <Heart className="w-4 h-4 text-green-600" />
    case "stable":
      return <Target className="w-4 h-4 text-blue-600" />
    case "attention_needed":
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    case "at_risk":
      return <AlertTriangle className="w-4 h-4 text-red-600" />
    default:
      return <Users className="w-4 h-4 text-gray-600" />
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "improving":
      return <TrendingUp className="w-4 h-4 text-green-600" />
    case "declining":
      return <TrendingDown className="w-4 h-4 text-red-600" />
    case "stable":
      return <BarChart3 className="w-4 h-4 text-blue-600" />
    default:
      return <BarChart3 className="w-4 h-4 text-gray-600" />
  }
}

export function PairwiseTracker() {
  const [selectedPair, setSelectedPair] = useState(pairwiseData[0])
  const [timeRange, setTimeRange] = useState("week")

  const criticalPairs = pairwiseData.filter((pair) => pair.status === "attention_needed" || pair.status === "at_risk")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card className="famwell-card border-none shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                  <Brain className="w-6 h-6 text-purple-600" />
                  Pairwise AI Relationship Tracker
                </CardTitle>
                <CardDescription className="text-base">
                  AI-powered analysis of family relationship dynamics and emotional connections
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800">
                  <Zap className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Last updated: 5 min ago
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Critical Alerts */}
        {criticalPairs.length > 0 && (
          <Card className="famwell-card border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-900">
                <AlertTriangle className="w-5 h-5" />
                Relationships Needing Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {criticalPairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{pair.avatars[0]}</span>
                        <span className="text-lg">{pair.avatars[1]}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {pair.members[0]} & {pair.members[1]}
                        </div>
                        <div className="text-sm text-gray-600">{pair.relationship}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(pair.status)}>{pair.status.replace("_", " ")}</Badge>
                      <Button size="sm" onClick={() => setSelectedPair(pair)} className="famwell-gradient text-white">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Relationship Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">All Relationships</h3>
              <div className="flex gap-2">
                {["day", "week", "month"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className="capitalize"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>

            {pairwiseData.map((pair) => (
              <Card
                key={pair.id}
                className={`famwell-card cursor-pointer transition-all hover:shadow-lg ${
                  selectedPair.id === pair.id ? "ring-2 ring-purple-300 bg-purple-50" : ""
                }`}
                onClick={() => setSelectedPair(pair)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl">{pair.avatars[0]}</span>
                        <span className="text-2xl">{pair.avatars[1]}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {pair.members[0]} & {pair.members[1]}
                        </h4>
                        <p className="text-sm text-gray-600">{pair.relationship}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(pair.status)}
                      <Badge className={getStatusColor(pair.status)}>{pair.status.replace("_", " ")}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Emotional Distance</span>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(pair.trend)}
                        <span className="font-medium">{pair.emotionalDistance}%</span>
                      </div>
                    </div>
                    <Progress value={100 - pair.emotionalDistance} className="h-2" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">AI Confidence</span>
                      <Badge className="bg-blue-100 text-blue-800">{pair.confidence}%</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Last interaction: {pair.lastInteraction}</span>
                      <span
                        className={`font-medium ${
                          pair.trend === "improving"
                            ? "text-green-600"
                            : pair.trend === "declining"
                              ? "text-red-600"
                              : "text-blue-600"
                        }`}
                      >
                        {pair.trend}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Analysis Sidebar */}
          <div className="space-y-6">
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xl">{selectedPair.avatars[0]}</span>
                    <span className="text-xl">{selectedPair.avatars[1]}</span>
                  </div>
                  Detailed Analysis
                </CardTitle>
                <CardDescription>
                  {selectedPair.members[0]} & {selectedPair.members[1]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Relationship Status</span>
                  <Badge className={getStatusColor(selectedPair.status)}>{selectedPair.status.replace("_", " ")}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Emotional Distance</span>
                    <span className="font-medium">{selectedPair.emotionalDistance}%</span>
                  </div>
                  <Progress value={100 - selectedPair.emotionalDistance} className="h-2" />
                  <div className="text-xs text-gray-500">
                    {selectedPair.emotionalDistance < selectedPair.previousDistance
                      ? "Improving"
                      : selectedPair.emotionalDistance > selectedPair.previousDistance
                        ? "Declining"
                        : "Stable"}{" "}
                    from {selectedPair.previousDistance}% last week
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Confidence</span>
                  <div className="flex items-center gap-1">
                    <Progress value={selectedPair.confidence} className="h-1 w-16" />
                    <span className="text-sm font-medium">{selectedPair.confidence}%</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                  <div className="space-y-2">
                    {selectedPair.insights.map((insight, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors */}
            {selectedPair.riskFactors.length > 0 && (
              <Card className="famwell-card border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-900">
                    <AlertTriangle className="w-5 h-5" />
                    Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedPair.riskFactors.map((factor, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-yellow-800">
                        <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <Card className="famwell-card border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Target className="w-5 h-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedPair.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">{rec}</p>
                      <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700 text-white">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Take Action
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Model Info */}
            <Card className="famwell-card bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900 mb-1">AI Analysis</h4>
                    <p className="text-xs text-purple-700">
                      This analysis uses advanced machine learning to detect patterns in communication, mood
                      correlations, and interaction frequency to assess relationship health.
                    </p>
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
