"use client"

import type React from "react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Location {
  value: string
  label: string
}

interface State {
  value: string
  label: string
  locations: Location[]
}

const states: State[] = [
  {
    value: "florida",
    label: "Florida",
    locations: [
      { value: "manatee-county", label: "Manatee County" },
      { value: "fort-pierce", label: "Fort Pierce" },
      { value: "palm-bay", label: "Palm Bay" },
      { value: "martin-county", label: "Martin County" },
    ],
  },
  {
    value: "texas",
    label: "Texas",
    locations: [
      { value: "houston", label: "Houston" },
      { value: "austin", label: "Austin" },
      { value: "dallas", label: "Dallas" },
    ],
  },
]

const LocationSelector: React.FC = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  const handleLocationChange = (value: string) => {
    setSelectedLocations((prev) => {
      if (prev.includes(value)) {
        return prev.filter((loc) => loc !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const isStateSelected = (state: State) => {
    return state.locations.every((location) => selectedLocations.includes(location.value))
  }

  const handleStateChange = (stateValue: string) => {
    const state = states.find((s) => s.value === stateValue)
    if (state) {
      if (isStateSelected(state)) {
        setSelectedLocations((prev) => prev.filter((loc) => !state.locations.some((l) => l.value === loc)))
      } else {
        setSelectedLocations((prev) => [
          ...prev,
          ...state.locations.map((l) => l.value).filter((v) => !prev.includes(v)),
        ])
      }
    }
  }

  return (
    <div className="space-y-2">
      <Select onValueChange={handleStateChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select target locations" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[300px]">
            {states.map((state) => (
              <SelectGroup key={state.value}>
                <SelectLabel>{state.label}</SelectLabel>
                <SelectItem value={state.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{state.label}</span>
                    {isStateSelected(state) && <Badge variant="secondary">All Selected</Badge>}
                  </div>
                </SelectItem>
                {state.locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    <div
                      className="flex items-center justify-between w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLocationChange(location.value)
                      }}
                    >
                      <span className="ml-2">{location.label}</span>
                      {selectedLocations.includes(location.value) && <Badge variant="secondary">Selected</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <div className="flex flex-wrap gap-2">
        {selectedLocations.map((loc) => {
          const location = states.flatMap((s) => s.locations).find((l) => l.value === loc)
          return (
            <Badge key={loc} variant="outline" className="cursor-pointer" onClick={() => handleLocationChange(loc)}>
              {location?.label}
              <span className="ml-1">&times;</span>
            </Badge>
          )
        })}
      </div>
    </div>
  )
}

export default LocationSelector

