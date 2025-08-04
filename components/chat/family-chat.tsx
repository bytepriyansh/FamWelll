"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Lightbulb, Users, Sparkles, ThumbsUp } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const familyMembers = [
  { id: "sarah", name: "Sarah", avatar: "👩‍💼", role: "Mom", online: true },
  { id: "david", name: "David", avatar: "👨‍💼", role: "Dad", online: false },
  { id: "emma", name: "Emma", avatar: "👧", role: "Daughter", online: true },
  { id: "jake", name: "Jake", avatar: "👦", role: "Son", online: true },
]

const initialMessages = [
  {
    id: 1,
    sender: "emma",
    content: "Had a really good day at school today! 😊",
    timestamp: "2:30 PM",
    reactions: [{ emoji: "❤️", count: 2, users: ["sarah", "jake"] }],
    aiSentiment: "positive",
  },
  {
    id: 2,
    sender: "sarah",
    content: "That's wonderful to hear, Emma! What made it special?",
    timestamp: "2:32 PM",
    reactions: [],
    aiSentiment: "supportive",
  },
  {
    id: 3,
    sender: "emma",
    content: "I got an A on my math test and made a new friend during lunch",
    timestamp: "2:33 PM",
    reactions: [{ emoji: "🎉", count: 1, users: ["sarah"] }],
    aiSentiment: "positive",
  },
  {
    id: 4,
    sender: "jake",
    content: "Nice job sis! Math is tough",
    timestamp: "2:35 PM",
    reactions: [{ emoji: "👏", count: 1, users: ["emma"] }],
    aiSentiment: "supportive",
  },
  {
    id: 5,
    sender: "david",
    content: "Proud of you Emma! Let's celebrate with ice cream tonight",
    timestamp: "3:15 PM",
    reactions: [{ emoji: "🍦", count: 3, users: ["emma", "jake", "sarah"] }],
    aiSentiment: "positive",
  },
]

const aiSuggestions = [
  "That's wonderful news! I'm so proud of you! 🎉",
  "Tell us more about your new friend!",
  "Your hard work in math is really paying off!",
  "How can we celebrate this achievement together?",
]

export function FamilyChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUser = "sarah" // Simulated current user

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (content?: string) => {
    const messageContent = content || newMessage.trim()
    if (!messageContent) return

    const newMsg = {
      id: messages.length + 1,
      sender: currentUser,
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: [],
      aiSentiment: "neutral",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
    setShowAISuggestions(false)

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), 2000)
  }

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find((r) => r.emoji === emoji)
          if (existingReaction) {
            if (existingReaction.users.includes(currentUser)) {
              // Remove reaction
              existingReaction.users = existingReaction.users.filter((u) => u !== currentUser)
              existingReaction.count = existingReaction.users.length
              if (existingReaction.count === 0) {
                msg.reactions = msg.reactions.filter((r) => r.emoji !== emoji)
              }
            } else {
              // Add reaction
              existingReaction.users.push(currentUser)
              existingReaction.count = existingReaction.users.length
            }
          } else {
            // New reaction
            msg.reactions.push({ emoji, count: 1, users: [currentUser] })
          }
        }
        return msg
      }),
    )
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "border-l-green-400"
      case "supportive":
        return "border-l-blue-400"
      case "concerned":
        return "border-l-yellow-400"
      case "negative":
        return "border-l-red-400"
      default:
        return "border-l-gray-300"
    }
  }

  const getMemberInfo = (id: string) => familyMembers.find((m) => m.id === id)

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <Card className="famwell-card border-none shadow-lg mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                  Family Chat
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{familyMembers.filter((m) => m.online).length} online</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {familyMembers.map((member) => (
                  <div key={member.id} className="relative">
                    <div className="text-2xl">{member.avatar}</div>
                    {member.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="flex-1 flex gap-6">
          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <Card className="famwell-card flex-1 flex flex-col">
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => {
                    const member = getMemberInfo(message.sender)
                    const isCurrentUser = message.sender === currentUser

                    return (
                      <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] ${isCurrentUser ? "order-2" : "order-1"}`}>
                          {!isCurrentUser && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{member?.avatar}</span>
                              <span className="text-sm font-medium text-gray-700">{member?.name}</span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                          )}

                          <div
                            className={`relative p-4 rounded-2xl border-l-4 ${getSentimentColor(message.aiSentiment)} ${
                              isCurrentUser
                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white ml-4"
                                : "bg-white shadow-sm"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>

                            {/* Reactions */}
                            {message.reactions.length > 0 && (
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {message.reactions.map((reaction, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleReaction(message.id, reaction.emoji)}
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
                                      reaction.users.includes(currentUser)
                                        ? "bg-purple-100 text-purple-700 ring-1 ring-purple-300"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                  >
                                    <span>{reaction.emoji}</span>
                                    <span>{reaction.count}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Quick Reactions */}
                            <div className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex gap-1 bg-white rounded-full shadow-lg p-1">
                                {["❤️", "👏", "😊", "🎉"].map((emoji) => (
                                  <button
                                    key={emoji}
                                    onClick={() => handleReaction(message.id, emoji)}
                                    className="w-6 h-6 text-xs hover:scale-110 transition-transform"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {isCurrentUser && (
                            <div className="text-right mt-1">
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2">
                      <div className="text-lg">👦</div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-100 p-4">
                  {showAISuggestions && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">AI Suggestions</span>
                      </div>
                      <div className="space-y-2">
                        {aiSuggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(suggestion)}
                            className="block w-full text-left p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            "{suggestion}"
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="rounded-full pr-12"
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                        onClick={() => setShowAISuggestions(!showAISuggestions)}
                      >
                        <Sparkles className="w-4 h-4 text-purple-600" />
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleSendMessage()}
                      className="famwell-gradient text-white rounded-full px-6"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Helper Panel */}
          <div className="w-80 space-y-4">
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI Communication Helper
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-2">
                    <ThumbsUp className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Positive Tone Detected</p>
                      <p className="text-xs text-green-600">
                        The conversation has a supportive and encouraging atmosphere
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Suggested Responses:</h4>
                  {aiSuggestions.slice(0, 3).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNewMessage(suggestion)}
                      className="block w-full text-left p-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      "{suggestion}"
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Communication Tips:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Ask follow-up questions to show interest</li>
                    <li>• Use emojis to add warmth to messages</li>
                    <li>• Acknowledge achievements with specific praise</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Family Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Messages Today</span>
                  <Badge className="bg-blue-100 text-blue-800">23</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Most Active</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">👧</span>
                    <span className="font-medium">Emma</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Mood Score</span>
                  <Badge className="bg-green-100 text-green-800">Positive</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
