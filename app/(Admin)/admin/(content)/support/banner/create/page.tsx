'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, LayoutTemplate } from 'lucide-react';
import BannerForm, { BannerFormData } from '@/components/Admin/support/Banner/BannerForm';
import BannerPreview from '@/components/Admin/support/Banner/BannerPreview';

export default function CreateBannerPage() {
    const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom'>('prebuilt');
    const [formData, setFormData] = useState<BannerFormData>({
        bannerType: 'Upload',
        title: '',
        description: '',
        image: null,
        primaryButtonLabel: '',
        primaryButtonLink: '',
        enableSecondaryButton: false,
        secondaryButtonLabel: '',
        secondaryButtonLink: '',
        startDate: '',
        endDate: '',
        targetUserType: 'All Users',
    });

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/admin/support/banner" className="text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Create Banner</h1>
                        <p className="text-sm text-gray-500">Manage banner on the home page to advertise new features/promotionis.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                        Save Draft
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm">
                        Save & Publish
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col p-6">
                {/* Tab Switcher */}
                <div className="bg-white rounded-lg border border-gray-200 p-1 inline-flex mb-6 shrink-0 w-max">
                    <button
                        onClick={() => setActiveTab('prebuilt')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'prebuilt'
                                ? 'bg-blue-50 text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                    >
                        <LayoutTemplate className="w-4 h-4" />
                        Prebuilt Form
                    </button>
                    <button
                        onClick={() => setActiveTab('custom')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'custom'
                                ? 'bg-blue-50 text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                    >
                        <Code className="w-4 h-4" />
                        Custom Code
                    </button>
                </div>

                {/* Form and Preview Split */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-5 h-full overflow-hidden">
                        {activeTab === 'prebuilt' ? (
                            <BannerForm data={formData} onChange={setFormData} />
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex items-center justify-center text-gray-400">
                                Custom Code Editor Implementation
                            </div>
                        )}
                    </div>

                    {/* Right Side: Preview */}
                    <div className="lg:col-span-7 h-full overflow-hidden">
                        <BannerPreview data={formData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
