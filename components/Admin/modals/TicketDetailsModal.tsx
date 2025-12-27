'use client';

import React from 'react';
import { X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { type SupportTicket } from '@/types/supportTickets';

interface TicketDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: SupportTicket | null;
}

export default function TicketDetailsModal({ isOpen, onClose, ticket }: TicketDetailsModalProps) {
    if (!ticket) return null;

    const getPriorityVariant = (priority: string): "default" | "warning" | "error" => {
        switch (priority) {
            case 'Low': return 'default';
            case 'Medium': return 'warning';
            case 'High': return 'error';
            default: return 'default';
        }
    };

    const getStatusVariant = (status: string): "default" | "info" | "success" => {
        switch (status) {
            case 'Open': return 'default';
            case 'In Progress': return 'info';
            case 'Completed': return 'success';
            default: return 'default';
        }
    };

    const getPlanVariant = (planType: string): "guest" | "trial" | "pro" | "enterprise" => {
        switch (planType) {
            case 'Guest': return 'guest';
            case 'Trial': return 'trial';
            case 'Pro': return 'pro';
            case 'Enterprise': return 'enterprise';
            default: return 'guest';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl p-0 bg-white dark:bg-gray-900 border-none rounded-2xl overflow-hidden focus:outline-none">
                <div className="p-6">
                    {/* Header */}
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                            Support Ticket Details
                        </DialogTitle>
                    </DialogHeader>

                    {/* Ticket Info */}
                    <div className="space-y-6">
                        {/* Top Section */}
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ticket ID</div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">{ticket.ticketId}</div>
                                    </div>
                                    <div className="h-8 w-px bg-border"></div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Type</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{ticket.type}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Created</div>
                                <div className="text-sm text-gray-900 dark:text-white">{ticket.created}</div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                                        {ticket.user.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{ticket.user.name}</span>
                                        <Badge variant={getPlanVariant(ticket.user.planType)} className="text-xs">
                                            {ticket.user.planType}
                                        </Badge>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{ticket.user.email}</div>
                                </div>
                            </div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex items-center gap-3">
                            <Badge variant={getPriorityVariant(ticket.priority)} className="text-sm px-3 py-1">
                                {ticket.priority} Priority
                            </Badge>
                            <Badge variant={getStatusVariant(ticket.status)} className="text-sm px-3 py-1">
                                {ticket.status}
                            </Badge>
                        </div>

                        {/* Assigned To */}
                        {ticket.assignedTo && (
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Assigned to</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                            {ticket.assignedTo.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{ticket.assignedTo}</span>
                                </div>
                            </div>
                        )}

                        {/* Subject */}
                        <div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                                {ticket.subject}
                            </h3>
                        </div>

                        {/* Description */}
                        <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                ISSUE DESCRIPTION
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-border">
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {ticket.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-6">
                        <Button
                            className="flex-1 rounded-xl h-11 font-medium bg-gray-50 dark:bg-gray-800 border border-border text-gray-700 dark:text-gray-300 shadow-customShadow"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            className="flex-1 rounded-xl h-11 font-medium bg-gray-50 dark:bg-gray-800 border border-border text-gray-700 dark:text-gray-300 shadow-customShadow"
                        >
                            Mark as Resolved
                        </Button>
                        <Button
                            className="flex-1 rounded-xl h-11 font-medium bg-bgBlue hover:bg-bgBlue/80 text-white shadow-customShadow"
                        >
                            Reply to Ticket
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
