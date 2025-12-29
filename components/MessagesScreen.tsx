"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Agency {
  id: string
  name: string
  avatar: string
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
}

const agencies: Agency[] = [
  { id: "1", name: "BuildRight Inc.", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "EcoConstruct", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "BridgeWorks", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "GreenSpaces Inc.", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "TechTraffic Solutions", avatar: "/placeholder.svg?height=40&width=40" },
]

const initialMessages: Message[] = [
  { id: "1", senderId: "1", content: "Hello! How can we help you today?", timestamp: new Date(2023, 5, 1, 9, 0) },
  {
    id: "2",
    senderId: "user",
    content: "Hi, I have a question about the City Center Renovation project.",
    timestamp: new Date(2023, 5, 1, 9, 5),
  },
  {
    id: "3",
    senderId: "1",
    content: "Of course! What would you like to know?",
    timestamp: new Date(2023, 5, 1, 9, 10),
  },
]

export default function MessagesScreen() {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate agency response
    setTimeout(() => {
      const agencyResponse: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedAgency?.id || "1",
        content: "Thank you for your message. We'll get back to you shortly.",
        timestamp: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, agencyResponse])
    }, 1000)
  }

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="flex flex-1 gap-4 min-h-0">
        <Card className="w-1/4 min-w-[200px]">
          <CardHeader>
            <CardTitle>Agencies</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {agencies.map((agency) => (
                <div
                  key={agency.id}
                  className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${
                    selectedAgency?.id === agency.id ? "bg-secondary" : "hover:bg-secondary/50"
                  }`}
                  onClick={() => setSelectedAgency(agency)}
                >
                  <Avatar>
                    <AvatarImage src={agency.avatar} alt={agency.name} />
                    <AvatarFallback>{agency.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{agency.name}</span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>{selectedAgency ? selectedAgency.name : "Select an agency"}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100vh-16rem)]">
            <ScrollArea className="flex-1 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-2 p-2 rounded-lg ${
                    message.senderId === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-secondary"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  <p>{message.content}</p>
                  <small className="text-xs opacity-50">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </small>
                </div>
              ))}
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

