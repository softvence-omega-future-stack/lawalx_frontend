'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, MoreVertical, TrendingUp } from 'lucide-react';

const banners = [
    {
        id: 1,
        title: 'Download Our Mobile App',
        description: 'Get the Tape mobile app for iOS and Android.',
        type: 'Promotion',
        views: '12,450',
        clicks: '1,856',
        ctr: '14%',
        startDate: '19th Jan',
        endDate: '21 Feb',
        duration: '33 days',
        status: 'Active',
    },
    {
        id: 2,
        title: 'New Feature: Advanced Analytics',
        description: 'Check out our new advanced analytics dashboard',
        type: 'Announcement',
        views: '39',
        clicks: '-',
        ctr: '14%',
        startDate: '19th Jan',
        endDate: '21 Feb',
        duration: '33 days',
        status: 'Ended',
    },
    {
        id: 3,
        title: 'How do I reset my password?',
        description: 'Check out our new advanced analytics dashboard',
        type: 'Promotion',
        views: '21',
        clicks: '-',
        ctr: '14%',
        startDate: '19th Jan',
        endDate: '21 Feb',
        duration: '33 days',
        status: 'Paused',
    },
    {
        id: 4,
        title: 'How do I reset my password?',
        description: 'To reset your password, click on "Forgot Password" on the login page and follow the instructions sent to your email.',
        type: 'Warning',
        views: '37',
        clicks: '-',
        ctr: '14%',
        startDate: '19th Jan',
        endDate: '21 Feb',
        duration: '33 days',
        status: 'Draft',
    },
    {
        id: 5,
        title: 'How do I reset my password?',
        description: 'To reset your password, click on "Forgot Password" on the login page and follow the instructions sent to your email.',
        type: 'Published',
        views: '6',
        clicks: '-',
        ctr: '14%',
        startDate: '19th Jan',
        endDate: '21 Feb',
        duration: '33 days',
        status: 'Active',
    },
    {
        id: 6,
        title: 'How do I reset my password?',
        description: 'To reset your password, click on "Forgot Password" on the login page and follow the instructions sent to your email.',
        type: 'Draft',
        views: '16',
        clicks: '-',
        ctr: '14%',
        startDate: '19th Jan',
        endDate: '21 Feb',
        duration: '33 days',
        status: 'Draft',
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Active': return 'bg-green-100 text-green-700 border-green-200';
        case 'Ended': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'Paused': return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
};

const getTypeColor = (type: string) => {
    switch (type) {
        case 'Promotion': return 'bg-purple-50 text-purple-700 border-purple-100';
        case 'Announcement': return 'bg-gray-100 text-gray-700 border-gray-200';
        case 'Warning': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
        case 'Published': return 'bg-blue-50 text-blue-700 border-blue-100';
        default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
}

export default function BannerTable() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Filter Header */}
            <div className="p-4 border-b border-gray-200 flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search devices by name, location, screen, ID"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Status
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title & Description</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Views/Clicks</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CTR</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Period</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {banners.map((banner) => (
                            <tr key={banner.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{banner.title}</div>
                                    <div className="text-sm text-gray-500 mt-1 line-clamp-1">{banner.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(banner.type)}`}>
                                        {banner.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {banner.views}
                                        {banner.clicks !== '-' && <span className="text-gray-400 mx-1">/</span>}
                                        {banner.clicks !== '-' && banner.clicks}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-900 font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">{banner.ctr} <TrendingUp className="w-3 h-3 inline ml-1" /></span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <div>
                                            <div className="font-medium text-gray-900">{banner.startDate} to {banner.endDate}</div>
                                            <div className="text-xs">{banner.duration}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(banner.status)}`}>
                                        {banner.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
