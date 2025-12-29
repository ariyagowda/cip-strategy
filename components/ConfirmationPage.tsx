"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Layout from "./Layout"
import LocationSelector from "./LocationSelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BuildingAnimation from "./BuildingAnimation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InfoItem {
  id: string
  label: string
  value: string
  type: "text" | "textarea" | "date" | "file" | "location" | "select"
  required?: boolean
  description?: string
  options?: string[]
}

const businessTypes = [
  "General Contractor",
  "Subcontractor",
  "Construction Manager",
  "Developer",
  "Architect / Design Firm",
  "Engineering Firm",
  "Other",
]

export default function ConfirmationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [info, setInfo] = useState<InfoItem[]>([
    { id: "company", label: "Company Name", value: "Acme Inc.", type: "text", required: true },
    { id: "business", label: "Business Type", value: "", type: "select", required: true, options: businessTypes },
    { id: "budget", label: "Budget", value: "$50,000", type: "text", required: true },
    { id: "date", label: "Start Date", value: "2025-01-27", type: "date", required: true },
    {
      id: "description",
      label: "Project Description",
      value: "",
      type: "textarea",
      required: true,
      description: "Describe your project goals and requirements",
    },
    {
      id: "examples",
      label: "Project Examples",
      value: "",
      type: "file",
      description: "Upload relevant project examples",
    },
    {
      id: "locations",
      label: "Target Locations",
      value: "",
      type: "location",
      required: true,
      description: "Select states and specific locations",
    },
  ])

  const [validatedItems, setValidatedItems] = useState<string[]>([])
  const [showAnimation, setShowAnimation] = useState(false)
  const [validateAll, setValidateAll] = useState(false)
  const [otherBusinessType, setOtherBusinessType] = useState("")

  const handleValidateItem = (id: string) => {
    setValidatedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleValidateAll = () => {
    setValidateAll(!validateAll)
    if (!validateAll) {
      setValidatedItems(info.map((item) => item.id))
    } else {
      setValidatedItems([])
    }
  }

  const isFormValid = () => {
    return (
      validateAll ||
      (info.filter((item) => item.required).every((field) => field.value.trim() !== "") &&
        info.filter((item) => item.required).every((field) => validatedItems.includes(field.id)))
    )
  }

  const handleFindProjects = async () => {
    if (!isFormValid()) return

    setIsLoading(true)
    setShowAnimation(true)

    // Simulate API call with animation
    await new Promise((resolve) => setTimeout(resolve, 6000))

    setShowAnimation(false)
    setIsLoading(false)
    router.push("/agencies") // Changed from "/projects" to "/agencies"
  }

  const handleEdit = (id: string, newValue: string) => {
    const newInfo = info.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    setInfo(newInfo)
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Please Confirm Your Information</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {info.slice(0, 4).map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`validate-${item.id}`}
                      checked={validatedItems.includes(item.id)}
                      onCheckedChange={() => handleValidateItem(item.id)}
                    />
                    <Label htmlFor={`input-${item.id}`} className="font-medium">
                      {item.label} {item.required && <span className="text-red-500">*</span>}
                    </Label>
                  </div>
                  {item.type === "select" ? (
                    <Select onValueChange={(value) => handleEdit(item.id, value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {item.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={`input-${item.id}`}
                      type={item.type}
                      value={item.value}
                      onChange={(e) => handleEdit(item.id, e.target.value)}
                      className="w-full"
                      required={item.required}
                    />
                  )}
                  {item.id === "business" && info.find((i) => i.id === "business")?.value === "Other" && (
                    <Input
                      placeholder="Specify other business type"
                      value={otherBusinessType}
                      onChange={(e) => setOtherBusinessType(e.target.value)}
                      className="mt-2"
                    />
                  )}
                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Project Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {info.slice(4).map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`validate-${item.id}`}
                      checked={validatedItems.includes(item.id)}
                      onCheckedChange={() => handleValidateItem(item.id)}
                    />
                    <Label htmlFor={`input-${item.id}`} className="font-medium">
                      {item.label} {item.required && <span className="text-red-500">*</span>}
                    </Label>
                  </div>
                  {item.type === "textarea" ? (
                    <Textarea
                      id={`input-${item.id}`}
                      value={item.value}
                      onChange={(e) => handleEdit(item.id, e.target.value)}
                      className="min-h-[100px]"
                      required={item.required}
                    />
                  ) : item.type === "file" ? (
                    <Input
                      id={`input-${item.id}`}
                      type="file"
                      onChange={(e) => handleEdit(item.id, e.target.files?.[0]?.name || "")}
                      className="w-full"
                      required={item.required}
                    />
                  ) : item.type === "location" ? (
                    <LocationSelector />
                  ) : null}
                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox id="validate-all" checked={validateAll} onCheckedChange={handleValidateAll} />
            <Label htmlFor="validate-all" className="ml-2 text-sm font-medium text-gray-700">
              Validate All Information
            </Label>
          </div>
          <Button
            onClick={handleFindProjects}
            disabled={!isFormValid()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Find Projects
          </Button>
        </div>

        {showAnimation && <BuildingAnimation />}
      </motion.div>
    </Layout>
  )
}

