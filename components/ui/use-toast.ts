"use client"

import type React from "react"
// Simplified version of use-toast.ts
import { useState } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, action, variant }: Omit<Toast, "id">) => {
    setToasts((prevToasts) => [...prevToasts, { id: Math.random().toString(), title, description, action, variant }])
  }

  return {
    toast,
    toasts,
    dismiss: (toastId: string) => setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId)),
  }
}

