'use client';

import React from 'react';
import BaseSelect from '@/common/BaseSelect';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function PreferencesSection() {
    const dateFormatOptions = [
        { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
        { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
        { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
    ];

    const timeFormatOptions = [
        { label: '12 Hour', value: '12h' },
        { label: '24 Hour', value: '24h' },
    ];

    const languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
    ];

    return (
        <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-[#F0FAFF] dark:bg-blue-900/10">
                    <h2 className="text-lg font-semibold text-headings">Notifications</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="text-sm font-semibold text-headings">Email Notifications</Label>
                            <p className="text-sm text-body">Receive system alerts via email</p>
                        </div>
                        <Switch defaultChecked className="cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                        <div className="space-y-1">
                            <Label className="text-sm font-semibold text-headings">Push Notifications</Label>
                            <p className="text-sm text-body">Browser push notifications</p>
                        </div>
                        <Switch defaultChecked className="cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Format */}
            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-[#F0FAFF] dark:bg-blue-900/10">
                    <h2 className="text-lg font-semibold text-headings">Format</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <Label className="text-sm font-semibold text-headings">Date Format</Label>
                        <BaseSelect
                            options={dateFormatOptions}
                            value="MM/DD/YYYY"
                            showLabel={false}
                            className="max-w-md"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-6 border-t border-border">
                        <Label className="text-sm font-semibold text-headings">Time Format</Label>
                        <BaseSelect
                            options={timeFormatOptions}
                            value="12h"
                            showLabel={false}
                            className="max-w-md"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-6 border-t border-border">
                        <Label className="text-sm font-semibold text-headings">Language</Label>
                        <BaseSelect
                            options={languageOptions}
                            value="en"
                            showLabel={false}
                            className="max-w-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
