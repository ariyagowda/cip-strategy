// import Layout from "@/components/Layout"

// export default function DashboardPage() {
//   return (
//     <Layout>
//       <div className="p-6">
//         <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
//         {/* Add dashboard content here */}
//       </div>
//     </Layout>
//   )
// }

"use client";

import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, DollarSign, ListChecks, MapPin } from "lucide-react";

// Dummy project data (replace with your actual data fetching)
const initialProjects = [
  { id: 1, name: "Highway Expansion A", agency: "Transportation Dept", region: "North", cost: 1500000, timeline: "2024-2026", status: "In Progress" },
  { id: 2, name: "Bridge Renovation", agency: "Infrastructure Agency", region: "South", cost: 800000, timeline: "2025-2027", status: "Planning" },
  { id: 3, name: "Water Treatment Plant Upgrade", agency: "Environmental Protection", region: "East", cost: 2200000, timeline: "2023-2025", status: "Completed" },
  { id: 4, name: "Airport Terminal Expansion", agency: "Aviation Authority", region: "West", cost: 3500000, timeline: "2026-2028", status: "Planning" },
  { id: 5, name: "Local Road Improvement", agency: "City Works", region: "North", cost: 500000, timeline: "2024-2025", status: "In Progress" },
];

// Dummy region and agency data for filters
const regions = ["All", "North", "South", "East", "West"];
const agencies = ["All", "Transportation Dept", "Infrastructure Agency", "Environmental Protection", "Aviation Authority", "City Works"];
const statuses = ["All", "Planning", "In Progress", "Completed"];
const statusColors = {
  Planning: "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
};

export default function DashboardPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [filters, setFilters] = useState({
    region: "All",
    agency: "All",
    status: "All",
    search: "",
  });
  const [editedProject, setEditedProject] = useState(null);

  const filteredProjects = projects.filter((project) => {
    const regionMatch = filters.region === "All" || project.region === filters.region;
    const agencyMatch = filters.agency === "All" || project.agency === filters.agency;
    const statusMatch = filters.status === "All" || project.status === filters.status;
    const searchMatch =
      filters.search === "" ||
      project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.agency.toLowerCase().includes(filters.search.toLowerCase());
    return regionMatch && agencyMatch && statusMatch && searchMatch;
  });

  const totalProjectCount = filteredProjects.length;
  const totalSpend = filteredProjects.reduce((acc, project) => acc + project.cost, 0);
  const projectsByRegion = filteredProjects.reduce((acc, project) => {
    acc[project.region] = (acc[project.region] || 0) + 1;
    return acc;
  }, {});

  const statusDistributionData = filteredProjects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});
  const statusDistributionArray = Object.entries(statusDistributionData).map(([status, count]) => ({ name: status, value: count }));

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleEdit = (project) => {
    setEditedProject({ ...project });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleSave = () => {
    if (editedProject) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editedProject.id ? editedProject : project
        )
      );
      setEditedProject(null);
    }
  };

  const handleCancelEdit = () => {
    setEditedProject(null);
  };

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Capital Improvement Projects</h1>
          {/* Placeholder for potential global actions */}
          {/* <Button>Add New Project</Button> */}
        </div>
        <Separator />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
          <Select onValueChange={(value) => handleFilterChange("region", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange("agency", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Agency" />
            </SelectTrigger>
            <SelectContent>
              {agencies.map((agency) => (
                <SelectItem key={agency} value={agency}>{agency}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* High-Level Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <ListChecks className="h-4 w-4 text-blue-500" />
                Total Projects
              </CardTitle>
              {/* Placeholder for trend indicator */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjectCount}</div>
              {/* Placeholder for comparison */}
              {/* <p className="text-xs text-muted-foreground">+20% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                Total Spend
              </CardTitle>
              {/* Placeholder for trend indicator */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
              {/* Placeholder for comparison */}
              {/* <p className="text-xs text-muted-foreground">-5% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-indigo-500" />
                Projects by Region
              </CardTitle>
              {/* Placeholder for trend indicator */}
            </CardHeader>
            <CardContent>
              <ul className="list-none space-y-1">
                {Object.entries(projectsByRegion).map(([region, count]) => (
                  <li key={region} className="flex items-center justify-between">
                    <span className="text-sm">{region}</span>
                    <Badge className="rounded-md">{count}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Project Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusDistributionArray}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Placeholder for Budget Over Time Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Budget Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full flex items-center justify-center text-gray-500">
              {/* You'll need to generate data and configure a chart for budget over time here */}
              <p>Chart data will be displayed here.</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold">Name</TableCell>
                  <TableCell className="font-semibold">Agency</TableCell>
                  <TableCell className="font-semibold">Region</TableCell>
                  <TableCell className="font-semibold">Cost</TableCell>
                  <TableCell className="font-semibold">Timeline</TableCell>
                  <TableCell className="font-semibold">Status</TableCell>
                  <TableCell className="text-right font-semibold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    {editedProject?.id === project.id ? (
                      <>
                        <TableCell><Input name="name" value={editedProject.name} onChange={handleInputChange} /></TableCell>
                        <TableCell><Input name="agency" value={editedProject.agency} onChange={handleInputChange} /></TableCell>
                        <TableCell><Input name="region" value={editedProject.region} onChange={handleInputChange} /></TableCell>
                        <TableCell><Input type="number" name="cost" value={editedProject.cost} onChange={handleInputChange} /></TableCell>
                        <TableCell><Input name="timeline" value={editedProject.timeline} onChange={handleInputChange} /></TableCell>
                        <TableCell><Input name="status" value={editedProject.status} onChange={handleInputChange} /></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={handleSave}>Save</Button>
                          <Button size="sm" variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.agency}</TableCell>
                        <TableCell>{project.region}</TableCell>
                        <TableCell>${project.cost.toLocaleString()}</TableCell>
                        <TableCell>{project.timeline}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[project.status]}>{project.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => handleEdit(project)}>Edit</Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Shareable URL */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Shareable Link</h2>
          <Input type="text" value={window.location.href} readOnly />
          <p className="text-sm text-gray-500 mt-1">
            Share this link to view the current dashboard filters. (Implementation needed to update URL)
          </p>
        </div>
      </div>
    </Layout>
  );
}



// "use client"

// import { useState, useEffect } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { Building2, Calendar, DollarSign, Download, MapPin, Share2, Sliders } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import Layout from "@/components/Layout"
// import ProjectTable from "@/components/dashboard/project-table"
// import BudgetChart from "@/components/dashboard/budget-chart"
// import StatusChart from "@/components/dashboard/status-chart"
// import RegionMap from "@/components/dashboard/region-map"
// import { mockProjects, mockRegions, mockAgencies } from "@/lib/mock-data"

// export default function DashboardPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const [projects, setProjects] = useState(mockProjects)
//   const [filteredProjects, setFilteredProjects] = useState(mockProjects)
//   const [selectedRegion, setSelectedRegion] = useState("all")
//   const [selectedAgency, setSelectedAgency] = useState("all")
//   const [selectedStatus, setSelectedStatus] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")

//   // Calculate summary metrics
//   const totalProjects = filteredProjects.length
//   const totalBudget = filteredProjects.reduce((sum, project) => sum + project.budget, 0)

//   const regionTotals = filteredProjects.reduce((acc, project) => {
//     const region = project.region
//     if (!acc[region]) acc[region] = { count: 0, budget: 0 }
//     acc[region].count += 1
//     acc[region].budget += project.budget
//     return acc
//   }, {})

//   // Apply filters
//   useEffect(() => {
//     let result = [...mockProjects]

//     if (selectedRegion !== "all") {
//       result = result.filter((project) => project.region === selectedRegion)
//     }

//     if (selectedAgency !== "all") {
//       result = result.filter((project) => project.agency === selectedAgency)
//     }

//     if (selectedStatus !== "all") {
//       result = result.filter((project) => project.status === selectedStatus)
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       result = result.filter(
//         (project) => project.name.toLowerCase().includes(query) || project.description.toLowerCase().includes(query),
//       )
//     }

//     setFilteredProjects(result)
//   }, [selectedRegion, selectedAgency, selectedStatus, searchQuery])

//   // Update URL with filters for shareable links
//   useEffect(() => {
//     const params = new URLSearchParams()
//     if (selectedRegion !== "all") params.set("region", selectedRegion)
//     if (selectedAgency !== "all") params.set("agency", selectedAgency)
//     if (selectedStatus !== "all") params.set("status", selectedStatus)
//     if (searchQuery) params.set("search", searchQuery)

//     const url = `/dashboard${params.toString() ? "?" + params.toString() : ""}`
//     window.history.replaceState({}, "", url)
//   }, [selectedRegion, selectedAgency, selectedStatus, searchQuery])

//   // Load filters from URL on initial load
//   useEffect(() => {
//     const region = searchParams.get("region")
//     const agency = searchParams.get("agency")
//     const status = searchParams.get("status")
//     const search = searchParams.get("search")

//     if (region) setSelectedRegion(region)
//     if (agency) setSelectedAgency(agency)
//     if (status) setSelectedStatus(status)
//     if (search) setSearchQuery(search)
//   }, [searchParams])

//   // Handle project updates
//   const handleProjectUpdate = (updatedProject) => {
//     const updatedProjects = projects.map((project) => (project.id === updatedProject.id ? updatedProject : project))
//     setProjects(updatedProjects)
//   }

//   // Share current dashboard view
//   const shareCurrentView = () => {
//     const url = window.location.href
//     navigator.clipboard.writeText(url)
//     alert("Dashboard URL copied to clipboard!")
//   }

//   return (
//     <Layout>
//       <div className="flex flex-col gap-6 p-6">
//         <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">Capital Improvement Dashboard</h1>
//             <p className="text-muted-foreground">
//               Monitor and manage construction projects across all regions and agencies
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button variant="outline" size="icon" onClick={shareCurrentView}>
//                     <Share2 className="h-4 w-4" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Share this dashboard view</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button variant="outline" size="icon">
//                     <Download className="h-4 w-4" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Export data</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Sliders className="h-4 w-4" />
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Dashboard Settings</DialogTitle>
//                   <DialogDescription>Customize your dashboard view and display preferences</DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="space-y-2">
//                     <Label>Visible Columns</Label>
//                     <div className="grid grid-cols-2 gap-2">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="col-name" defaultChecked />
//                         <label htmlFor="col-name">Project Name</label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="col-budget" defaultChecked />
//                         <label htmlFor="col-budget">Budget</label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="col-timeline" defaultChecked />
//                         <label htmlFor="col-timeline">Timeline</label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="col-status" defaultChecked />
//                         <label htmlFor="col-status">Status</label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="col-region" defaultChecked />
//                         <label htmlFor="col-region">Region</label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="col-agency" defaultChecked />
//                         <label htmlFor="col-agency">Agency</label>
//                       </div>
//                     </div>
//                   </div>
//                   <Separator />
//                   <div className="space-y-2">
//                     <Label>Chart Display</Label>
//                     <div className="grid grid-cols-2 gap-2">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="chart-budget" defaultChecked />
//                         <label htmlFor="chart-budget">Budget Chart</label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="chart-status" defaultChecked />
//                         <label htmlFor="chart-status">Status Chart</label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Checkbox id="chart-map" defaultChecked />
//                         <label htmlFor="chart-map">Region Map</label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
//               <Building2 className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{totalProjects}</div>
//               <p className="text-xs text-muted-foreground">Across {Object.keys(regionTotals).length} regions</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
//               <p className="text-xs text-muted-foreground">
//                 Average: ${Math.round(totalBudget / totalProjects).toLocaleString()} per project
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">In Progress</CardTitle>
//               <Calendar className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {filteredProjects.filter((p) => p.status === "In Progress").length}
//               </div>
//               <p className="text-xs text-muted-foreground">
//                 {Math.round((filteredProjects.filter((p) => p.status === "In Progress").length / totalProjects) * 100)}%
//                 of total projects
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Highest Budget Region</CardTitle>
//               <MapPin className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               {Object.entries(regionTotals).length > 0 ? (
//                 <>
//                   <div className="text-2xl font-bold">
//                     {Object.entries(regionTotals).sort((a, b) => b[1].budget - a[1].budget)[0][0]}
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     $
//                     {Object.entries(regionTotals)
//                       .sort((a, b) => b[1].budget - a[1].budget)[0][1]
//                       .budget.toLocaleString()}
//                   </p>
//                 </>
//               ) : (
//                 <div className="text-2xl font-bold">N/A</div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Filters</CardTitle>
//             <CardDescription>Filter projects by region, agency, status, or search by name</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 md:grid-cols-4">
//               <div className="space-y-2">
//                 <Label htmlFor="region">Region</Label>
//                 <Select value={selectedRegion} onValueChange={setSelectedRegion}>
//                   <SelectTrigger id="region">
//                     <SelectValue placeholder="Select Region" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Regions</SelectItem>
//                     {mockRegions.map((region) => (
//                       <SelectItem key={region} value={region}>
//                         {region}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="agency">Agency</Label>
//                 <Select value={selectedAgency} onValueChange={setSelectedAgency}>
//                   <SelectTrigger id="agency">
//                     <SelectValue placeholder="Select Agency" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Agencies</SelectItem>
//                     {mockAgencies.map((agency) => (
//                       <SelectItem key={agency} value={agency}>
//                         {agency}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="status">Status</Label>
//                 <Select value={selectedStatus} onValueChange={setSelectedStatus}>
//                   <SelectTrigger id="status">
//                     <SelectValue placeholder="Select Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Statuses</SelectItem>
//                     <SelectItem value="Planning">Planning</SelectItem>
//                     <SelectItem value="In Progress">In Progress</SelectItem>
//                     <SelectItem value="Completed">Completed</SelectItem>
//                     <SelectItem value="On Hold">On Hold</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="search">Search</Label>
//                 <Input
//                   id="search"
//                   placeholder="Search projects..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="mt-4 flex items-center justify-between">
//               <div className="text-sm text-muted-foreground">
//                 Showing {filteredProjects.length} of {mockProjects.length} projects
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   setSelectedRegion("all")
//                   setSelectedAgency("all")
//                   setSelectedStatus("all")
//                   setSearchQuery("")
//                 }}
//               >
//                 Clear Filters
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Charts */}
//         <Tabs defaultValue="charts">
//           <TabsList>
//             <TabsTrigger value="charts">Charts</TabsTrigger>
//             <TabsTrigger value="table">Table</TabsTrigger>
//           </TabsList>
//           <TabsContent value="charts" className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               <Card className="col-span-2">
//                 <CardHeader>
//                   <CardTitle>Budget by Region</CardTitle>
//                   <CardDescription>Total budget allocation across regions</CardDescription>
//                 </CardHeader>
//                 <CardContent className="h-[300px]">
//                   <BudgetChart data={filteredProjects} />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Project Status</CardTitle>
//                   <CardDescription>Distribution of projects by status</CardDescription>
//                 </CardHeader>
//                 <CardContent className="h-[300px]">
//                   <StatusChart data={filteredProjects} />
//                 </CardContent>
//               </Card>

//               <Card className="col-span-3">
//                 <CardHeader>
//                   <CardTitle>Regional Distribution</CardTitle>
//                   <CardDescription>Project count and budget by region</CardDescription>
//                 </CardHeader>
//                 <CardContent className="h-[400px]">
//                   <RegionMap data={regionTotals} />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="table">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Projects</CardTitle>
//                 <CardDescription>Manage and edit all capital improvement projects</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ProjectTable projects={filteredProjects} onUpdate={handleProjectUpdate} />
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </Layout>
//   )
// }
