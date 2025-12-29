"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  ClipboardList,
  Users,
  Calendar,
  ChevronRight,
  BarChart2,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Task {
  id: string
  title: string
  status: "todo" | "in-progress" | "completed"
  dueDate: string
  assignee: string
  priority: "high" | "medium" | "low"
}

interface Stakeholder {
  id: string
  name: string
  role: string
  influence: "high" | "medium" | "low"
  lastContact: string
  email: string
  phone: string
  notes: string
}

interface Action {
  id: string
  title: string
  type: string
  dueDate: string
  status: "pending" | "completed" | "overdue"
  owner: string
  description: string
}

interface Project {
  id: number
  name: string
  description: string
  startYear: string
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
  status?: string
  priority?: "High" | "Medium" | "Low"
  owner?: string
  agency: string
}

interface ProjectViewProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onNavigateToAgency: () => void
}

export default function ProjectView({ project, isOpen, onClose, onNavigateToAgency }: ProjectViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!project) return null

  const tasks: Task[] = [
    {
      id: "1",
      title: "Review project requirements",
      status: "completed",
      dueDate: "2024-03-01",
      assignee: "John Doe",
      priority: "high",
    },
    {
      id: "2",
      title: "Prepare initial cost estimates",
      status: "in-progress",
      dueDate: "2024-03-15",
      assignee: "Jane Smith",
      priority: "high",
    },
    {
      id: "3",
      title: "Schedule stakeholder meeting",
      status: "todo",
      dueDate: "2024-03-20",
      assignee: "Mike Johnson",
      priority: "medium",
    },
  ]

  const stakeholders: Stakeholder[] = [
    {
      id: "1",
      name: "Robert Wilson",
      role: "Project Sponsor",
      influence: "high",
      lastContact: "2024-02-20",
      email: "robert.wilson@example.com",
      phone: "(555) 123-4567",
      notes: "Key decision maker for budget approvals",
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "Technical Lead",
      influence: "medium",
      lastContact: "2024-02-18",
      email: "sarah.chen@example.com",
      phone: "(555) 234-5678",
      notes: "Main point of contact for technical specifications",
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Community Representative",
      influence: "medium",
      lastContact: "2024-02-15",
      email: "michael.brown@example.com",
      phone: "(555) 345-6789",
      notes: "Important stakeholder for community engagement",
    },
  ]

  const actions: Action[] = [
    {
      id: "1",
      title: "Initial Project Review",
      type: "Meeting",
      dueDate: "2024-03-10",
      status: "completed",
      owner: "John Doe",
      description: "Complete initial project review with key stakeholders",
    },
    {
      id: "2",
      title: "Budget Approval",
      type: "Approval",
      dueDate: "2024-03-15",
      status: "pending",
      owner: "Jane Smith",
      description: "Obtain final budget approval from steering committee",
    },
    {
      id: "3",
      title: "Stakeholder Presentation",
      type: "Presentation",
      dueDate: "2024-02-28",
      status: "overdue",
      owner: "Mike Johnson",
      description: "Present project timeline and milestones to stakeholders",
    },
  ]

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r bg-muted/10 p-6 space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <button onClick={onNavigateToAgency} className="hover:underline flex items-center">
                  {project.agency}
                </button>
                <div className="flex items-center gap-2 text-foreground">
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-medium">{project.name}</span>
                </div>
              </div>
            </div>
            <Separator />
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("overview")}>
                <Building2 className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("actions")}>
                <ClipboardList className="mr-2 h-4 w-4" />
                Actions
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("tasks")}>
                <Calendar className="mr-2 h-4 w-4" />
                Tasks
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("stakeholders")}>
                <Users className="mr-2 h-4 w-4" />
                Stakeholders
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("risks")}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Risks
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("metrics")}>
                <BarChart2 className="mr-2 h-4 w-4" />
                Metrics
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <div className="border-b p-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{project.projectNumber}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                  <span>•</span>
                  <Badge variant="outline">{project.status}</Badge>
                </div>
              </div>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Project Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{formatCurrency(project.projectValue)}</div>
                          <p className="text-xs text-muted-foreground mt-1">{project.fundingStrategy}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{project.startYear}</div>
                          <p className="text-xs text-muted-foreground mt-1">Project Start</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{project.status}</div>
                          <Progress value={65} className="mt-2" />
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Description</h4>
                            <p className="text-sm text-muted-foreground">{project.fullDescription}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Location</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.location}, {project.region}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Department</h4>
                            <p className="text-sm text-muted-foreground">{project.department}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Project Manager</h4>
                            <p className="text-sm text-muted-foreground">{project.projectManager}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="actions" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {actions.map((action) => (
                            <div key={action.id} className="flex items-start gap-4 p-4 border rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{action.title}</h4>
                                  <Badge className={getStatusColor(action.status)}>{action.status}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                  <span className="text-muted-foreground">Due: {action.dueDate}</span>
                                  <span className="text-muted-foreground">Owner: {action.owner}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tasks" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Tasks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {tasks.map((task) => (
                            <div key={task.id} className="flex items-center gap-4 p-4 border rounded-lg">
                              {task.status === "completed" ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : task.status === "in-progress" ? (
                                <Clock className="h-5 w-5 text-blue-500" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{task.title}</h4>
                                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                  <span className="text-muted-foreground">Due: {task.dueDate}</span>
                                  <span className="text-muted-foreground">Assignee: {task.assignee}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="stakeholders" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Stakeholders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {stakeholders.map((stakeholder) => (
                            <div key={stakeholder.id} className="flex items-start gap-4 p-4 border rounded-lg">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?text=${stakeholder.name}`} />
                                <AvatarFallback>
                                  {stakeholder.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{stakeholder.name}</h4>
                                  <Badge variant="outline" className={getPriorityColor(stakeholder.influence)}>
                                    {stakeholder.influence} influence
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{stakeholder.role}</p>
                                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Email: {stakeholder.email}</p>
                                    <p className="text-muted-foreground">Phone: {stakeholder.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Last Contact: {stakeholder.lastContact}</p>
                                    <p className="text-muted-foreground">Notes: {stakeholder.notes}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="risks" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Risks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              <h4 className="font-medium">Budget Overrun</h4>
                            </div>
                            <Badge className="bg-red-100 text-red-800 mt-2">High</Badge>
                            <p className="text-sm text-muted-foreground mt-2">
                              Current estimates indicate a potential 15% budget overrun due to increased material costs.
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-yellow-500" />
                              <h4 className="font-medium">Schedule Delay</h4>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800 mt-2">Medium</Badge>
                            <p className="text-sm text-muted-foreground mt-2">
                              Potential 3-week delay due to permitting issues with local authorities.
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-yellow-500" />
                              <h4 className="font-medium">Resource Availability</h4>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800 mt-2">Medium</Badge>
                            <p className="text-sm text-muted-foreground mt-2">
                              Specialized equipment may not be available during the planned construction phase.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="metrics" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Financial Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Budget Utilization</h4>
                            <Progress value={45} className="h-2" />
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-muted-foreground">$2.25M spent of $5M</span>
                              <span className="font-medium">45%</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Cost Variance</h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800">+2.3%</Badge>
                              <span className="text-sm text-muted-foreground">Under budget by $115,000</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Schedule Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Timeline Progress</h4>
                            <Progress value={30} className="h-2" />
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-muted-foreground">Started: Jan 15, 2024</span>
                              <span className="text-muted-foreground">Expected completion: Nov 30, 2024</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Milestone Completion</h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-100 text-yellow-800">4/12</Badge>
                              <span className="text-sm text-muted-foreground">4 of 12 milestones completed</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Quality & Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Defect Rate</h4>
                            <div className="text-2xl font-bold">1.2%</div>
                            <p className="text-xs text-muted-foreground">Industry avg: 2.5%</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Change Requests</h4>
                            <div className="text-2xl font-bold">7</div>
                            <p className="text-xs text-muted-foreground">3 approved, 2 pending, 2 rejected</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Stakeholder Satisfaction</h4>
                            <div className="text-2xl font-bold">4.2/5</div>
                            <p className="text-xs text-muted-foreground">Based on latest survey</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Resource Utilization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Team Allocation</h4>
                            <Progress value={75} className="h-2" />
                            <p className="text-sm text-muted-foreground mt-1">15 team members (75% of capacity)</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Equipment Utilization</h4>
                            <Progress value={60} className="h-2" />
                            <p className="text-sm text-muted-foreground mt-1">60% of available equipment in use</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Risk & Compliance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Risk Level</h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                              <span className="text-sm text-muted-foreground">
                                3 high, 5 medium, 2 low risks identified
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Compliance Status</h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                              <span className="text-sm text-muted-foreground">All regulatory requirements met</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

