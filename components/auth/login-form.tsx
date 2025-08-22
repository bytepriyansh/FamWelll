"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Firebase
import { auth, provider } from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Fake login demo
    localStorage.setItem(
      "famwell-user",
      JSON.stringify({
        name: "Sarah Chen",
        role: "Parent",
        avatar: "👩‍💼",
        email: email,
      }),
    )
    router.push("/dashboard")
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      localStorage.setItem(
        "famwell-user",
        JSON.stringify({
          name: user.displayName,
          role: "Parent",
          avatar: user.photoURL,
          email: user.email,
        }),
      )

      router.push("/dashboard")
    } catch (error) {
      console.error("Google sign-in error:", error)
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
          <p className="text-gray-600">Welcome back to your family wellness journey</p>
        </div>

        <Card className="famwell-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your family dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full famwell-gradient text-white rounded-xl py-3">
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <Button
              onClick={handleGoogleSignIn}
              className="w-full cursor-pointer flex items-center justify-center space-x-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-xl py-3 shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google Logo"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Create a family account
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials: any email/password combination</p>
        </div>
      </div>
    </div>
  )
}
