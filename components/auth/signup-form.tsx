"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft, Users, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const familyRoles = [
  { value: "parent", label: "Parent/Guardian", icon: "👨‍👩‍👧‍👦" },
  { value: "child", label: "Child/Teen", icon: "🧒" },
  { value: "grandparent", label: "Grandparent", icon: "👴" },
  { value: "sibling", label: "Adult Sibling", icon: "👫" },
]

export function SignupForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    familyCode: "",
    createFamily: true,
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Simulate signup
      localStorage.setItem(
        "famwell-user",
        JSON.stringify({
          name: formData.name,
          role: formData.role,
          avatar: familyRoles.find((r) => r.value === formData.role)?.icon || "👤",
          email: formData.email,
        }),
      )
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-serif font-bold text-gray-900">FamWell</span>
          </div>
          <p className="text-gray-600">Start your family wellness journey</p>
        </div>

        <Card className="famwell-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">
              {step === 1 && "Create Account"}
              {step === 2 && "Choose Your Role"}
              {step === 3 && "Join or Create Family"}
            </CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Sarah Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="rounded-xl"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <Label>Select your role in the family</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {familyRoles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: role.value })}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          formData.role === role.value
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-2xl mb-2">{role.icon}</div>
                        <div className="text-sm font-medium">{role.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, createFamily: true })}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.createFamily
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-sm font-medium">Create New Family</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, createFamily: false })}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        !formData.createFamily
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Mail className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-sm font-medium">Join Existing Family</div>
                    </button>
                  </div>

                  {!formData.createFamily && (
                    <div className="space-y-2">
                      <Label htmlFor="familyCode">Family Invite Code</Label>
                      <Input
                        id="familyCode"
                        placeholder="Enter 6-digit code"
                        value={formData.familyCode}
                        onChange={(e) => setFormData({ ...formData, familyCode: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full famwell-gradient text-white rounded-xl py-3">
                {step === 3 ? "Complete Setup" : "Continue"}
              </Button>
            </form>

            {step > 1 && (
              <Button type="button" variant="ghost" onClick={() => setStep(step - 1)} className="w-full mt-2">
                Back
              </Button>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
