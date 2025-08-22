"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Brain,
  Users,
  MessageCircle,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "Trust Graph",
    description: "Visualize family emotional connections in real-time",
  },
  {
    icon: Sparkles,
    title: "Smart Nudges",
    description: "AI-powered gentle reminders to check on loved ones",
  },
  {
    icon: Heart,
    title: "Mood Tracking",
    description: "Track individual and family emotional wellness",
  },
  {
    icon: MessageCircle,
    title: "Private Journals",
    description: "Safe spaces for reflection and growth",
  },
  {
    icon: Users,
    title: "Family Chat",
    description: "Empathetic communication tools",
  },
  {
    icon: Shield,
    title: "Crisis Support",
    description: "Immediate help when you need it most",
  },
];

const testimonials = [
  {
    name: "Sneha Kapoor",
    role: "Mother of 3",
    content:
      "FamWell helped us understand each other better. The trust graph showed us patterns we never noticed.",
    rating: 5,
  },
  {
    name: "Priyansh Narang",
    role: "Teenager",
    content:
      "Finally, a way to let my parents know how I'm feeling without the awkward conversations.",
    rating: 5,
  },
  {
    name: "Dr. Sigma Man",
    role: "Family Therapist",
    content:
      "This platform bridges the gap between therapy sessions. My families love the insights.",
    rating: 5,
  },
];

export function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-gray-900">
              FamWell
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Stories
            </a>

            <Link href="/auth/login">
              <Button variant="outline" className="rounded-full bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
          🎉 AI - Powered Family Wellness
        </Badge>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          FamWell: Nurturing Family
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {" "}
            Mental Wellness
          </span>
          <br />
          Through AI
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Track moods. Build trust. Nudge with care. The world's first
          AI-powered platform designed for entire families, not just
          individuals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="famwell-gradient cursor-pointer text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Try Famwell
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Feature Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="famwell-card hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Everything Your Family Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed by mental health experts and powered
              by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="famwell-card hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="py-24 bg-gradient-to-b from-white to-purple-50 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
            >
              Families Love FamWell
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Real stories from real families
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Card className="famwell-card shadow-xl rounded-2xl border border-purple-100 bg-white">
                  <CardContent className="p-10 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current drop-shadow-sm"
                        />
                      ))}
                    </div>
                    <blockquote className="text-2xl text-gray-700 mb-6 italic leading-relaxed">
                      “{testimonials[current].content}”
                    </blockquote>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {testimonials[current].name}
                      </div>
                      <div className="text-gray-600">
                        {testimonials[current].role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-purple-600 scale-110 shadow-md"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative background blur */}
        <div className="absolute -top-20 left-10 w-40 h-40 bg-purple-300 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-pink-300 opacity-20 rounded-full blur-3xl" />
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-serif font-bold">FamWell</span>
              </div>
              <p className="text-gray-400">
                Nurturing family mental wellness through AI-powered insights and
                care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Crisis Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FamWell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
