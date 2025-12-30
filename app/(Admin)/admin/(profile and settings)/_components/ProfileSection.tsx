'use client';

import React from 'react';
import { Upload, Info } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfileSection() {
    return (
        <div className="space-y-6">
            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-blue-50/30 dark:bg-blue-900/10">
                    <h2 className="text-lg font-semibold text-headings">Personal Information</h2>
                    <button className="bg-bgBlue hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-customShadow cursor-pointer">
                        Save
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Profile Photo */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Label className="w-32 text-sm font-medium text-headings shrink-0">Profile Photo</Label>
                        <div className="flex items-center gap-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border shadow-sm">
                                <Image
                                    src="/images/profile-settings.png"
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                    sizes="100px"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-center border-2 border-dashed border-border rounded-xl p-6 bg-white dark:bg-gray-800 hover:border-bgBlue transition-colors cursor-pointer group">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                                            <Upload className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <p className="text-sm">
                                            <span className="text-bgBlue font-medium">Click to Upload</span>
                                            <span className="text-muted"> or drag and drop</span>
                                        </p>
                                        <p className="text-xs text-muted uppercase">SVG, PNG, or JPG (Max 800 × 800px)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-8 space-y-6">
                        {/* Name */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Label className="w-32 text-sm font-medium text-headings shrink-0">Name</Label>
                            <Input
                                type="text"
                                placeholder="Robert"
                                className="flex-1 max-w-2xl bg-input border-border text-headings h-11"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Label className="w-32 text-sm font-medium text-headings shrink-0">Email</Label>
                            <div className="flex-1 max-w-2xl relative">
                                <Input
                                    type="email"
                                    placeholder="jacob@tape.io"
                                    className="w-full bg-input border-border text-headings h-11 pr-10"
                                />
                                <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted cursor-pointer hover:text-bgBlue" />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Label className="w-32 text-sm font-medium text-headings shrink-0">Role</Label>
                            <div className="flex-1">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-100">
                                    Super Admin
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
