"use client"

import { motion } from "framer-motion"

interface LoadingModalProps {
  message?: string
}

export default function LoadingModal({ message = "Loading..." }: LoadingModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}

