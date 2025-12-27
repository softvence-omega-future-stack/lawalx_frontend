'use client';

import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { type SupportTicket } from '@/types/supportTickets';

interface EditTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: SupportTicket | null;
    onSave: (data: any) => void;
}

export default function EditTicketModal({ isOpen, onClose, ticket, onSave }: EditTicketModalProps) {
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        type: 'Device',
        priority: 'Low',
        assign: '',
        adminNote: ''
    });

    useEffect(() => {
        if (ticket) {
            setFormData({
                subject: ticket.subject,
                description: ticket.description,
                type: ticket.type,
                priority: ticket.priority,
                assign: ticket.assignedTo || '',
                adminNote: ''
            });
        }
    }, [ticket]);

    if (!ticket) return null;

    const handleSubmit = () => {
        onSave(formData);
        onClose();
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
            <DialogContent className="max-w-2xl p-0 bg-white dark:bg-gray-900 border-none rounded-2xl overflow-hidden focus:outline-none max-h-[calc(100vh-16rem)] scrollbar-hide overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                <Edit2 className="w-5 h-5 text-blue-500" />
                            </div>
                            <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                                Edit Ticket
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    {/* Read-only Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-navbarBg rounded-lg">
                        <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ticket ID</div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{ticket.ticketId}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Created</div>
                            <div className="text-sm text-gray-900 dark:text-white">{ticket.created}</div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-6 p-4 bg-navbarBg rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                                {ticket.user.name.charAt(0)}
                            </span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{ticket.user.name}</span>
                                <Badge variant={getPlanVariant(ticket.user.planType)} className="text-xs">
                                    {ticket.user.planType}
                                </Badge>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{ticket.user.email}</div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-2 text-sm bg-navbarBg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue dark:text-white"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 text-sm bg-navbarBg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue resize-none dark:text-white"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Type
                            </label>
                            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Device">Device</SelectItem>
                                    <SelectItem value="Sales">Sales</SelectItem>
                                    <SelectItem value="Account">Account</SelectItem>
                                    <SelectItem value="Payment">Payment</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Priority
                            </label>
                            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Assign */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Assign
                            </label>
                            <Select value={formData.assign} onValueChange={(value) => setFormData({ ...formData, assign: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Thompson">Thompson</SelectItem>
                                    <SelectItem value="Emanuel">Emanuel</SelectItem>
                                    <SelectItem value="Lawal">Lawal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Admin Note */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Admin Note
                            </label>
                            <textarea
                                placeholder="Description"
                                value={formData.adminNote}
                                onChange={(e) => setFormData({ ...formData, adminNote: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 text-sm bg-navbarBg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue resize-none dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-6">
                        <Button
                            className="flex-1 rounded-xl h-11 font-medium bg-gray-50 dark:bg-gray-800 border border-border text-gray-700 dark:text-gray-300 shadow-customShadow"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 rounded-xl h-11 font-medium bg-bgBlue hover:bg-bgBlue/80 text-white shadow-customShadow"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
