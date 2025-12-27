'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, HelpCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
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

export interface VideoTutorialData {
    id?: string;
    title: string;
    description?: string;
    videoType: 'Upload' | 'Link';
    videoSource: string; // URL or File name mockup
    category: string;
    status: 'Draft' | 'Published';
}

interface CreateVideoTutorialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: VideoTutorialData) => void;
    initialData?: VideoTutorialData | null;
}

const CATEGORIES = [
    'Device Management',
    'Content & Playlists',
    'Schedule',
    'Billing & Subscriptions'
];

export default function CreateVideoTutorialModal({ isOpen, onClose, onSave, initialData }: CreateVideoTutorialModalProps) {
    const [title, setTitle] = useState('');
    const [videoType, setVideoType] = useState<'Upload' | 'Link'>('Upload');
    const [videoLink, setVideoLink] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');
    // Mock file upload state
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title);
                setVideoType(initialData.videoType);
                if (initialData.videoType === 'Link') {
                    setVideoLink(initialData.videoSource);
                } else {
                    setFileName(initialData.videoSource);
                }
                setCategory(initialData.category);
                setStatus(initialData.status);
            } else {
                setTitle('');
                setVideoType('Upload');
                setVideoLink('');
                setFileName('');
                setCategory('');
                setStatus('Draft');
            }
        }
    }, [isOpen, initialData]);

    const handleSave = (publish = false) => {
        onSave({
            id: initialData?.id,
            title,
            videoType,
            videoSource: videoType === 'Link' ? videoLink : fileName || 'video_placeholder.mp4',
            category,
            status: publish ? 'Published' : status
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
                            {initialData ? 'Edit Video Tutorial' : 'Create Video Tutorial'}
                        </DialogTitle>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., How to setup device"
                                className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border"
                            />
                        </div>

                        {/* Video Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Video Type
                            </label>
                            <Select value={videoType} onValueChange={(val: 'Upload' | 'Link') => setVideoType(val)}>
                                <SelectTrigger className="w-full h-11 rounded-xl bg-white dark:bg-gray-800 border-border">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Upload">Upload</SelectItem>
                                    <SelectItem value="Link">Embedded Link</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Video Source Input */}
                        {videoType === 'Link' ? (
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Video Link
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-sm">
                                        https://
                                    </div>
                                    <input
                                        type="text"
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}
                                        placeholder="tape.io/video/123"
                                        className="w-full h-11 pl-16 pr-10 text-sm bg-white dark:bg-gray-800 border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <HelpCircle className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Upload Video
                                </label>
                                <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="w-10 h-10 mb-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Click to Upload <span className="text-gray-500 dark:text-gray-400 font-normal">or drag and drop</span></p>
                                    <p className="text-xs text-gray-400">SVG, PNG, or JPG (Max 800 x 800px)</p>
                                    {fileName && <p className="mt-2 text-sm text-green-600 font-medium">{fileName}</p>}
                                </div>
                            </div>
                        )}

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
                                    setStatus('Draft');
                                    handleSave(false);
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                className="rounded-xl h-11 px-6 font-bold bg-bgBlue hover:bg-blue-600 text-white shadow-customShadow"
                                onClick={() => handleSave(true)}
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
