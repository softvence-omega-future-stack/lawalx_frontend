'use client';

import React from 'react';
import { Upload, HelpCircle, Calendar } from 'lucide-react';

export interface BannerFormData {
    bannerType: string;
    title: string;
    description: string;
    image: string | null;
    primaryButtonLabel: string;
    primaryButtonLink: string;
    enableSecondaryButton: boolean;
    secondaryButtonLabel: string;
    secondaryButtonLink: string;
    startDate: string;
    endDate: string;
    targetUserType: string;
}

interface BannerFormProps {
    data: BannerFormData;
    onChange: (data: BannerFormData) => void;
}

export default function BannerForm({ data, onChange }: BannerFormProps) {
    const handleChange = (field: keyof BannerFormData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Banner Configuration</h2>
            <p className="text-sm text-gray-500 mb-6">Configure your banner content and appearance</p>

            <div className="space-y-6">
                {/* Banner Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner Type</label>
                    <div className="relative">
                        <select
                            value={data.bannerType}
                            onChange={(e) => handleChange('bannerType', e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="Upload">Upload</option>
                            <option value="Announcement">Announcement</option>
                            <option value="Promotion">Promotion</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Download Our Mobile App"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Check out our new advanced analytics dashboard"
                    />
                </div>

                {/* Upload Video/Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video/Image</label>
                    <div className="border-2 border-dashed border-blue-100 bg-blue-50/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-3">
                            <Upload className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-blue-500 mb-1">Click to Upload <span className="text-gray-500 font-normal">or drag and drop</span></p>
                        <p className="text-xs text-gray-400">SVG, PNG, or JPG (Max 800 x 800px)</p>
                    </div>
                </div>

                {/* Primary Button */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Label</label>
                    <input
                        type="text"
                        value={data.primaryButtonLabel}
                        onChange={(e) => handleChange('primaryButtonLabel', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        placeholder="Get Started"
                    />
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">https://</span>
                        <input
                            type="text"
                            value={data.primaryButtonLink}
                            onChange={(e) => handleChange('primaryButtonLink', e.target.value)}
                            className="w-full pl-16 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="tape.io"
                        />
                        <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                </div>

                {/* Secondary Button Toggle */}
                <div className="flex items-center gap-2">
                    <div
                        className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${data.enableSecondaryButton ? 'bg-blue-500' : 'bg-gray-200'}`}
                        onClick={() => handleChange('enableSecondaryButton', !data.enableSecondaryButton)}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${data.enableSecondaryButton ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Enable Secondary Button</span>
                </div>

                {data.enableSecondaryButton && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Label</label>
                        <input
                            type="text"
                            value={data.secondaryButtonLabel}
                            onChange={(e) => handleChange('secondaryButtonLabel', e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                            placeholder="Learn More"
                        />
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">https://</span>
                            <input
                                type="text"
                                value={data.secondaryButtonLink}
                                onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                                className="w-full pl-16 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="tape.io/learn"
                            />
                            <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                    </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={data.startDate}
                                onChange={(e) => handleChange('startDate', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                                placeholder="CEO"
                            />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={data.endDate}
                                onChange={(e) => handleChange('endDate', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                                placeholder="CEO"
                            />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Target User Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target User Type</label>
                    <div className="relative">
                        <select
                            value={data.targetUserType}
                            onChange={(e) => handleChange('targetUserType', e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="All Users">All Users</option>
                            <option value="New Users">New Users</option>
                            <option value="Premium Users">Premium Users</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
