"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface UpdateModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (update: string) => void
  projectName: string
  fromStatus: string
  toStatus: string
}

export default function UpdateModal({
  isOpen,
  onClose,
  onUpdate,
  projectName,
  fromStatus,
  toStatus,
}: UpdateModalProps) {
  const [update, setUpdate] = useState("")

  const handleSubmit = () => {
    onUpdate(update)
    setUpdate("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Project Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-sm">
            Moving <span className="font-semibold">{projectName}</span> from{" "}
            <span className="font-semibold">{fromStatus}</span> to <span className="font-semibold">{toStatus}</span>
          </div>
          <Textarea
            placeholder="Enter status update..."
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!update.trim()}>
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

