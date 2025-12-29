"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Building2, DollarSign, BarChart2 } from "lucide-react"
import { Project } from "@/types/project"

interface ProjectDetailsModalProps {
  project: Project | null
  onClose: () => void
  onSave: (project: Project) => void
}

const categoryOptions = [
  "Infrastructure",
  "Transportation",
  "Energy",
  "Water and Sanitation",
  "Healthcare",
  "Education",
  "Technology",
  "Urban Development",
]

const subcategoryOptions = {
  Infrastructure: ["Roads", "Bridges", "Tunnels", "Airports", "Seaports", "Railways"],
  Transportation: ["Public Transit", "Highways", "Bike Lanes", "Pedestrian Walkways"],
  Energy: ["Solar", "Wind", "Hydroelectric", "Nuclear", "Biomass"],
  "Water and Sanitation": ["Water Treatment", "Sewage Systems", "Stormwater Management"],
  Healthcare: ["Hospitals", "Clinics", "Medical Research Facilities"],
  Education: ["Schools", "Universities", "Libraries", "Research Centers"],
  Technology: ["Smart Cities", "Broadband Networks", "Data Centers"],
  "Urban Development": ["Housing", "Commercial Districts", "Parks and Recreation"],
}

const meansOfFinancingOptions = [
  "Government Funding",
  "Public-Private Partnership (PPP)",
  "Municipal Bonds",
  "Bank Loans",
  "Private Investment",
  "Grants",
  "Crowdfunding",
]

const fundingStrategyOptions = [
  "Full Public Funding",
  "Blended Finance",
  "User Fees and Tolls",
  "Tax Increment Financing (TIF)",
  "Performance-Based Contracting",
  "Lease-to-Own",
  "Concession Agreement",
]

const fitOptions = ["High", "Medium", "Low"]

export default function ProjectDetailsModal({ project, onClose, onSave }: ProjectDetailsModalProps) {
  const [editedProject, setEditedProject] = useState<Project | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  useEffect(() => {
    if (project) {
      setEditedProject(project)
      setSelectedCategory(project.category)
    }
  }, [project])

  const handleInputChange = (key: keyof Project, value: string) => {
    if (editedProject) {
      setEditedProject((prev) => ({ ...prev, [key]: value } as Project))
    }
  }

  const handleSave = () => {
    if (editedProject) {
      onSave(editedProject)
    }
    onClose()
  }

  if (!editedProject) {
    return null
  }

  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Project Details</span>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="space-y-8 p-4">
            {/* Project Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Project
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editedProject.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Number</Label>
                    <Input
                      id="number"
                      value={editedProject.projectNumber}
                      onChange={(e) => handleInputChange("projectNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={editedProject.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Textarea
                      id="shortDescription"
                      value={editedProject.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={editedProject.startYear}
                      onChange={(e) => handleInputChange("startYear", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">Full Description</Label>
                    <Textarea
                      id="fullDescription"
                      value={editedProject.fullDescription}
                      onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image</Label>
                    <Input
                      id="imageUrl"
                      value={editedProject.imageUrl}
                      onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                      placeholder="Image URL"
                    />
                    <Image
                      src={editedProject.imageUrl || "/placeholder.svg"}
                      alt={editedProject.name}
                      width={400}
                      height={300}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency">Agency</Label>
                    <Input
                      id="agency"
                      value={editedProject.region}
                      onChange={(e) => handleInputChange("region", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={editedProject.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={editedProject.category}
                      onValueChange={(value) => {
                        handleInputChange("category", value)
                        setSelectedCategory(value)
                        handleInputChange("subcategory", "") // Reset subcategory when category changes
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select
                      value={editedProject.subcategory}
                      onValueChange={(value) => handleInputChange("subcategory", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory &&
                          subcategoryOptions[selectedCategory as keyof typeof subcategoryOptions].map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory}>
                              {subcategory}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectManager">Project Manager</Label>
                    <Input
                      id="projectManager"
                      value={editedProject.projectManager}
                      onChange={(e) => handleInputChange("projectManager", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Financing Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      value={editedProject.projectValue.toString()}
                      onChange={(e) => handleInputChange("projectValue", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="programmedFunding">Programmed Funding</Label>
                    <Input
                      id="programmedFunding"
                      value={editedProject.programmedFunding}
                      onChange={(e) => handleInputChange("programmedFunding", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meansOfFinancing">Means of Financing</Label>
                    <Select
                      value={editedProject.meansOfFinancing}
                      onValueChange={(value) => handleInputChange("meansOfFinancing", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select means of financing" />
                      </SelectTrigger>
                      <SelectContent>
                        {meansOfFinancingOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fundingStrategy">Funding Strategy</Label>
                    <Select
                      value={editedProject.fundingStrategy}
                      onValueChange={(value) => handleInputChange("fundingStrategy", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        {fundingStrategyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fit">Fit</Label>
                    <Select value={editedProject.fit} onValueChange={(value) => handleInputChange("fit", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fit" />
                      </SelectTrigger>
                      <SelectContent>
                        {fitOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relevantExperience">Relevant Experience</Label>
                    <Textarea
                      id="relevantExperience"
                      value={editedProject.relevantExperience}
                      onChange={(e) => handleInputChange("relevantExperience", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="similarProjects">Similar Projects @ Other Locations</Label>
                    <Textarea
                      id="similarProjects"
                      value={editedProject.similarProjects}
                      onChange={(e) => handleInputChange("similarProjects", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="competitorAnalysis">Competitor Analysis</Label>
                    <Textarea
                      id="competitorAnalysis"
                      value={editedProject.competitorAnalysis}
                      onChange={(e) => handleInputChange("competitorAnalysis", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keyStakeholders">Key Stakeholders</Label>
                    <Textarea
                      id="keyStakeholders"
                      value={editedProject.keyStakeholders}
                      onChange={(e) => handleInputChange("keyStakeholders", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comments">Comments</Label>
                    <Textarea
                      id="comments"
                      value={editedProject.comments}
                      onChange={(e) => handleInputChange("comments", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="strategyPlan">Strategy Plan</Label>
                    <Textarea
                      id="strategyPlan"
                      value={editedProject.strategyPlan}
                      onChange={(e) => handleInputChange("strategyPlan", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="swot">SWOT</Label>
                    <Textarea
                      id="swot"
                      value={editedProject.swot}
                      onChange={(e) => handleInputChange("swot", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kpis">KPIs</Label>
                    <Textarea
                      id="kpis"
                      value={editedProject.kpis}
                      onChange={(e) => handleInputChange("kpis", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="border-t pt-4">
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

