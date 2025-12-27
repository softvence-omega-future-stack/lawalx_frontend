'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, CloudUpload } from 'lucide-react';
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
import { cn } from '@/lib/utils';

export interface FAQData {
    id?: string;
    question: string;
    answer: string;
    category: string;
    status: 'Draft' | 'Published';
}

interface CreateFAQModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: FAQData) => void;
    initialData?: FAQData | null;
}

const CATEGORIES = [
    'Device Management',
    'Content & Playlists',
    'Schedule',
    'Billing & Subscriptions'
];

export default function CreateFAQModal({ isOpen, onClose, onSave, initialData }: CreateFAQModalProps) {
    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.question);
                setAnswer(initialData.answer);
                setCategory(initialData.category);
                setStatus(initialData.status);
            } else {
                // Reset form for new entry
                setTitle('');
                setAnswer('');
                setCategory('');
                setStatus('Draft');
            }
        }
    }, [isOpen, initialData]);

    const handleSave = () => {
        onSave({
            id: initialData?.id,
            question: title,
            answer,
            category,
            status
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl p-0 bg-white dark:bg-gray-900 border-none rounded-2xl overflow-hidden focus:outline-none">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            {initialData ? 'Edit FAQ' : 'Create FAQ'}
                        </DialogTitle>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-5">
                        {/* Title / Question */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Question
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Business"
                                className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border"
                            />
                        </div>

                        {/* Answer */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Answer
                            </label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter your answer here..."
                                className="w-full h-32 p-4 text-sm bg-white dark:bg-gray-800 border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border resize-none"
                            />
                        </div>

                        {/* Category & Status Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Category
                                </label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="w-full h-11 rounded-xl bg-white dark:bg-gray-800 border-border">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Status
                                </label>
                                <Select value={status} onValueChange={(val: 'Draft' | 'Published') => setStatus(val)}>
                                    <SelectTrigger className="w-full h-11 rounded-xl bg-white dark:bg-gray-800 border-border">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                        <SelectItem value="Published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-8">
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
                                onClick={() => {
                                    /* Save as Draft logic if separated, currently maps to same onSave but with Draft status if handled */
                                    setStatus('Draft');
                                    handleSave();
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                className="rounded-xl h-11 px-6 font-bold bg-bgBlue hover:bg-blue-600 text-white shadow-customShadow"
                                onClick={() => {
                                    setStatus('Published');
                                    // Need to execute save with 'Published' status, but state update is async. 
                                    // Better to pass explicit status to save function or rely on current state if user selected "Published" in dropdown.
                                    // For this button specifically "Publish", we should probably force status to Published.
                                    onSave({
                                        id: initialData?.id,
                                        question: title,
                                        answer,
                                        category,
                                        status: 'Published'
                                    });
                                    onClose();
                                }}
                            >
                                Publish
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
