"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailFrequency, setEmailFrequency] = useState("daily")
  const [theme, setTheme] = useState("light")

  const handleSaveGeneralSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving general settings")
  }

  const handleSaveNotificationSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving notification settings")
  }

  const handleSaveAppearanceSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving appearance settings")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex flex-col space-y-1">
                  <span>Enable Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive notifications about project updates and messages
                  </span>
                </Label>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-frequency">Email Frequency</Label>
                <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                  <SelectTrigger id="email-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveNotificationSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveAppearanceSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

