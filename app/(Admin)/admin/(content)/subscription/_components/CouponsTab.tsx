"use client";

import { useState } from "react";
import { coupons } from "../_data";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BaseSelect from "@/common/BaseSelect";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Search, Edit, Ban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateCouponDialog from "./CreateCouponDialog";

const CouponsTab = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [timeFilter, setTimeFilter] = useState("month");
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

    const filteredCoupons = coupons.filter((coupon) => {
        const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || coupon.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEditClick = (coupon: any) => {
        setSelectedCoupon(coupon);
        setEditModalOpen(true);
    };

    return (
        <div className="">
            {/* Table Component */}
            <div className="rounded-xl border border-border bg-navbarBg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
                    <h2 className="text-headings text-lg font-semibold">Coupon Management</h2>
                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-borderGray dark:border-gray-600 rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 hover:text-bgBlue text-headings transition-all duration-300 ease-in-out"
                    >
                        Create New Coupon
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 md:p-6 bg-navbarBg border-b border-border">
                    {/* Search Input */}
                    <div className="relative w-full md:flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            placeholder="Search by code..."
                            className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 placeholder:text-muted focus-visible:ring-0 focus:outline-none text-body"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="w-[160px]">
                            <BaseSelect
                                placeholder="All Status"
                                options={[
                                    { label: "All Status", value: "all" },
                                    { label: "Active", value: "Active" },
                                    { label: "Expired", value: "Expired" },
                                ]}
                                value={statusFilter}
                                onChange={setStatusFilter}
                                showLabel={false}
                            />
                        </div>
                        <div className="w-[160px]">
                            <BaseSelect
                                placeholder="This Month"
                                options={[
                                    { label: "This Month", value: "month" },
                                    { label: "Last Month", value: "last_month" },
                                ]}
                                value={timeFilter}
                                onChange={setTimeFilter}
                                showLabel={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <Table>
                    <TableHeader className="bg-cardBackground border-b border-border text-body">
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Coupon Cycle</TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Expiry Date</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCoupons.map((coupon) => (
                            <TableRow key={coupon.id}>
                                <TableCell className="font-bold text-headings">{coupon.code}</TableCell>
                                <TableCell className="font-semibold text-headings">{coupon.discount}</TableCell>
                                <TableCell className="text-headings">{coupon.cycle}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3 w-48">
                                        <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-bgBlue rounded-full"
                                                style={{ width: `${(coupon.usage.current / coupon.usage.total) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted font-medium whitespace-nowrap">
                                            {coupon.usage.current} / {coupon.usage.total}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="default"
                                        className={`font-normal border ${coupon.status === "Active"
                                                ? "text-green-600 bg-green-50 border-green-200"
                                                : "text-gray-400 bg-gray-50 border-gray-200"
                                            }`}
                                    >
                                        {coupon.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted">{coupon.expiryDate}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="h-8 w-8 text-muted hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40">
                                            <DropdownMenuItem onClick={() => handleEditClick(coupon)} className="cursor-pointer">
                                                <Edit className="mr-2 h-4 w-4" /> Edit coupon
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                                                <Ban className="mr-2 h-4 w-4" /> Stop Coupon
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 md:p-6 border-t border-border bg-navbarBg">
                    <div className="text-sm text-muted">Showing {filteredCoupons.length} of {coupons.length} coupons</div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-borderGray dark:border-gray-600 rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 hover:text-bgBlue text-headings transition-all duration-300 ease-in-out" disabled>Previous</button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-borderGray dark:border-gray-600 rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 hover:text-bgBlue text-headings transition-all duration-300 ease-in-out">Next</button>
                    </div>
                </div>
            </div>

            <CreateCouponDialog
                open={createModalOpen}
                setOpen={setCreateModalOpen}
            />

            <CreateCouponDialog
                open={editModalOpen}
                setOpen={setEditModalOpen}
                editMode={true}
                initialData={selectedCoupon}
            />
        </div>
    );
};

export default CouponsTab;
