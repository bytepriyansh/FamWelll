"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { HelpCircle, Send, Users, Heart, Clock, CheckCircle, AlertCircle, Shield, Eye, EyeOff } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const helpReasons = [
  { id: "overwhelmed", label: "Feeling overwhelmed", icon: "😰", color: "bg-yellow-100 text-yellow-800" },
  { id: "sad", label: "Feeling sad or down", icon: "😢", color: "bg-blue-100 text-blue-800" },
  { id: "anxious", label: "Feeling anxious", icon: "😟", color: "bg-red-100 text-red-800" },
  { id: "lonely", label: "Feeling lonely", icon: "😔", color: "bg-purple-100 text-purple-800" },
  { id: "stressed", label: "Dealing with stress", icon: "😤", color: "bg-orange-100 text-orange-800" },
  { id: "conflict", label: "Family conflict", icon: "😠", color: "bg-red-100 text-red-800" },
  { id: "support", label: "Need emotional support", icon: "🤗", color: "bg-green-100 text-green-800" },
  { id: "other", label: "Something else", icon: "💭", color: "bg-gray-100 text-gray-800" },
]

const contactOptions = [
  {
    id: "parent",
    name: "Parent/Guardian",
    description: "Reach out to your parent or guardian",
    avatar: "👨‍👩‍👧‍👦",
    available: true,
    responseTime: "Usually responds within 5 minutes",
  },
  {
    id: "sibling",
    name: "Sibling",
    description: "Talk to your brother or sister",
    avatar: "👫",
    available: true,
    responseTime: "Usually responds within 15 minutes",
  },
  {
    id: "therapist",
    name: "Family Therapist",
    description: "Professional mental health support",
    avatar: "👩‍⚕️",
    available: false,
    responseTime: "Available during business hours",
  },
  {
    id: "counselor",
    name: "School Counselor",
    description: "Educational and emotional support",
    avatar: "👨‍🏫",
    available: true,
    responseTime: "Available during school hours",
  },
]

const recentRequests = [
  {
    id: 1,
    reason: "Feeling overwhelmed",
    recipient: "Mom",
    timestamp: "2 hours ago",
    status: "responded",
    anonymous: false,
  },
  {
    id: 2,
    reason: "Need emotional support",
    recipient: "Family Therapist",
    timestamp: "1 day ago",
    status: "pending",
    anonymous: true,
  },
  {
    id: 3,
    reason: "Feeling anxious",
    recipient: "Sister",
    timestamp: "3 days ago",
    status: "responded",
    anonymous: false,
  },
]

export function HelpRequest() {
  const [selectedReason, setSelectedReason] = useState("")
  const [selectedContact, setSelectedContact] = useState("")
  const [message, setMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [sentRequest, setSentRequest] = useState<any>(null)

  const handleSendRequest = () => {
    if (!selectedReason || !selectedContact) return

    const request = {
      id: Date.now(),
      reason: helpReasons.find((r) => r.id === selectedReason)?.label,
      recipient: contactOptions.find((c) => c.id === selectedContact)?.name,
      message: message || "I could use some support right now.",
      anonymous: isAnonymous,
      timestamp: "Just now",
      status: "sent",
    }

    setSentRequest(request)
    setShowConfirmation(true)

    // Reset form
    setSelectedReason("")
    setSelectedContact("")
    setMessage("")
    setIsAnonymous(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "responded":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "sent":
        return <Send className="w-4 h-4 text-blue-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card className="famwell-card border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-serif">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              Anonymous Help Request
            </CardTitle>
            <CardDescription className="text-base">
              Reach out for support when you need it most - your privacy is protected
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />I Need Help
                </CardTitle>
                <CardDescription>Select what you're going through and who you'd like to reach out to</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Reason Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">What's going on?</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {helpReasons.map((reason) => (
                      <button
                        key={reason.id}
                        onClick={() => setSelectedReason(reason.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedReason === reason.id
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{reason.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{reason.label}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Selection */}
                {selectedReason && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Who would you like to reach out to?</Label>
                    <div className="space-y-3">
                      {contactOptions.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => setSelectedContact(contact.id)}
                          disabled={!contact.available}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            selectedContact === contact.id
                              ? "border-purple-500 bg-purple-50"
                              : contact.available
                                ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{contact.avatar}</span>
                              <div>
                                <div className="font-medium text-gray-900">{contact.name}</div>
                                <div className="text-sm text-gray-600">{contact.description}</div>
                                <div className="text-xs text-gray-500 mt-1">{contact.responseTime}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {contact.available ? (
                                <Badge className="bg-green-100 text-green-800">Available</Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800">Offline</Badge>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message */}
                {selectedContact && (
                  <div>
                    <Label htmlFor="message" className="text-base font-medium mb-3 block">
                      Additional message (optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Share more about what you're going through or what kind of support you need..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="rounded-xl min-h-[120px] resize-none"
                    />
                  </div>
                )}

                {/* Privacy Settings */}
                {selectedContact && (
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <Label htmlFor="anonymous" className="font-medium text-blue-900">
                          Privacy Settings
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                      <div className="flex items-center gap-2">
                        {isAnonymous ? (
                          <EyeOff className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600" />
                        )}
                        <Label htmlFor="anonymous" className="text-sm">
                          {isAnonymous ? "Send anonymously" : "Share my identity"}
                        </Label>
                      </div>
                    </div>

                    <p className="text-xs text-blue-700 mt-2">
                      {isAnonymous
                        ? "Your identity will be hidden. The recipient will only see that a family member needs support."
                        : "The recipient will know this request is from you."}
                    </p>
                  </div>
                )}

                {/* Send Button */}
                {selectedReason && selectedContact && (
                  <Button
                    onClick={handleSendRequest}
                    className="w-full famwell-gradient text-white py-3 text-lg font-semibold"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Help Request
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Info */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-green-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Choose your situation</p>
                    <p className="text-xs text-gray-600">Select what you're going through</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pick who to contact</p>
                    <p className="text-xs text-gray-600">Choose the best person to help</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Send your request</p>
                    <p className="text-xs text-gray-600">They'll be notified immediately</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Your privacy is protected</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    You can choose to remain anonymous or share your identity
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className="text-sm font-medium text-gray-900">{request.reason}</span>
                      </div>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <span>To: {request.recipient}</span>
                        {request.anonymous && (
                          <div className="flex items-center gap-1">
                            <EyeOff className="w-3 h-3" />
                            <span>(Anonymous)</span>
                          </div>
                        )}
                      </div>
                      <span>{request.timestamp}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="famwell-card border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 mb-1">In Crisis?</h4>
                    <p className="text-sm text-red-700 mb-3">
                      If you're having thoughts of self-harm, please reach out immediately.
                    </p>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      Crisis Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && sentRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="famwell-card w-full max-w-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-900">Help Request Sent!</CardTitle>
                <CardDescription>Your request has been delivered to {sentRequest.recipient}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">What happens next:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ {sentRequest.recipient} has been notified</li>
                    <li>✓ They'll receive your message and reason for reaching out</li>
                    <li>✓ You'll be notified when they respond</li>
                    {sentRequest.anonymous && <li>✓ Your identity remains private</li>}
                  </ul>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Most family members respond within 15 minutes</p>
                  <Button onClick={() => setShowConfirmation(false)} className="famwell-gradient text-white">
                    Got it, thanks!
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
