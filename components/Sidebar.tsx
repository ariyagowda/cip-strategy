// "use client"


// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Home, Briefcase, Building, MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
// import AnimatedAvatar from "./AnimatedAvatar"
// import { useState, useEffect } from "react"
// import { Button } from "./ui/button"

// const menuItems = [
//   { icon: Home, label: "Dashboard", href: "/dashboard" },
//   { icon: Building, label: "Agencies", href: "/agencies" },
//   { icon: Briefcase, label: "My Projects", href: "/my-projects" },
//   { icon: MessageSquare, label: "Messages", href: "/messages" },
//   { icon: Settings, label: "Settings", href: "/settings" },
// ]

// export default function Sidebar() {
//   const pathname = usePathname()
//   const [collapsed, setCollapsed] = useState(false)

//   // Initialize from localStorage on component mount
//   useEffect(() => {
//     const savedState = localStorage.getItem("sidebar-collapsed")
//     if (savedState !== null) {
//       setCollapsed(savedState === "true")
//     }
//   }, [])

//   // Toggle sidebar collapsed state
//   const toggleSidebar = () => {
//     const newState = !collapsed
//     setCollapsed(newState)
//     localStorage.setItem("sidebar-collapsed", String(newState))
//   }

//   return (
//     <div
//       className={`flex flex-col h-screen ${collapsed ? "w-16" : "w-64"} bg-white border-r relative transition-all duration-300`}
//     >
//       {/* Toggle button */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute -right-3 top-20 bg-white border rounded-full shadow-md z-10 h-6 w-6"
//         onClick={toggleSidebar}
//       >
//         {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
//       </Button>

//       <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
//         <div className={`flex items-center flex-shrink-0 px-4 ${collapsed ? "justify-center" : ""}`}>
//           {collapsed ? (
//             <span className="text-xl font-semibold text-gray-800">SPS</span>
//           ) : (
//             <span className="text-xl font-semibold text-gray-800">Strategic Planning System</span>
//           )}
//         </div>
//         <nav className="mt-5 flex-1 px-2 space-y-1">
//           {menuItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`group flex items-center ${collapsed ? "justify-center" : "px-2"} py-2 text-sm font-medium rounded-md ${
//                 pathname === item.href
//                   ? "bg-gray-100 text-gray-900"
//                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               }`}
//             >
//               <item.icon className={`${collapsed ? "" : "mr-3"} flex-shrink-0 h-6 w-6`} aria-hidden="true" />
//               {!collapsed && item.label}
//             </Link>
//           ))}
//         </nav>
//       </div>
//       <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
//         <div className={`flex items-center ${collapsed ? "justify-center" : ""}`}>
//           <AnimatedAvatar />
//           {!collapsed && (
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-700">Tom Cook</p>
//               <Link
//                 href="/logout"
//                 className="text-xs font-medium text-gray-500 group-hover:text-gray-700 flex items-center mt-1"
//               >
//                 <LogOut className="mr-2 h-4 w-4" /> Logout
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building, MessageSquare, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import AnimatedAvatar from "./AnimatedAvatar"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Building, label: "Agencies", href: "/agencies" },
  { icon: MessageSquare, label: "AI Research Assistant", href: "/messages" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Initialize from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState !== null) {
      setCollapsed(savedState === "true")
    }
  }, [])

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  return (
    <div
      className={`flex flex-col h-screen ${collapsed ? "w-16" : "w-64"} bg-white border-r relative transition-all duration-300`}
    >
      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 bg-white border rounded-full shadow-md z-10 h-6 w-6"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className={`flex items-center flex-shrink-0 px-4 ${collapsed ? "justify-center" : ""}`}>
          {collapsed ? (
            <span className="text-xl font-semibold text-gray-800">SPS</span>
          ) : (
            <span className="text-xl font-semibold text-gray-800">Strategic Planning System</span>
          )}
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center ${collapsed ? "justify-center" : "px-2"} py-2 text-sm font-medium rounded-md ${
                pathname === item.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className={`${collapsed ? "" : "mr-3"} flex-shrink-0 h-6 w-6`} aria-hidden="true" />
              {!collapsed && item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className={`flex items-center ${collapsed ? "justify-center" : ""}`}>
          <AnimatedAvatar />
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Tom Cook</p>
              <Link
                href="/logout"
                className="text-xs font-medium text-gray-500 group-hover:text-gray-700 flex items-center mt-1"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}