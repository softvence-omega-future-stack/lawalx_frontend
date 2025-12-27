'use client';

import React, { useState } from 'react';
import { X, Search, Crown } from 'lucide-react';
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
import { mockUsers, type TicketUser } from '@/types/supportTickets';
import { Badge } from '@/components/ui/badge';

interface CreateTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

export default function CreateTicketModal({ isOpen, onClose, onSave }: CreateTicketModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [selectedUser, setSelectedUser] = useState<TicketUser | null>(null);
    const [formData, setFormData] = useState({
        type: 'Device',
        subject: '',
        note: '',
        priority: 'Low',
        assign: ''
    });

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserSelect = (user: TicketUser) => {
        setSelectedUser(user);
        setSearchQuery('');
        setShowUserDropdown(false);
    };

    const handleRemoveUser = () => {
        setSelectedUser(null);
        setSearchQuery('');
    };

    const handleSubmit = () => {
        if (selectedUser && formData.subject && formData.note) {
            onSave({
                customer: selectedUser,
                ...formData
            });
            // Reset form
            setSelectedUser(null);
            setFormData({
                type: 'Device',
                subject: '',
                note: '',
                priority: 'Low',
                assign: ''
            });
            onClose();
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
            <DialogContent className="max-w-md p-0 bg-white dark:bg-gray-900 border-none rounded-2xl overflow-hidden focus:outline-none">
                <div className="p-6">
                    {/* Header */}
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                <Crown className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                                    Create New Ticket
                                </DialogTitle>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    Create a new ticket to provide support to your customer
                                </p>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Customer Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Customer
                            </label>
                            <div className="relative">
                                {selectedUser ? (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-border rounded-lg">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                {selectedUser.name.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-900 dark:text-white flex-1">
                                            {selectedUser.name}
                                        </span>
                                        <button
                                            onClick={handleRemoveUser}
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                        >
                                            <X className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Simmons"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                    setShowUserDropdown(true);
                                                }}
                                                onFocus={() => setShowUserDropdown(true)}
                                                className="w-full pl-10 pr-4 py-2 text-sm bg-navbarBg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue dark:text-white"
                                            />
                                        </div>
                                        {showUserDropdown && searchQuery && (
                                            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                <div className="p-2 border-b border-border">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Dropdown</p>
                                                </div>
                                                {filteredUsers.map((user) => (
                                                    <button
                                                        key={user.id}
                                                        onClick={() => handleUserSelect(user)}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                                {user.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-gray-400 dark:text-gray-500">
                                                            {user.id}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
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

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                placeholder="Business"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-2 text-sm bg-navbarBg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue dark:text-white"
                            />
                        </div>

                        {/* Note */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Note
                            </label>
                            <textarea
                                placeholder="Description"
                                value={formData.note}
                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 text-sm bg-navbarBg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue resize-none dark:text-white"
                            />
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
                            disabled={!selectedUser || !formData.subject || !formData.note}
                        >
                            Create Ticket
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
