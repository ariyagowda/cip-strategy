"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronRight, Search, Info, Filter, ClipboardList, FileText } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProjectDetailsModal from "./ProjectDetailsModal"
import ActionTrackerPopup from "./ActionTrackerPopup"
import ClientServicePlanModal from "./ClientServicePlanModal"
import { Label } from "@/components/ui/label"

interface Project {
  id: number
  name: string
  description: string
  startYear: string
  status: string
  priority: "High" | "Medium" | "Low"
  owner: string
  nextBestAction: string
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
  projectValue: number
  region: string
  type: string
  budget: string
  date: string
}

interface Agency {
  id: number
  name: string
  totalValue: number
  activeProjects: number
  winRate: number
  lastEngagement: string
  projects: Project[]
}

const agencies: Agency[] = [
  {
    id: 1,
    name: "BuildRight Inc.",
    totalValue: 120000000,
    activeProjects: 5,
    winRate: 75,
    lastEngagement: "2024-02-15",
    projects: [
      {
        id: 1,
        name: "City Center Renovation",
        description: "Comprehensive renovation of the city's central district",
        startYear: "2025",
        status: "inProgress",
        priority: "High",
        owner: "John Smith",
        nextBestAction: "Schedule stakeholder meeting",
        fit: "High",
        category: "Urban Development",
        subcategory: "City Center",
        department: "Urban Planning",
        location: "Downtown",
        projectManager: "Jane Smith",
        projectNumber: "URB-2025-001",
        fullDescription: "Comprehensive renovation project including infrastructure upgrades",
        fundingStrategy: "Public-Private Partnership",
        programmedFunding: "$45M",
        meansOfFinancing: "Municipal Bonds",
        projectValue: 45000000,
        region: "Northeast",
        type: "Renovation",
        budget: "$45M",
        date: "2025-03-15",
      },
      // Add more projects...
    ],
  },
  // Add more agencies...
]

const projectTypes = ["Renovation", "New Construction", "Infrastructure Repair"]
const regions = ["Northeast", "Midwest", "West", "Southwest", "Southeast", "National"]
const statusOptions = ["Backlog", "Planning", "In Progress", "Review", "Done"]
const priorityOptions = ["High", "Medium", "Low"]

const AgencyRow = ({
  agency,
  selectedProjects,
  onSelectAgency,
  onToggleAgency,
  expanded,
  onProjectAction,
  searchQuery,
}) => {
  const filteredProjects = agency.projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }

  return (
    <>
      <TableRow>
        <TableCell colSpan={10} className="p-0 border-b-0">
          <div className="flex items-center gap-2 p-4 bg-muted/5">
            <Checkbox
              checked={agency.projects.every((p) => selectedProjects.includes(p.id))}
              onCheckedChange={() => onSelectAgency(agency.id)}
            />
            <button onClick={() => onToggleAgency(agency.id)} className="flex items-center gap-2 flex-1">
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <div className="flex items-center gap-4 flex-1">
                <span className="font-medium min-w-[200px]">{agency.name}</span>
                {!expanded && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="px-3">{formatCurrency(agency.totalValue)} Total Value</span>
                    <span className="border-l border-gray-300 px-3">{agency.activeProjects} Active Projects</span>
                    <span className="border-l border-gray-300 px-3">{agency.winRate}% Win Rate</span>
                    <span className="border-l border-gray-300 px-3">
                      Last Engagement: {new Date(agency.lastEngagement).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </TableCell>
      </TableRow>
      {expanded &&
        filteredProjects.map((project) => (
          <TableRow key={project.id} className="hover:bg-gray-50">
            <TableCell className="pl-10">
              {" "}
              {/* Increased left padding for indentation */}
              <Checkbox
                checked={selectedProjects.includes(project.id)}
                onCheckedChange={() => onProjectAction("select", project.id)}
              />
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">{project.name}</TableCell>
            <TableCell className="max-w-[300px]">
              <div className="truncate">{project.description}</div>
            </TableCell>
            <TableCell className="whitespace-nowrap">
              <Select
                value={project.status}
                onValueChange={(value) => onProjectAction("updateStatus", project.id, value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
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
            <TableCell className="whitespace-nowrap">
              <Select
                value={project.priority}
                onValueChange={(value) => onProjectAction("updatePriority", project.id, value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue>
                    <Badge className={getPriorityColor(project.priority as "High" | "Medium" | "Low")}>
                      {project.priority}
                    </Badge>
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
            <TableCell className="whitespace-nowrap">{formatCurrency(project.projectValue)}</TableCell>
            <TableCell className="whitespace-nowrap">
              <Select
                value={project.owner}
                onValueChange={(value) => onProjectAction("updateOwner", project.id, value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Assign owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="jane">Jane Doe</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Input
                value={project.nextBestAction}
                onChange={(e) => onProjectAction("updateNextAction", project.id, e.target.value)}
                className="w-full"
              />
            </TableCell>
            <TableCell className="whitespace-nowrap">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => onProjectAction("openActionTracker", project.id)}>
                  <ClipboardList className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onProjectAction("openClientServicePlan", project.id)}
                >
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onProjectAction("openDetails", project.id)}>
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
    </>
  )
}

const sampleCSP = {
  id: 1,
  name: "Sample CSP",
  description: "This is a sample CSP",
}

export default function UnifiedAgencyView() {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([])
  const [expandedAgencies, setExpandedAgencies] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(true)
  const [aiAssistantWidth, setAiAssistantWidth] = useState(320)
  const resizeRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedActionTracker, setSelectedActionTracker] = useState<{ id: number; name: string } | null>(null)
  const [selectedClientServicePlan, setSelectedClientServicePlan] = useState<{ id: number; name: string } | null>(null)
  const [filters, setFilters] = useState({
    projectType: "All",
    projectValue: 10000000,
    region: "All",
    agencyTotalValue: 0,
    agencyMinProjects: 0,
  })

  const handleSelectAgency = (agencyId: number) => {
    const agency = agencies.find((a) => a.id === agencyId)
    if (!agency) return

    const agencyProjectIds = agency.projects.map((p) => p.id)
    const allSelected = agencyProjectIds.every((id) => selectedProjects.includes(id))

    setSelectedProjects((prev) =>
      allSelected ? prev.filter((id) => !agencyProjectIds.includes(id)) : [...new Set([...prev, ...agencyProjectIds])],
    )
  }

  const toggleAgency = (agencyId: number) => {
    setExpandedAgencies((prev) =>
      prev.includes(agencyId) ? prev.filter((id) => id !== agencyId) : [...prev, agencyId],
    )
  }

  const handleProjectAction = (action: string, projectId: number, value?: any) => {
    switch (action) {
      case "select":
        setSelectedProjects((prev) =>
          prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
        )
        break
      case "openDetails":
        const project = agencies.flatMap((agency) => agency.projects).find((p) => p.id === projectId)
        setSelectedProject(project || null)
        break
      case "openActionTracker":
        const trackerProject = agencies.flatMap((agency) => agency.projects).find((p) => p.id === projectId)
        setSelectedActionTracker(trackerProject ? { id: projectId, name: trackerProject.name } : null)
        break
      case "openClientServicePlan":
        const cspProject = agencies.flatMap((agency) => agency.projects).find((p) => p.id === projectId)
        setSelectedClientServicePlan(cspProject ? { id: projectId, name: cspProject.name } : null)
        break
      // Add more actions as needed
    }
  }

  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true)
  }

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && resizeRef.current) {
        const newWidth = e.clientX - resizeRef.current.getBoundingClientRect().left
        setAiAssistantWidth(Math.max(200, Math.min(newWidth, 600)))
      }
    },
    [isResizing],
  )

  useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  const filteredAgencies = agencies
    .map((agency) => ({
      ...agency,
      projects: agency.projects.filter(
        (project) =>
          (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agency.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (filters.projectType === "All" || project.type === filters.projectType) &&
          project.projectValue >= filters.projectValue &&
          (filters.region === "All" || project.region === filters.region),
      ),
    }))
    .filter(
      (agency) =>
        agency.projects.length > 0 &&
        agency.totalValue >= filters.agencyTotalValue &&
        agency.projects.length >= filters.agencyMinProjects,
    )

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
            <h1 className="text-2xl font-bold text-gray-800">Strategic Planning System</h1>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filter Projects and Agencies</DialogTitle>
                    <DialogDescription>Set your criteria to filter projects and agencies.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="projectType" className="text-right">
                        Project Type
                      </Label>
                      <Select
                        value={filters.projectType}
                        onValueChange={(value) => setFilters({ ...filters, projectType: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Add more filter options */}
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}>
                {isAiAssistantOpen ? "Close AI Assistant" : "Open AI Assistant"}
              </Button>
            </div>
          </div>

          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search agencies and projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <Card className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]"></TableHead>
                    <TableHead className="w-[200px]">Project Name</TableHead>
                    <TableHead className="w-[300px]">Description</TableHead>
                    <TableHead className="w-[130px]">Status</TableHead>
                    <TableHead className="w-[100px]">Priority</TableHead>
                    <TableHead className="w-[120px]">Value</TableHead>
                    <TableHead className="w-[130px]">Owner</TableHead>
                    <TableHead>Next Best Action</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgencies.map((agency) => (
                    <AgencyRow
                      key={agency.id}
                      agency={agency}
                      selectedProjects={selectedProjects}
                      onSelectAgency={handleSelectAgency}
                      onToggleAgency={toggleAgency}
                      expanded={expandedAgencies.includes(agency.id)}
                      onProjectAction={handleProjectAction}
                      searchQuery={searchQuery}
                    />
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </motion.div>
      </div>

      {/* AI Assistant */}
      {isAiAssistantOpen && (
        <Card
          className="flex flex-col relative"
          style={{ width: `${aiAssistantWidth}px`, minWidth: "200px", maxWidth: "600px" }}
          ref={resizeRef}
        >
          <div className="absolute left-0 top-0 w-1 h-full cursor-ew-resize" onMouseDown={startResizing}></div>
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">{/* AI Assistant content */}</CardContent>
        </Card>
      )}

      {/* Modals */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSave={(updatedProject) => {
          console.log("Saving updated project:", updatedProject)
          setSelectedProject(null)
        }}
      />

      <ActionTrackerPopup
        projectId={selectedActionTracker?.id || 0}
        projectName={selectedActionTracker?.name || ""}
        isOpen={!!selectedActionTracker}
        onClose={() => setSelectedActionTracker(null)}
      />

      <ClientServicePlanModal
        isOpen={!!selectedClientServicePlan}
        onClose={() => setSelectedClientServicePlan(null)}
        csp={sampleCSP}
      />
    </div>
  )
}

