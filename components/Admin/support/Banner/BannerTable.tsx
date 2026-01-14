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
    case 'Active':
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
    case 'Ended':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case 'Paused':
      return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
    case 'Draft':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Promotion':
      return 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-800';
    case 'Announcement':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    case 'Warning':
      return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-800';
    case 'Published':
      return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800';
    default:
      return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700';
  }
};

export default function BannerTable() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-navbarBg rounded-xl shadow-sm border border-border overflow-hidden">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search devices by name, location, screen, ID"
            className="w-full pl-10 pr-4 py-2 border border-border bg-navbarBg rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border bg-navbarBg rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Status
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-navbarBg border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Title & Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Views/Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                CTR
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-navbarBg divide-y divide-border">
            {banners.map((banner) => (
              <tr key={banner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{banner.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{banner.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(banner.type)}`}
                  >
                    {banner.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {banner.views}
                    {banner.clicks !== '-' && <span className="text-gray-400 dark:text-gray-500 mx-1">/</span>}
                    {banner.clicks !== '-' && banner.clicks}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900 dark:text-white font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-800">
                      {banner.ctr} <TrendingUp className="w-3 h-3 inline ml-1" />
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {banner.startDate} to {banner.endDate}
                      </div>
                      <div className="text-xs">{banner.duration}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(banner.status)}`}
                  >
                    {banner.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
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