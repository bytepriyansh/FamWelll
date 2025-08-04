"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, RefreshCw, Info, TrendingUp, TrendingDown, Heart, Users } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const familyMembers = [
  {
    id: "sarah",
    name: "Sarah",
    role: "Mom",
    avatar: "👩‍💼",
    mood: "Happy",
    x: 300,
    y: 200,
    color: "bg-green-500",
  },
  {
    id: "david",
    name: "David",
    role: "Dad",
    avatar: "👨‍💼",
    mood: "Tired",
    x: 500,
    y: 200,
    color: "bg-blue-500",
  },
  {
    id: "emma",
    name: "Emma",
    role: "Daughter",
    avatar: "👧",
    mood: "Anxious",
    x: 250,
    y: 350,
    color: "bg-yellow-500",
  },
  {
    id: "jake",
    name: "Jake",
    role: "Son",
    avatar: "👦",
    mood: "Excited",
    x: 550,
    y: 350,
    color: "bg-purple-500",
  },
]

const connections = [
  { from: "sarah", to: "david", strength: 85, health: "strong", lastInteraction: "2 hours ago" },
  { from: "sarah", to: "emma", strength: 72, health: "good", lastInteraction: "30 min ago" },
  { from: "sarah", to: "jake", strength: 78, health: "good", lastInteraction: "1 hour ago" },
  { from: "david", to: "emma", strength: 65, health: "moderate", lastInteraction: "4 hours ago" },
  { from: "david", to: "jake", strength: 88, health: "strong", lastInteraction: "45 min ago" },
  { from: "emma", to: "jake", strength: 92, health: "strong", lastInteraction: "15 min ago" },
]

export function TrustGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedConnection, setSelectedConnection] = useState<any>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [graphData, setGraphData] = useState({ members: familyMembers, connections })
  const svgRef = useRef<SVGSVGElement>(null)

  const getConnectionColor = (health: string) => {
    switch (health) {
      case "strong":
        return "#10b981"
      case "good":
        return "#3b82f6"
      case "moderate":
        return "#f59e0b"
      case "weak":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getConnectionWidth = (strength: number) => {
    return Math.max(2, strength / 20)
  }

  const updateTrustGraph = () => {
    setIsUpdating(true)

    // Simulate AI updating the graph
    setTimeout(() => {
      const updatedConnections = connections.map((conn) => ({
        ...conn,
        strength: Math.max(40, Math.min(95, conn.strength + (Math.random() - 0.5) * 20)),
        health: Math.random() > 0.7 ? ["strong", "good", "moderate"][Math.floor(Math.random() * 3)] : conn.health,
      }))

      setGraphData({ ...graphData, connections: updatedConnections })
      setIsUpdating(false)
    }, 2000)
  }

  const handleNodeClick = (memberId: string) => {
    setSelectedNode(memberId)
    setSelectedConnection(null)
  }

  const handleConnectionClick = (connection: any) => {
    setSelectedConnection(connection)
    setSelectedNode(null)
  }

  const selectedMember = graphData.members.find((m) => m.id === selectedNode)

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
                  Family Trust Graph
                </CardTitle>
                <CardDescription className="text-base">
                  Visualize emotional connections and relationship health in real-time
                </CardDescription>
              </div>
              <Button onClick={updateTrustGraph} disabled={isUpdating} className="famwell-gradient text-white">
                {isUpdating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Update Graph
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trust Graph Visualization */}
          <div className="lg:col-span-2">
            <Card className="famwell-card h-[600px]">
              <CardContent className="p-6 h-full">
                <svg
                  ref={svgRef}
                  width="100%"
                  height="100%"
                  viewBox="0 0 800 500"
                  className="border rounded-xl bg-gradient-to-br from-purple-50 to-blue-50"
                >
                  {/* Connections */}
                  {graphData.connections.map((connection, index) => {
                    const fromMember = graphData.members.find((m) => m.id === connection.from)
                    const toMember = graphData.members.find((m) => m.id === connection.to)

                    if (!fromMember || !toMember) return null

                    return (
                      <line
                        key={index}
                        x1={fromMember.x}
                        y1={fromMember.y}
                        x2={toMember.x}
                        y2={toMember.y}
                        stroke={getConnectionColor(connection.health)}
                        strokeWidth={getConnectionWidth(connection.strength)}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleConnectionClick(connection)}
                      />
                    )
                  })}

                  {/* Nodes */}
                  {graphData.members.map((member) => (
                    <g key={member.id}>
                      <circle
                        cx={member.x}
                        cy={member.y}
                        r="32"
                        className={`${member.color} cursor-pointer hover:scale-110 transition-transform ${
                          selectedNode === member.id ? "ring-4 ring-purple-500" : ""
                        }`}
                        onClick={() => handleNodeClick(member.id)}
                      />
                      <text x={member.x} y={member.y + 5} textAnchor="middle" className="text-2xl pointer-events-none">
                        {member.avatar}
                      </text>
                      <text
                        x={member.x}
                        y={member.y + 55}
                        textAnchor="middle"
                        className="text-sm font-medium fill-gray-700 pointer-events-none"
                      >
                        {member.name}
                      </text>
                    </g>
                  ))}
                </svg>
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* Graph Stats */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Graph Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Trust Score</span>
                  <Badge className="bg-green-100 text-green-800">78%</Badge>
                </div>
                <Progress value={78} className="h-2" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Strong Connections</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Needs Attention</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">2 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Node Details */}
            {selectedMember && (
              <Card className="famwell-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{selectedMember.avatar}</span>
                    {selectedMember.name}
                  </CardTitle>
                  <CardDescription>{selectedMember.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Current Mood:</span>
                    <Badge className="bg-blue-100 text-blue-800">{selectedMember.mood}</Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Recent Connections</h4>
                    {graphData.connections
                      .filter((c) => c.from === selectedMember.id || c.to === selectedMember.id)
                      .map((conn, index) => {
                        const otherMember = graphData.members.find(
                          (m) => m.id === (conn.from === selectedMember.id ? conn.to : conn.from),
                        )
                        return (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <span>{otherMember?.avatar}</span>
                              <span className="text-sm font-medium">{otherMember?.name}</span>
                            </div>
                            <Badge
                              className={
                                conn.health === "strong"
                                  ? "bg-green-100 text-green-800"
                                  : conn.health === "good"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {conn.strength}%
                            </Badge>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Selected Connection Details */}
            {selectedConnection && (
              <Card className="famwell-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Connection Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {graphData.members.find((m) => m.id === selectedConnection.from)?.avatar}
                      </span>
                      <span className="font-medium">
                        {graphData.members.find((m) => m.id === selectedConnection.from)?.name}
                      </span>
                    </div>
                    <div className="text-gray-400">↔</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {graphData.members.find((m) => m.id === selectedConnection.to)?.avatar}
                      </span>
                      <span className="font-medium">
                        {graphData.members.find((m) => m.id === selectedConnection.to)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Connection Strength</span>
                      <Badge className="bg-blue-100 text-blue-800">{selectedConnection.strength}%</Badge>
                    </div>
                    <Progress value={selectedConnection.strength} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Health Status</span>
                      <Badge
                        className={
                          selectedConnection.health === "strong"
                            ? "bg-green-100 text-green-800"
                            : selectedConnection.health === "good"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {selectedConnection.health}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Interaction</span>
                      <span className="text-sm font-medium">{selectedConnection.lastInteraction}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Insights */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Strong Sibling Bond</p>
                      <p className="text-xs text-green-600">
                        Emma and Jake's connection has strengthened by 15% this week
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Attention Needed</p>
                      <p className="text-xs text-yellow-600">
                        David and Emma haven't had meaningful interaction in 4 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Family Harmony</p>
                      <p className="text-xs text-blue-600">Overall family trust score is above average</p>
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
