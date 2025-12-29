"use client";

import { TableHeader } from "@/components/ui/table";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Search, Filter, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import ActionTrackerPopup from "./ActionTrackerPopup";
import ClientServicePlanModal from "./ClientServicePlanModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client

interface Agency {
  id: number;
  name: string;
  projects: Project[];
}

interface Project {
  id: number;
  name: string;
  description: string;
  startYear: string;
  fit: "High" | "Medium" | "Low";
  category: string;
  subcategory: string;
  department: string;
  location: string;
  projectManager: string;
  projectNumber: string;
  fullDescription: string;
  fundingStrategy: string;
  programmedFunding: string;
  meansOfFinancing: string;
  imageUrl?: string;
  projectValue: number;
  region: string;
  type: string;
  priority?: "High" | "Medium" | "Low";
  status?: string;
  owner?: string;
}

const statusOptions = ["Planned", "In Progress", "Completed"];
//["Backlog", "Planning", "In Progress", "Rexfview", "Done"];
const priorityOptions = ["High", "Medium", "Low"];
const ownerOptions = ["Unassigned", "John Doe", "Jane Smith", "Mike Johnson", "Emily Brown", "David Wilson"];

const projectTypes = [
  "Renovation",
  "New Construction",
  "Infrastructure Repair",
  "Energy Infrastructure",
  "Smart Infrastructure",
  "Water Infrastructure",
];
const regions = ["Northeast", "Midwest", "West", "Southwest", "Southeast", "National"];

const sampleCSP = {
  agencyName: "Palm Beach County School District",
  agencyType: "Public School District",
  annualBudget: "$1.5B",
  // ... other CSP fields
};

interface AgencyRowProps {
  agency: Agency;
  onToggleAgency: (id: number) => void;
  expanded: boolean;
  visibleHeaders: number[];
  children: React.ReactNode;
}

const AgencyRow = ({ agency, onToggleAgency, expanded, visibleHeaders, children }: AgencyRowProps) => {
  const totalValue = agency.projects.reduce((sum: number, project: Project) => sum + project.projectValue, 0);
  const projectCount = agency.projects.length;
  const averageValue = projectCount > 0 ? totalValue / projectCount : 0;

  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(1)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <>
      <TableRow>
        <TableCell colSpan={7} className="p-0 border-b-0">
          <div className="flex items-center gap-4 p-4 bg-muted/5">
            <button onClick={() => onToggleAgency(agency.id)} className="flex items-center gap-2 flex-1">
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <div className="flex items-center gap-4 flex-1">
                <span className="font-medium">{agency.name}</span>
                {!expanded && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="px-3">{formatCurrency(totalValue)} Total</span>
                    <span className="border-l border-gray-300 px-3">{projectCount} Projects</span>
                    <span className="border-l border-gray-300 px-3">{formatCurrency(averageValue)} Avg/Project</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </TableCell>
      </TableRow>
      {expanded && children}
    </>
  );
};

export default function AgenciesPage() {
  const router = useRouter();
  const [expandedAgencies, setExpandedAgencies] = useState<number[]>([]);
  const [visibleHeaders, setVisibleHeaders] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<{ text: string; sender: "user" | "ai" }[]>([
    { text: "Hello! I'm your AI assistant. How can I help you find the right agencies and projects?", sender: "ai" },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiAssistantWidth, setAiAssistantWidth] = useState(320);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    projectType: "All",
    projectValue: 10000000,
    region: "All",
    agencyTotalValue: 0,
    agencyMinProjects: 0,
  });
  const [selectedActionTracker, setSelectedActionTracker] = useState<{ id: number; name: string } | null>(null);
  const [selectedClientServicePlan, setSelectedClientServicePlan] = useState<{ id: number; name: string } | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<{ project: Project } | null>(null);
  //const [agencies, setAgencies] = useState<Agency[]>([]);
  const [agencies, setAgencies] = useState<Record<string, typeof agenciesWithProjects>>({});

  const [loading, setLoading] = useState(true);





  // useEffect(() => {
  //   const fetchAgencies = async () => {
  //     setLoading(true);
  //     try {
  //       let query = supabase.from("agencies").select("*, projects(*)");

  //       if (searchQuery) {
  //         query = query.or(`name.ilike.%${searchQuery}%,projects.name.ilike.%${searchQuery}%`);
  //       }

  //       if (filters.projectType !== "All") {
  //         query = query.filter("projects.type", "eq", filters.projectType);
  //       }
  //       query = query.filter("projects.project_value", "gte", filters.projectValue);
  //       if (filters.region !== "All") {
  //         query = query.filter("projects.region", "eq", filters.region);
  //       }

  //       const { data, error } = await query;
  //       console.log("Supabase Response:", { data, error });

  //       if (error) {
  //         console.error("Error fetching agencies:", JSON.stringify(error, null, 2));
  //       } else {
  //         const filtered = (data as any[])
  //           .map((agency) => ({
  //             ...agency,
  //             projects: agency.projects ? agency.projects.filter((project: Project) => project.projectValue >= filters.projectValue) : [],
  //           }))
  //           .filter(
  //             (agency: Agency) =>
  //               (agency.projects ? agency.projects.length : 0) > 0 &&
  //               (agency.projects ? agency.projects.reduce((sum: number, project: Project) => sum + project.projectValue, 0) : 0) >= filters.agencyTotalValue &&
  //               (agency.projects ? agency.projects.length : 0) >= filters.agencyMinProjects,
  //           );
  //         setAgencies(filtered);
  //       }
  //     } catch (error) {
  //       console.error("Unexpected error fetching agencies:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAgencies();
  // }, [searchQuery, filters]);


  useEffect(() => {
    const fetchAgenciesAndProjects = async () => {
      setLoading(true);
      try {
        // Fetch all agencies
        const { data: agenciesData, error: agenciesError } = await supabase
          .from("agencies")
          .select("*");
  
        if (agenciesError) {
          console.error("Error fetching agencies:", agenciesError);
          setLoading(false);
          return;
        }
  
        // Fetch all projects related to the fetched agencies
        const agencyIds = agenciesData.map((agency) => agency.id);
        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("*")
          .in("agency_id", agencyIds);
  
        if (projectsError) {
          console.error("Error fetching projects:", projectsError);
          setLoading(false);
          return;
        }
  
        // Manually associate projects with agencies
        const agenciesWithProjects = agenciesData.map((agency) => ({
          ...agency,
          projects: projectsData.filter(
            (project) => project.agency_id === agency.id
          ),
        }));
  
        //setAgencies(agenciesWithProjects);
        // Group agencies by region
        const groupedByRegion = agenciesWithProjects.reduce((acc, agency) => {
          const region = agency.region || "Unassigned";
          if (!acc[region]) acc[region] = [];
          acc[region].push(agency);
          return acc;
        }, {});

        // Save grouped data to state
        console.log("Grouped by region:", groupedByRegion)

        setAgencies(groupedByRegion);

      } catch (error) {
        console.error("Unexpected error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAgenciesAndProjects();
  }, [searchQuery, filters]);







  const toggleAgency = (agencyId: number) => {
    setExpandedAgencies((prev) => {
      const newExpandedAgencies = prev.includes(agencyId) ? prev.filter((id) => id !== agencyId) : [...prev, agencyId];
      setVisibleHeaders(newExpandedAgencies);
      return newExpandedAgencies;
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setChatMessages((prev) => [...prev, { text: messageInput, sender: "user" }]);
    setMessageInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          text: "I can help you analyze these agencies and their projects. What specific criteria are you looking for?",
          sender: "ai",
        },
      ]);
    }, 1000);
  };

  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
  };

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && resizeRef.current) {
        const newWidth = e.clientX - resizeRef.current.getBoundingClientRect().left;
        setAiAssistantWidth(Math.max(200, Math.min(newWidth, 600)));
      }
    },
    [isResizing]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      resize(e);
    };

    const handleMouseUp = () => {
      stopResizing();
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resize, stopResizing]);

  const handleUpdateProject = async (projectId: number, field: string, value: any) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ [field]: value })
        .eq("id", projectId);
  
      if (error) {
        console.error("Error updating project:", error);
      } else {
        setAgencies((prevAgencies) => {
          const updated = { ...prevAgencies };
  
          for (const region in updated) {
            updated[region] = updated[region].map((agency) => ({
              ...agency,
              projects: agency.projects.map((project) =>
                project.id === projectId ? { ...project, [field]: value } : project
              ),
            }));
          }
  
          return updated;
        });
      }
    } catch (error) {
      console.error("Unexpected error updating project:", error);
    }
  };
  
  // const handleUpdateProject = async (projectId: number, field: string, value: any) => {
  //   try {
  //     const { error } = await supabase.from("projects").update({ [field]: value }).eq("id", projectId);

  //     if (error) {
  //       console.error("Error updating project:", error);
  //     } else {
  //       setAgencies((prevAgencies) =>
  //         prevAgencies.map((agency) => ({
  //           ...agency,
  //           projects: agency.projects.map((project) => (project.id === projectId ? { ...project, [field]: value } : project)),
  //         }))
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error updating project:", error);
  //   }
  // };

  const formatCurrency = (value: number | undefined | null) => {
    if (typeof value !== 'number') {
      return '$0';
    }
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(1)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-4">
      <div className="flex-1 overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Agencies for You</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}>
                {isAiAssistantOpen ? "Close AI Assistant" : "Open AI Assistant"}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filter Projects and Agencies</DialogTitle>
                    <DialogDescription>Set your criteria to filter projects and agencies.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="projectType" className="text-right">
                        Project Type
                      </label>
                      <Select value={filters.projectType} onValueChange={(value) => setFilters({ ...filters, projectType: value })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="projectValue" className="text-right">
                        Min Project Value
                      </label>
                      <div className="col-span-3">
                        <Slider
                          id="projectValue"
                          min={10000000}
                          max={5000000000}
                          step={1000000}
                          value={[filters.projectValue]}
                          onValueChange={(value) => setFilters({ ...filters, projectValue: value[0] })}
                        />
                        <div className="mt-1 text-sm text-gray-500">${filters.projectValue.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="region" className="text-right">
                        Region
                      </label>
                      <Select value={filters.region} onValueChange={(value) => setFilters({ ...filters, region: value })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="agencyTotalValue" className="text-right">
                        Min Agency Total Value
                      </label>
                      <div className="col-span-3">
                        <Slider
                          id="agencyTotalValue"
                          min={0}
                          max={10000000000}
                          step={1000000}
                          value={[filters.agencyTotalValue]}
                          onValueChange={(value) => setFilters({ ...filters, agencyTotalValue: value[0] })}
                        />
                        <div className="mt-1 text-sm text-gray-500">${filters.agencyTotalValue.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="agencyMinProjects" className="text-right">
                        Min Projects per Agency
                      </label>
                      <Input
                        id="agencyMinProjects"
                        type="number"
                        value={filters.agencyMinProjects}
                        onChange={(e) => setFilters({ ...filters, agencyMinProjects: Number.parseInt(e.target.value) || 0 })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search agencies and projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>





          <Card className="flex-1 overflow-hidden">
            <div className="max-h-[75vh] overflow-y-auto overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
              <div className="min-w-[1200px] p-1">
          {/* <Card className="flex-1 overflow-hidden">
            <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
              <div className="min-w-[1200px] p-1"> */}
                <Table>
                  {visibleHeaders.length > 0 && (
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Project Name</TableHead>
                        <TableHead className="w-[300px]">Project Description</TableHead>
                        <TableHead className="w-[120px]">Priority</TableHead>
                        <TableHead className="w-[120px]">Status</TableHead>
                        <TableHead className="w-[120px]">Owner</TableHead>
                        <TableHead className="w-[120px]">Fit</TableHead>
                        <TableHead className="w-[150px]">Client Service Plan</TableHead>
                      </TableRow>
                    </TableHeader>
                  )}
                  <TableBody>



                  {Object.entries(agencies).map(([regionName, agenciesInRegion]) => (
                  <React.Fragment key={regionName}>
                    {/* Region Header */}
                    <TableRow>
                      <TableCell colSpan={7} className="bg-gray-100 font-semibold text-lg py-4 px-6 border-t border-b border-gray-300">
                        {regionName}
                      </TableCell>
                    </TableRow>

                    {/* Agencies under this region */}
                    {agenciesInRegion.map((agency) => (
                      <React.Fragment key={agency.id}>
                        <AgencyRow
                          agency={agency}
                          onToggleAgency={toggleAgency}
                          expanded={expandedAgencies.includes(agency.id)}
                          visibleHeaders={visibleHeaders}
                        >
                          {/* Projects under this agency */}
                          {agency.projects.map((project) => (
                            <TableRow key={project.id} className="hover:bg-gray-50">
                              {/* everything inside your existing <TableRow> for project goes here */}
                              {/* leave this part unchanged unless you want to improve formatting */}
                              <TableCell className="w-[300px] py-3">
                                <div className="flex flex-col">
                                  <span className="font-medium">{project.name}</span>
                                  <span className="text-xs text-muted-foreground mt-1">
                                    {project.startYear} | {formatCurrency(project.projectValue)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="w-[300px] py-3">
                                <div
                                  className="text-xs leading-normal hover:text-primary cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDescription({ project });
                                  }}
                                >
                                  {project.description}
                                </div>
                              </TableCell>
                              <TableCell className="w-[120px] py-3">
                                <Select
                                  value={project.priority || "Medium"}
                                  onValueChange={(value: "High" | "Medium" | "Low") => handleUpdateProject(project.id, "priority", value)}
                                >
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue>
                                      <Badge
                                        className={
                                          project.priority === "High"
                                            ? "bg-green-100 text-green-800"
                                            : project.priority === "Medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }
                                      >
                                        {project.priority || "Medium"}
                                      </Badge>
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {priorityOptions.map((priority) => (
                                      <SelectItem key={priority} value={priority}>
                                        <Badge
                                          className={
                                            priority === "High"
                                              ? "bg-green-100 text-green-800"
                                              : priority === "Medium"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-red-100 text-red-800"
                                          }
                                        >
                                          {priority}
                                        </Badge>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="w-[120px] py-3">

                              <Select
                                value={project.status || "Planned"}
                                onValueChange={(value) => handleUpdateProject(project.id, "status", value)}
                              >
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue>{project.status || "Planned"}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {statusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                      {status}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>


                                {/* <Select
                                  value={project.status || "Backlog"}
                                  onValueChange={(value) => handleUpdateProject(project.id, "status", value)}
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {statusOptions.map((status) => (
                                      <SelectItem key={status} value={status.toLowerCase().replace(" ", "")}>
                                        {status}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select> */}


                              </TableCell>
                              <TableCell className="w-[120px] py-3">
                                <Select
                                  value={project.owner || "Unassigned"}
                                  onValueChange={(value) => handleUpdateProject(project.id, "owner", value === "Unassigned" ? "" : value)}
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {ownerOptions.map((owner) => (
                                      <SelectItem key={owner} value={owner}>
                                        {owner}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="w-[120px] py-3">
                                <Select
                                  value={project.fit}
                                  onValueChange={(value: "High" | "Medium" | "Low") => handleUpdateProject(project.id, "fit", value)}
                                >
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue>{project.fit}</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="w-[150px] py-3">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  //onClick={() => setSelectedClientServicePlan({ id: project.id, name: agency.name })}
                                  onClick={() => setSelectedClientServicePlan(project)}

                                >
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Client Service Plan</span>
                                </Button>
                              </TableCell>
                            </TableRow>
                            //</TableRow>
                          ))}
                        </AgencyRow>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}

                    {/* {agencies.map((agency) => (
                      <React.Fragment key={agency.id}>
                        <AgencyRow agency={agency} onToggleAgency={toggleAgency} expanded={expandedAgencies.includes(agency.id)} visibleHeaders={visibleHeaders}>
                          {agency.projects.map((project) => (
                            <TableRow key={project.id} className="hover:bg-gray-50">
                              <TableCell className="w-[300px] py-3">
                                <div className="flex flex-col">
                                  <span className="font-medium">{project.name}</span>
                                  <span className="text-xs text-muted-foreground mt-1">
                                    {project.startYear} | {formatCurrency(project.projectValue)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="w-[300px] py-3">
                                <div className="text-xs leading-normal hover:text-primary cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedDescription({ project }); }}>
                                  {project.description}
                                </div>
                              </TableCell>
                              <TableCell className="w-[120px] py-3">
                                <Select value={project.priority || "Medium"} onValueChange={(value: "High" | "Medium" | "Low") => handleUpdateProject(project.id, "priority", value)}>
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue>
                                      <Badge className={ project.priority === "High" ? "bg-green-100 text-green-800" : project.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800" }>
                                        {project.priority || "Medium"}
                                      </Badge>
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {priorityOptions.map((priority) => (
                                      <SelectItem key={priority} value={priority}>
                                        <Badge className={ priority === "High" ? "bg-green-100 text-green-800" : priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800" }>
                                          {priority}
                                        </Badge>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="w-[120px] py-3">
                                <Select value={project.status || "Backlog"} onValueChange={(value) => handleUpdateProject(project.id, "status", value)}>
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {statusOptions.map((status) => (
                                      <SelectItem key={status} value={status.toLowerCase().replace(" ", "")}>
                                        {status}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="w-[120px] py-3">
                                <Select value={project.owner || "Unassigned"} onValueChange={(value) => handleUpdateProject(project.id, "owner", value === "Unassigned" ? "" : value)}>
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {ownerOptions.map((owner) => (
                                      <SelectItem key={owner} value={owner}>
                                        {owner}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="w-[120px] py-3">
                                <Select value={project.fit} onValueChange={(value: "High" | "Medium" | "Low") => handleUpdateProject(project.id, "fit", value)}>
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue>{project.fit}</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="w-[150px] py-3">
                                <Button variant="ghost" size="icon" onClick={() => setSelectedClientServicePlan({ id: project.id, name: agency.name })}>
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Client Service Plan</span>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </AgencyRow>
                      </React.Fragment>
                    ))} */}





                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>




      {isAiAssistantOpen && (
        <Card className="flex flex-col relative" style={{ width: `${aiAssistantWidth}px`, minWidth: "200px", maxWidth: "600px" }} ref={resizeRef}>
          <div className="absolute left-0 top-0 w-1 h-full cursor-ew-resize" onMouseDown={startResizing}></div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>AI Assistant</span>
              <Button variant="ghost" size="sm" onClick={() => setIsAiAssistantOpen(false)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Ask me anything..." className="flex-1" />
              <Button type="submit" size="sm">
                Send
              </Button>
            </form>
          </div>
        </Card>
      )}

      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} onSave={(updatedProject) => { console.log("Saving updated project:", updatedProject); const updatedAgencies = agencies.map((agency) => ({ ...agency, projects: agency.projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)), })); console.log("Updated agencies:", updatedAgencies); setSelectedProject(null); }} />

      <ActionTrackerPopup projectId={selectedActionTracker?.id || 0} projectName={selectedActionTracker?.name || ""} isOpen={!!selectedActionTracker} onClose={() => setSelectedActionTracker(null)} />

      {/* <ClientServicePlanModal isOpen={!!selectedClientServicePlan} onClose={() => setSelectedClientServicePlan(null)} csp={sampleCSP} /> */}
      <ClientServicePlanModal
      isOpen={!!selectedClientServicePlan}
      onClose={() => setSelectedClientServicePlan(null)}
      project={selectedClientServicePlan}
  />



      <Dialog open={!!selectedDescription} onOpenChange={() => setSelectedDescription(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedDescription?.project.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Short Description</h4>
              <p className="text-sm text-muted-foreground">{selectedDescription?.project.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Full Description</h4>
              <p className="text-sm text-muted-foreground">{selectedDescription?.project.fullDescription}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <p className="text-sm text-muted-foreground">{selectedDescription?.project.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Subcategory</h4>
                <p className="text-sm text-muted-foreground">{selectedDescription?.project.subcategory}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


