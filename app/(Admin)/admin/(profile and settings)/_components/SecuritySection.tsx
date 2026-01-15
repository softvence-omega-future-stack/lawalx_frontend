'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Monitor, MoreVertical, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import BaseDialog from '@/common/BaseDialog';

export default function SecuritySection() {
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [verifyModalOpen, setVerifyModalOpen] = useState(false);
    const [addEmailModalOpen, setAddEmailModalOpen] = useState(false);

    const sessions = [
        { id: 1, device: 'Chrome on Windows', location: 'New York, NY • 192.168.1.100', status: 'Current', current: true },
        { id: 2, device: 'Chrome on Windows', location: 'New York, NY • 192.168.1.100', status: '2 hours ago', current: false },
        { id: 3, device: 'Chrome on Windows', location: 'New York, NY • 192.168.1.100', status: '2 hours ago', current: false },
    ];

    return (
        <div className="space-y-6">
            {/* Password Change */}
            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-[#F0FAFF] dark:bg-blue-900/10">
                    <h2 className="text-lg font-semibold text-headings">Password</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <Label className="text-sm font-medium text-headings">Type Old Password</Label>
                        <div className="relative">
                            <Input
                                type={showOldPass ? 'text' : 'password'}
                                placeholder="••••••••••••••••"
                                className="bg-input border-border text-headings pr-10 h-11"
                            />
                            <button
                                onClick={() => setShowOldPass(!showOldPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-headings cursor-pointer"
                            >
                                {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <Label className="text-sm font-medium text-headings">Type New Password</Label>
                        <div className="relative">
                            <Input
                                type={showNewPass ? 'text' : 'password'}
                                placeholder="••••••••••••••••"
                                className="bg-input border-border text-headings pr-10 h-11"
                            />
                            <button
                                onClick={() => setShowNewPass(!showNewPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-headings cursor-pointer"
                            >
                                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <Label className="text-sm font-medium text-headings">Retype New Password</Label>
                        <div className="relative">
                            <Input
                                type={showConfirmPass ? 'text' : 'password'}
                                placeholder="••••••••••••••••"
                                className="bg-input border-border text-headings pr-10 h-11"
                            />
                            <button
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-headings cursor-pointer"
                            >
                                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button className="bg-bgBlue hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-customShadow cursor-pointer">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-[#F0FAFF] dark:bg-blue-900/10">
                    <h2 className="text-lg font-semibold text-headings">Two-Factor Authentication</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="text-sm font-semibold text-headings">Enable 2-FA</Label>
                            <p className="text-sm text-muted">Add an extra layer of security to your account</p>
                        </div>
                        <Switch defaultChecked className="cursor-pointer" />
                    </div>
                    <div className="pt-6 border-t border-border flex items-center justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                            <Label className="text-sm font-medium text-headings w-24">2-FA Email</Label>
                            <div className="flex-1 max-w-md relative">
                                <Input
                                    disabled
                                    value="******al@gmail.com"
                                    className="bg-input/50 border-border text-muted h-11 pr-10"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-headings cursor-pointer">
                                    <Eye className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={() => setVerifyModalOpen(true)}
                                className="bg-bgBlue hover:bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Notifications */}
            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-[#F0FAFF] dark:bg-blue-900/10">
                    <h2 className="text-lg font-semibold text-headings">Security Notifications</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="text-sm font-semibold text-headings">Login Notifications</Label>
                            <p className="text-sm text-muted">Receive system alerts via email</p>
                        </div>
                        <Switch defaultChecked className="cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-[#F0FAFF] dark:bg-blue-900/10">
                    <h2 className="text-lg font-semibold text-headings">Active Sessions</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-3">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${session.current
                                        ? 'border-bgBlue/30 bg-[#F0FAFF]'
                                        : 'border-border bg-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${session.current ? 'bg-bgBlue/10 text-bgBlue' : 'bg-gray-100 text-muted dark:bg-gray-800'}`}>
                                        <Monitor className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-semibold text-headings">{session.device}</p>
                                        <p className="text-xs text-muted">{session.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {session.current ? (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                                            Current
                                        </span>
                                    ) : (
                                        <>
                                            <span className="text-xs text-muted">{session.status}</span>
                                            <button className="bg-white dark:bg-gray-800 border border-borderGray text-red-500 hover:bg-red-50 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                                                End Session
                                            </button>
                                        </>
                                    )}
                                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer text-muted">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-2">
                        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-all shadow-lg shadow-red-500/10 flex items-center justify-center gap-2 cursor-pointer">
                            <LogOut className="w-4 h-4" />
                            End All Other Sessions
                        </button>
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            <BaseDialog
                open={verifyModalOpen}
                setOpen={setVerifyModalOpen}
                title="Verification Code Sent"
                description="A verification code has been sent to jacob@tape.io. Please check your inbox."
                maxWidth="md"
            >
                <div className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-headings">6-Digit Code</Label>
                        <div className="flex justify-between gap-2">
                            <Input
                                placeholder="123 - 342"
                                className="bg-input border-border text-center text-lg tracking-widest h-12"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setVerifyModalOpen(false)}
                            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-headings hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                        >
                            Resend
                        </button>
                        <button
                            onClick={() => {
                                setVerifyModalOpen(false);
                                setAddEmailModalOpen(true);
                            }}
                            className="flex-1 bg-bgBlue hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium shadow-customShadow transition-colors cursor-pointer"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </BaseDialog>

            <BaseDialog
                open={addEmailModalOpen}
                setOpen={setAddEmailModalOpen}
                title="Add 2-FA Email"
                description="Type an email that will receive the verification code when you attempt to login."
                maxWidth="md"
            >
                <div className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-headings">Type Verification Email</Label>
                            <Input
                                type="email"
                                placeholder="jacob@tape.io"
                                className="bg-input border-border h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-headings">Retype Verification Email</Label>
                            <Input
                                type="email"
                                placeholder="jacob@tape.io"
                                className="bg-input border-border h-11"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row gap-3">
                        <button
                            onClick={() => setAddEmailModalOpen(false)}
                            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-headings hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setAddEmailModalOpen(false)}
                            className="flex-1 bg-bgBlue hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium shadow-customShadow transition-colors cursor-pointer"
                        >
                            Add Email
                        </button>
                    </div>
                </div>
            </BaseDialog>
        </div>
    );
}
