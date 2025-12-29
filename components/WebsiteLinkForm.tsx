"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import LoadingModal from "./LoadingModal"
import ConfirmationPage from "./ConfirmationPage"

export default function WebsiteLinkForm() {
  const [websiteLink, setWebsiteLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    if (!urlPattern.test(websiteLink)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website link.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsLoading(false)
    setShowConfirmation(true)
  }

  if (showConfirmation) {
    return <ConfirmationPage />
  }

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="space-y-2">
          <label htmlFor="website-link" className="block text-sm font-medium text-blue-800">
            Your Website URL
          </label>
          <Input
            id="website-link"
            type="text"
            placeholder="https://example.com"
            value={websiteLink}
            onChange={(e) => setWebsiteLink(e.target.value)}
            className="w-full px-3 py-2 bg-white bg-opacity-50 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-900 placeholder-blue-400"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          disabled={isLoading}
        >
          Connect Website
        </Button>
      </motion.form>
      {isLoading && <LoadingModal />}
    </>
  )
}

