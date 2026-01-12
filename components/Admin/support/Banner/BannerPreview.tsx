'use client';

import React, { useState } from 'react';
import { Monitor, Smartphone, ExternalLink, ArrowRight } from 'lucide-react';
import { BannerFormData } from './BannerForm';

interface BannerPreviewProps {
    data: BannerFormData;
}

export default function BannerPreview({ data }: BannerPreviewProps) {
    const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Live Preview</h2>
                <p className="text-sm text-gray-500">See how your banner will look to users</p>
            </div>

            <div className="p-6 flex-1 bg-gray-50 flex flex-col items-center">
                {/* Toggle */}
                <div className="flex p-1 bg-white rounded-lg border border-gray-200 mb-8 max-w-md w-full">
                    <button
                        onClick={() => setViewMode('web')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'web' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        <Monitor className="w-4 h-4" />
                        web
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'mobile' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        <Smartphone className="w-4 h-4" />
                        Mobile
                    </button>
                </div>

                {/* Preview Container */}
                <div
                    className={`transition-all duration-300 ease-in-out ${viewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-4xl'
                        }`}
                >
                    {/* The Banner Itself */}
                    <div className="rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-r from-[#005C97] to-[#363795] text-white p-8 group">
                        {/* Content */}
                        <div className={`flex ${viewMode === 'mobile' ? 'flex-col text-center' : 'items-center justify-between'}`}>
                            <div className={`${viewMode === 'mobile' ? 'mb-6' : 'max-w-[60%]'}`}>
                                <h3 className={`font-bold mb-2 ${viewMode === 'mobile' ? 'text-2xl' : 'text-3xl'}`}>
                                    {data.title || 'Your Banner Title'}
                                </h3>
                                <p className={`text-blue-100 mb-6 ${viewMode === 'mobile' ? 'text-sm' : 'text-base'}`}>
                                    {data.description || 'Your banner description goes here.'}
                                </p>

                                <div className={`flex gap-3 ${viewMode === 'mobile' ? 'justify-center flex-col' : 'flex-row'}`}>
                                    <button className="px-6 py-2.5 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                        {data.primaryButtonLabel || 'Get Started'}
                                        {data.primaryButtonLabel && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                    {data.enableSecondaryButton && (
                                        <button className="px-6 py-2.5 bg-blue-800/30 text-white border border-blue-400/30 rounded-lg font-medium hover:bg-blue-800/50 transition-colors backdrop-blur-sm">
                                            {data.secondaryButtonLabel || 'Learn More'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Image Placeholder */}
                            <div className={`${viewMode === 'mobile' ? 'mt-4' : ''}`}>
                                {/* Circle decorative background */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full transform scale-150"></div>
                                    {/* Placeholder generic image if none uploaded */}
                                    <div className="relative z-10 w-48 h-48 bg-white/10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                <div className="w-8 h-8 rounded-full bg-yellow-400"></div>
                                            </div>
                                            <span className="text-xs font-medium text-blue-100">Live Preview</span>
                                        </div>
                                    </div>

                                    {/* Floating Elements (Visual Flair) */}
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-purple-400 rounded-full blur-md opacity-60 animate-bounce"></div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    </div>
                </div>
            </div>
        </div>
    );
}
