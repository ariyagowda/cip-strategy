"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<{ id: number; url: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWebsites = async () => {
      const { data, error } = await supabase.from("websites").select("*")
      if (error) {
        console.error("Error fetching websites:", error)
      } else {
        setWebsites(data)
      }
      setLoading(false)
    }

    fetchWebsites()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stored Websites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : websites.length > 0 ? (
        <ul className="space-y-2">
          {websites.map((website) => (
            <li key={website.id} className="p-2 border rounded">
              {website.url}
            </li>
          ))}
        </ul>
      ) : (
        <p>No websites found.</p>
      )}
    </div>
  )
}
