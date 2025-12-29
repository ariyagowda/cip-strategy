"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

interface ProjectCardProps {
  project: Project
  onUpdate: (updatedProject: Project) => void
}

export default function ProjectCard({ project, onUpdate }: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOwnerChange = (value: string) => {
    onUpdate({ ...project, owner: value })
  }

  const handlePriorityChange = (value: "high" | "medium" | "low") => {
    onUpdate({ ...project, priority: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Agency:</span> {project.agency}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {project.date}
          </div>
          <div>
            <span className="font-semibold">Owner:</span>
            <Select onValueChange={handleOwnerChange} value={project.owner}>
              <SelectTrigger>
                <SelectValue placeholder="Assign owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="bob">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <span className="font-semibold">Priority:</span>
            <Select onValueChange={handlePriorityChange} value={project.priority}>
              <SelectTrigger>
                <SelectValue placeholder="Set priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">More Information</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{project.name} - More Information</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Similar Projects</h3>
                  <ul className="list-disc pl-5">
                    <li>Project A</li>
                    <li>Project B</li>
                    <li>Project C</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Key Stakeholders</h3>
                  <ul className="list-disc pl-5">
                    <li>Stakeholder 1</li>
                    <li>Stakeholder 2</li>
                    <li>Stakeholder 3</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Motion (Updates)</h3>
                  <Textarea placeholder="Enter project updates here" />
                </div>
                <div>
                  <h3 className="font-semibold">Set Reminders or Notes</h3>
                  <Textarea placeholder="Enter reminders or notes here" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload Documents</h3>
                  <Input type="file" />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

