'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Eye } from 'lucide-react';
import BannerStats from '@/components/Admin/support/Banner/BannerStats';
import BannerTable from '@/components/Admin/support/Banner/BannerTable';

export default function BannerPage() {
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <span>Customer Supports</span>
                        <span>&gt;</span>
                        <span className="text-blue-500 font-medium">Banner</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
                    <p className="text-gray-500 mt-1">Manage banner on the home page to advertise new features/promotionis.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" />
                        View Reports
                    </button>
                    <Link
                        href="/admin/support/banner/create"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Create
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <BannerStats />

            {/* Banner Table */}
            <BannerTable />
        </div>
    );
}
