"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Phone,
  Heart,
  Users,
  AlertTriangle,
  Headphones,
  MessageCircle,
  Wind,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  PauseCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const emergencyContacts = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support",
    type: "crisis",
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "24/7 text-based crisis support",
    type: "text",
  },
  {
    name: "Dr. Sarah Johnson",
    number: "(555) 123-4567",
    description: "Family Therapist",
    type: "therapist",
  },
  {
    name: "Mom (Sarah)",
    number: "(555) 987-6543",
    description: "Always available",
    type: "family",
  },
]

const breathingExercises = [
  {
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale for 8",
    duration: 60,
    steps: [
      "Inhale through nose for 4 counts",
      "Hold breath for 7 counts",
      "Exhale through mouth for 8 counts",
      "Repeat 3-4 times",
    ],
  },
  {
    name: "Box Breathing",
    description: "Equal counts for inhale, hold, exhale, hold",
    duration: 80,
    steps: ["Inhale for 4 counts", "Hold for 4 counts", "Exhale for 4 counts", "Hold for 4 counts"],
  },
]

const copingStrategies = [
  {
    title: "Grounding Technique (5-4-3-2-1)",
    description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
    icon: "🌱",
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Tense and release each muscle group from toes to head",
    icon: "💪",
  },
  {
    title: "Mindful Observation",
    description: "Focus intently on a single object for 2-3 minutes",
    icon: "👁️",
  },
  {
    title: "Cold Water Technique",
    description: "Splash cold water on face or hold ice cubes",
    icon: "❄️",
  },
]

export function CrisisSupport() {
  const [showBreathingExercise, setShowBreathingExercise] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0])
  const [isExerciseActive, setIsExerciseActive] = useState(false)
  const [exerciseStep, setExerciseStep] = useState(0)
  const [exerciseTimer, setExerciseTimer] = useState(0)
  const [showCrisisModal, setShowCrisisModal] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isExerciseActive && exerciseTimer > 0) {
      interval = setInterval(() => {
        setExerciseTimer((prev) => {
          if (prev <= 1) {
            setIsExerciseActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isExerciseActive, exerciseTimer])

  const startBreathingExercise = (exercise: (typeof breathingExercises)[0]) => {
    setSelectedExercise(exercise)
    setExerciseTimer(exercise.duration)
    setExerciseStep(0)
    setIsExerciseActive(true)
    setShowBreathingExercise(true)
  }

  const handleCrisisAlert = () => {
    setShowCrisisModal(true)
    // Simulate sending alert to family members
    console.log("Crisis alert sent to family members")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Crisis Alert Banner */}
        <Card className="famwell-card border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-red-900">Need Immediate Help?</h2>
                  <p className="text-red-700">If you're in crisis, you're not alone. Help is available 24/7.</p>
                </div>
              </div>
              <Button
                onClick={handleCrisisAlert}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold"
              >
                I'm in Crisis
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Header */}
        <Card className="famwell-card border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-serif">
              <Shield className="w-6 h-6 text-blue-600" />
              Crisis Support Center
            </CardTitle>
            <CardDescription className="text-base">
              Immediate support tools and resources for mental health crises
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Immediate Actions */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Immediate Support Actions
                </CardTitle>
                <CardDescription>Quick access to crisis intervention tools</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => startBreathingExercise(breathingExercises[0])}
                  className="h-24 flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200"
                  variant="outline"
                >
                  <Wind className="w-6 h-6" />
                  <span className="font-semibold">Breathing Exercise</span>
                  <span className="text-xs">Calm your mind</span>
                </Button>

                <Button
                  onClick={() => setShowCrisisModal(true)}
                  className="h-24 flex flex-col items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-2 border-green-200"
                  variant="outline"
                >
                  <Users className="w-6 h-6" />
                  <span className="font-semibold">Contact Family</span>
                  <span className="text-xs">Reach out for support</span>
                </Button>

                <Button
                  className="h-24 flex flex-col items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-2 border-purple-200"
                  variant="outline"
                >
                  <Headphones className="w-6 h-6" />
                  <span className="font-semibold">Call Therapist</span>
                  <span className="text-xs">Professional help</span>
                </Button>

                <Button
                  className="h-24 flex flex-col items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border-2 border-orange-200"
                  variant="outline"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-semibold">Crisis Chat</span>
                  <span className="text-xs">Text-based support</span>
                </Button>
              </CardContent>
            </Card>

            {/* Coping Strategies */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle>Coping Strategies</CardTitle>
                <CardDescription>Techniques to help manage overwhelming feelings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {copingStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{strategy.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{strategy.title}</h3>
                        <p className="text-sm text-gray-600">{strategy.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Safety Plan */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle>Personal Safety Plan</CardTitle>
                <CardDescription>Your personalized crisis response plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Warning Signs Identified</h4>
                      <p className="text-sm text-green-600">Feeling overwhelmed, isolation, negative thoughts</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Coping Strategies Listed</h4>
                      <p className="text-sm text-blue-600">Breathing exercises, calling family, journaling</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-800">Support Network Ready</h4>
                      <p className="text-sm text-purple-600">Family contacts and therapist information saved</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full famwell-gradient text-white">Update Safety Plan</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{contact.name}</h4>
                      <Badge
                        className={
                          contact.type === "crisis"
                            ? "bg-red-100 text-red-800"
                            : contact.type === "therapist"
                              ? "bg-blue-100 text-blue-800"
                              : contact.type === "family"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                        }
                      >
                        {contact.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{contact.description}</p>
                    <Button
                      size="sm"
                      className="w-full text-xs"
                      variant={contact.type === "crisis" ? "destructive" : "outline"}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      {contact.number}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Support Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Crisis Calls Answered</span>
                  <Badge className="bg-green-100 text-green-800">99.8%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Response Time</span>
                  <Badge className="bg-blue-100 text-blue-800">30 sec</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">24/7 Availability</span>
                  <Badge className="bg-purple-100 text-purple-800">Always</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Breathing Exercises */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-blue-600" />
                  Breathing Exercises
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {breathingExercises.map((exercise, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">{exercise.name}</h4>
                    <p className="text-xs text-blue-700 mb-2">{exercise.description}</p>
                    <Button
                      size="sm"
                      onClick={() => startBreathingExercise(exercise)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <PlayCircle className="w-3 h-3 mr-1" />
                      Start ({exercise.duration}s)
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Support Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Completed breathing exercise</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Updated safety plan</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Contacted family member</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Breathing Exercise Modal */}
        {showBreathingExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="famwell-card w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle>{selectedExercise.name}</CardTitle>
                <CardDescription>{selectedExercise.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{exerciseTimer}</div>
                  <div className="text-sm text-gray-600">seconds remaining</div>
                </div>

                <Progress
                  value={((selectedExercise.duration - exerciseTimer) / selectedExercise.duration) * 100}
                  className="h-2"
                />

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Steps:</h4>
                  {selectedExercise.steps.map((step, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${index === exerciseStep ? "bg-blue-500" : "bg-gray-300"}`}
                      ></div>
                      {step}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setIsExerciseActive(!isExerciseActive)} className="flex-1" variant="outline">
                    {isExerciseActive ? (
                      <>
                        <PauseCircle className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button onClick={() => setShowBreathingExercise(false)} variant="outline" className="flex-1">
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Crisis Modal */}
        {showCrisisModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="famwell-card w-full max-w-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-red-900">Crisis Support Activated</CardTitle>
                <CardDescription>Your family has been notified. Help is on the way.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">Immediate Actions Taken:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✓ Family members have been alerted</li>
                    <li>✓ Emergency contacts have been notified</li>
                    <li>✓ Crisis support team has been contacted</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 988
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Text Crisis Line
                  </Button>
                </div>

                <Button onClick={() => setShowCrisisModal(false)} variant="outline" className="w-full">
                  I'm Safe Now
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
