"use client"

import { motion } from "framer-motion"
import { Building2 } from "lucide-react"

const steps = ["Searching for Projects", "Identifying Projects", "Shortlisting"]

export default function BuildingAnimation() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-6 max-w-sm w-full mx-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1, 1, 0.5], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Building2 className="w-16 h-16 text-blue-500" />
        </motion.div>

        <div className="space-y-2 w-full">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.5 + 0.2 }}
                className="w-2 h-2 rounded-full bg-blue-500"
              />
              <span className="text-gray-800">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

