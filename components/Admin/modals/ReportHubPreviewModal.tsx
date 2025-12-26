'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ReportHubPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportData?: {
        title: string;
        description: string;
        dataSource: string;
        columns: number;
        rows: number;
        data: Array<{
            id: string;
            name: string;
            status: string;
            location: string;
            lastSync: string;
        }>;
    };
}

export default function ReportHubPreviewModal({
    isOpen,
    onClose,
    reportData = {
        title: "Q4 Offline Enterprise Devices",
        description: "Tracks offline devices for enterprise customers",
        dataSource: "Device Data",
        columns: 5,
        rows: 18,
        data: Array(18).fill(null).map((_, i) => ({
            id: `DEV-${1000 + i}`,
            name: `Device ${i + 1}`,
            status: "Active",
            location: "New York",
            lastSync: "1 hours ago"
        }))
    }
}: ReportHubPreviewModalProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Reset page to 1 whenever modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentPage(1);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const displayData = reportData || {
        title: "Q4 Offline Enterprise Devices",
        description: "Tracks offline devices for enterprise customers",
        dataSource: "Device Data",
        columns: 5,
        rows: 18,
        data: Array(18).fill(null).map((_, i) => ({
            id: `DEV-${1000 + i}`,
            name: `Device ${i + 1}`,
            status: "Active",
            location: "New York",
            lastSync: "1 hours ago"
        }))
    };

    const totalPages = Math.ceil((displayData?.data?.length || 0) / itemsPerPage);

    const paginatedData = displayData?.data?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl p-0 bg-white dark:bg-gray-900 border-none rounded-2xl overflow-hidden shadow-2xl focus:outline-none">
                <div className="p-6">
                    <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                {displayData.title}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                                {displayData.description}
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    {/* Summary Box */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 flex items-center justify-between border border-gray-100 dark:border-gray-800">
                        <div className="flex gap-8">
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Data Source:</p>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{displayData.dataSource}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Columns:</p>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{displayData.columns}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Rows:</p>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{displayData.rows}</p>
                            </div>
                        </div>
                        <Button className="bg-bgBlue hover:bg-bgBlue/80 text-white rounded-xl px-6 flex items-center gap-2 shadow-customShadow">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden mb-6 bg-white dark:bg-gray-900">
                        <table className="w-full text-left">
                            <thead className="bg-[#F1FBFF] dark:bg-blue-900/20 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Device ID</th>
                                    <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Name</th>
                                    <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 text-center">Status</th>
                                    <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Location</th>
                                    <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Last Sync</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {paginatedData?.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-4 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">{item.id}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{item.name}</td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-medium rounded-full border border-gray-100 dark:border-gray-700">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{item.location}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{item.lastSync}</td>
                                    </tr>
                                ))}
                                {paginatedData?.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                                            No data available for this report
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, displayData?.data?.length || 0)} of {displayData?.data?.length} results
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                className="h-9 px-4 rounded-xl text-gray-700 dark:text-gray-300 font-bold shadow-customShadow disabled:opacity-30 transition-all hover:bg-gray-50 bg-white dark:bg-gray-900"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-1.5 mx-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setCurrentPage(p)}
                                        className={cn(
                                            "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                                            currentPage === p
                                                ? "bg-blue-500 text-white shadow-customShadow shadow-blue-500/20"
                                                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <Button
                                size="sm"
                                className="h-9 px-4 rounded-xl text-gray-700 dark:text-gray-300 font-bold shadow-customShadow disabled:opacity-30 transition-all hover:bg-gray-50 bg-white dark:bg-gray-900"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50/30 text-gray-600 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <Button className="rounded-xl px-8 font-bold h-11 border border-border text-gray-600 dark:text-gray-400 shadow-customShadow" onClick={onClose}>
                        Close Preview
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
