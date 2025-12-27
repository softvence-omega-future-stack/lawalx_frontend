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

interface EnterpriseRequest {
    id: string;
    user: {
        name: string;
        email: string;
        avatar?: string;
        planType: 'Trial' | 'Pro' | 'Enterprise';
    };
    companyName: string;
    deviceCount: number;
    storage: string;
    estimatedBudget: string;
    status: 'Open' | 'Negotiating' | 'Won' | 'Lost';
    industryType: string;
    website: string;
    location: string;
    requestDate: string;
    conversionDate?: string;
    handledBy?: string;
    additionalRequirements: string;
}

interface EnterpriseRequestDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: EnterpriseRequest | null;
    onReply?: () => void;
    onApprove?: () => void;
}

export default function EnterpriseRequestDetailsModal({ isOpen, onClose, request, onReply, onApprove }: EnterpriseRequestDetailsModalProps) {
    if (!request) return null;

    const getPlanVariant = (planType: string): "guest" | "trial" | "pro" | "enterprise" => {
        switch (planType) {
            case 'Trial': return 'trial';
            case 'Pro': return 'pro';
            case 'Enterprise': return 'enterprise';
            default: return 'guest';
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            case 'Negotiating': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Won': return 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            case 'Lost': return 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl p-0 bg-white dark:bg-gray-900 border-none rounded-2xl overflow-hidden focus:outline-none">
                <div className="p-6">
                    {/* Header */}
                    <DialogHeader className="mb-6 flex flex-row items-center justify-between">
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            Enterprise Request
                        </DialogTitle>
                    </DialogHeader>

                    {/* Content */}
                    <div className="space-y-8">
                        {/* User Info & Main Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                            {/* User Profile */}
                            <div className="flex items-center gap-3 col-span-1 md:col-span-2 mb-2">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    {request.user.avatar ? (
                                        <img src={request.user.avatar} alt={request.user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-lg font-medium text-gray-600 dark:text-gray-300">
                                            {request.user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base font-bold text-gray-900 dark:text-white">{request.user.name}</span>
                                        <Badge variant={getPlanVariant(request.user.planType)} className="text-[10px] px-1.5 py-0 rounded-md">
                                            {request.user.planType}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{request.user.email}</div>
                                </div>
                            </div>

                            {/* Company Name */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Company Name</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">{request.companyName}</div>
                            </div>

                            {/* Industry Type */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Industry Type</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{request.industryType}</div>
                            </div>

                            {/* Device */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Device</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">{request.deviceCount}</div>
                            </div>

                            {/* Storage */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Storage</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">{request.storage}</div>
                            </div>

                            {/* Estimated Budget */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Estimated Budget Per Year</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">{request.estimatedBudget.replace('/month', '')}</div>
                            </div>

                            {/* Website */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Website</div>
                                <a href={request.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 dark:text-white hover:underline truncate block">
                                    {request.website}
                                </a>
                            </div>

                            {/* Location */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{request.location}</div>
                            </div>

                            {/* Request Date */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Request Date</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{request.requestDate}</div>
                            </div>

                            {/* Status */}
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</div>
                                <div className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border border-transparent ${getStatusVariant(request.status)}`}>
                                    {request.status}
                                </div>
                            </div>

                            {/* Handled By */}
                            {request.handledBy && (
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Handled By</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">
                                                {request.handledBy.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{request.handledBy}</span>
                                    </div>
                                </div>
                            )}

                            {/* Conversion Date */}
                            {request.conversionDate && (
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversion Date</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{request.conversionDate}</div>
                                </div>
                            )}

                        </div>

                        {/* Additional Requirements */}
                        <div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Additional Requirements & Comments
                            </div>
                            <div className="p-4 rounded-xl border border-border bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300 leading-relaxed min-h-[120px]">
                                {request.additionalRequirements}
                            </div>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 mt-8">
                        <Button
                            variant="outline"
                            className="rounded-xl h-11 px-6 font-semibold border-border text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <div className="flex items-center gap-3">
                            <Button
                            variant="outline"
                            className="rounded-xl h-11 px-6 font-bold border-border text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm"
                            onClick={onReply}
                        >
                            Reply & Create a Ticket
                        </Button>
                        <Button
                            className="rounded-xl h-11 px-6 font-bold bg-bgBlue hover:bg-blue-600 text-white shadow-customShadow"
                            onClick={onApprove}
                        >
                            Approve
                        </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
