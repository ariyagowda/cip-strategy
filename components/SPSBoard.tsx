"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, LayoutGrid, TableIcon, Maximize2, Minimize2, X } from "lucide-react"
import TableView from "./TableView"
import UpdateModal from "./UpdateModal"

interface Project {
  id: string
  name: string
  status: string
  priority: string
  owner: string
  nextAction: string
  agency: string
  budget: string
  date: string
  description: string
}

const initialColumns = [
  { id: "backlog", title: "Backlog" },
  { id: "planning", title: "Planning" },
  { id: "inProgress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
]

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "City Center Renovation",
    status: "inProgress",
    priority: "High",
    owner: "John Smith",
    nextAction: "Stakeholder meeting",
    agency: "BuildRight Inc.",
    budget: "$100M",
    date: "2025-03-15",
    description: "Major renovation of downtown area including infrastructure upgrades",
  },
  {
    id: "2",
    name: "Green Office Complex",
    status: "planning",
    priority: "Medium",
    owner: "Jane Doe",
    nextAction: "Finalize design",
    agency: "EcoConstruct",
    budget: "$50M",
    date: "2025-06-01",
    description: "Construction of an eco-friendly office complex",
  },
  {
    id: "3",
    name: "Harbor Bridge Repair",
    status: "backlog",
    priority: "High",
    owner: "Bob Johnson",
    nextAction: "Structural assessment",
    agency: "BridgeWorks",
    budget: "$75M",
    date: "2025-08-15",
    description: "Major repair and reinforcement of the harbor bridge",
  },
  {
    id: "4",
    name: "City Park Redesign",
    status: "review",
    priority: "Low",
    owner: "Alice Brown",
    nextAction: "Community feedback",
    agency: "GreenSpaces Inc.",
    budget: "$10M",
    date: "2025-04-30",
    description: "Redesign and renovation of the central city park",
  },
  {
    id: "5",
    name: "Smart Traffic System",
    status: "done",
    priority: "Medium",
    owner: "Charlie Davis",
    nextAction: "System maintenance",
    agency: "TechTraffic Solutions",
    budget: "$30M",
    date: "2024-12-31",
    description: "Implementation of a city-wide smart traffic management system",
  },
]

export default function SPSBoard() {
  const [view, setView] = useState<"kanban" | "table">("table")
  const [projects, setProjects] = useState(sampleProjects)
  const [updateModal, setUpdateModal] = useState({
    isOpen: false,
    projectId: "",
    projectName: "",
    fromStatus: "",
    toStatus: "",
  })
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(true)
  const [aiAssistantSize, setAiAssistantSize] = useState<"small" | "large">("large")
  const [aiAssistantWidth, setAiAssistantWidth] = useState(320)
  const resizeRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result
    const updatedProjects = Array.from(projects)
    const [movedProject] = updatedProjects.splice(
      updatedProjects.findIndex((p) => p.id === draggableId),
      1,
    )
    movedProject.status = destination.droppableId
    updatedProjects.splice(destination.index, 0, movedProject)

    setProjects(updatedProjects)

    if (source.droppableId !== destination.droppableId) {
      setUpdateModal({
        isOpen: true,
        projectId: draggableId,
        projectName: movedProject.name,
        fromStatus: source.droppableId,
        toStatus: destination.droppableId,
      })
    }
  }

  const handleStatusUpdate = (update: string) => {
    // Here you would typically save the update to your backend
    console.log(`Status update for project ${updateModal.projectId}: ${update}`)
  }

  const handleUpdateProject = (projectId: string, field: string, value: any) => {
    const newProjects = projects.map((project) => (project.id === projectId ? { ...project, [field]: value } : project))
    setProjects(newProjects)
  }

  const toggleAiAssistantSize = () => {
    setAiAssistantSize(aiAssistantSize === "large" ? "small" : "large")
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
  }, [isResizing, resize])

  if (view === "table") {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SPS - Strategic Planning System</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setView("kanban")}>
              <LayoutGrid className="mr-2 h-4 w-4" />
              Kanban View
            </Button>
            <Button
              onClick={() =>
                setProjects([
                  ...projects,
                  {
                    id: Date.now().toString(),
                    name: "New Project",
                    status: "backlog",
                    priority: "Medium",
                    owner: "",
                    nextAction: "",
                    agency: "",
                    budget: "",
                    date: "",
                    description: "",
                  },
                ])
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </div>
        </div>
        <TableView projects={projects} onUpdateProject={handleUpdateProject} />
      </div>
    )
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">SPS - Strategic Planning System</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setView("table")}>
            <TableIcon className="mr-2 h-4 w-4" /> Table View
          </Button>
          <Button
            onClick={() =>
              setProjects([
                ...projects,
                {
                  id: Date.now().toString(),
                  name: "New Project",
                  status: "backlog",
                  priority: "Medium",
                  owner: "",
                  nextAction: "",
                  agency: "",
                  budget: "",
                  date: "",
                  description: "",
                },
              ])
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 overflow-hidden">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 h-full">
              {initialColumns.map((column) => (
                <Droppable key={column.id} droppableId={column.id}>
                  {(provided) => (
                    <Card className="flex flex-col h-[calc(100vh-12rem)]">
                      <CardHeader>
                        <CardTitle className="flex justify-between">
                          {column.title}
                          <Badge variant="secondary">{projects.filter((p) => p.status === column.id).length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-auto">
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                          {projects
                            .filter((project) => project.status === column.id)
                            .map((project, index) => (
                              <Draggable key={project.id} draggableId={project.id} index={index}>
                                {(provided) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-4 space-y-2"
                                  >
                                    <Input
                                      value={project.name}
                                      onChange={(e) => handleUpdateProject(project.id, "name", e.target.value)}
                                      className="font-semibold"
                                    />
                                    <div className="text-sm text-gray-500">{project.agency}</div>
                                    <div className="text-sm">{project.description}</div>
                                    <div className="flex justify-between items-center">
                                      <Badge variant="outline">{project.budget}</Badge>
                                      <Badge
                                        className={
                                          project.priority === "High"
                                            ? "bg-green-100 text-green-800"
                                            : project.priority === "Medium"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-red-100 text-red-800"
                                        }
                                      >
                                        {project.priority}
                                      </Badge>
                                    </div>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>

        {isAiAssistantOpen && (
          <Card
            className={`flex-shrink-0 flex flex-col relative`}
            style={{ width: `${aiAssistantWidth}px`, minWidth: "200px", maxWidth: "600px" }}
            ref={resizeRef}
          >
            <div className="absolute left-0 top-0 w-1 h-full cursor-ew-resize" onMouseDown={startResizing}></div>
            <CardHeader className="flex flex-row items-center justify-between py-2">
              <CardTitle className="text-sm">AI Assistant</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAiAssistantSize(aiAssistantSize === "large" ? "small" : "large")}
                >
                  {aiAssistantSize === "large" ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsAiAssistantOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              {aiAssistantSize === "large" ? (
                <div className="space-y-2">
                  <p>How can I assist you with your projects today?</p>
                  {/* Add more AI assistant content here */}
                </div>
              ) : (
                <div className="text-center">
                  <Button variant="ghost" onClick={() => setAiAssistantSize("large")}>
                    Expand
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {!isAiAssistantOpen && (
          <Button variant="outline" onClick={() => setIsAiAssistantOpen(true)}>
            Open AI Assistant
          </Button>
        )}
      </div>

      <UpdateModal
        isOpen={updateModal.isOpen}
        onClose={() => setUpdateModal({ ...updateModal, isOpen: false })}
        onUpdate={handleStatusUpdate}
        projectName={updateModal.projectName}
        fromStatus={updateModal.fromStatus}
        toStatus={updateModal.toStatus}
      />
    </div>
  )
}

