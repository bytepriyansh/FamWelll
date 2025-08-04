"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  Plus,
  Search,
  Heart,
  Frown,
  Smile,
  Meh,
  Angry,
  Calendar,
  Lock,
  Users,
  Lightbulb,
  Edit3,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const moodTags = [
  { name: "Gratitude", icon: Heart, color: "bg-pink-100 text-pink-800" },
  { name: "Stress", icon: Frown, color: "bg-red-100 text-red-800" },
  { name: "Hope", icon: Smile, color: "bg-green-100 text-green-800" },
  { name: "Anger", icon: Angry, color: "bg-red-100 text-red-800" },
  { name: "Calm", icon: Meh, color: "bg-blue-100 text-blue-800" },
]

const journalEntries = [
  {
    id: 1,
    title: "A Great Day at School",
    content:
      "Today was amazing! I got an A on my math test and made a new friend during lunch. Her name is Sophie and she loves reading just like me. We talked about our favorite books and decided to start a mini book club together. I'm so grateful for days like this that remind me how wonderful life can be.",
    mood: "Hope",
    tags: ["Gratitude", "Hope"],
    date: "2024-01-15",
    time: "4:30 PM",
    isPrivate: false,
    reactions: [{ emoji: "❤️", count: 3 }],
  },
  {
    id: 2,
    title: "Feeling Overwhelmed",
    content:
      "Had a tough day today. So many assignments due this week and I'm feeling really stressed about keeping up. Sometimes I wonder if I'm good enough. But I know this feeling will pass. Maybe I should talk to Mom about getting some help with time management.",
    mood: "Stress",
    tags: ["Stress"],
    date: "2024-01-14",
    time: "8:15 PM",
    isPrivate: true,
    reactions: [],
  },
  {
    id: 3,
    title: "Family Game Night",
    content:
      "We had the best family game night tonight! Dad was so competitive during Monopoly and Jake kept making us all laugh with his silly voices. These moments make me realize how lucky I am to have such a loving family. Even when we're all busy, we always find time for each other.",
    mood: "Gratitude",
    tags: ["Gratitude", "Calm"],
    date: "2024-01-13",
    time: "9:45 PM",
    isPrivate: false,
    reactions: [
      { emoji: "😊", count: 2 },
      { emoji: "❤️", count: 1 },
    ],
  },
]

const journalPrompts = [
  "What made you smile today?",
  "Describe a moment when you felt proud of yourself",
  "What's one thing you're grateful for right now?",
  "How did you show kindness to someone today?",
  "What challenge did you overcome recently?",
  "Write about a person who inspires you",
]

export function Journal() {
  const [entries, setEntries] = useState(journalEntries)
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "",
    tags: [] as string[],
    isPrivate: true,
  })

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || entry.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return

    const entry = {
      id: entries.length + 1,
      ...newEntry,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: [],
    }

    setEntries([entry, ...entries])
    setNewEntry({ title: "", content: "", mood: "", tags: [], isPrivate: true })
    setShowNewEntry(false)
  }

  const toggleTag = (tagName: string) => {
    setNewEntry((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagName) ? prev.tags.filter((t) => t !== tagName) : [...prev.tags, tagName],
    }))
  }

  const getMoodIcon = (mood: string) => {
    const tag = moodTags.find((t) => t.name === mood)
    return tag ? tag.icon : Meh
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
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  Private Journal
                </CardTitle>
                <CardDescription className="text-base">Your safe space for reflection and growth</CardDescription>
              </div>
              <Button onClick={() => setShowNewEntry(true)} className="famwell-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter */}
            <Card className="famwell-card">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search your entries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={selectedTag === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(null)}
                      className="rounded-full"
                    >
                      All
                    </Button>
                    {moodTags.map((tag) => (
                      <Button
                        key={tag.name}
                        variant={selectedTag === tag.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                        className="rounded-full"
                      >
                        <tag.icon className="w-3 h-3 mr-1" />
                        {tag.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journal Entries */}
            <div className="space-y-4">
              {filteredEntries.map((entry) => {
                const MoodIcon = getMoodIcon(entry.mood)

                return (
                  <Card key={entry.id} className="famwell-card hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                            <div className="flex items-center gap-1">
                              {entry.isPrivate ? (
                                <Lock className="w-4 h-4 text-gray-400" />
                              ) : (
                                <Users className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {entry.date} at {entry.time}
                            </div>
                            {entry.mood && (
                              <div className="flex items-center gap-1">
                                <MoodIcon className="w-4 h-4" />
                                {entry.mood}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4">{entry.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                          {entry.tags.map((tag) => {
                            const tagInfo = moodTags.find((t) => t.name === tag)
                            return (
                              <Badge key={tag} className={tagInfo?.color || "bg-gray-100 text-gray-800"}>
                                {tag}
                              </Badge>
                            )
                          })}
                        </div>

                        {entry.reactions.length > 0 && (
                          <div className="flex gap-2">
                            {entry.reactions.map((reaction, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-sm">
                                <span>{reaction.emoji}</span>
                                <span className="text-gray-500">{reaction.count}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Writing Prompts */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Writing Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {journalPrompts.slice(0, 4).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setNewEntry((prev) => ({ ...prev, content: prompt + "\n\n" }))
                      setShowNewEntry(true)
                    }}
                    className="block w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                  >
                    "{prompt}"
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Journal Stats */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Entries</span>
                  <Badge className="bg-blue-100 text-blue-800">{entries.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <Badge className="bg-green-100 text-green-800">5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Streak</span>
                  <Badge className="bg-purple-100 text-purple-800">7 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Most Used Tag</span>
                  <Badge className="bg-pink-100 text-pink-800">Gratitude</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Mood Insights */}
            <Card className="famwell-card">
              <CardHeader>
                <CardTitle className="text-lg">Mood Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Positive Trend</p>
                  <p className="text-xs text-green-600">Your mood has been improving over the past week</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Reflection Habit</p>
                  <p className="text-xs text-blue-600">You write most often in the evenings</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* New Entry Modal */}
        {showNewEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="famwell-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
                <CardDescription>Express your thoughts and feelings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Give your entry a title..."
                    value={newEntry.title}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="What's on your mind?"
                    value={newEntry.content}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, content: e.target.value }))}
                    className="rounded-xl min-h-[200px] resize-none"
                  />
                </div>

                <div>
                  <Label>Mood Tags</Label>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {moodTags.map((tag) => (
                      <button
                        key={tag.name}
                        onClick={() => toggleTag(tag.name)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all ${
                          newEntry.tags.includes(tag.name)
                            ? "bg-purple-100 text-purple-800 ring-2 ring-purple-300"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <tag.icon className="w-3 h-3" />
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="privacy"
                    checked={!newEntry.isPrivate}
                    onCheckedChange={(checked) => setNewEntry((prev) => ({ ...prev, isPrivate: !checked }))}
                  />
                  <Label htmlFor="privacy" className="text-sm">
                    Share with family
                  </Label>
                  <div className="text-xs text-gray-500">
                    {newEntry.isPrivate ? "(Private)" : "(Visible to family)"}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleSaveEntry}
                    className="famwell-gradient text-white flex-1"
                    disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                  >
                    Save Entry
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewEntry(false)} className="flex-1">
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
