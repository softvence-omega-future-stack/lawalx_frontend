"use client";

import React, { useState } from "react";
import { subscribers } from "../_data";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import BaseSelect from "@/common/BaseSelect";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Use shadcn dropdown
import { MoreVertical, MoreHorizontal, Eye, FileText, XCircle, ArrowUpCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SubscribersTab = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [planFilter, setPlanFilter] = useState("all");

    const filteredSubscribers = subscribers.filter((sub) => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPlan = planFilter === "all" || sub.plan.toLowerCase() === planFilter.toLowerCase();
        return matchesSearch && matchesPlan;
    });

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-navbarBg p-4 rounded-xl border border-border">

                {/* Search Input */}
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                        placeholder="Search by name, email, or user ID..."
                        className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 placeholder:text-muted focus-visible:ring-0 focus:outline-none text-body"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Plan Filter */}
                <div className="w-full md:w-48 shrink-0">
                    <BaseSelect
                        placeholder="All Plans"
                        options={[
                            { label: "All Plans", value: "all" },
                            { label: "Starter", value: "starter" },
                            { label: "Professional", value: "professional" },
                            { label: "Business", value: "business" },
                        ]}
                        value={planFilter}
                        onChange={setPlanFilter}
                        showLabel={false}
                        className="w-full"
                    />
                </div>

            </div>


            {/* Table */}
            <div className="rounded-xl border border-border bg-navbarBg overflow-hidden">
                <div className="p-4 md:p-6 border-b border-border font-semibold text-lg text-headings">All Users ({subscribers.length})</div>
                <Table>
                    <TableHeader className="bg-cardBackground border-b border-border text-body">
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Cycle</TableHead>
                            <TableHead>Next Billing</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSubscribers.map((sub) => (
                            <TableRow key={sub.id}>
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-headings">{sub.name}</div>
                                        <div className="text-sm text-muted">{sub.email}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="default" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none font-normal">
                                        {sub.plan}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-semibold text-headings">{sub.amount}</TableCell>
                                <TableCell className="text-headings">{sub.paymentCycle === "Monthly" ? "Monthly" : "Yearly"}</TableCell>
                                <TableCell className="text-muted">{sub.nextBilling}</TableCell>
                                <TableCell className="font-semibold text-headings">{sub.revenue}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" className="h-8 w-8 text-muted hover:bg-gray-100">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <FileText className="mr-2 h-4 w-4" /> View Invoices
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <ArrowUpCircle className="mr-2 h-4 w-4" /> Change Plan
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                                <XCircle className="mr-2 h-4 w-4" /> Cancel Plan
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* Pagination */}
                <div className="flex items-center justify-between p-4 md:p-6 border-t">
                    <div className="text-sm text-muted">Showing {filteredSubscribers.length} of {subscribers.length} users</div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-borderGray dark:border-gray-600 rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 hover:text-bgBlue text-headings transition-all duration-300 ease-in-out" disabled>Previous</button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-borderGray dark:border-gray-600 rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 hover:text-bgBlue text-headings transition-all duration-300 ease-in-out">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscribersTab;
