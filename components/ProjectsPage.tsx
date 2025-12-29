"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronRight, Search, Info } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import React from "react"
import ProjectDetailsModal from "./ProjectDetailsModal"

interface Project {
  id: number
  agency: string
  name: string
  description: string
  date: string
  budget: string
  fit: "High" | "Medium" | "Low"
  category: string
  subcategory: string
  department: string
  location: string
  projectManager: string
  projectNumber: string
  fullDescription: string
  fundingStrategy: string
  programmedFunding: string
  meansOfFinancing: string
  imageUrl?: string
}

interface ProjectGroup {
  id: number
  name: string
  projects: Project[]
}

const projectGroups: ProjectGroup[] = [
  {
    id: 1,
    name: "Infrastructure Projects",
    projects: [
      {
        id: 1,
        agency: "BuildRight Inc.",
        name: "City Center Renovation",
        description:
          "Comprehensive renovation of the city's central district, focusing on modernization and sustainability.",
        date: "2025-03-15",
        budget: "$1M-$5M",
        fit: "High",
        category: "Urban Development",
        subcategory: "City Center",
        department: "Urban Planning",
        location: "Downtown",
        projectManager: "Jane Smith",
        projectNumber: "URB-2025-001",
        fullDescription:
          "This project aims to revitalize the city center through comprehensive renovations, including infrastructure upgrades, green spaces, and modernized public facilities.",
        fundingStrategy: "Public-Private Partnership",
        programmedFunding: "$4.5M",
        meansOfFinancing: "Municipal Bonds and Private Investment",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 2,
        agency: "EcoConstruct",
        name: "Green Office Complex",
        description: "Construction of an eco-friendly office complex with state-of-the-art energy efficiency features.",
        date: "2025-04-22",
        budget: "$5M-$10M",
        fit: "Medium",
        category: "Commercial",
        subcategory: "Office Buildings",
        department: "Economic Development",
        location: "Business District",
        projectManager: "Michael Johnson",
        projectNumber: "COM-2025-002",
        fullDescription:
          "Development of a cutting-edge, environmentally friendly office complex featuring solar panels, rainwater harvesting, and energy-efficient design to set new standards in sustainable commercial architecture.",
        fundingStrategy: "Private Investment with Green Building Incentives",
        programmedFunding: "$8M",
        meansOfFinancing: "Corporate Funding and Green Building Grants",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: 2,
    name: "Transportation Projects",
    projects: [
      {
        id: 3,
        agency: "BridgeWorks",
        name: "Harbor Bridge Repair",
        description:
          "Critical structural repairs and upgrades to the main harbor bridge to ensure long-term safety and reliability.",
        date: "2025-05-10",
        budget: "$2M-$5M",
        fit: "High",
        category: "Transportation",
        subcategory: "Bridge Repair",
        department: "Public Works",
        location: "Harbor District",
        projectManager: "Robert Lee",
        projectNumber: "TRA-2025-003",
        fullDescription:
          "Comprehensive structural repairs and modernization of the main harbor bridge, including seismic retrofitting, deck replacement, and improved pedestrian and bicycle lanes to enhance safety and extend the bridge's lifespan.",
        fundingStrategy: "State and Federal Transportation Grants",
        programmedFunding: "$4.2M",
        meansOfFinancing: "Transportation Infrastructure Funds",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 4,
        agency: "RoadMasters",
        name: "Highway Expansion Project",
        description:
          "Expansion of the major highway to reduce traffic congestion and improve connectivity between key urban areas.",
        date: "2025-07-12",
        budget: "$10M+",
        fit: "Medium",
        category: "Transportation",
        subcategory: "Highway Development",
        department: "Transportation",
        location: "Metropolitan Area",
        projectManager: "Sarah Thompson",
        projectNumber: "TRA-2025-004",
        fullDescription:
          "Major expansion of the metropolitan highway system, adding new lanes, improving interchanges, and implementing smart traffic management systems to alleviate congestion and enhance regional connectivity.",
        fundingStrategy: "Public-Private Partnership and Toll Revenue",
        programmedFunding: "$15M",
        meansOfFinancing: "State Funds, Federal Grants, and Private Investment",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
]

const GroupRow = ({ group, selectedProjects, onSelectGroup, onToggleGroup, expanded, visibleHeaders, children }) => {
  const colSpan = visibleHeaders.includes(group.id) ? 7 : 1

  return (
    <>
      <TableRow>
        <TableCell colSpan={colSpan} className="p-0">
          <div className="flex items-center gap-2 p-4">
            <Checkbox
              checked={group.projects.every((p) => selectedProjects.includes(p.id))}
              onCheckedChange={() => onSelectGroup(group.id)}
            />
            <button onClick={() => onToggleGroup(group.id)} className="flex items-center gap-2 flex-1 text-left">
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="font-medium">{group.name}</span>
            </button>
          </div>
        </TableCell>
      </TableRow>
      {expanded && children}
    </>
  )
}

export default function ProjectsPage() {
  const router = useRouter()
  const [selectedProjects, setSelectedProjects] = useState<number[]>([])
  const [expandedGroups, setExpandedGroups] = useState<number[]>([])
  const [visibleHeaders, setVisibleHeaders] = useState<number[]>([])
  const [chatMessages, setChatMessages] = useState<{ text: string; sender: "user" | "ai" }[]>([
    { text: "Hello! I'm your AI assistant. How can I help you find the right projects?", sender: "ai" },
  ])
  const [messageInput, setMessageInput] = useState("")
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(true)
  const [aiAssistantWidth, setAiAssistantWidth] = useState(320)
  const resizeRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectProject = (projectId: number) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const handleSelectGroup = (groupId: number) => {
    const group = projectGroups.find((g) => g.id === groupId)
    if (!group) return

    const groupProjectIds = group.projects.map((p) => p.id)
    const allSelected = groupProjectIds.every((id) => selectedProjects.includes(id))

    setSelectedProjects((prev) =>
      allSelected ? prev.filter((id) => !groupProjectIds.includes(id)) : [...new Set([...prev, ...groupProjectIds])],
    )
  }

  const handleSelectAll = () => {
    const allProjectIds = projectGroups.flatMap((group) => group.projects.map((p) => p.id))
    const allSelected = allProjectIds.every((id) => selectedProjects.includes(id))

    setSelectedProjects(allSelected ? [] : allProjectIds)
  }

  const toggleGroup = (groupId: number) => {
    setExpandedGroups((prev) => {
      const newExpandedGroups = prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]

      setVisibleHeaders(newExpandedGroups)
      return newExpandedGroups
    })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    setChatMessages((prev) => [...prev, { text: messageInput, sender: "user" }])
    setMessageInput("")

    // Simulate AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          text: "I'll help you analyze these projects. What specific criteria are you looking for?",
          sender: "ai",
        },
      ])
    }, 1000)
  }

  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true)
  }

  const stopResizing = () => {
    setIsResizing(false)
  }

  const resize = (e: MouseEvent) => {
    if (isResizing && resizeRef.current) {
      const newWidth = e.clientX - resizeRef.current.getBoundingClientRect().left
      setAiAssistantWidth(Math.max(200, Math.min(newWidth, 600)))
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [isResizing, resizeRef]) // Added resizeRef to dependencies

  const handleFitChange = (projectId: number, newFit: "High" | "Medium" | "Low") => {
    const updatedGroups = projectGroups.map((group) => ({
      ...group,
      projects: group.projects.map((project) => (project.id === projectId ? { ...project, fit: newFit } : project)),
    }))
    // In a real application, you would update the state here
    console.log("Updated groups:", updatedGroups)
  }

  const filteredProjectGroups = projectGroups
    .map((group) => ({
      ...group,
      projects: group.projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((group) => group.projects.length > 0)

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-4">
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Projects for You</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleSelectAll}>
                {selectedProjects.length === projectGroups.flatMap((g) => g.projects).length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
              <Button onClick={() => router.push("/my-projects")} disabled={selectedProjects.length === 0}>
                Add Selected ({selectedProjects.length})
              </Button>
              <Button variant="outline" onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}>
                {isAiAssistantOpen ? "Close AI Assistant" : "Open AI Assistant"}
              </Button>
            </div>
          </div>

          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <Card className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <Table>
                {visibleHeaders.length > 0 && (
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]"></TableHead>
                      <TableHead>Agency</TableHead>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Project Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Fit</TableHead>
                      <TableHead>More Details</TableHead>
                    </TableRow>
                  </TableHeader>
                )}
                <TableBody>
                  {filteredProjectGroups.map((group) => (
                    <React.Fragment key={group.id}>
                      <GroupRow
                        group={group}
                        selectedProjects={selectedProjects}
                        onSelectGroup={handleSelectGroup}
                        onToggleGroup={toggleGroup}
                        expanded={expandedGroups.includes(group.id)}
                        visibleHeaders={visibleHeaders}
                      >
                        {group.projects.map((project) => (
                          <TableRow key={project.id} className="hover:bg-gray-50">
                            <TableCell>
                              <Checkbox
                                checked={selectedProjects.includes(project.id)}
                                onCheckedChange={() => handleSelectProject(project.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{project.agency}</TableCell>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell>{project.date}</TableCell>
                            <TableCell>{project.budget}</TableCell>
                            <TableCell>
                              <Input
                                value={project.fit}
                                onChange={(e) =>
                                  handleFitChange(project.id, e.target.value as "High" | "Medium" | "Low")
                                }
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedProject(project)}>
                                <Info className="h-4 w-4" />
                                <span className="sr-only">More Details</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </GroupRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </motion.div>
      </div>

      {isAiAssistantOpen && (
        <Card
          className="flex flex-col relative"
          style={{ width: `${aiAssistantWidth}px`, minWidth: "200px", maxWidth: "600px" }}
          ref={resizeRef}
        >
          <div className="absolute left-0 top-0 w-1 h-full cursor-ew-resize" onMouseDown={startResizing}></div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>AI Assistant</span>
              <Button variant="ghost" size="sm" onClick={() => setIsAiAssistantOpen(false)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button type="submit" size="sm">
                Send
              </Button>
            </form>
          </div>
        </Card>
      )}

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSave={(updatedProject) => {
          // Here you would typically update your state or send the data to your backend
          console.log("Saving updated project:", updatedProject)
          // Update the project in the local state
          const updatedGroups = projectGroups.map((group) => ({
            ...group,
            projects: group.projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)),
          }))
          // You would then update your state with these updatedGroups
          console.log("Updated groups:", updatedGroups)
          setSelectedProject(null)
        }}
      />
    </div>
  )
}

