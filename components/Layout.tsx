import type React from "react"
import Sidebar from "./Sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">{children}</main>
    </div>
  )
}

