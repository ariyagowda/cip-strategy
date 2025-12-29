"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import ProjectCard from "./ProjectCard"

interface Project {
  id: number
  agency: string
  name: string
  date: string
  details: string
  status: "todo" | "inProgress" | "done"
  owner?: string
  priority?: "high" | "medium" | "low"
}

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
]

export default function KanbanBoard() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const addedProjectIds = JSON.parse(localStorage.getItem("addedProjects") || "[]")
    const projectsData: Project[] = [
      {
        id: 1,
        agency: "BuildRight Inc.",
        name: "City Center Renovation",
        date: "2025-03-15",
        details: "Major renovation of downtown area",
        status: "todo",
      },
      {
        id: 2,
        agency: "EcoConstruct",
        name: "Green Office Complex",
        date: "2025-04-22",
        details: "Eco-friendly office building construction",
        status: "todo",
      },
      {
        id: 3,
        agency: "BridgeWorks",
        name: "Harbor Bridge Repair",
        date: "2025-05-10",
        details: "Structural repairs to harbor bridge",
        status: "todo",
      },
      {
        id: 4,
        agency: "SkyScraper Solutions",
        name: "Luxury High-Rise",
        date: "2025-06-01",
        details: "Construction of 50-story luxury apartment building",
        status: "todo",
      },
      {
        id: 5,
        agency: "RoadMasters",
        name: "Highway Expansion Project",
        date: "2025-07-12",
        details: "Expansion of major highway",
        status: "todo",
      },
    ]
    setProjects(projectsData.filter((project) => addedProjectIds.includes(project.id)))
  }, [])

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const newProjects = projects.map((project) => {
      if (project.id === Number.parseInt(draggableId)) {
        return { ...project, status: destination.droppableId as "todo" | "inProgress" | "done" }
      }
      return project
    })

    setProjects(newProjects)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-100 p-4 rounded-lg w-80">
            <h2 className="font-semibold mb-4">{column.title}</h2>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {projects
                    .filter((project) => project.status === column.id)
                    .map((project, index) => (
                      <Draggable key={project.id} draggableId={project.id.toString()} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <ProjectCard
                              project={project}
                              onUpdate={(updatedProject) => {
                                const newProjects = projects.map((p) =>
                                  p.id === updatedProject.id ? updatedProject : p,
                                )
                                setProjects(newProjects)
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

