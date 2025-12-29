"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProjectDetailsModal from "./ProjectDetailsModal"
import { Info } from "lucide-react"

interface Project {
  id: string
  name: string
  status: string
  priority: "High" | "Medium" | "Low"
  owner: string
  nextBestAction: string
  agency: string
  budget: string
  date: string
  description: string
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
  comments?: string
  competitorAnalysis?: string
  relevantExperience?: string
  strategy?: string
  relationshipMap?: string
  fit: "High" | "Medium" | "Low"
}

interface TableViewProps {
  projects: Project[]
  onUpdateProject: (id: string, field: string, value: any) => void
}

export default function TableView({ projects, onUpdateProject }: TableViewProps) {
  const statusOptions = ["Backlog", "Planning", "In Progress", "Review", "Done"]
  const priorityOptions = ["High", "Medium", "Low"]
  const fitOptions = ["High", "Medium", "Low"]
  const ownerOptions = ["Unassigned", "John Doe", "Jane Smith", "Mike Johnson", "Emily Brown", "David Wilson"]
  const nextBestActionOptions = [
    "Schedule client meeting",
    "Prepare project proposal",
    "Conduct site visit",
    "Review budget allocation",
    "Update project timeline",
    "Other",
  ]
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleNextBestActionChange = (projectId: string, value: string) => {
    if (value === "Other") {
      // If "Other" is selected, we don't update the project yet
      return
    }
    onUpdateProject(projectId, "nextBestAction", value)
  }

  const getPriorityColor = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-red-100 text-red-800"
      default:
        return ""
    }
  }

  const getFitColor = (fit: "High" | "Medium" | "Low") => {
    switch (fit) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-red-100 text-red-800"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Agency</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Fit</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[120px]">Owner</TableHead>
            <TableHead className="min-w-[200px]">Next Best Action</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div className="font-medium">{project.name}</div>
              </TableCell>
              <TableCell>{project.agency}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.budget}</TableCell>
              <TableCell>
                <Select
                  value={project.priority}
                  onValueChange={(value: "High" | "Medium" | "Low") => onUpdateProject(project.id, "priority", value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select priority">
                      <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        <Badge className={getPriorityColor(priority as "High" | "Medium" | "Low")}>{priority}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={project.fit}
                  onValueChange={(value: "High" | "Medium" | "Low") => onUpdateProject(project.id, "fit", value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select fit">
                      <Badge className={getFitColor(project.fit)}>{project.fit}</Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {fitOptions.map((fit) => (
                      <SelectItem key={fit} value={fit}>
                        <Badge className={getFitColor(fit as "High" | "Medium" | "Low")}>{fit}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select value={project.status} onValueChange={(value) => onUpdateProject(project.id, "status", value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status.toLowerCase().replace(" ", "")}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={project.owner || "Unassigned"}
                  onValueChange={(value) => onUpdateProject(project.id, "owner", value === "Unassigned" ? "" : value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {ownerOptions.map((owner) => (
                      <SelectItem key={owner} value={owner}>
                        {owner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={nextBestActionOptions.includes(project.nextBestAction) ? project.nextBestAction : "Other"}
                  onValueChange={(value) => handleNextBestActionChange(project.id, value)}
                >
                  <SelectTrigger className="w-full min-w-[200px]">
                    <SelectValue placeholder="Select next best action" />
                  </SelectTrigger>
                  <SelectContent>
                    {nextBestActionOptions.map((action) => (
                      <SelectItem key={action} value={action}>
                        {action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {project.nextBestAction && !nextBestActionOptions.includes(project.nextBestAction) && (
                  <Input
                    value={project.nextBestAction}
                    onChange={(e) => onUpdateProject(project.id, "nextBestAction", e.target.value)}
                    placeholder="Enter custom action"
                    className="mt-2 w-full"
                  />
                )}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => setSelectedProject(project)}>
                  <Info className="h-4 w-4" />
                  <span className="sr-only">More Info</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSave={(updatedProject) => {
            onUpdateProject(updatedProject.id, "fullProject", updatedProject)
            setSelectedProject(null)
          }}
        />
      )}
    </Card>
  )
}

