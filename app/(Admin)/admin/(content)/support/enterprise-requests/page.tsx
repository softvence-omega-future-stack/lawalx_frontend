// 'use client';

// import React, { useState } from 'react';
// import { Search, Eye, MoreVertical, Settings, Home, ChevronRight, ChevronDown } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import EnterpriseRequestDetailsModal from '@/components/Admin/modals/EnterpriseRequestDetailsModal';
// import DeleteConfirmationModal from '@/components/Admin/modals/DeleteConfirmationModal';
// import SetAssignRulesModal from '@/components/Admin/modals/SetAssignRulesModal';
// import Link from 'next/link';
// import { cn } from '@/lib/utils';

// interface EnterpriseRequest {
//     id: string;
//     user: {
//         name: string;
//         email: string;
//         avatar?: string;
//         planType: 'Trial' | 'Pro' | 'Enterprise';
//     };
//     companyName: string;
//     deviceCount: number;
//     storage: string;
//     estimatedBudget: string;
//     status: 'Open' | 'Negotiating' | 'Won' | 'Lost';
//     industryType: string;
//     website: string;
//     location: string;
//     requestDate: string;
//     conversionDate?: string;
//     handledBy?: string;
//     additionalRequirements: string;
//     assignedTo?: string; // For table display simply as "Assign" button or name
// }

// // Mock Data
// const mockRequests: EnterpriseRequest[] = [
//     {
//         id: '1',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Trial' },
//         companyName: 'Binford Ltd.',
//         deviceCount: 26,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Open',
//         industryType: 'Fintech',
//         website: 'http://tape.io',
//         location: 'Syracuse, Connecticut',
//         requestDate: 'Feb 21, 2023 at 03:05 pm',
//         additionalRequirements: "Hello Support Team,\n\nI'm trying to export our analytics data to CSV format but keep getting an error message. When I click on the \"Export to CSV\" button in the Reports section, the loading spinner appears for about 10 seconds and then displays \"Export Failed: Unknown Error\".\n\nI've tried this on multiple browsers (Chrome, Firefox, and Edge) with the same result. This functionality was working fine last week.\n\nCould you please look into this issue as soon as possible? We need this data for our quarterly review.",
//     },
//     {
//         id: '2',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Trial' },
//         companyName: 'Acme Co.',
//         deviceCount: 39,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Negotiating',
//         industryType: 'Retail',
//         website: 'http://acme.com',
//         location: 'New York, NY',
//         requestDate: 'Feb 20, 2023 at 10:00 am',
//         handledBy: 'Thompson',
//         assignedTo: 'Thompson',
//         additionalRequirements: "Looking for a custom integration.",
//     },
//     {
//         id: '3',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Pro' },
//         companyName: 'Biffco Enterprises Ltd.',
//         deviceCount: 21,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Won',
//         industryType: 'Manufacturing',
//         website: 'http://biffco.com',
//         location: 'Austin, TX',
//         requestDate: 'Feb 19, 2023 at 02:15 pm',
//         handledBy: 'Emanuel',
//         assignedTo: 'Emanuel',
//         additionalRequirements: "Urgent request for enterprise features.",
//     },
//     {
//         id: '4',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Enterprise' },
//         companyName: 'Binford Ltd.',
//         deviceCount: 37,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Negotiating',
//         industryType: 'Tech',
//         website: 'http://binford.com',
//         location: 'San Francisco, CA',
//         requestDate: 'Feb 18, 2023 at 09:30 am',
//         handledBy: 'Lawal',
//         assignedTo: 'Lawal',
//         additionalRequirements: "Need to discuss volume pricing.",
//     },
//     {
//         id: '5',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Pro' },
//         companyName: 'Big Kahuna Burger Ltd.',
//         deviceCount: 6,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Won',
//         industryType: 'Food & Beverage',
//         website: 'http://bigkahuna.com',
//         location: 'Los Angeles, CA',
//         requestDate: 'Feb 17, 2023 at 05:45 pm',
//         handledBy: 'Emanuel',
//         assignedTo: 'Emanuel',
//         additionalRequirements: "Standard rollout plan.",
//     },
//     {
//         id: '6',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Enterprise' },
//         companyName: 'Abstergo Ltd.',
//         deviceCount: 16,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Lost',
//         industryType: 'Pharma',
//         website: 'http://abstergo.com',
//         location: 'Chicago, IL',
//         requestDate: 'Feb 16, 2023 at 11:20 am',
//         handledBy: 'Lawal',
//         assignedTo: 'Lawal',
//         additionalRequirements: "Budget constraints cited.",
//     },
//     {
//         id: '7',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Pro' },
//         companyName: 'Barone LLC.',
//         deviceCount: 28,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Won',
//         industryType: 'Consulting',
//         website: 'http://barone.com',
//         location: 'Seattle, WA',
//         requestDate: 'Feb 15, 2023 at 04:10 pm',
//         handledBy: 'Emanuel',
//         assignedTo: 'Emanuel',
//         additionalRequirements: "Integration with CRM needed.",
//     },
//     {
//         id: '8',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Enterprise' },
//         companyName: 'Acme Co.',
//         deviceCount: 25,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Lost',
//         industryType: 'Retail',
//         website: 'http://acme.com',
//         location: 'Boston, MA',
//         requestDate: 'Feb 14, 2023 at 01:00 pm',
//         handledBy: 'Lawal',
//         assignedTo: 'Lawal',
//         additionalRequirements: "Competitor selected.",
//     },
//     {
//         id: '9',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Pro' },
//         companyName: 'Biffco Enterprises Ltd.',
//         deviceCount: 1,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Lost',
//         industryType: 'Manufacturing',
//         website: 'http://biffco.com',
//         location: 'Houston, TX',
//         requestDate: 'Feb 13, 2023 at 09:15 am',
//         handledBy: 'Emanuel',
//         assignedTo: 'Emanuel',
//         additionalRequirements: "Project cancelled.",
//     },
//     {
//         id: '10',
//         user: { name: 'John Smith', email: 'john@gmail.com', planType: 'Enterprise' },
//         companyName: 'Big Kahuna Burger Ltd.',
//         deviceCount: 15,
//         storage: '500 GB',
//         estimatedBudget: '$214 /month',
//         status: 'Negotiating',
//         industryType: 'Food & Beverage',
//         website: 'http://bigkahuna.com',
//         location: 'Miami, FL',
//         requestDate: 'Feb 12, 2023 at 03:30 pm',
//         handledBy: 'Lawal',
//         assignedTo: 'Lawal',
//         additionalRequirements: "Reviewing contract terms.",
//     },
// ];

// const availableEmployees = ['Thompson', 'Emanuel', 'Lawal', 'Johnson', 'Smith'];

// export default function EnterpriseRequests() {
//     const [requests, setRequests] = useState<EnterpriseRequest[]>(mockRequests);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [statusFilter, setStatusFilter] = useState<'all' | 'Open' | 'Negotiating' | 'Won' | 'Lost'>('all'); // Corrected default value
//     const [selectedRequest, setSelectedRequest] = useState<EnterpriseRequest | null>(null);
//     const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [requestToDelete, setRequestToDelete] = useState<EnterpriseRequest | null>(null);

//     const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 8;

//     // Filter Logic
//     const filteredRequests = requests.filter(req => {
//         const matchesSearch = searchQuery === '' ||
//             req.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             req.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             req.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             req.id.toLowerCase().includes(searchQuery.toLowerCase());

//         const matchesStatus = statusFilter === 'all' || req.status === statusFilter;

//         return matchesSearch && matchesStatus;

//     });

//     // Pagination Logic
//     const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

//     const handleRowClick = (request: EnterpriseRequest) => {
//         setSelectedRequest(request);
//         setIsDetailsModalOpen(true);
//     };

//     const handleViewDetails = (request: EnterpriseRequest, e: React.MouseEvent) => {
//         e.stopPropagation();
//         setSelectedRequest(request);
//         setIsDetailsModalOpen(true);
//     };

//     const handleDeleteClick = (request: EnterpriseRequest, e: React.MouseEvent) => {
//         e.stopPropagation();
//         setRequestToDelete(request);
//         setIsDeleteModalOpen(true);
//     };

//     const handleDeleteConfirm = () => {
//         if (requestToDelete) {
//             setRequests(requests.filter(r => r.id !== requestToDelete.id));
//             setRequestToDelete(null);
//             setIsDeleteModalOpen(false);
//         }
//     };

//     const handleStatusChange = (request: EnterpriseRequest, newStatus: any, e: React.MouseEvent) => {
//         e.stopPropagation();
//         setRequests(requests.map(r => r.id === request.id ? { ...r, status: newStatus } : r));
//     };

//     const handleAssign = (request: EnterpriseRequest, employee: string) => {
//         setRequests(requests.map(r => r.id === request.id ? { ...r, assignedTo: employee } : r));
//     };

//     const handleReply = () => {
//         alert("Reply & Create Ticket functionality would go here.");
//         setIsDetailsModalOpen(false);
//     };

//     const handleApprove = () => {
//         if (selectedRequest) {
//             handleStatusChange(selectedRequest, 'Won', {} as any);
//             alert("Request approved and status updated to 'Won'.");
//             setIsDetailsModalOpen(false);
//         }
//     };

//     const getPlanVariant = (planType: string): "guest" | "trial" | "pro" | "enterprise" => {
//         switch (planType) {
//             case 'Trial': return 'trial';
//             case 'Pro': return 'pro';
//             case 'Enterprise': return 'enterprise';
//             default: return 'guest';
//         }
//     };

//     const getStatusBadgeStyles = (status: string) => {
//         switch (status) {
//             case 'Open': return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
//             case 'Negotiating': return 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50';
//             case 'Won': return 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50';
//             case 'Lost': return 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50';
//             default: return 'bg-gray-100 text-gray-700';
//         }
//     };


//     return (
//         <div className="min-h-screen">
//             {/* Breadcrumbs */}
//             <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
//                 <Home className="w-4 h-4" />
//                 <ChevronRight className="w-4 h-4" />
//                 <span>Customer Supports</span>
//                 <ChevronRight className="w-4 h-4" />
//                 <span className="text-bgBlue font-medium">Enterprise Requests</span>
//             </div>

//             {/* Header */}
//             <div className="border-b border-border pb-6">
//                 <div className="flex items-center justify-between mb-4">
//                     <div>
//                         <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Enterprise Requests</h1>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Manage customer support tickets and resolve issues</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Link href="/admin/reports/customer-service-&-support-reports" className="text-nowrap px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-navbarBg border border-border shadow-customShadow rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1.5 transition-colors">
//                             <Eye className="w-3.5 h-3.5" />
//                             <span className="hidden lg:block">View Reports</span>
//                         </Link>
//                         <button
//                             onClick={() => setIsSettingsModalOpen(true)}
//                             className="text-nowrap px-2.5 py-2 text-xs font-medium text-gray-600 dark:text-gray-300 bg-navbarBg border border-gray-200 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1.5 transition-colors"
//                         >
//                             <Settings className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Total Count */}
//             <div className="mt-6 mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 {requests.length} Devices
//             </div>

//             {/* Filters and Search */}
//             <div className="flex flex-col sm:flex-row gap-3 mb-6">
//                 {/* Search */}
//                 <div className="relative flex-1">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                         type="text"
//                         placeholder="Search devices by name, location, screen, ID"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full pl-10 pr-4 h-11 text-sm bg-navbarBg border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
//                     />
//                 </div>

//                 {/* Status Dropdown - Open(1) style */}
//                 <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
//                     <SelectTrigger className="w-[120px] h-11 rounded-xl text-xs bg-navbarBg border-border">
//                         <SelectValue placeholder="Open (1)" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">All Status</SelectItem>
//                         <SelectItem value="Open">Open</SelectItem>
//                         <SelectItem value="Negotiating">Negotiating</SelectItem>
//                         <SelectItem value="Won">Won</SelectItem>
//                         <SelectItem value="Lost">Lost</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>

//             {/* Table */}
//             <div className="bg-navbarBg rounded-xl border border-border overflow-hidden shadow-sm">
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-border">
//                             <tr>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">User</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Company Name</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Device</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Storage</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Estimated Budget</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Status</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Assign</th>
//                                 <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-border">

//                             {paginatedRequests.map((request) => (
//                                 <tr
//                                     key={request.id}
//                                     onClick={() => handleRowClick(request)}
//                                     className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
//                                 >
//                                     <td className="px-6 py-4">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 relative overflow-hidden">
//                                                 {request.user.avatar ? (
//                                                     <img src={request.user.avatar} alt={request.user.name} className="w-full h-full object-cover" />
//                                                 ) : (
//                                                     <div className="w-full h-full flex items-center justify-center bg-gray-600 text-white font-medium">
//                                                         {request.user.name.charAt(0)}
//                                                     </div>
//                                                 )}
//                                                 {/* Online Dot Mock */}
//                                                 {/* <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div> */}
//                                             </div>
//                                             <div>
//                                                 <div className="flex items-center gap-1.5">
//                                                     <span className="text-sm font-semibold text-gray-900 dark:text-white">{request.user.name}</span>
//                                                     <Badge variant={getPlanVariant(request.user.planType)} className="text-[10px] py-0 px-1.5 h-5 rounded-md font-medium border-0">
//                                                         {request.user.planType}
//                                                     </Badge>
//                                                 </div>
//                                                 <div className="text-xs text-gray-500 dark:text-gray-400">{request.user.email}</div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <span className="text-sm font-semibold text-gray-900 dark:text-white">{request.companyName}</span>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <span className="text-sm font-semibold text-gray-900 dark:text-white">{request.deviceCount}</span>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <span className="text-sm font-semibold text-gray-900 dark:text-white">{request.storage}</span>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <span className="text-sm font-semibold text-gray-900 dark:text-white">{request.estimatedBudget}</span>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <div className={cn("inline-flex items-center justify-center rounded-full px-3 py-0.5 font-medium text-xs border", getStatusBadgeStyles(request.status))}>
//                                             {request.status}
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
//                                         <DropdownMenu>
//                                             <DropdownMenuTrigger asChild>
//                                                 {request.assignedTo ? (
//                                                     <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-white dark:bg-gray-800 w-fit hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//                                                         <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
//                                                             <img src={`https://ui-avatars.com/api/?name=${request.assignedTo}&background=random`} alt={request.assignedTo} className="w-full h-full object-cover" />
//                                                         </div>
//                                                         <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{request.assignedTo}</span>
//                                                         <ChevronDown className="w-3 h-3 text-gray-400" />
//                                                     </button>
//                                                 ) : (
//                                                     <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
//                                                         <span className="text-lg leading-none">+</span> Assign
//                                                     </button>
//                                                 )}
//                                             </DropdownMenuTrigger>
//                                             <DropdownMenuContent align="start" className="w-[160px]">
//                                                 {availableEmployees.map((employee) => (
//                                                     <DropdownMenuItem
//                                                         key={employee}
//                                                         onClick={() => handleAssign(request, employee)}
//                                                         className="gap-2"
//                                                     >
//                                                         <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
//                                                             <img src={`https://ui-avatars.com/api/?name=${employee}&background=random`} alt={employee} className="w-full h-full object-cover" />
//                                                         </div>
//                                                         <span>{employee}</span>
//                                                     </DropdownMenuItem>
//                                                 ))}
//                                             </DropdownMenuContent>
//                                         </DropdownMenu>
//                                     </td>
//                                     <td className="px-6 py-4 text-right">
//                                         <div className="flex items-center justify-end gap-2">
//                                             <button
//                                                 onClick={(e) => handleViewDetails(request, e)}
//                                                 className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//                                             >
//                                                 <Eye className="w-4 h-4" />
//                                             </button>
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
//                                                     <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
//                                                         <MoreVertical className="w-4 h-4" />
//                                                     </button>
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent align="end" className="w-48">
//                                                     <DropdownMenuItem onClick={(e) => handleDeleteClick(request, e as any)} className="text-red-600 dark:text-red-400">
//                                                         Delete
//                                                     </DropdownMenuItem>
//                                                     <div className="border-t border-border my-1"></div>
//                                                     <div className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
//                                                         Change Status
//                                                     </div>
//                                                     {['Open', 'Negotiating', 'Won', 'Lost'].map((status) => (
//                                                         <DropdownMenuItem
//                                                             key={status}
//                                                             onClick={(e) => handleStatusChange(request, status, e as any)}
//                                                             disabled={request.status === status}
//                                                         >
//                                                             {status}
//                                                         </DropdownMenuItem>
//                                                     ))}
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 {/* Pagination */}
//                 <div className="p-4 border-t border-border flex justify-between items-center bg-navbarBg">
//                     <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Showing {Math.min(startIndex + 1, filteredRequests.length)} of {filteredRequests.length} requests
//                     </div>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                             disabled={currentPage === 1}
//                             className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-customShadow disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Previous
//                         </button>
//                         <button
//                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                             disabled={currentPage === totalPages || totalPages === 0}
//                             className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-customShadow disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </div>


//             {/* Modals */}
//             <EnterpriseRequestDetailsModal
//                 isOpen={isDetailsModalOpen}
//                 onClose={() => setIsDetailsModalOpen(false)}
//                 request={selectedRequest}
//                 onReply={handleReply}
//                 onApprove={handleApprove}
//             />

//             <DeleteConfirmationModal
//                 isOpen={isDeleteModalOpen}
//                 onClose={() => setIsDeleteModalOpen(false)}
//                 onConfirm={handleDeleteConfirm}
//                 title="Delete Request"
//                 description="Are you sure you want to delete this enterprise request? This action cannot be undone."
//                 itemName={requestToDelete?.companyName}
//             />

//             <SetAssignRulesModal
//                 isOpen={isSettingsModalOpen}
//                 onClose={() => setIsSettingsModalOpen(false)}
//                 onSave={(rules) => {
//                     console.log('Assign rules saved:', rules);
//                     setIsSettingsModalOpen(false);
//                 }}
//             />
//         </div >
//     );
// }


export default function(){
    return(
        <>
            <div className="text-black dark:text-white text-2xl font-semibold">Enterprise requests</div>
        </>
    )
}