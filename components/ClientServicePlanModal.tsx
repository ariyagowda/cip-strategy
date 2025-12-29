







// "use client"

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase"

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { CheckSquare, Edit, Plus, Trash2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Building2,
//   Users,
//   BarChart2,
//   Target,
//   LineChart,
//   DollarSign,
//   LayoutDashboard,
//   ClipboardList,
//   Briefcase,
// } from "lucide-react"
// import Image from "next/image"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Input } from "@/components/ui/input"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { cn } from "@/lib/utils"

// interface Project {
//   id: number,
//   name: string
//   projectNumber: string
//   category: string
//   subcategory: string
//   department: string
//   projectValue: number
//   location: string
//   region: string
//   projectManager: string
//   startYear: number
//   status: string
//   shortDescription: string
//   fullDescription: string
//   fundingStrategy: string
//   programmedFunding: string
//   meansOfFinancing: string
//   budget: string
//   imageUrl?: string
//   fit: "High" | "Medium" | "Low"
//   relevantExperience?: string
//   similarProjects?: Array<{
//     name: string
//     location: string
//     value: number
//   }>
//   competitorAnalysis?: string
//   keyStakeholders?: Array<{
//     name: string
//     role: string
//     organization: string
//     contact: string
//   }>
//   comments?: string
// }

// interface Action {
//   id: string
//   projectId: number
//   task: string
//   due_date: string
//   owner: string
//   completed: boolean
//   status: string,
//   notes: string
// }

// interface Stakeholder {
//   id: string;
//   project_id: string;
//   agency_id: string;
//   name: string;
//   role: string;
//   influence_level: string;
//   contact_info: string;
// }


// interface ClientServicePlanModalProps {
//   isOpen: boolean
//   onClose: () => void
//   project?: Project
// }


// // In your component

// const defaultCSP = {
//   agencyName: "",
//   headquarters: "",
//   yearsInBusiness: "",
//   employeeCount: "",
//   annualBudget: "",
//   historicalSpend: "",
//   certifications: [],
//   preferredProcurementMethods: [],
//   marketSegments: [],
//   geographicFocus: [],
//   totalValueOfProjects: "",
//   priorityScore: 0,
//   decisionMakers: [
//     {
//       name: "John Doe",
//       title: "Director of Facilities",
//       contact: "john.doe@example.com",
//       department: "Facilities",
//       influenceLevel: "High",
//       priorities: "Cost-effective, sustainable construction",
//       engagementStatus: "Meeting Scheduled",
//       phoneNumber: "(555) 123-4567",
//       lastContactDate: "2024-02-15",
//       notes: "Prefers morning meetings. Very interested in our sustainable building practices.",
//     },
//     {
//       name: "Jane Smith",
//       title: "Chief Financial Officer",
//       contact: "jane.smith@example.com",
//       department: "Finance",
//       influenceLevel: "Medium",
//       priorities: "Budget adherence, ROI optimization",
//       engagementStatus: "Follow-up Required",
//       phoneNumber: "(555) 987-6543",
//       lastContactDate: "2024-01-28",
//       notes: "Concerned about project cost overruns. Send detailed financial projections before next meeting.",
//     },
//     {
//       name: "Robert Johnson",
//       title: "Project Manager",
//       contact: "robert.johnson@example.com",
//       department: "Operations",
//       influenceLevel: "Medium",
//       priorities: "Timeline adherence, quality control",
//       engagementStatus: "Active Engagement",
//       phoneNumber: "(555) 456-7890",
//       lastContactDate: "2024-02-22",
//       notes: "Has worked with our competitors in the past. Appreciates detailed project plans and regular updates.",
//     },
//   ],
//   competitivePosition: {
//     mainCompetitors: [],
//     winRate: "",
//     competitiveAdvantages: [],
//   },
//   activeProjects: [],
//   pipelineProjects: [],
//   actionItems: [],
//   performanceMetrics: {
//     projectWinRate: {
//       current: "0%",
//       target: "0%",
//     },
//     clientSatisfaction: {
//       current: "0.0",
//     },
//     financialMetrics: {
//       backlog: "0",
//       yearOverYearGrowth: "0%",
//       profitMargin: "0%",
//     },
//     safetyRecord: {
//       emr: "0",
//       incidents: "0",
//     },
//   },
//   agencyType: "",
//   existingRelationships: "",
//   pastProjects: "",
//   totalUpcomingProjects: "",
//   averageProjectSize: "",
//   largeProjectsCount: "",
//   pipelineTimeline: "",
//   nextBestActions: [],
//   competitiveAdvantages: [],
//   incumbentContractors: [],
//   possibleThreats: [],
//   recentBidResults: "",
//   competitorRelationships: "",
//   electedOfficials: [
//     {
//       name: "Mayor Sarah Wilson",
//       position: "Mayor",
//       district: "City of Oakridge",
//       keyInitiatives: "Downtown revitalization, green infrastructure",
//       publicStatements: "Supports modernization of city facilities",
//       communityInterests: "Environmental sustainability, job creation",
//       engagementStatus: "Positive relationship",
//       phoneNumber: "(555) 234-5678",
//       lastContactDate: "2024-02-10",
//       notes: "Attended our community presentation last month. Expressed interest in our green building initiatives.",
//     },
//     {
//       name: "Councilman Michael Brown",
//       position: "City Council Member",
//       district: "District 3",
//       keyInitiatives: "Transportation, public safety",
//       publicStatements: "Advocate for responsible spending",
//       communityInterests: "Infrastructure improvement",
//       engagementStatus: "Initial contact made",
//       phoneNumber: "(555) 345-6789",
//       lastContactDate: "2024-01-15",
//       notes: "Skeptical about project costs. Need to prepare detailed budget justification for next meeting.",
//     },
//   ],
//   communityInfluencers: [
//     {
//       name: "Dr. Emily Chen",
//       role: "President, Chamber of Commerce",
//       influence: "High influence in business community",
//       potential: "Strong Advocate",
//       engagementStatus: "Regular engagement",
//       phoneNumber: "(555) 567-8901",
//       lastContactDate: "2024-02-18",
//       notes: "Can help connect with local business leaders. Interested in economic impact of our projects.",
//     },
//     {
//       name: "Thomas Garcia",
//       role: "Community Activist",
//       influence: "Medium influence with neighborhood associations",
//       potential: "Potential Ally",
//       engagementStatus: "Initial outreach",
//       phoneNumber: "(555) 678-9012",
//       lastContactDate: "2024-02-05",
//       notes: "Concerned about construction disruption. Prepare community impact mitigation plan before next contact.",
//     },
//   ],
//   strategicInitiatives: [],
//   shortTermActions: [],
//   midTermActions: [],
//   longTermActions: [],
//   plannedOutreachActivities: [],
// }

// const formatCurrency = (value: number): string => {
//   return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
// }

// const renderInfluenceLevel = (level: "Low" | "Medium" | "High" | undefined) => {
//   const colors = {
//     Low: "bg-yellow-100 text-yellow-800",
//     Medium: "bg-blue-100 text-blue-800",
//     High: "bg-green-100 text-green-800",
//   }
//   return <Badge className={colors[level || "Medium"]}>{level || "Medium"}</Badge>
// }




//   //const csp = rawCSP;


//   // useEffect(() => {
//   //   console.log("Project ID:", project?.id);
//   //   const fetchCSP = async () => {
//   //     if (!project?.id) return;
  
//   //     const { data, error } = await supabase
//   //       .from("client_service_plans")
//   //       .select("*")
//   //       .eq("project_id", project.id)
//   //       .maybeSingle();
  
//   //     if (error) {
//   //       console.error("Error fetching CSP:", error);
//   //       return;
//   //     }
  
//   //     setRawCSP(data); // or however you're updating the CSP state
//   //   };
  
//   //   console.log("Trying to fetch CSP for project ID:", project?.id);

//   //   fetchCSP();
//   // }, [project]);
  
//   // useEffect(() => {
//   //   if (!project?.id) return;
  
//   //   const fetchData = async () => {
//   //     console.log("Fetching CSP and actions for project ID:", project.id);
  
//   //     // Fetch Client Service Plan
//   //     const { data: cspData, error: cspError } = await supabase
//   //       .from("client_service_plans")
//   //       .select("*")
//   //       .eq("project_id", project.id)
//   //       .maybeSingle();
  
//   //     if (cspError) {
//   //       console.error("Error fetching CSP:", cspError);
//   //     } else {
//   //       setRawCSP(cspData);
//   //     }
  
//   //     // Fetch Actions
//   //     const { data: actionsData, error: actionsError } = await supabase
//   //       .from("actions")
//   //       .select("*")
//   //       .eq("project_id", project.id);
  
//   //     if (actionsError) {
//   //       console.error("Error fetching actions:", actionsError);
//   //     } else {
//   //       setActions(actionsData);
//   //     }
//   //   };
  
//   //   fetchData();
//   // }, [project]);

//   // useEffect(() => {
//   //   if (!project?.id) return;
  
//   //   const fetchData = async () => {
//   //     console.log("Fetching data for project ID:", project.id);
  
//   //     const { data: cspData } = await supabase
//   //       .from("client_service_plans")
//   //       .select("*")
//   //       .eq("project_id", project.id)
//   //       .maybeSingle();
  
//   //     setRawCSP(cspData);
  
//   //     const { data: actionsData } = await supabase
//   //       .from("actions")
//   //       .select("*")
//   //       .eq("project_id", project.id);
  
//   //       if (actionsData) {
//   //         setActions(actionsData);
//   //       }
        
  
//   //   //   const { data: stakeholdersData } = await supabase
//   //   //     .from("stakeholders")
//   //   //     .select("*")
//   //   //     .eq("project_id", project.id);
  
//   //   //     if (stakeholdersData) {
//   //   //       setStakeholders(stakeholdersData);
//   //   //     }
        
//   //   // };
//   //     const { data: allStakeholders, error: stakeholdersError } = await supabase
//   //       .from("stakeholders")
//   //       .select("*")
//   //       .eq("project_id", project.id);

//   //     if (stakeholdersError) {
//   //       console.error("Error fetching stakeholders:", stakeholdersError);
//   //       return;
//   //     }

//   //     // Filter out elected officials and community influencers
//   //     const electedOfficials = allStakeholders.filter((s: any) => s.type === "elected_official");
//   //     const communityInfluencers = allStakeholders.filter((s: any) => s.type === "community_influencer");

//   //     setStakeholders(allStakeholders);  // Update the general stakeholders list
//   //     setElectedOfficials(electedOfficials);  // Set elected officials
//   //     setCommunityInfluencers(communityInfluencers);  // Set community influencers
//   //   };
  
//   //   fetchData();
//   // }, [project]);

// // const ProjectTasks = ({ projectId }: { projectId: string }) => {
// //   const [tasks, setTasks] = useState<any[]>([]);
// //   const [newTask, setNewTask] = useState("");
// //   const [newOwner, setNewOwner] = useState("");
// //   const [newDueDate, setNewDueDate] = useState("");
// //   const [newStatus, setNewStatus] = useState("To Do");

// //   useEffect(() => {
// //     if (!projectId) return;

// //     const fetchTasks = async () => {
// //       const { data, error } = await supabase
// //         .from("project_tasks")
// //         .select("*")
// //         .eq("project_id", projectId);

// //       if (error) {
// //         console.error("Error fetching tasks:", error);
// //       } else {
// //         setTasks(data);
// //       }
// //     };

// //     fetchTasks();
// //   }, [projectId]);

// //   const handleAddTask = async () => {
// //     const { data, error } = await supabase
// //       .from("project_tasks")
// //       .insert([
// //         {
// //           project_id: projectId,
// //           task: newTask,
// //           owner: newOwner,
// //           due_date: newDueDate,
// //           status: newStatus,
// //         },
// //       ]);

// //     if (error) {
// //       console.error("Error adding task:", error);
// //     } else {
// //       setTasks((prevTasks) => [...prevTasks, ...(data || [])]);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Input
// //         placeholder="New task"
// //         value={newTask}
// //         onChange={(e) => setNewTask(e.target.value)}
// //       />
// //       <Input
// //         type="date"
// //         value={newDueDate}
// //         onChange={(e) => setNewDueDate(e.target.value)}
// //       />
// //       <Input
// //         placeholder="Owner"
// //         value={newOwner}
// //         onChange={(e) => setNewOwner(e.target.value)}
// //       />
// //       <Button onClick={handleAddTask}>Add Task</Button>

// //       <Table>
// //         <TableHeader>
// //           <TableRow>
// //             <TableHead>Task</TableHead>
// //             <TableHead>Due Date</TableHead>
// //             <TableHead>Owner</TableHead>
// //             <TableHead>Status</TableHead>
// //           </TableRow>
// //         </TableHeader>
// //         <TableBody>
// //           {tasks.map((task) => (
// //             <TableRow key={task.id}>
// //               <TableCell>{task.task}</TableCell>
// //               <TableCell>{task.due_date}</TableCell>
// //               <TableCell>{task.owner}</TableCell>
// //               <TableCell>{task.status}</TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </div>
// //   );
// // };

// export default function ClientServicePlanModal({ isOpen, onClose, project }: ClientServicePlanModalProps) {
//   const [mainTab, setMainTab] = useState<"agency" | "project">("agency")
//   const [subTab, setSubTab] = useState<string>("agency-management")
//   const [rawCSP, setRawCSP] = useState<any>(null)
//   const [stakeholders, setStakeholders] = useState<any[]>([]);
//   const [electedOfficials, setElectedOfficials] = useState<any[]>([]);
//   const [communityInfluencers, setCommunityInfluencers] = useState<any[]>([]);


//   const csp = { ...defaultCSP, ...rawCSP }
//   useEffect(() => {
//     if (!project?.id) return;
  
//     const fetchData = async () => {
//       console.log("Fetching data for project ID:", project.id);
  
//       // Fetch Client Service Plan
//       const { data: cspData, error: cspError } = await supabase
//         .from("client_service_plans")
//         .select("*")
//         .eq("project_id", project.id)
//         .maybeSingle();
  
//       if (cspError) {
//         console.error("Error fetching CSP:", cspError);
//       } else {
//         setRawCSP(cspData);
//       }
  
//       // Fetch Actions
//       const { data: actionsData, error: actionsError } = await supabase
//         .from("actions")
//         .select("*")
//         .eq("project_id", project.id);
  
//       if (actionsError) {
//         console.error("Error fetching actions:", actionsError);
//       } else {
//         setActions(actionsData);
//       }
  
//       // Fetch Stakeholders
//       const { data: allStakeholders, error: stakeholdersError } = await supabase
//         .from("stakeholders")
//         .select("*")
//         .eq("project_id", project.id);
  
//       if (stakeholdersError) {
//         console.error("Error fetching stakeholders:", stakeholdersError);
//         return;
//       }
  
//       // Filter out elected officials and community influencers
//       const electedOfficials = allStakeholders.filter((s: any) => s.type === "elected_official");
//       const communityInfluencers = allStakeholders.filter((s: any) => s.type === "community_influencer");
  
//       setStakeholders(allStakeholders);  // Update the general stakeholders list
//       setElectedOfficials(electedOfficials);  // Set elected officials
//       setCommunityInfluencers(communityInfluencers);  // Set community influencers
//     };
  
//     fetchData();
//   }, [project]);


  
  
  
//   const [actions, setActions] = useState<Action[]>([
//     {
//       id: "1",
//       projectId: 1,
//       task: "Schedule stakeholder meeting",
//       dueDate: "2023-06-15",
//       owner: "John Doe",
//       completed: false,
//       notes: "Need to coordinate with project team first",
//     },
//     {
//       id: "2",
//       projectId: 1,
//       task: "Review project timeline",
//       dueDate: "2023-06-20",
//       owner: "Jane Smith",
//       completed: true,
//       notes: "Timeline approved by stakeholders",
//     },
//     {
//       id: "3",
//       projectId: 1,
//       task: "Prepare budget report",
//       dueDate: "2023-06-25",
//       owner: "Mike Johnson",
//       completed: false,
//       notes: "Waiting for final estimates",
//     },
//   ])
//   const [newTask, setNewTask] = useState("")
//   const [newDueDate, setNewDueDate] = useState("")
//   const [newOwner, setNewOwner] = useState("")
//   const [budgetUtilization, setBudgetUtilization] = useState({
//     totalBudget: project?.budget || 0,
//     spent: project?.amountSpent || 0,
//     categories: project?.budgetBreakdown || {
//       labor: 0,
//       materials: 0,
//       equipment: 0,
//       subcontractors: 0,
//       permits: 0,
//     },
//   })

//   const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({})

//   const [riskData, setRiskData] = useState({
//     riskAssessment:
//       "This project has moderate risk due to potential regulatory changes and timeline constraints. The agency has limited experience with similar projects of this scale.",
//     financialRisks:
//       "Budget overruns possible due to material cost fluctuations. Contingency fund of 15% recommended. Potential for delayed payments from agency based on historical patterns.",
//     operationalRisks:
//       "Resource allocation challenges expected during peak construction period. Weather delays likely if project extends into winter months. Permitting process may take longer than anticipated.",
//     mitigationStrategies:
//       "Weekly risk review meetings scheduled. Early procurement of critical materials. Dedicated liaison assigned to expedite permitting. Alternative suppliers identified for key components.",
//     riskSeverity: 65,
//     riskHistory: [
//       {
//         date: "2023-10-15",
//         event: "Permit delay",
//         impact: "2-week schedule slip",
//         resolution: "Expedited through agency contact",
//       },
//       {
//         date: "2023-11-03",
//         event: "Material price increase",
//         impact: "$25,000 budget impact",
//         resolution: "Negotiated volume discount",
//       },
//       {
//         date: "2024-01-12",
//         event: "Stakeholder requirement change",
//         impact: "Scope modification",
//         resolution: "Change order approved",
//       },
//     ],
//   })

//   // const handleAddAction = () => {
//   //   if (newTask && newDueDate && newOwner) {
//   //     const newAction: Action = {
//   //       id: Date.now().toString(),
//   //       projectId: 1,
//   //       task: newTask,
//   //       dueDate: newDueDate,
//   //       owner: newOwner,
//   //       completed: false,
//   //       notes: "",
//   //     }
//   //     setActions([...actions, newAction])
//   //     setNewTask("")
//   //     setNewDueDate("")
//   //     setNewOwner("")
//   //   }
//   // }
//   const handleAddAction = async () => {
//     if (newTask && newDueDate && newOwner && project?.id) {
//       const newAction = {
//         task: newTask,
//         due_date: newDueDate,
//         owner: newOwner,
//         completed: false,
//         notes: "",
//         project_id: project.id, // required for relational link
//       };
  
//       const { data, error } = await supabase.from("actions").insert([newAction]).select().single();
  
//       if (error) {
//         console.error("Error adding action:", error);
//         return;
//       }
  
//       setActions((prev) => [...prev, data]);
//       setNewTask("");
//       setNewDueDate("");
//       setNewOwner("");
//     }
//   };
  

//   const handleToggleCompleted = (actionId: string) => {
//     setActions(actions.map((action) => (action.id === actionId ? { ...action, completed: !action.completed } : action)))
//   }

//   const handleUpdateNotes = (actionId: string, notes: string) => {
//     setActions(actions.map((action) => (action.id === actionId ? { ...action, notes } : action)))
//     setEditingNotes((prev) => ({ ...prev, [actionId]: notes }))
//   }

//   // const projectActions = actions.filter((action) => action.projectId === 1)

//   // Sample project tasks data
//   const [projectTasks, setProjectTasks] = useState([
//     {
//       id: "1",
//       name: "Initial project planning",
//       owner: "John Smith",
//       dueDate: "2025-04-15",
//       status: "Done",
//     },
//     {
//       id: "2",
//       name: "Material procurement",
//       owner: "Sarah Johnson",
//       dueDate: "2025-04-30",
//       status: "In Progress",
//     },
//     {
//       id: "3",
//       name: "Site preparation",
//       owner: "Michael Brown",
//       dueDate: "2025-05-15",
//       status: "To Do",
//     },
//     {
//       id: "4",
//       name: "Environmental compliance review",
//       owner: "Lisa Anderson",
//       dueDate: "2025-04-22",
//       status: "Blocked",
//     },
//   ])

//   const aiRecommendation =
//     "Based on the project timeline and stakeholder activity, we recommend scheduling a progress review meeting with key stakeholders within the next two weeks."

//   const renderPriorityScore = (score: number) => {
//     const getColor = (score: number) => {
//       if (score >= 8) return "bg-green-500"
//       if (score >= 5) return "bg-yellow-500"
//       return "bg-red-500"
//     }
//     return (
//       <div className="space-y-2">
//         <Progress value={score * 10} className={getColor(score)} />
//         <span className="text-sm text-muted-foreground">{score}/10</span>
//       </div>
//     )
//   }

//   const handleTabChange = (main: "agency" | "project", sub: string) => {
//     setMainTab(main)
//     setSubTab(sub)
//   }

//   // Define tab structure
//   const tabs = {
//     agency: [{ id: "agency-management", label: "Agency & Management", icon: <Building2 className="h-4 w-4" /> }],
//     project: [
//       { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
//       { id: "financing", label: "Financing", icon: <DollarSign className="h-4 w-4" /> },
//       { id: "budget", label: "Budget Utilization", icon: <DollarSign className="h-4 w-4" /> },
//       { id: "strategy", label: "Strategy", icon: <Target className="h-4 w-4" /> },
//       { id: "stakeholders", label: "Stakeholders", icon: <Users className="h-4 w-4" /> },
//       { id: "competitive", label: "Competitive", icon: <BarChart2 className="h-4 w-4" /> },
//       { id: "metrics", label: "Metrics", icon: <LineChart className="h-4 w-4" /> },
//       { id: "project-tasks", label: "Project Tasks", icon: <CheckSquare className="h-4 w-4" /> },
//       { id: "action-tracker", label: "Action Tracker", icon: <ClipboardList className="h-4 w-4" /> },
//       { id: "risk", label: "Risk", icon: <Briefcase className="h-4 w-4" /> },
//     ],
//   }

//   // const handleUpdateStatus = (actionId: string, status: string) => {
//   //   setActions(
//   //     actions.map((action) => (action.id === actionId ? { ...action, completed: status === "completed" } : action)),
//   //   )
//   // }
//   const handleUpdateStatus = async (actionId: string, newStatus: string) => {
//     // Update in Supabase
//     const { error } = await supabase
//       .from("actions")
//       .update({ status: newStatus })
//       .eq("id", actionId);
  
//     if (error) {
//       console.error("Error updating status:", error);
//       return;
//     }
  
//     // Update in local state
//     setActions((prev) =>
//       prev.map((action) =>
//         action.id === actionId ? { ...action, status: newStatus } : action
//       )
//     );
//   };
  

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
//         <DialogHeader className="px-6 py-4 border-b">
//           <DialogTitle className="flex items-center gap-2 text-xl">
//             <Building2 className="h-5 w-5" />
//             {project?.name ? `Client Service Plan - ${project.name}` : "Client Service Plan"}
//           </DialogTitle>
//         </DialogHeader>

//         <div className="flex flex-1 overflow-hidden">
//           {/* Left sidebar with tabs */}
//           <div className="w-64 border-r bg-muted/10 flex flex-col">
//             <ScrollArea className="h-full">
//               <div className="p-4 space-y-6">
//                 {/* Main tabs */}
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => handleTabChange("agency", "agency-management")}
//                     className={cn(
//                       "flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
//                       mainTab === "agency"
//                         ? "bg-primary text-primary-foreground"
//                         : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                     )}
//                   >
//                     <Building2 className="h-5 w-5" />
//                     Agency
//                   </button>
//                   <button
//                     onClick={() => handleTabChange("project", "overview")}
//                     className={cn(
//                       "flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
//                       mainTab === "project"
//                         ? "bg-primary text-primary-foreground"
//                         : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                     )}
//                   >
//                     <Briefcase className="h-5 w-5" />
//                     Project
//                   </button>
//                 </div>

//                 {/* Divider */}
//                 <div className="h-px bg-border" />

//                 {/* Sub tabs */}
//                 <div className="space-y-1">
//                   {mainTab === "agency" &&
//                     tabs.agency.map((tab) => (
//                       <button
//                         key={tab.id}
//                         onClick={() => setSubTab(tab.id)}
//                         className={cn(
//                           "flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
//                           subTab === tab.id
//                             ? "bg-accent text-accent-foreground"
//                             : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                         )}
//                       >
//                         {tab.icon}
//                         {tab.label}
//                       </button>
//                     ))}
//                   {mainTab === "project" &&
//                     tabs.project.map((tab) => (
//                       <button
//                         key={tab.id}
//                         onClick={() => setSubTab(tab.id)}
//                         className={cn(
//                           "flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
//                           subTab === tab.id
//                             ? "bg-accent text-accent-foreground"
//                             : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                         )}
//                       >
//                         {tab.icon}
//                         {tab.label}
//                       </button>
//                     ))}
//                 </div>
//               </div>
//             </ScrollArea>
//           </div>

//           {/* Main content area */}
//           <div className="flex-1 overflow-hidden">
//             <ScrollArea className="h-[calc(100vh-14rem)]">
//               <div className="p-6">
//                 {/* Agency & Management Tab */}
//                 {subTab === "agency-management" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Agency Information</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Agency Name</Label>
//                             <div className="text-lg font-semibold mt-1">{csp.agencyName}</div>
//                           </div>
//                           <div>
//                             <Label>Agency Type</Label>
//                             <div className="text-sm mt-1">{csp.agencyType}</div>
//                           </div>
//                           <div>
//                             <Label>Headquarters</Label>
//                             <div className="text-sm mt-1">{csp.headquarters || "Not specified"}</div>
//                           </div>
//                           <div>
//                             <Label>Years in Business</Label>
//                             <div className="text-sm mt-1">{csp.yearsInBusiness || "Not specified"}</div>
//                           </div>
//                         </div>
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Employee Count</Label>
//                             <div className="text-sm mt-1">{csp.employeeCount || "Not specified"}</div>
//                           </div>
//                           <div>
//                             <Label>Department</Label>
//                             <div className="text-sm mt-1">{project?.department || "Not specified"}</div>
//                           </div>
//                           <div>
//                             <Label>Project Manager</Label>
//                             <div className="text-sm mt-1">{project?.projectManager || "Not specified"}</div>
//                           </div>
//                           <div>
//                             <Label>Certifications</Label>
//                             <div className="flex flex-wrap gap-2 mt-1">
//                               {(csp.certifications || []).length > 0 ? (
//                                 csp.certifications.map((cert: string, index: number) => (
//                                   <Badge key={index} variant="outline">
//                                     {cert}
//                                   </Badge>
//                                 ))
//                               ) : (
//                                 <span className="text-sm text-muted-foreground">No certifications listed</span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Market Focus</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Market Segments</Label>
//                             {(csp.marketSegments || []).length > 0 ? (
//                               <div className="mt-2 space-y-2">
//                                 {csp.marketSegments.map((segment: any, index: number) => (
//                                   <div key={index} className="flex justify-between items-center">
//                                     <span>{segment.name}</span>
//                                     <div className="w-1/2">
//                                       <Progress value={segment.percentage} className="h-2" />
//                                       <span className="text-xs text-right block">{segment.percentage}%</span>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             ) : (
//                               <div className="text-sm text-muted-foreground mt-1">
//                                 No market segment information available
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Geographic Focus</Label>
//                             <div className="flex flex-wrap gap-2 mt-1">
//                               {(csp.geographicFocus || []).length > 0 ? (
//                                 csp.geographicFocus.map((location: string, index: number) => (
//                                   <Badge key={index} variant="secondary">
//                                     {location}
//                                   </Badge>
//                                 ))
//                               ) : (
//                                 <span className="text-sm text-muted-foreground">
//                                   No geographic focus information available
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                           <div>
//                             <Label>Category & Subcategory</Label>
//                             <div className="grid grid-cols-2 gap-2 mt-1">
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Category</span>
//                                 <div className="text-sm">{project?.category || "Not specified"}</div>
//                               </div>
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Subcategory</span>
//                                 <div className="text-sm">{project?.subcategory || "Not specified"}</div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Relationship History</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <div className="p-4 border rounded-lg">
//                           <Label>Existing Relationships</Label>
//                           <p className="mt-2 text-sm">
//                             {csp.existingRelationships || "No existing relationship information available."}
//                           </p>
//                         </div>
//                         <div className="p-4 border rounded-lg">
//                           <Label>Past Projects</Label>
//                           <p className="mt-2 text-sm">
//                             {csp.pastProjects || "No past projects information available."}
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}

//                 {/* Overview Tab */}
//                 {subTab === "overview" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Agency Overview</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid gap-6">
//                         <div className="grid grid-cols-2 gap-6">
//                           <div className="space-y-4">
//                             <div>
//                               <Label>Agency Name</Label>
//                               <div className="text-lg font-semibold mt-1">{csp.agencyName}</div>
//                             </div>
//                             <div>
//                               <Label>Agency Type</Label>
//                               <div className="text-sm mt-1">{csp.agencyType}</div>
//                             </div>
//                             <div>
//                               <Label>Annual Budget</Label>
//                               <div className="text-sm mt-1">{csp.annualBudget}</div>
//                             </div>
//                             <div>
//                               <Label>Historical Spend</Label>
//                               <div className="text-sm mt-1">{csp.historicalSpend}</div>
//                             </div>
//                           </div>
//                           <div className="space-y-4">
//                             <div>
//                               <Label>Existing Relationships</Label>
//                               <div className="text-sm mt-1">{csp.existingRelationships}</div>
//                             </div>
//                             <div>
//                               <Label>Past Projects</Label>
//                               <div className="text-sm mt-1">{csp.pastProjects || "None"}</div>
//                             </div>
//                             <div>
//                               <Label>Preferred Procurement Methods</Label>
//                               <div className="flex flex-wrap gap-2 mt-1">
//                                 {(csp.preferredProcurementMethods || []).map((method, index) => (
//                                   <Badge key={index} variant="outline">
//                                     {method}
//                                   </Badge>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Project Status</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Current Status</Label>
//                             <div className="mt-2">
//                               <Badge
//                                 variant={
//                                   project?.status === "completed" || project?.status === "done"
//                                     ? "default"
//                                     : project?.status === "in-progress" || project?.status === "inprogress"
//                                       ? "secondary"
//                                       : "outline"
//                                 }
//                               >
//                                 {project?.status
//                                   ? project.status.charAt(0).toUpperCase() + project.status.slice(1)
//                                   : "Not Started"}
//                               </Badge>
//                             </div>
//                           </div>
//                           <div>
//                             <Label>Project Description</Label>
//                             <p className="text-sm mt-2">
//                               {project?.fullDescription || project?.shortDescription || "No description available."}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Project Location</Label>
//                             <p className="text-sm mt-2">
//                               {project?.location
//                                 ? `${project.location}${project.region ? `, ${project.region}` : ""}`
//                                 : "Location not specified"}
//                             </p>
//                           </div>
//                           <div>
//                             <Label>Timeline Progress</Label>
//                             <div className="space-y-2 mt-2">
//                               <Progress
//                                 value={
//                                   project?.status === "completed" || project?.status === "done"
//                                     ? 100
//                                     : project?.status === "review"
//                                       ? 75
//                                       : project?.status === "in-progress" || project?.status === "inprogress"
//                                         ? 50
//                                         : project?.status === "planning"
//                                           ? 25
//                                           : 10
//                                 }
//                                 className="h-2"
//                               />
//                               <div className="flex justify-between text-xs text-muted-foreground">
//                                 <span>Start: {project?.startYear || "N/A"}</span>
//                                 <span>
//                                   {project?.status === "completed" || project?.status === "done"
//                                     ? "Completed"
//                                     : project?.status === "review"
//                                       ? "75% Complete"
//                                       : project?.status === "in-progress" || project?.status === "inprogress"
//                                         ? "50% Complete"
//                                         : project?.status === "planning"
//                                           ? "25% Complete"
//                                           : "10% Complete"}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Project Pipeline</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid gap-6">
//                         <div className="grid grid-cols-3 gap-6">
//                           <div className="space-y-2">
//                             <Label>Total Upcoming Projects</Label>
//                             <div className="text-2xl font-bold">{csp.totalUpcomingProjects}</div>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Total Value of Projects</Label>
//                             <div className="text-2xl font-bold">{csp.totalValueOfProjects}</div>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Average Project Size</Label>
//                             <div className="text-2xl font-bold">{csp.averageProjectSize}</div>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-6">
//                           <div className="space-y-2">
//                             <Label>Large Projects Count</Label>
//                             <div className="text-lg">{csp.largeProjectsCount}</div>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Pipeline Timeline</Label>
//                             <div className="text-lg">{csp.pipelineTimeline}</div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Strategic Assessment</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid gap-6">
//                         <div className="grid grid-cols-2 gap-6">
//                           <div className="space-y-2">
//                             <Label>Priority Score</Label>
//                             <div className="space-y-2">
//                               <Progress
//                                 value={csp.priorityScore * 10}
//                                 className={
//                                   csp.priorityScore >= 8
//                                     ? "bg-green-500"
//                                     : csp.priorityScore >= 5
//                                       ? "bg-yellow-500"
//                                       : "bg-red-500"
//                                 }
//                               />
//                               <span className="text-sm text-muted-foreground">{csp.priorityScore}/10</span>
//                             </div>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Competitive Advantages</Label>
//                             <div className="flex flex-wrap gap-2">
//                               {(csp.competitiveAdvantages || []).map((advantage, index) => (
//                                 <Badge key={index} variant="secondary">
//                                   {advantage}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Next Best Actions</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <ul className="space-y-2 list-disc pl-5">
//                           {(csp.nextBestActions || []).map((action, index) => (
//                             <li key={index} className="text-sm">
//                               {action}
//                             </li>
//                           ))}
//                         </ul>
//                       </CardContent>
//                     </Card>

//                     {project && (
//                       <Card>
//                         <CardHeader>
//                           <CardTitle>Project Details</CardTitle>
//                         </CardHeader>
//                         <CardContent className="grid gap-6">
//                           <div className="grid grid-cols-2 gap-6">
//                             <div className="space-y-4">
//                               <div>
//                                 <Label>Project Name</Label>
//                                 <div className="text-lg font-semibold mt-1">{project.name}</div>
//                               </div>
//                               <div>
//                                 <Label>Project Number</Label>
//                                 <div className="text-sm mt-1">{project.projectNumber}</div>
//                               </div>
//                               <div>
//                                 <Label>Location</Label>
//                                 <div className="text-sm mt-1">
//                                   {project.location}, {project.region}
//                                 </div>
//                               </div>
//                               <div>
//                                 <Label>Start Date</Label>
//                                 <div className="text-sm mt-1">{project.startYear}</div>
//                               </div>
//                               <div>
//                                 <Label>Status</Label>
//                                 <Badge variant="outline" className="mt-1">
//                                   {project.status}
//                                 </Badge>
//                               </div>
//                             </div>
//                             {project.imageUrl && (
//                               <div className="relative aspect-video rounded-lg overflow-hidden">
//                                 <Image
//                                   src={project.imageUrl || "/placeholder.svg"}
//                                   alt={project.name}
//                                   fill
//                                   className="object-cover"
//                                 />
//                               </div>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Description</Label>
//                             <div className="text-sm">{project.fullDescription}</div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     )}
//                   </div>
//                 )}

//                 {/* Financing Tab */}
//                 {subTab === "financing" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Financial Details</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid gap-6">
//                         <div className="grid grid-cols-2 gap-6">
//                           <div className="space-y-4">
//                             <div>
//                               <Label>Budget</Label>
//                               <div className="text-2xl font-bold mt-1">{project?.budget || csp.annualBudget}</div>
//                             </div>
//                             <div>
//                               <Label>Programmed Funding</Label>
//                               <div className="text-sm mt-1">
//                                 {project?.programmedFunding || csp.totalValueOfProjects}
//                               </div>
//                             </div>
//                             <div>
//                               <Label>Historical Spend</Label>
//                               <div className="text-sm mt-1">{csp.historicalSpend}</div>
//                             </div>
//                           </div>
//                           <div className="space-y-4">
//                             <div>
//                               <Label>Means of Financing</Label>
//                               <div className="text-sm mt-1">{project?.meansOfFinancing || "Not specified"}</div>
//                             </div>
//                             <div>
//                               <Label>Funding Strategy</Label>
//                               <div className="text-sm mt-1">{project?.fundingStrategy || "Not specified"}</div>
//                             </div>
//                             <div>
//                               <Label>Preferred Procurement Methods</Label>
//                               <div className="flex flex-wrap gap-2 mt-1">
//                                 {(csp.preferredProcurementMethods || []).map((method, index) => (
//                                   <Badge key={index} variant="outline">
//                                     {method}
//                                   </Badge>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="space-y-4">
//                           <Label>Financial Metrics</Label>
//                           <div className="grid grid-cols-3 gap-4">
//                             <div className="p-4 border rounded-lg">
//                               <div className="text-sm text-muted-foreground">Backlog</div>
//                               <div className="text-lg font-semibold">
//                                 {csp.performanceMetrics?.financialMetrics?.backlog || "N/A"}
//                               </div>
//                             </div>
//                             <div className="p-4 border rounded-lg">
//                               <div className="text-sm text-muted-foreground">YOY Growth</div>
//                               <div className="text-lg font-semibold">
//                                 {csp.performanceMetrics?.financialMetrics?.yearOverYearGrowth || "N/A"}
//                               </div>
//                             </div>
//                             <div className="p-4 border rounded-lg">
//                               <div className="text-sm text-muted-foreground">Win Rate</div>
//                               <div className="text-lg font-semibold">{csp.competitivePosition?.winRate || "N/A"}</div>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}

//                 {subTab === "budget" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Budget Summary</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-3 gap-6">
//                         <div className="p-4 border rounded-lg">
//                           <Label>Total Budget</Label>
//                           <div className="text-2xl font-bold">{formatCurrency(budgetUtilization.totalBudget)}</div>
//                         </div>
//                         <div className="p-4 border rounded-lg">
//                           <Label>Amount Spent</Label>
//                           <div className="text-2xl font-bold">{formatCurrency(budgetUtilization.spent)}</div>
//                         </div>
//                         <div className="p-4 border rounded-lg">
//                           <Label>Remaining Budget</Label>
//                           <div className="text-2xl font-bold">
//                             {formatCurrency(budgetUtilization.totalBudget - budgetUtilization.spent)}
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Budget Allocation</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="grid grid-cols-2 gap-6">
//                           <div className="space-y-2">
//                             <Label>Labor Costs</Label>
//                             <Progress
//                               value={(budgetUtilization.categories.labor / budgetUtilization.totalBudget) * 100}
//                               className="h-2"
//                             />
//                             <span className="text-sm">{formatCurrency(budgetUtilization.categories.labor)}</span>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Materials & Supplies</Label>
//                             <Progress
//                               value={(budgetUtilization.categories.materials / budgetUtilization.totalBudget) * 100}
//                               className="h-2"
//                             />
//                             <span className="text-sm">{formatCurrency(budgetUtilization.categories.materials)}</span>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Equipment</Label>
//                             <Progress
//                               value={(budgetUtilization.categories.equipment / budgetUtilization.totalBudget) * 100}
//                               className="h-2"
//                             />
//                             <span className="text-sm">{formatCurrency(budgetUtilization.categories.equipment)}</span>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Subcontractors</Label>
//                             <Progress
//                               value={
//                                 (budgetUtilization.categories.subcontractors / budgetUtilization.totalBudget) * 100
//                               }
//                               className="h-2"
//                             />
//                             <span className="text-sm">
//                               {formatCurrency(budgetUtilization.categories.subcontractors)}
//                             </span>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Permits & Compliance</Label>
//                             <Progress
//                               value={(budgetUtilization.categories.permits / budgetUtilization.totalBudget) * 100}
//                               className="h-2"
//                             />
//                             <span className="text-sm">{formatCurrency(budgetUtilization.categories.permits)}</span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Budget Forecast</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div className="space-y-2">
//                           <Label>Projected Overspend / Savings</Label>
//                           <div className="text-lg font-bold">
//                             {budgetUtilization.spent > budgetUtilization.totalBudget
//                               ? `⚠ Over Budget by ${formatCurrency(budgetUtilization.spent - budgetUtilization.totalBudget)}`
//                               : `✅ Savings: ${formatCurrency(budgetUtilization.totalBudget - budgetUtilization.spent)}`}
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Cost-Saving Recommendations</Label>
//                           <ul className="list-disc pl-5 text-sm">
//                             <li>Reduce overtime labor costs.</li>
//                             <li>Negotiate bulk discounts on materials.</li>
//                             <li>Identify unnecessary expenditures.</li>
//                           </ul>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}

//                 {/* Strategy Tab */}
//                 {subTab === "strategy" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Strategic Analysis</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid gap-6">
//                         <div className="grid grid-cols-2 gap-6">
//                           <div className="space-y-4">
//                             <div>
//                               <Label>Strategic Fit</Label>
//                               <Badge
//                                 variant={
//                                   project?.fit === "High"
//                                     ? "default"
//                                     : project?.fit === "Medium"
//                                       ? "secondary"
//                                       : "outline"
//                                 }
//                                 className="mt-2"
//                               >
//                                 {project?.fit}
//                               </Badge>
//                             </div>
//                             <div>
//                               <Label>Relevant Experience</Label>
//                               <Textarea value={project?.relevantExperience} className="mt-2" readOnly />
//                             </div>
//                           </div>
//                           <div className="space-y-4">
//                             <div>
//                               <Label>Similar Projects</Label>
//                               <div className="space-y-2 mt-2">
//                                 {project?.similarProjects?.map((similar, index) => (
//                                   <div key={index} className="p-3 border rounded-lg">
//                                     <div className="font-medium">{similar.name}</div>
//                                     <div className="text-sm text-muted-foreground">
//                                       Location: {similar.location}
//                                       <br />
//                                       Value: ${similar.value.toLocaleString()}
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Competitor Analysis</Label>
//                           <Textarea value={project?.competitorAnalysis} className="min-h-[100px]" readOnly />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Comments</Label>
//                           <Textarea value={project?.comments} className="min-h-[100px]" readOnly />
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}


//                 {/* Stakeholders Tab */}
//                 {subTab === "stakeholders" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Key Decision Makers</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {/* Render Key Decision Makers */}
//                         {stakeholders.length > 0 ? (
//                           stakeholders.map((stakeholder, index) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Name & Title</Label>
//                                   <div className="font-medium">{stakeholder.name} - {stakeholder.title}</div>
//                                   <Label>Department</Label>
//                                   <div>{stakeholder.department}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label>Influence Level</Label>
//                                   <div>{renderInfluenceLevel(stakeholder.influenceLevel)}</div>
//                                   <Label>Phone Number</Label>
//                                   <div>{stakeholder.phoneNumber || "Not provided"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Email</Label>
//                                 <div>{stakeholder.contact || "Not provided"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Last Contact Date</Label>
//                                 <div>{stakeholder.lastContactDate || "No recent contact"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Priorities</Label>
//                                 <div className="text-sm">{stakeholder.priorities || "No priorities specified"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Notes</Label>
//                                 <div className="text-sm p-2 bg-muted rounded-md">
//                                   {stakeholder.notes || "No notes available"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No decision makers information available.</div>
//                         )}
//                       </CardContent>
//                     </Card>

//                     {/* Render Elected Officials */}
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Elected Officials</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {electedOfficials.length > 0 ? (
//                           electedOfficials.map((official, index) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Name</Label>
//                                   <div className="font-medium">{official.name}</div>
//                                   <Label>Position</Label>
//                                   <div>{official.position}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label>Phone Number</Label>
//                                   <div>{official.phoneNumber || "Not provided"}</div>
//                                   <Label>Last Contact Date</Label>
//                                   <div>{official.lastContactDate || "No recent contact"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Key Initiatives</Label>
//                                 <div>{official.keyInitiatives || "Not provided"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Notes</Label>
//                                 <div className="p-2 bg-muted rounded-md">{official.notes || "No notes available"}</div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No elected officials information available.</div>
//                         )}
//                       </CardContent>
//                     </Card>

//                     {/* Render Community Influencers */}
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Community Influencers</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {communityInfluencers.length > 0 ? (
//                           communityInfluencers.map((influencer, index) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="font-medium">{influencer.name}</div>
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Role</Label>
//                                   <div>{influencer.role}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Potential</Label>
//                                   <div>{influencer.potential}</div>
//                                 </div>
//                               </div>
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Phone Number</Label>
//                                   <div>{influencer.phoneNumber || influencer.phone || "Not provided"}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Last Contact Date</Label>
//                                   <div>{influencer.lastContactDate || "No recent contact"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label className="text-xs">Influence</Label>
//                                 <div>{influencer.influence}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label className="text-xs">Notes</Label>
//                                 <div className="p-2 bg-muted rounded-md">
//                                   {influencer.notes || "No notes available"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No community influencers information available.</div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}



// {/* 
//                 {/* Stakeholders Tab */}
//                 {subTab === "stakeholders" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Key Decision Makers</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {/* Render Decision Makers */}
//                         {stakeholders.length > 0 ? (
//                           stakeholders.map((stakeholder, index) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Name & Title</Label>
//                                   <div className="font-medium">{stakeholder.name} - {stakeholder.title}</div>
//                                   <Label>Department</Label>
//                                   <div>{stakeholder.department}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label>Influence Level</Label>
//                                   <div>{renderInfluenceLevel(stakeholder.influenceLevel)}</div>
//                                   <Label>Phone Number</Label>
//                                   <div>{stakeholder.phoneNumber || "Not provided"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Email</Label>
//                                 <div>{stakeholder.contact || "Not provided"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Last Contact Date</Label>
//                                 <div>{stakeholder.lastContactDate || "No recent contact"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Priorities</Label>
//                                 <div className="text-sm">{stakeholder.priorities || "No priorities specified"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Notes</Label>
//                                 <div className="text-sm p-2 bg-muted rounded-md">
//                                   {stakeholder.notes || "No notes available"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No decision makers information available.</div>
//                         )}
//                       </CardContent>
//                     </Card>

//                     {/* Render Elected Officials */}
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Elected Officials</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {electedOfficials.length > 0 ? (
//                           electedOfficials.map((official, index) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Name</Label>
//                                   <div className="font-medium">{official.name}</div>
//                                   <Label>Position</Label>
//                                   <div>{official.position}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label>Phone Number</Label>
//                                   <div>{official.phoneNumber || "Not provided"}</div>
//                                   <Label>Last Contact Date</Label>
//                                   <div>{official.lastContactDate || "No recent contact"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Key Initiatives</Label>
//                                 <div>{official.keyInitiatives || "Not provided"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Notes</Label>
//                                 <div className="text-sm p-2 bg-muted rounded-md">
//                                   {official.notes || "No notes available"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No elected officials information available.</div>
//                         )}
//                       </CardContent>
//                     </Card>

//                     {/* Render Community Influencers */}
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Community Influencers</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {communityInfluencers.length > 0 ? (
//                           communityInfluencers.map((influencer, index) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Name</Label>
//                                   <div className="font-medium">{influencer.name}</div>
//                                   <Label>Role</Label>
//                                   <div>{influencer.role}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label>Influence</Label>
//                                   <div>{influencer.influence || "Not provided"}</div>
//                                   <Label>Phone Number</Label>
//                                   <div>{influencer.phoneNumber || "Not provided"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Last Contact Date</Label>
//                                 <div>{influencer.lastContactDate || "No recent contact"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Notes</Label>
//                                 <div className="text-sm p-2 bg-muted rounded-md">
//                                   {influencer.notes || "No notes available"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No community influencers information available.</div>
//                         )}
//                       </CardContent>
//                     </Card>
//                     </div>
//               )} */}









// {/* 
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Key Decision Makers</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-6">
//                         {stakeholders.length === 0 ? (
//                           <p className="text-muted-foreground">No stakeholder data available.</p>
//                         ) : (
//                           stakeholders.map((person) => (
//                             <div key={person.id} className="border rounded-lg p-4">
//                               <h4 className="text-lg font-semibold">{person.name}</h4>
//                               <p className="text-sm text-muted-foreground">{person.role}</p>
//                               <div className="mt-2 space-y-1 text-sm">
//                                 <p><strong>Influence Level:</strong> {person.influence_level || "Not specified"}</p>
//                                 <p><strong>Contact Info:</strong> {person.contact_info || "Not specified"}</p>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </CardContent>
//                     </Card> */}



//                     {/* <Card>
//                       <CardHeader>
//                         <CardTitle>Key Decision Makers</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {(csp.decisionMakers || []).length > 0 ? (
//                           csp.decisionMakers.map((dm: any, index: number) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Name & Title</Label>
//                                   <div className="font-medium">
//                                     {dm.name} - {dm.title}
//                                   </div>
//                                   <Label>Department</Label>
//                                   <div>{dm.department}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label>Influence Level</Label>
//                                   <div>{renderInfluenceLevel(dm.influenceLevel)}</div>
//                                   <Label>Phone Number</Label>
//                                   <div>{dm.phoneNumber || dm.phone || "Not provided"}</div>
//                                 </div>
//                               </div>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Email</Label>
//                                   <div>{dm.contact || dm.email || "Not provided"}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label>Last Contact Date</Label>
//                                   <div>{dm.lastContactDate || "No recent contact"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Priorities</Label>
//                                 <div className="text-sm">{dm.priorities || "No priorities specified"}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Notes</Label>
//                                 <div className="text-sm p-2 bg-muted rounded-md">
//                                   {dm.notes || "No notes available"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : project?.keyStakeholders?.length > 0 ? (
//                           project.keyStakeholders.map((dm, index) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Name & Title</Label>
//                                   <div className="font-medium">
//                                     {dm.name} - {dm.role}
//                                   </div>
//                                   <Label>Organization</Label>
//                                   <div>{dm.organization}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label>Contact</Label>
//                                   <div>{dm.contact || "Not provided"}</div>
//                                 </div>
//                               </div>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                   <Label>Last Contact Date</Label>
//                                   <div>{dm.lastContactDate || "No recent contact"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Notes</Label>
//                                 <div className="text-sm p-2 bg-muted rounded-md">
//                                   {dm.notes || "No notes available"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No decision makers information available.</div>
//                         )}
//                       </CardContent>
//                     </Card> */}


// {/* 
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Elected Officials</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {(csp.electedOfficials || []).length > 0 ? (
//                           csp.electedOfficials.map((official: any, index: number) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="flex justify-between items-center">
//                                 <div className="font-medium">{official.name}</div>
//                                 <Badge variant="outline">{official.position}</Badge>
//                               </div>
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">District</Label>
//                                   <div>{official.district}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Engagement Status</Label>
//                                   <div>{official.engagementStatus}</div>
//                                 </div>
//                               </div>
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Phone Number</Label>
//                                   <div>{official.phoneNumber || official.phone || "Not provided"}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Last Contact Date</Label>
//                                   <div>{official.lastContactDate || "No recent contact"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label className="text-xs">Key Initiatives</Label>
//                                 <div>{official.keyInitiatives}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label className="text-xs">Notes</Label>
//                                 <div className="p-2 bg-muted rounded-md">{official.notes || "No notes available"}</div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No elected officials information available.</div>
//                         )}
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Community Influencers</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {(csp.communityInfluencers || []).length > 0 ? (
//                           csp.communityInfluencers.map((influencer: any, index: number) => (
//                             <div key={index} className="p-4 border rounded-lg space-y-4">
//                               <div className="font-medium">{influencer.name}</div>
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Role</Label>
//                                   <div>{influencer.role}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Potential</Label>
//                                   <div>{influencer.potential}</div>
//                                 </div>
//                               </div>
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Phone Number</Label>
//                                   <div>{influencer.phoneNumber || influencer.phone || "Not provided"}</div>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <Label className="text-xs">Last Contact Date</Label>
//                                   <div>{influencer.lastContactDate || "No recent contact"}</div>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label className="text-xs">Influence</Label>
//                                 <div>{influencer.influence}</div>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label className="text-xs">Notes</Label>
//                                 <div className="p-2 bg-muted rounded-md">
//                                   {influencer.notes || "No notes available"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-muted-foreground">No community influencers information available.</div>
//                         )}
//                       </CardContent>}


//                     </Card>}}}
//                 </div>
//               )}















//                 {/* Competitive Tab */}
//                 {subTab === "competitive" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Competitive Analysis</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label>Main Competitors</Label>
//                             {(csp.competitivePosition?.mainCompetitors || []).length > 0 ? (
//                               csp.competitivePosition.mainCompetitors.map((competitor: any, index: number) => (
//                                 <div key={index} className="p-3 border rounded-lg space-y-2">
//                                   <div className="font-medium">{competitor.name}</div>
//                                   <div className="text-sm text-muted-foreground">
//                                     <div>Strengths: {competitor.strengths}</div>
//                                     <div>Recent Wins: {competitor.recentWins}</div>
//                                     <div>Market Share: {competitor.marketShare}</div>
//                                   </div>
//                                 </div>
//                               ))
//                             ) : (
//                               <div className="text-muted-foreground">No competitor information available.</div>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Incumbent Contractors</Label>
//                             <div className="flex flex-wrap gap-2">
//                               {(csp.incumbentContractors || []).length > 0 ? (
//                                 csp.incumbentContractors.map((contractor: string, index: number) => (
//                                   <Badge key={index} variant="outline">
//                                     {contractor}
//                                   </Badge>
//                                 ))
//                               ) : (
//                                 <div className="text-muted-foreground">
//                                   No incumbent contractors information available.
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="space-y-4">
//                           <div className="space-y-2">
//                             <Label>Win Rate</Label>
//                             <div className="text-2xl font-bold">{csp.competitivePosition?.winRate || "N/A"}</div>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Competitive Advantages</Label>
//                             <div className="flex flex-wrap gap-2">
//                               {(csp.competitivePosition?.competitiveAdvantages || []).length > 0 ? (
//                                 csp.competitivePosition.competitiveAdvantages.map(
//                                   (advantage: string, index: number) => (
//                                     <Badge key={index} variant="secondary">
//                                       {advantage}
//                                     </Badge>
//                                   ),
//                                 )
//                               ) : (
//                                 <div className="text-muted-foreground">
//                                   No competitive advantages information available.
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Possible Threats</Label>
//                             <div className="flex flex-col gap-2">
//                               {(csp.possibleThreats || []).length > 0 ? (
//                                 csp.possibleThreats.map((threat: string, index: number) => (
//                                   <div key={index} className="p-2 border rounded-lg text-sm">
//                                     {threat}
//                                   </div>
//                                 ))
//                               ) : (
//                                 <div className="text-muted-foreground">No threats information available.</div>
//                               )}
//                             </div>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Recent Bid Results</Label>
//                             <div className="p-3 border rounded-lg">
//                               <p className="text-sm">{csp.recentBidResults || "No recent bid results available."}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Competitor Relationships</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="space-y-4">
//                           <div className="p-4 border rounded-lg">
//                             <Label>Competitor Relationships</Label>
//                             <p className="mt-2">
//                               {csp.competitorRelationships || "No competitor relationship information available."}
//                             </p>
//                           </div>
//                           <div className="grid grid-cols-2 gap-4">
//                             <div className="p-4 border rounded-lg">
//                               <Label>Competitive Advantages</Label>
//                               <ul className="mt-2 list-disc pl-5">
//                                 {(csp.competitiveAdvantages || []).length > 0 ? (
//                                   csp.competitiveAdvantages.map((advantage: string, index: number) => (
//                                     <li key={index} className="text-sm">
//                                       {advantage}
//                                     </li>
//                                   ))
//                                 ) : (
//                                   <li className="text-sm text-muted-foreground">No competitive advantages listed.</li>
//                                 )}
//                               </ul>
//                             </div>
//                             <div className="p-4 border rounded-lg">
//                               <Label>Possible Threats</Label>
//                               <ul className="mt-2 list-disc pl-5">
//                                 {(csp.possibleThreats || []).length > 0 ? (
//                                   csp.possibleThreats.map((threat: string, index: number) => (
//                                     <li key={index} className="text-sm">
//                                       {threat}
//                                     </li>
//                                   ))
//                                 ) : (
//                                   <li className="text-sm text-muted-foreground">No threats listed.</li>
//                                 )}
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}

//                 {/* Metrics Tab */}
//                 {subTab === "metrics" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Financial Performance</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Project Win Rate</Label>
//                             <div className="flex justify-between items-center mt-2">
//                               <span>Current: {csp.performanceMetrics?.projectWinRate?.current || "35%"}</span>
//                               <span>Target: {csp.performanceMetrics?.projectWinRate?.target || "45%"}</span>
//                             </div>
//                             <Progress
//                               value={Number.parseInt(csp.performanceMetrics?.projectWinRate?.current || "35")}
//                               className="h-2 mt-2"
//                             />
//                           </div>
//                           <div>
//                             <Label>Backlog Value</Label>
//                             <div className="text-2xl font-bold mt-2">
//                               {csp.performanceMetrics?.financialMetrics?.backlog || "$3.2M"}
//                             </div>
//                             <div className="text-sm text-muted-foreground">Secured work for next 8 months</div>
//                           </div>
//                         </div>
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Year-over-Year Growth</Label>
//                             <div className="flex items-center gap-2 mt-2">
//                               <Badge className="bg-green-100 text-green-800">
//                                 {csp.performanceMetrics?.financialMetrics?.yearOverYearGrowth || "+18.5%"}
//                               </Badge>
//                               <span className="text-sm">Compared to previous fiscal year</span>
//                             </div>
//                           </div>
//                           <div>
//                             <Label>Profit Margin</Label>
//                             <div className="text-2xl font-bold mt-2">
//                               {csp.performanceMetrics?.financialMetrics?.profitMargin || "4.2%"}
//                             </div>
//                             <div className="text-sm text-muted-foreground">Industry average: 3.8%</div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Client Relationship Metrics</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-3 gap-6">
//                         <div>
//                           <Label>Client Satisfaction</Label>
//                           <div className="text-2xl font-bold mt-2">
//                             {csp.performanceMetrics?.clientSatisfaction?.current || "4.5/5.0"}
//                           </div>
//                           <div className="text-sm text-muted-foreground">Based on post-project surveys</div>
//                         </div>
//                         <div>
//                           <Label>Repeat Business Rate</Label>
//                           <div className="text-2xl font-bold mt-2">78%</div>
//                           <div className="text-sm text-muted-foreground">Clients returning within 24 months</div>
//                         </div>
//                         <div>
//                           <Label>Client Referrals</Label>
//                           <div className="text-2xl font-bold mt-2">12</div>
//                           <div className="text-sm text-muted-foreground">New leads from existing clients (YTD)</div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Operational Excellence</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Safety Record</Label>
//                             <div className="grid grid-cols-2 gap-4 mt-2">
//                               <div>
//                                 <div className="text-sm text-muted-foreground">EMR</div>
//                                 <div className="text-lg font-semibold">
//                                   {csp.performanceMetrics?.safetyRecord?.emr || "0.78"}
//                                 </div>
//                               </div>
//                               <div>
//                                 <div className="text-sm text-muted-foreground">Incidents</div>
//                                 <div className="text-lg font-semibold">
//                                   {csp.performanceMetrics?.safetyRecord?.incidents || "0"}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div>
//                             <Label>Schedule Adherence</Label>
//                             <div className="flex items-center gap-2 mt-2">
//                               <Badge className="bg-green-100 text-green-800">92%</Badge>
//                               <span className="text-sm">Projects completed on or ahead of schedule</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Quality Metrics</Label>
//                             <div className="grid grid-cols-2 gap-4 mt-2">
//                               <div>
//                                 <div className="text-sm text-muted-foreground">Defect Rate</div>
//                                 <div className="text-lg font-semibold">0.8%</div>
//                               </div>
//                               <div>
//                                 <div className="text-sm text-muted-foreground">Rework Cost</div>
//                                 <div className="text-lg font-semibold">1.2%</div>
//                               </div>
//                             </div>
//                           </div>
//                           <div>
//                             <Label>Change Order Rate</Label>
//                             <div className="flex items-center gap-2 mt-2">
//                               <Badge className="bg-yellow-100 text-yellow-800">4.5%</Badge>
//                               <span className="text-sm">Of total contract value (industry avg: 8-10%)</span>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Business Development</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-3 gap-6">
//                         <div>
//                           <Label>Proposal Hit Rate</Label>
//                           <div className="text-2xl font-bold mt-2">32%</div>
//                           <div className="text-sm text-muted-foreground">Proposals won vs. submitted</div>
//                         </div>
//                         <div>
//                           <Label>Avg. Proposal Value</Label>
//                           <div className="text-2xl font-bold mt-2">$4.8M</div>
//                           <div className="text-sm text-muted-foreground">Up 12% from previous year</div>
//                         </div>
//                         <div>
//                           <Label>Market Penetration</Label>
//                           <div className="text-2xl font-bold mt-2">18%</div>
//                           <div className="text-sm text-muted-foreground">Share in target markets</div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Sustainability & Innovation</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div>
//                           <Label>Sustainability Score</Label>
//                           <Progress value={75} className="h-2 mt-2" />
//                           <div className="flex justify-between text-sm mt-1">
//                             <span className="text-muted-foreground">75/100</span>
//                             <span className="text-muted-foreground">Target: 80/100</span>
//                           </div>
//                         </div>
//                         <div>
//                           <Label>Innovation Initiatives</Label>
//                           <div className="mt-2 space-y-1">
//                             <div className="flex justify-between">
//                               <span className="text-sm">New technologies implemented</span>
//                               <span className="text-sm font-medium">7</span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-sm">Process improvements</span>
//                               <span className="text-sm font-medium">12</span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-sm">R&D investment</span>
//                               <span className="text-sm font-medium">2.1% of revenue</span>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}

//                 {/* Project Tasks Tab */}
//                 {subTab === "project-tasks" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader className="flex flex-row items-center justify-between">
//                         <CardTitle>Project Tasks</CardTitle>
//                         <Button size="sm">
//                           <Plus className="h-4 w-4 mr-2" />
//                           Add Task
//                         </Button>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="rounded-md border">
//                           <Table>
//                             <TableHeader>
//                               <TableRow>
//                                 <TableHead>Task Name</TableHead>
//                                 <TableHead>Owner</TableHead>
//                                 <TableHead>Due Date</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead className="text-right">Actions</TableHead>
//                               </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                               {projectTasks.map((task) => (
//                                 <TableRow key={task.id}>
//                                   <TableCell className="font-medium">{task.name}</TableCell>
//                                   <TableCell>{task.owner}</TableCell>
//                                   <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
//                                   <TableCell>
//                                     <Badge
//                                       variant={
//                                         task.status === "Done"
//                                           ? "default"
//                                           : task.status === "In Progress"
//                                             ? "secondary"
//                                             : task.status === "Blocked"
//                                               ? "destructive"
//                                               : "outline"
//                                       }
//                                     >
//                                       {task.status}
//                                     </Badge>
//                                   </TableCell>
//                                   <TableCell className="text-right">
//                                     <div className="flex justify-end space-x-2">
//                                       <Button variant="ghost" size="icon">
//                                         <Edit className="h-4 w-4" />
//                                       </Button>
//                                       <Button variant="ghost" size="icon">
//                                         <Trash2 className="h-4 w-4" />
//                                       </Button>
//                                     </div>
//                                   </TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}

//                 {/* Action Tracker Tab */}
//                 {subTab === "action-tracker" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Action Tracker - {project?.name}</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <Table>
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead>Task</TableHead>
//                               <TableHead>Due Date</TableHead>
//                               <TableHead>Owner</TableHead>
//                               <TableHead>Notes</TableHead>
//                               <TableHead>Status</TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             {/* {projectActions.map((action) => ( */}
//                             {actions.map((action) => (

//                               <TableRow key={action.id}>
//                                 <TableCell>{action.task}</TableCell>
//                                 <TableCell>{action.due_date}</TableCell>
//                                 <TableCell>{action.owner}</TableCell>
//                                 <TableCell>
//                                   <Popover>
//                                     <PopoverTrigger asChild>
//                                       <Button variant="link" className="p-0 h-auto font-normal">
//                                         Notes
//                                       </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-80">
//                                       <div className="space-y-2">
//                                         <h4 className="font-medium">Notes</h4>
//                                         <Textarea
//                                           value={editingNotes[action.id] ?? action.notes}
//                                           onChange={(e) => handleUpdateNotes(action.id, e.target.value)}
//                                           placeholder="Add notes here..."
//                                           className="min-h-[100px]"
//                                         />
//                                       </div>
//                                     </PopoverContent>
//                                   </Popover>
//                                 </TableCell>


//                                 {/* <TableCell>
//                                   <Select
//                                     defaultValue={action.completed ? "completed" : "pending"}
//                                     onValueChange={(value) => handleUpdateStatus(action.id, value)}
//                                   >
//                                     <SelectTrigger className="w-32">
//                                       <SelectValue placeholder="Select status" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                       <SelectItem value="completed">Completed</SelectItem>
//                                       <SelectItem value="pending">Pending</SelectItem>
//                                       <SelectItem value="overdue">Overdue</SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                 </TableCell> */}
//                                 <TableCell>
//                                   <Select
//                                     value={action.status || "pending"}
//                                     onValueChange={(value) => handleUpdateStatus(action.id, value)}
//                                   >
//                                     <SelectTrigger className="w-32">
//                                       <SelectValue placeholder="Select status" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                       <SelectItem value="completed">Completed</SelectItem>
//                                       <SelectItem value="pending">Pending</SelectItem>
//                                       <SelectItem value="overdue">Overdue</SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                 </TableCell>



//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                         <div className="flex space-x-2">
//                           <Input placeholder="New task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
//                           <Input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
//                           <Input placeholder="Owner" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
//                           <Button onClick={handleAddAction}>Add Action</Button>
//                         </div>
//                         <div className="bg-blue-100 p-4 rounded-md">
//                           <h3 className="font-semibold mb-2">AI Recommendation</h3>
//                           <p>{aiRecommendation}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}

//                 {/* Risk Tab - Moved inside the tabs container */}
//                 {subTab === "risk" && (
//                   <div className="space-y-6">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Risk Assessment</CardTitle>
//                       </CardHeader>
//                       <CardContent className="grid grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Overall Risk Assessment</Label>
//                             <Textarea
//                               className="mt-2"
//                               value={riskData.riskAssessment}
//                               onChange={(e) => setRiskData({ ...riskData, riskAssessment: e.target.value })}
//                               rows={4}
//                             />
//                           </div>
//                           <div>
//                             <Label>Financial Risks</Label>
//                             <Textarea
//                               className="mt-2"
//                               value={riskData.financialRisks}
//                               onChange={(e) => setRiskData({ ...riskData, financialRisks: e.target.value })}
//                               rows={4}
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-4">
//                           <div>
//                             <Label>Operational Risks</Label>
//                             <Textarea
//                               className="mt-2"
//                               value={riskData.operationalRisks}
//                               onChange={(e) => setRiskData({ ...riskData, operationalRisks: e.target.value })}
//                               rows={4}
//                             />
//                           </div>
//                           <div>
//                             <Label>Risk Mitigation Strategies</Label>
//                             <Textarea
//                               className="mt-2"
//                               value={riskData.mitigationStrategies}
//                               onChange={(e) => setRiskData({ ...riskData, mitigationStrategies: e.target.value })}
//                               rows={4}
//                             />
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Risk Severity</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <div className="flex items-center space-x-4">
//                           <Input
//                             type="range"
//                             min="0"
//                             max="100"
//                             value={riskData.riskSeverity}
//                             onChange={(e) =>
//                               setRiskData({ ...riskData, riskSeverity: Number.parseInt(e.target.value) })
//                             }
//                             className="w-full"
//                           />
//                           <span className="text-sm font-medium w-16">{riskData.riskSeverity}/100</span>
//                         </div>
//                         <Progress value={riskData.riskSeverity} className="w-full h-2" />
//                         <div className="flex justify-between text-xs text-muted-foreground">
//                           <span>Low Risk</span>
//                           <span>Medium Risk</span>
//                           <span>High Risk</span>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Risk History</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <Table>
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead>Date</TableHead>
//                               <TableHead>Risk Event</TableHead>
//                               <TableHead>Impact</TableHead>
//                               <TableHead>Resolution</TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             {riskData.riskHistory.map((item, index) => (
//                               <TableRow key={index}>
//                                 <TableCell>{item.date}</TableCell>
//                                 <TableCell>{item.event}</TableCell>
//                                 <TableCell>{item.impact}</TableCell>
//                                 <TableCell>{item.resolution}</TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                         <Button
//                           variant="outline"
//                           className="mt-4"
//                           onClick={() => {
//                             const newHistory = [
//                               ...riskData.riskHistory,
//                               {
//                                 date: new Date().toISOString().split("T")[0],
//                                 event: "New risk event",
//                                 impact: "To be assessed",
//                                 resolution: "Pending",
//                               },
//                             ]
//                             setRiskData({ ...riskData, riskHistory: newHistory })
//                           }}
//                         >
//                           Add Risk Event
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}
//               </div>
//             </ScrollArea>
//           </div>
//         </div>

//         <DialogFooter className="border-t p-4 mt-auto">
//           <Button onClick={onClose}>Close</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }


























"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Users,
  BarChart2,
  Target,
  LineChart,
  DollarSign,
  LayoutDashboard,
  ClipboardList,
  Briefcase,
} from "lucide-react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Project {
  name: string
  projectNumber: string
  category: string
  subcategory: string
  department: string
  projectValue: number
  location: string
  region: string
  projectManager: string
  startYear: number
  status: string
  shortDescription: string
  fullDescription: string
  fundingStrategy: string
  programmedFunding: string
  meansOfFinancing: string
  budget: string
  imageUrl?: string
  fit: "High" | "Medium" | "Low"
  relevantExperience?: string
  similarProjects?: Array<{
    name: string
    location: string
    value: number
  }>
  competitorAnalysis?: string
  keyStakeholders?: Array<{
    name: string
    role: string
    organization: string
    contact: string
  }>
  comments?: string
}

interface Action {
  id: string
  projectId: number
  task: string
  dueDate: string
  owner: string
  completed: boolean
  notes: string
}

interface ClientServicePlanModalProps {
  isOpen: boolean
  onClose: () => void
  csp: any
  project?: Project
}

// In your component

const defaultCSP = {
  agencyName: "Seabreeze Residencies",
  headquarters: "Palm Beach County, Florida",
  yearsInBusiness: "15",
  employeeCount: "45",
  annualBudget: "$3,500,000",
  historicalSpend: "$25,000,000+",
  certifications: ["Licensed Residential Community", "Green Building Certified (potential)", "Safety Certified"],
  preferredProcurementMethods: ["Negotiated Contracts", "Request for Proposals (RFP)", "Preferred Vendor Agreements"],
  marketSegments: [
    { name: "Luxury Apartments", percentage: 40 },
    { name: "Family Housing", percentage: 30 },
    { name: "Young Professionals", percentage: 20 },
    { name: "Senior Living", percentage: 10 },
  ],
  geographicFocus: ["Palm Beach City, Florida", "Palm Beach County, Florida", "South Florida"],
  totalValueOfProjects: "$10,000,000+",
  priorityScore: 85,
  decisionMakers: [
    {
      name: "John Doe",
      title: "Director of Facilities",
      contact: "john.doe@example.com",
      department: "Facilities",
      influenceLevel: "High",
      priorities: "Cost-effective, sustainable construction",
      engagementStatus: "Meeting Scheduled",
      phoneNumber: "(555) 123-4567",
      lastContactDate: "2024-02-15",
      notes: "Prefers morning meetings. Very interested in our sustainable building practices.",
    },
    {
      name: "Jane Smith",
      title: "Chief Financial Officer",
      contact: "jane.smith@example.com",
      department: "Finance",
      influenceLevel: "Medium",
      priorities: "Budget adherence, ROI optimization",
      engagementStatus: "Follow-up Required",
      phoneNumber: "(555) 987-6543",
      lastContactDate: "2024-01-28",
      notes: "Concerned about project cost overruns. Send detailed financial projections before next meeting.",
    },
    {
      name: "Robert Johnson",
      title: "Project Manager",
      contact: "robert.johnson@example.com",
      department: "Operations",
      influenceLevel: "Medium",
      priorities: "Timeline adherence, quality control",
      engagementStatus: "Active Engagement",
      phoneNumber: "(555) 456-7890",
      lastContactDate: "2024-02-22",
      notes: "Has worked with our competitors in the past. Appreciates detailed project plans and regular updates.",
    },
  ],
  competitivePosition: {
    mainCompetitors: [
      "The Bluffs Apartments (Irvine)",
      "Park Place Apartments (Irvine)",
      "Stonegate Village Apartments (Irvine)",
      "Avalon Irvine",
      "The Village at Irvine Spectrum Center"
    ],
    winRate: "",
    competitiveAdvantages: [
      "Prime Location near shopping and entertainment (Irvine Spectrum)",
      "Extensive Amenity Offerings (e.g., multiple pools, fitness centers, resident lounges)",
      "Strong Community Reputation and Long-Standing Presence",
      "Professional On-Site Management and Maintenance Teams",
      "Variety of Floor Plan Options to Suit Different Needs"
    ],
  },
  activeProjects: [
    {
      id: "renovation-phase-1",
      name: "Common Area Refresh - Building A",
      status: "In Progress",
      startDate: "2025-04-15",
      dueDate: "2025-06-30",
      budget: 75000,
      amountSpent: 40000,
    },
    {
      id: "landscaping-upgrade",
      name: "Community Garden Expansion",
      status: "Planning",
      startDate: "2025-07-15",
      dueDate: "2025-09-30",
      budget: 30000,
      amountSpent: 5000, // Initial planning costs
    },
  ],
  pipelineProjects: [
    {
      id: "solar-panel-study",
      name: "Feasibility Study for Solar Panel Installation",
      stage: "Assessment",
      estimatedValue: 50000, // Cost of the study
      expectedStartDate: "2025-10-01",
    },
    {
      id: "clubhouse-remodel",
      name: "Clubhouse Interior Remodel",
      stage: "Proposal",
      estimatedValue: 250000,
      expectedStartDate: "2026-01-15",
    },
  ],
  actionItems: [
    {
      id: "follow-up-landscaper",
      task: "Follow up with three landscaping vendors for quotes on the garden expansion.",
      dueDate: "2025-05-17",
      assignedTo: "Property Management",
      status: "To Do",
    },
    {
      id: "review-solar-proposals",
      task: "Review initial proposals for the solar panel feasibility study.",
      dueDate: "2025-05-24",
      assignedTo: "Facilities Manager",
      status: "In Progress",
    },
  ],
  performanceMetrics: {
    projectWinRate: {
      current: "60%",
      target: "90%",
    },
    clientSatisfaction: {
      current: "4.2",
    },
    financialMetrics: {
      backlog: "1",
      yearOverYearGrowth: "3%",
      profitMargin: "15%",
    },
    safetyRecord: {
      emr: "0.85",
      incidents: "3",
    },
  },
  agencyType: "Construction",
  existingRelationships: "Established a strong working relationship with Sarah Chen, the client's Head of Marketing, over the past three years. Regular weekly meetings ensure alignment on project goals and progress. She has been instrumental in facilitating smooth communication and approvals for our campaigns.",
  pastProjects: "Successfully collaborated with Sarah Chen and her team on the 'Q3 2024 Product Launch Campaign,' which resulted in a significant increase in online engagement and lead generation. Prior to that, we partnered on the 'Annual Brand Awareness Initiative' in 2023, exceeding the client's target reach by 18%.",
  totalUpcomingProjects: "",
  averageProjectSize: "",
  largeProjectsCount: "",
  pipelineTimeline: "",
  nextBestActions: [],
  competitiveAdvantages: [],
  incumbentContractors: [],
  possibleThreats: [
    "New luxury apartment complexes entering the Irvine market with potentially more modern amenities.",
    "Increased competition leading to pressure on rental rates and occupancy levels.",
    "Rising operational costs (utilities, insurance, maintenance) impacting profitability."

  ],
  recentBidResults: "",
  competitorRelationships: "Seabreeze Residencies maintains a professional awareness of the local competitive landscape. Interactions are generally limited to market analysis and monitoring of competitor pricing and amenities.",
  electedOfficials: [
    {
      name: "Mayor Sarah Wilson",
      position: "Mayor",
      district: "City of Oakridge",
      keyInitiatives: "Downtown revitalization, green infrastructure",
      publicStatements: "Supports modernization of city facilities",
      communityInterests: "Environmental sustainability, job creation",
      engagementStatus: "Positive relationship",
      phoneNumber: "(555) 234-5678",
      lastContactDate: "2024-02-10",
      notes: "Attended our community presentation last month. Expressed interest in our green building initiatives.",
    },
    {
      name: "Councilman Michael Brown",
      position: "City Council Member",
      district: "District 3",
      keyInitiatives: "Transportation, public safety",
      publicStatements: "Advocate for responsible spending",
      communityInterests: "Infrastructure improvement",
      engagementStatus: "Initial contact made",
      phoneNumber: "(555) 345-6789",
      lastContactDate: "2024-01-15",
      notes: "Skeptical about project costs. Need to prepare detailed budget justification for next meeting.",
    },
  ],
  communityInfluencers: [
    {
      name: "Dr. Emily Chen",
      role: "President, Chamber of Commerce",
      influence: "High influence in business community",
      potential: "Strong Advocate",
      engagementStatus: "Regular engagement",
      phoneNumber: "(555) 567-8901",
      lastContactDate: "2024-02-18",
      notes: "Can help connect with local business leaders. Interested in economic impact of our projects.",
    },
    {
      name: "Thomas Garcia",
      role: "Community Activist",
      influence: "Medium influence with neighborhood associations",
      potential: "Potential Ally",
      engagementStatus: "Initial outreach",
      phoneNumber: "(555) 678-9012",
      lastContactDate: "2024-02-05",
      notes: "Concerned about construction disruption. Prepare community impact mitigation plan before next contact.",
    },
  ],
  strategicInitiatives: [],
  shortTermActions: [],
  midTermActions: [],
  longTermActions: [],
  plannedOutreachActivities: [],
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

const renderInfluenceLevel = (level: "Low" | "Medium" | "High" | undefined) => {
  const colors = {
    Low: "bg-yellow-100 text-yellow-800",
    Medium: "bg-blue-100 text-blue-800",
    High: "bg-green-100 text-green-800",
  }
  return <Badge className={colors[level || "Medium"]}>{level || "Medium"}</Badge>
}

export default function ClientServicePlanModal({ isOpen, onClose, csp: rawCSP, project }: ClientServicePlanModalProps) {
  const [mainTab, setMainTab] = useState<"agency" | "project">("agency")
  const [subTab, setSubTab] = useState<string>("agency-management")
  const csp = { ...defaultCSP, ...rawCSP }
  // const [actions, setActions] = useState<Action[]>([]);
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
  const [budgetUtilization, setBudgetUtilization] = useState({
    totalBudget: project?.budget || 150000,
    spent: project?.amountSpent || 75000,
    categories: project?.budgetBreakdown || {
      labor: 30000,
      materials: 20000,
      equipment: 35000,
      subcontractors: 45000,
      permits: 5000,
    },
  })

  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({})

  const [riskData, setRiskData] = useState({
    riskAssessment:
      "This project has moderate risk due to potential regulatory changes and timeline constraints. The agency has limited experience with similar projects of this scale.",
    financialRisks:
      "Budget overruns possible due to material cost fluctuations. Contingency fund of 15% recommended. Potential for delayed payments from agency based on historical patterns.",
    operationalRisks:
      "Resource allocation challenges expected during peak construction period. Weather delays likely if project extends into winter months. Permitting process may take longer than anticipated.",
    mitigationStrategies:
      "Weekly risk review meetings scheduled. Early procurement of critical materials. Dedicated liaison assigned to expedite permitting. Alternative suppliers identified for key components.",
    riskSeverity: 65,
    riskHistory: [
      {
        date: "2023-10-15",
        event: "Permit delay",
        impact: "2-week schedule slip",
        resolution: "Expedited through agency contact",
      },
      {
        date: "2023-11-03",
        event: "Material price increase",
        impact: "$25,000 budget impact",
        resolution: "Negotiated volume discount",
      },
      {
        date: "2024-01-12",
        event: "Stakeholder requirement change",
        impact: "Scope modification",
        resolution: "Change order approved",
      },
    ],
  })

  const handleAddAction = () => {
    if (newTask && newDueDate && newOwner) {
      const newAction: Action = {
        id: Date.now().toString(),
        projectId: 1,
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

  const handleToggleCompleted = (actionId: string) => {
    setActions(actions.map((action) => (action.id === actionId ? { ...action, completed: !action.completed } : action)))
  }

  const handleUpdateNotes = (actionId: string, notes: string) => {
    setActions(actions.map((action) => (action.id === actionId ? { ...action, notes } : action)))
    setEditingNotes((prev) => ({ ...prev, [actionId]: notes }))
  }

  const projectActions = actions.filter((action) => action.projectId === 1)

  // Sample project tasks data
  const [projectTasks, setProjectTasks] = useState([
    {
      id: "1",
      name: "Initial project planning",
      owner: "John Smith",
      dueDate: "2025-04-15",
      status: "Done",
    },
    {
      id: "2",
      name: "Material procurement",
      owner: "Sarah Johnson",
      dueDate: "2025-04-30",
      status: "In Progress",
    },
    {
      id: "3",
      name: "Site preparation",
      owner: "Michael Brown",
      dueDate: "2025-05-15",
      status: "To Do",
    },
    {
      id: "4",
      name: "Environmental compliance review",
      owner: "Lisa Anderson",
      dueDate: "2025-04-22",
      status: "Blocked",
    },
  ])

  const aiRecommendation =
    "Based on the project timeline and stakeholder activity, we recommend scheduling a progress review meeting with key stakeholders within the next two weeks."

  const renderPriorityScore = (score: number) => {
    const getColor = (score: number) => {
      if (score >= 8) return "bg-green-500"
      if (score >= 5) return "bg-yellow-500"
      return "bg-red-500"
    }
    return (
      <div className="space-y-2">
        <Progress value={score * 10} className={getColor(score)} />
        <span className="text-sm text-muted-foreground">{score}/10</span>
      </div>
    )
  }

  const handleTabChange = (main: "agency" | "project", sub: string) => {
    setMainTab(main)
    setSubTab(sub)
  }

  // Define tab structure
  const tabs = {
    agency: [{ id: "agency-management", label: "Agency & Management", icon: <Building2 className="h-4 w-4" /> }],
    project: [
      { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
      { id: "financing", label: "Financing", icon: <DollarSign className="h-4 w-4" /> },
      { id: "budget", label: "Budget Utilization", icon: <DollarSign className="h-4 w-4" /> },
      { id: "strategy", label: "Strategy", icon: <Target className="h-4 w-4" /> },
      { id: "stakeholders", label: "Stakeholders", icon: <Users className="h-4 w-4" /> },
      { id: "competitive", label: "Competitive", icon: <BarChart2 className="h-4 w-4" /> },
      { id: "metrics", label: "Metrics", icon: <LineChart className="h-4 w-4" /> },
      { id: "project-tasks", label: "Project Tasks", icon: <CheckSquare className="h-4 w-4" /> },
      { id: "action-tracker", label: "Action Tracker", icon: <ClipboardList className="h-4 w-4" /> },
      { id: "risk", label: "Risk", icon: <Briefcase className="h-4 w-4" /> },
    ],
  }

  const handleUpdateStatus = (actionId: string, status: string) => {
    setActions(
      actions.map((action) => (action.id === actionId ? { ...action, completed: status === "completed" } : action)),
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5" />
            {project?.name ? `${project.name} - Client Service Plan` : "Client Service Plan"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar with tabs */}
          <div className="w-64 border-r bg-muted/10 flex flex-col">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-6">
                {/* Main tabs */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleTabChange("agency", "agency-management")}
                    className={cn(
                      "flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      mainTab === "agency"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Building2 className="h-5 w-5" />
                    Agency
                  </button>
                  <button
                    onClick={() => handleTabChange("project", "overview")}
                    className={cn(
                      "flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      mainTab === "project"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Briefcase className="h-5 w-5" />
                    Project
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Sub tabs */}
                <div className="space-y-1">
                  {mainTab === "agency" &&
                    tabs.agency.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id)}
                        className={cn(
                          "flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          subTab === tab.id
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  {mainTab === "project" &&
                    tabs.project.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id)}
                        className={cn(
                          "flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          subTab === tab.id
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <div className="p-6">
                {/* Agency & Management Tab */}
                {subTab === "agency-management" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Agency Information</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Agency Name</Label>
                            <div className="text-lg font-semibold mt-1">{csp.agencyName}</div>
                          </div>
                          <div>
                            <Label>Agency Type</Label>
                            <div className="text-sm mt-1">{csp.agencyType}</div>
                          </div>
                          <div>
                            <Label>Headquarters</Label>
                            <div className="text-sm mt-1">{csp.headquarters || "Not specified"}</div>
                          </div>
                          <div>
                            <Label>Years in Business</Label>
                            <div className="text-sm mt-1">{csp.yearsInBusiness || "Not specified"}</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Employee Count</Label>
                            <div className="text-sm mt-1">{csp.employeeCount || "Not specified"}</div>
                          </div>
                          <div>
                            <Label>Department</Label>
                            <div className="text-sm mt-1">{project?.department || "Not specified"}</div>
                          </div>
                          <div>
                            <Label>Project Manager</Label>
                            <div className="text-sm mt-1">{project?.projectManager || "Not specified"}</div>
                          </div>
                          <div>
                            <Label>Certifications</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {(csp.certifications || []).length > 0 ? (
                                csp.certifications.map((cert: string, index: number) => (
                                  <Badge key={index} variant="outline">
                                    {cert}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-sm text-muted-foreground">No certifications listed</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Market Focus</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Market Segments</Label>
                            {(csp.marketSegments || []).length > 0 ? (
                              <div className="mt-2 space-y-2">
                                {csp.marketSegments.map((segment: any, index: number) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <span>{segment.name}</span>
                                    <div className="w-1/2">
                                      <Progress value={segment.percentage} className="h-2" />
                                      <span className="text-xs text-right block">{segment.percentage}%</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground mt-1">
                                No market segment information available
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Geographic Focus</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {(csp.geographicFocus || []).length > 0 ? (
                                csp.geographicFocus.map((location: string, index: number) => (
                                  <Badge key={index} variant="secondary">
                                    {location}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-sm text-muted-foreground">
                                  No geographic focus information available
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <Label>Category & Subcategory</Label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div>
                                <span className="text-xs text-muted-foreground">Category</span>
                                <div className="text-sm">{project?.category || "Not specified"}</div>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">Subcategory</span>
                                <div className="text-sm">{project?.subcategory || "Not specified"}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Relationship History</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <Label>Existing Relationships</Label>
                          <p className="mt-2 text-sm">
                            {csp.existingRelationships || "No existing relationship information available."}
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <Label>Past Projects</Label>
                          <p className="mt-2 text-sm">
                            {csp.pastProjects || "No past projects information available."}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Overview Tab */}
                {subTab === "overview" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Agency Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label>Agency Name</Label>
                              <div className="text-lg font-semibold mt-1">{csp.agencyName}</div>
                            </div>
                            <div>
                              <Label>Agency Type</Label>
                              <div className="text-sm mt-1">{csp.agencyType}</div>
                            </div>
                            <div>
                              <Label>Annual Budget</Label>
                              <div className="text-sm mt-1">{csp.annualBudget}</div>
                            </div>
                            <div>
                              <Label>Historical Spend</Label>
                              <div className="text-sm mt-1">{csp.historicalSpend}</div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Existing Relationships</Label>
                              <div className="text-sm mt-1">{csp.existingRelationships}</div>
                            </div>
                            <div>
                              <Label>Past Projects</Label>
                              <div className="text-sm mt-1">{csp.pastProjects || "None"}</div>
                            </div>
                            <div>
                              <Label>Preferred Procurement Methods</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {(csp.preferredProcurementMethods || []).map((method, index) => (
                                  <Badge key={index} variant="outline">
                                    {method}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Project Status</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Current Status</Label>
                            <div className="mt-2">
                              <Badge
                                variant={
                                  project?.status === "completed" || project?.status === "done"
                                    ? "default"
                                    : project?.status === "in-progress" || project?.status === "inprogress"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {project?.status
                                  ? project.status.charAt(0).toUpperCase() + project.status.slice(1)
                                  : "Not Started"}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Label>Project Description</Label>
                            <p className="text-sm mt-2">
                              {project?.fullDescription || project?.shortDescription || "No description available."}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Project Location</Label>
                            <p className="text-sm mt-2">
                              {project?.location
                                ? `${project.location}${project.region ? `, ${project.region}` : ""}`
                                : "Location not specified"}
                            </p>
                          </div>
                          <div>
                            <Label>Timeline Progress</Label>
                            <div className="space-y-2 mt-2">
                              <Progress
                                value={
                                  project?.status === "completed" || project?.status === "done"
                                    ? 100
                                    : project?.status === "review"
                                      ? 75
                                      : project?.status === "in-progress" || project?.status === "inprogress"
                                        ? 50
                                        : project?.status === "planning"
                                          ? 25
                                          : 10
                                }
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Start: {project?.startYear || "N/A"}</span>
                                <span>
                                  {project?.status === "completed" || project?.status === "done"
                                    ? "Completed"
                                    : project?.status === "review"
                                      ? "75% Complete"
                                      : project?.status === "in-progress" || project?.status === "inprogress"
                                        ? "50% Complete"
                                        : project?.status === "planning"
                                          ? "25% Complete"
                                          : "10% Complete"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Project Pipeline</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label>Total Upcoming Projects</Label>
                            <div className="text-2xl font-bold">{csp.totalUpcomingProjects}</div>
                          </div>
                          <div className="space-y-2">
                            <Label>Total Value of Projects</Label>
                            <div className="text-2xl font-bold">{csp.totalValueOfProjects}</div>
                          </div>
                          <div className="space-y-2">
                            <Label>Average Project Size</Label>
                            <div className="text-2xl font-bold">{csp.averageProjectSize}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Large Projects Count</Label>
                            <div className="text-lg">{csp.largeProjectsCount}</div>
                          </div>
                          <div className="space-y-2">
                            <Label>Pipeline Timeline</Label>
                            <div className="text-lg">{csp.pipelineTimeline}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Strategic Assessment</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Priority Score</Label>
                            <div className="space-y-2">
                              <Progress
                                value={csp.priorityScore * 10}
                                className={
                                  csp.priorityScore >= 8
                                    ? "bg-green-500"
                                    : csp.priorityScore >= 5
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }
                              />
                              <span className="text-sm text-muted-foreground">{csp.priorityScore}/10</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Competitive Advantages</Label>
                            <div className="flex flex-wrap gap-2">
                              {(csp.competitiveAdvantages || []).map((advantage, index) => (
                                <Badge key={index} variant="secondary">
                                  {advantage}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Next Best Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 list-disc pl-5">
                          {(csp.nextBestActions || []).map((action, index) => (
                            <li key={index} className="text-sm">
                              {action}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {project && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Project Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label>Project Name</Label>
                                <div className="text-lg font-semibold mt-1">{project.name}</div>
                              </div>
                              <div>
                                <Label>Project Number</Label>
                                <div className="text-sm mt-1">{project.projectNumber || "Project 372"}</div>
                              </div>
                              <div>
                                <Label>Location</Label>
                                <div className="text-sm mt-1">
                                  {project?.location || "Palm Beach City"}, {project?.region || "Florida"}
                                </div>
                              </div>
                              <div>
                                <Label>Start Date</Label>
                                <div className="text-sm mt-1">{project.startYear || 2025}</div>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <Badge variant="outline" className="mt-1">
                                  {project.status}
                                </Badge>
                              </div>
                            </div>
                            {project.imageUrl && (
                              <div className="relative aspect-video rounded-lg overflow-hidden">
                                <Image
                                  src={project.imageUrl || "/placeholder.svg"}
                                  alt={project.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <div className="text-sm">{project.fullDescription || "A modern coastal living community featuring luxury condos with sustainable materials and panoramic ocean views."}</div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* Financing Tab */}
                {subTab === "financing" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Financial Details</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label>Budget</Label>
                              <div className="text-2xl font-bold mt-1">{project?.budget || csp.annualBudget}</div>
                            </div>
                            <div>
                              <Label>Programmed Funding</Label>
                              <div className="text-sm mt-1">
                                {project?.programmedFunding || csp.totalValueOfProjects}
                              </div>
                            </div>
                            <div>
                              <Label>Historical Spend</Label>
                              <div className="text-sm mt-1">{csp.historicalSpend}</div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Means of Financing</Label>
                              <div className="text-sm mt-1">{project?.meansOfFinancing || "Not specified"}</div>
                            </div>
                            <div>
                              <Label>Funding Strategy</Label>
                              <div className="text-sm mt-1">{project?.fundingStrategy || "Not specified"}</div>
                            </div>
                            <div>
                              <Label>Preferred Procurement Methods</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {(csp.preferredProcurementMethods || []).map((method, index) => (
                                  <Badge key={index} variant="outline">
                                    {method}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label>Financial Metrics</Label>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 border rounded-lg">
                              <div className="text-sm text-muted-foreground">Backlog</div>
                              <div className="text-lg font-semibold">
                                {csp.performanceMetrics?.financialMetrics?.backlog || "N/A"}
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="text-sm text-muted-foreground">YOY Growth</div>
                              <div className="text-lg font-semibold">
                                {csp.performanceMetrics?.financialMetrics?.yearOverYearGrowth || "N/A"}
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="text-sm text-muted-foreground">Win Rate</div>
                              <div className="text-lg font-semibold">{csp.competitivePosition?.winRate || "N/A"}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {subTab === "budget" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Budget Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg">
                          <Label>Total Budget</Label>
                          <div className="text-2xl font-bold">{formatCurrency(budgetUtilization.totalBudget)}</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <Label>Amount Spent</Label>
                          <div className="text-2xl font-bold">{formatCurrency(budgetUtilization.spent)}</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <Label>Remaining Budget</Label>
                          <div className="text-2xl font-bold">
                            {formatCurrency(budgetUtilization.totalBudget - budgetUtilization.spent)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Budget Allocation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Labor Costs</Label>
                            <Progress
                              value={(budgetUtilization.categories.labor / budgetUtilization.totalBudget) * 100}
                              className="h-2"
                            />
                            <span className="text-sm">{formatCurrency(budgetUtilization.categories.labor)}</span>
                          </div>
                          <div className="space-y-2">
                            <Label>Materials & Supplies</Label>
                            <Progress
                              value={(budgetUtilization.categories.materials / budgetUtilization.totalBudget) * 100}
                              className="h-2"
                            />
                            <span className="text-sm">{formatCurrency(budgetUtilization.categories.materials)}</span>
                          </div>
                          <div className="space-y-2">
                            <Label>Equipment</Label>
                            <Progress
                              value={(budgetUtilization.categories.equipment / budgetUtilization.totalBudget) * 100}
                              className="h-2"
                            />
                            <span className="text-sm">{formatCurrency(budgetUtilization.categories.equipment)}</span>
                          </div>
                          <div className="space-y-2">
                            <Label>Subcontractors</Label>
                            <Progress
                              value={
                                (budgetUtilization.categories.subcontractors / budgetUtilization.totalBudget) * 100
                              }
                              className="h-2"
                            />
                            <span className="text-sm">
                              {formatCurrency(budgetUtilization.categories.subcontractors)}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <Label>Permits & Compliance</Label>
                            <Progress
                              value={(budgetUtilization.categories.permits / budgetUtilization.totalBudget) * 100}
                              className="h-2"
                            />
                            <span className="text-sm">{formatCurrency(budgetUtilization.categories.permits)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Budget Forecast</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Projected Overspend / Savings</Label>
                          <div className="text-lg font-bold">
                            {budgetUtilization.spent > budgetUtilization.totalBudget
                              ? `⚠ Over Budget by ${formatCurrency(budgetUtilization.spent - budgetUtilization.totalBudget)}`
                              : `✅ Savings: ${formatCurrency(budgetUtilization.totalBudget - budgetUtilization.spent)}`}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Cost-Saving Recommendations</Label>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Reduce overtime labor costs.</li>
                            <li>Negotiate bulk discounts on materials.</li>
                            <li>Identify unnecessary expenditures.</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Strategy Tab */}
                {subTab === "strategy" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Strategic Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label>Strategic Fit</Label>
                              <Badge
                                variant={
                                  project?.fit === "High"
                                    ? "default"
                                    : project?.fit === "Medium"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="mt-2"
                              >
                                {project?.fit}
                              </Badge>
                            </div>
                            <div>
                              <Label>Relevant Experience</Label>
                              <Textarea value={project?.relevantExperience || "Experience in similar large-scale residential renovation projects in the Irvine area, including amenity upgrades and common area refurbishments. Track record of successful collaboration with property management teams and adherence to strict timelines and budgets."} className="mt-2" readOnly />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Similar Projects</Label>
                              <div className="space-y-2 mt-2">
                                {project?.similarProjects?.map((similar, index) => (
                                  <div key={index} className="p-3 border rounded-lg">
                                    <div className="font-medium">{similar.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      Location: {similar.location}
                                      <br />
                                      Value: ${similar.value.toLocaleString()}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Competitor Analysis</Label>
                          <Textarea value={project?.competitorAnalysis || "Analysis of comparable residential communities in the Irvine area, such as The Bluffs, Park Place Apartments, and Stonegate Village. Key factors considered include pricing structures, amenity offerings (e.g., pool, gym, community spaces), resident demographics, and online reviews. Identifying Seabreeze Residencies' unique selling propositions and areas for potential differentiation."} className="min-h-[100px]" readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>Comments</Label>
                          <Textarea value={project?.comments || "None"} className="min-h-[100px]" readOnly />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Stakeholders Tab */}
                {subTab === "stakeholders" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Decision Makers</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {(csp.decisionMakers || []).length > 0 ? (
                          csp.decisionMakers.map((dm: any, index: number) => (
                            <div key={index} className="p-4 border rounded-lg space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Name & Title</Label>
                                  <div className="font-medium">
                                    {dm.name} - {dm.title}
                                  </div>
                                  <Label>Department</Label>
                                  <div>{dm.department}</div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Influence Level</Label>
                                  <div>{renderInfluenceLevel(dm.influenceLevel)}</div>
                                  <Label>Phone Number</Label>
                                  <div>{dm.phoneNumber || dm.phone || "Not provided"}</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Email</Label>
                                  <div>{dm.contact || dm.email || "Not provided"}</div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Last Contact Date</Label>
                                  <div>{dm.lastContactDate || "No recent contact"}</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Priorities</Label>
                                <div className="text-sm">{dm.priorities || "No priorities specified"}</div>
                              </div>
                              <div className="space-y-2">
                                <Label>Notes</Label>
                                <div className="text-sm p-2 bg-muted rounded-md">
                                  {dm.notes || "No notes available"}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : project?.keyStakeholders?.length > 0 ? (
                          project.keyStakeholders.map((dm, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Name & Title</Label>
                                  <div className="font-medium">
                                    {dm.name} - {dm.role}
                                  </div>
                                  <Label>Organization</Label>
                                  <div>{dm.organization}</div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Contact</Label>
                                  <div>{dm.contact || "Not provided"}</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Last Contact Date</Label>
                                  <div>{dm.lastContactDate || "No recent contact"}</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Notes</Label>
                                <div className="text-sm p-2 bg-muted rounded-md">
                                  {dm.notes || "No notes available"}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-muted-foreground">No decision makers information available.</div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Elected Officials</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {(csp.electedOfficials || []).length > 0 ? (
                          csp.electedOfficials.map((official: any, index: number) => (
                            <div key={index} className="p-4 border rounded-lg space-y-4">
                              <div className="flex justify-between items-center">
                                <div className="font-medium">{official.name}</div>
                                <Badge variant="outline">{official.position}</Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <Label className="text-xs">District</Label>
                                  <div>{official.district}</div>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Engagement Status</Label>
                                  <div>{official.engagementStatus}</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <Label className="text-xs">Phone Number</Label>
                                  <div>{official.phoneNumber || official.phone || "Not provided"}</div>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Last Contact Date</Label>
                                  <div>{official.lastContactDate || "No recent contact"}</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs">Key Initiatives</Label>
                                <div>{official.keyInitiatives}</div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs">Notes</Label>
                                <div className="p-2 bg-muted rounded-md">{official.notes || "No notes available"}</div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-muted-foreground">No elected officials information available.</div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Community Influencers</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {(csp.communityInfluencers || []).length > 0 ? (
                          csp.communityInfluencers.map((influencer: any, index: number) => (
                            <div key={index} className="p-4 border rounded-lg space-y-4">
                              <div className="font-medium">{influencer.name}</div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <Label className="text-xs">Role</Label>
                                  <div>{influencer.role}</div>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Potential</Label>
                                  <div>{influencer.potential}</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <Label className="text-xs">Phone Number</Label>
                                  <div>{influencer.phoneNumber || influencer.phone || "Not provided"}</div>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Last Contact Date</Label>
                                  <div>{influencer.lastContactDate || "No recent contact"}</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs">Influence</Label>
                                <div>{influencer.influence}</div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs">Notes</Label>
                                <div className="p-2 bg-muted rounded-md">
                                  {influencer.notes || "No notes available"}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-muted-foreground">No community influencers information available.</div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Competitive Tab */}
                {subTab === "competitive" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Competitive Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Main Competitors</Label>
                            {(csp.competitivePosition?.mainCompetitors || []).length > 0 ? (
                              csp.competitivePosition.mainCompetitors.map((competitor: any, index: number) => (
                                <div key={index} className="p-3 border rounded-lg space-y-2">
                                  <div className="font-medium">{competitor.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    <div>Strengths: {competitor.strengths}</div>
                                    <div>Recent Wins: {competitor.recentWins}</div>
                                    <div>Market Share: {competitor.marketShare}</div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-muted-foreground">No competitor information available.</div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label>Incumbent Contractors</Label>
                            <div className="flex flex-wrap gap-2">
                              {(csp.incumbentContractors || []).length > 0 ? (
                                csp.incumbentContractors.map((contractor: string, index: number) => (
                                  <Badge key={index} variant="outline">
                                    {contractor}
                                  </Badge>
                                ))
                              ) : (
                                <div className="text-muted-foreground">
                                  No incumbent contractors information available.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Win Rate</Label>
                            <div className="text-2xl font-bold">{csp.competitivePosition?.winRate || "N/A"}</div>
                          </div>
                          <div className="space-y-2">
                            <Label>Competitive Advantages</Label>
                            <div className="flex flex-wrap gap-2">
                              {(csp.competitivePosition?.competitiveAdvantages || []).length > 0 ? (
                                csp.competitivePosition.competitiveAdvantages.map(
                                  (advantage: string, index: number) => (
                                    <Badge key={index} variant="secondary">
                                      {advantage}
                                    </Badge>
                                  ),
                                )
                              ) : (
                                <div className="text-muted-foreground">
                                  No competitive advantages information available.
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Possible Threats</Label>
                            <div className="flex flex-col gap-2">
                              {(csp.possibleThreats || []).length > 0 ? (
                                csp.possibleThreats.map((threat: string, index: number) => (
                                  <div key={index} className="p-2 border rounded-lg text-sm">
                                    {threat}
                                  </div>
                                ))
                              ) : (
                                <div className="text-muted-foreground">No threats information available.</div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Recent Bid Results</Label>
                            <div className="p-3 border rounded-lg">
                              <p className="text-sm">{csp.recentBidResults || "No recent bid results available."}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Competitor Relationships</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <Label>Competitor Relationships</Label>
                            <p className="mt-2">
                              {csp.competitorRelationships || "No competitor relationship information available."}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                              <Label>Competitive Advantages</Label>
                              <ul className="mt-2 list-disc pl-5">
                                {(csp.competitiveAdvantages || []).length > 0 ? (
                                  csp.competitiveAdvantages.map((advantage: string, index: number) => (
                                    <li key={index} className="text-sm">
                                      {advantage}
                                    </li>
                                  ))
                                ) : (
                                  <li className="text-sm text-muted-foreground">No competitive advantages listed.</li>
                                )}
                              </ul>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <Label>Possible Threats</Label>
                              <ul className="mt-2 list-disc pl-5">
                                {(csp.possibleThreats || []).length > 0 ? (
                                  csp.possibleThreats.map((threat: string, index: number) => (
                                    <li key={index} className="text-sm">
                                      {threat}
                                    </li>
                                  ))
                                ) : (
                                  <li className="text-sm text-muted-foreground">No threats listed.</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Metrics Tab */}
                {subTab === "metrics" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Financial Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Project Win Rate</Label>
                            <div className="flex justify-between items-center mt-2">
                              <span>Current: {csp.performanceMetrics?.projectWinRate?.current || "35%"}</span>
                              <span>Target: {csp.performanceMetrics?.projectWinRate?.target || "45%"}</span>
                            </div>
                            <Progress
                              value={Number.parseInt(csp.performanceMetrics?.projectWinRate?.current || "35")}
                              className="h-2 mt-2"
                            />
                          </div>
                          <div>
                            <Label>Backlog Value</Label>
                            <div className="text-2xl font-bold mt-2">
                              {csp.performanceMetrics?.financialMetrics?.backlog || "$3.2M"}
                            </div>
                            <div className="text-sm text-muted-foreground">Secured work for next 8 months</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Year-over-Year Growth</Label>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                {csp.performanceMetrics?.financialMetrics?.yearOverYearGrowth || "+18.5%"}
                              </Badge>
                              <span className="text-sm">Compared to previous fiscal year</span>
                            </div>
                          </div>
                          <div>
                            <Label>Profit Margin</Label>
                            <div className="text-2xl font-bold mt-2">
                              {csp.performanceMetrics?.financialMetrics?.profitMargin || "4.2%"}
                            </div>
                            <div className="text-sm text-muted-foreground">Industry average: 3.8%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Client Relationship Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-3 gap-6">
                        <div>
                          <Label>Client Satisfaction</Label>
                          <div className="text-2xl font-bold mt-2">
                            {csp.performanceMetrics?.clientSatisfaction?.current || "4.5/5.0"}
                          </div>
                          <div className="text-sm text-muted-foreground">Based on post-project surveys</div>
                        </div>
                        <div>
                          <Label>Repeat Business Rate</Label>
                          <div className="text-2xl font-bold mt-2">78%</div>
                          <div className="text-sm text-muted-foreground">Clients returning within 24 months</div>
                        </div>
                        <div>
                          <Label>Client Referrals</Label>
                          <div className="text-2xl font-bold mt-2">12</div>
                          <div className="text-sm text-muted-foreground">New leads from existing clients (YTD)</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Operational Excellence</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Safety Record</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div>
                                <div className="text-sm text-muted-foreground">EMR</div>
                                <div className="text-lg font-semibold">
                                  {csp.performanceMetrics?.safetyRecord?.emr || "0.78"}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Incidents</div>
                                <div className="text-lg font-semibold">
                                  {csp.performanceMetrics?.safetyRecord?.incidents || "0"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label>Schedule Adherence</Label>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">92%</Badge>
                              <span className="text-sm">Projects completed on or ahead of schedule</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Quality Metrics</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div>
                                <div className="text-sm text-muted-foreground">Defect Rate</div>
                                <div className="text-lg font-semibold">0.8%</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Rework Cost</div>
                                <div className="text-lg font-semibold">1.2%</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label>Change Order Rate</Label>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">4.5%</Badge>
                              <span className="text-sm">Of total contract value (industry avg: 8-10%)</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Business Development</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-3 gap-6">
                        <div>
                          <Label>Proposal Hit Rate</Label>
                          <div className="text-2xl font-bold mt-2">32%</div>
                          <div className="text-sm text-muted-foreground">Proposals won vs. submitted</div>
                        </div>
                        <div>
                          <Label>Avg. Proposal Value</Label>
                          <div className="text-2xl font-bold mt-2">$4.8M</div>
                          <div className="text-sm text-muted-foreground">Up 12% from previous year</div>
                        </div>
                        <div>
                          <Label>Market Penetration</Label>
                          <div className="text-2xl font-bold mt-2">18%</div>
                          <div className="text-sm text-muted-foreground">Share in target markets</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Sustainability & Innovation</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div>
                          <Label>Sustainability Score</Label>
                          <Progress value={75} className="h-2 mt-2" />
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-muted-foreground">75/100</span>
                            <span className="text-muted-foreground">Target: 80/100</span>
                          </div>
                        </div>
                        <div>
                          <Label>Innovation Initiatives</Label>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm">New technologies implemented</span>
                              <span className="text-sm font-medium">7</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Process improvements</span>
                              <span className="text-sm font-medium">12</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">R&D investment</span>
                              <span className="text-sm font-medium">2.1% of revenue</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Project Tasks Tab */}
                {subTab === "project-tasks" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Project Tasks</CardTitle>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Task Name</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {projectTasks.map((task) => (
                                <TableRow key={task.id}>
                                  <TableCell className="font-medium">{task.name}</TableCell>
                                  <TableCell>{task.owner}</TableCell>
                                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        task.status === "Done"
                                          ? "default"
                                          : task.status === "In Progress"
                                            ? "secondary"
                                            : task.status === "Blocked"
                                              ? "destructive"
                                              : "outline"
                                      }
                                    >
                                      {task.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                      <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Action Tracker Tab */}
                {subTab === "action-tracker" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Action Tracker - {project?.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Task</TableHead>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Owner</TableHead>
                              <TableHead>Notes</TableHead>
                              <TableHead>Status</TableHead>
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
                                  <Select
                                    defaultValue={action.completed ? "completed" : "pending"}
                                    onValueChange={(value) => handleUpdateStatus(action.id, value)}
                                  >
                                    <SelectTrigger className="w-32">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="overdue">Overdue</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Risk Tab - Moved inside the tabs container */}
                {subTab === "risk" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Risk Assessment</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Overall Risk Assessment</Label>
                            <Textarea
                              className="mt-2"
                              value={riskData.riskAssessment}
                              onChange={(e) => setRiskData({ ...riskData, riskAssessment: e.target.value })}
                              rows={4}
                            />
                          </div>
                          <div>
                            <Label>Financial Risks</Label>
                            <Textarea
                              className="mt-2"
                              value={riskData.financialRisks}
                              onChange={(e) => setRiskData({ ...riskData, financialRisks: e.target.value })}
                              rows={4}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Operational Risks</Label>
                            <Textarea
                              className="mt-2"
                              value={riskData.operationalRisks}
                              onChange={(e) => setRiskData({ ...riskData, operationalRisks: e.target.value })}
                              rows={4}
                            />
                          </div>
                          <div>
                            <Label>Risk Mitigation Strategies</Label>
                            <Textarea
                              className="mt-2"
                              value={riskData.mitigationStrategies}
                              onChange={(e) => setRiskData({ ...riskData, mitigationStrategies: e.target.value })}
                              rows={4}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Risk Severity</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Input
                            type="range"
                            min="0"
                            max="100"
                            value={riskData.riskSeverity}
                            onChange={(e) =>
                              setRiskData({ ...riskData, riskSeverity: Number.parseInt(e.target.value) })
                            }
                            className="w-full"
                          />
                          <span className="text-sm font-medium w-16">{riskData.riskSeverity}/100</span>
                        </div>
                        <Progress value={riskData.riskSeverity} className="w-full h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Low Risk</span>
                          <span>Medium Risk</span>
                          <span>High Risk</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Risk History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Risk Event</TableHead>
                              <TableHead>Impact</TableHead>
                              <TableHead>Resolution</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {riskData.riskHistory.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.event}</TableCell>
                                <TableCell>{item.impact}</TableCell>
                                <TableCell>{item.resolution}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            const newHistory = [
                              ...riskData.riskHistory,
                              {
                                date: new Date().toISOString().split("T")[0],
                                event: "New risk event",
                                impact: "To be assessed",
                                resolution: "Pending",
                              },
                            ]
                            setRiskData({ ...riskData, riskHistory: newHistory })
                          }}
                        >
                          Add Risk Event
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="border-t p-4 mt-auto">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
