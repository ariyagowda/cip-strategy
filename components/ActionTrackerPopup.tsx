"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Action {
  id: string
  projectId: number
  task: string
  dueDate: string
  owner: string
  completed: boolean
  notes: string
}

interface ActionTrackerPopupProps {
  projectId: number
  projectName: string
  isOpen: boolean
  onClose: () => void
}

export default function ActionTrackerPopup({ projectId, projectName, isOpen, onClose }: ActionTrackerPopupProps) {
  const [actions, setActions] = useState<Action[]>([
    {
      id: "1",
      projectId: 1,
      task: "Schedule stakeholder meeting",
      dueDate: "2023-06-15",
      owner: "John Doe",
      completed: false,
      notes: "Need to coordinate with project team first",
    },
    {
      id: "2",
      projectId: 1,
      task: "Review project timeline",
      dueDate: "2023-06-20",
      owner: "Jane Smith",
      completed: true,
      notes: "Timeline approved by stakeholders",
    },
    {
      id: "3",
      projectId: 1,
      task: "Prepare budget report",
      dueDate: "2023-06-25",
      owner: "Mike Johnson",
      completed: false,
      notes: "Waiting for final estimates",
    },
  ])
  const [newTask, setNewTask] = useState("")
  const [newDueDate, setNewDueDate] = useState("")
  const [newOwner, setNewOwner] = useState("")
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({})

  const handleAddAction = () => {
    if (newTask && newDueDate && newOwner) {
      const newAction: Action = {
        id: Date.now().toString(),
        projectId,
        task: newTask,
        dueDate: newDueDate,
        owner: newOwner,
        completed: false,
        notes: "",
      }
      setActions([...actions, newAction])
      setNewTask("")
      setNewDueDate("")
      setNewOwner("")
    }
  }

  const handleUpdateStatus = (actionId, status) => {
    setProjectActions(projectActions.map(action => 
      action.id === actionId 
        ? { ...action, status, completed: status === "completed" } 
        : action
    ));
  };

  const handleToggleCompleted = (actionId: string) => {
    setActions(actions.map((action) => (action.id === actionId ? { ...action, completed: !action.completed } : action)))
  }

  const handleUpdateNotes = (actionId: string, notes: string) => {
    setActions(actions.map((action) => (action.id === actionId ? { ...action, notes } : action)))
    setEditingNotes((prev) => ({ ...prev, [actionId]: notes }))
  }

  const projectActions = actions.filter((action) => action.projectId === projectId)

  const aiRecommendation =
    "Based on the project timeline and stakeholder activity, we recommend scheduling a progress review meeting with key stakeholders within the next two weeks."

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Action Tracker - {projectName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectActions.map((action) => (
                <TableRow key={action.id}>
                  <TableCell>{action.task}</TableCell>
                  <TableCell>{action.dueDate}</TableCell>
                  <TableCell>{action.owner}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="link" className="p-0 h-auto font-normal">
                          Notes
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-medium">Notes</h4>
                          <Textarea
                            value={editingNotes[action.id] ?? action.notes}
                            onChange={(e) => handleUpdateNotes(action.id, e.target.value)}
                            placeholder="Add notes here..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={action.completed} onCheckedChange={() => handleToggleCompleted(action.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex space-x-2">
            <Input placeholder="New task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <Input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
            <Input placeholder="Owner" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
            <Button onClick={handleAddAction}>Add Action</Button>
          </div>
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">AI Recommendation</h3>
            <p>{aiRecommendation}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

