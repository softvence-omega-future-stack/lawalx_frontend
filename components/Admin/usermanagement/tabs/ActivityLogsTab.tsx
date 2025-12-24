"use client";

import React, { useState } from "react";
import { Search, Filter, Clock, LogIn, Edit, Trash, Upload, Download, Shield } from "lucide-react";

const activityData = [
  {
    id: 1,
    action: "User Logged In",
    details: "Logged in from Chrome on MacOS (IP: 192.168.1.1)",
    time: "Today, 10:23 AM",
    type: "Login",
  },
  {
    id: 2,
    action: "Updated Profile",
    details: "Changed contact phone number",
    time: "Today, 09:15 AM",
    type: "Update",
  },
  {
    id: 3,
    action: "Content Uploaded",
    details: "Uploaded 'Summer Campaign 2024.mp4'",
    time: "Yesterday, 4:45 PM",
    type: "Upload",
  },
  {
    id: 4,
    action: "Device Unlinked",
    details: "Removed 'Meeting Room B' display",
    time: "Dec 22, 2024, 2:30 PM",
    type: "Security",
  },
  {
    id: 5,
    action: "Plan Changed",
    details: "Upgraded from Pro to Enterprise",
    time: "Dec 20, 2024, 11:00 AM",
    type: "Billing",
  },
  {
    id: 6,
    action: "User Logged In",
    details: "Logged in from Safari on iPhone",
    time: "Dec 18, 2024, 8:45 AM",
    type: "Login",
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "Login":
      return <LogIn className="w-4 h-4 text-green-600 dark:text-green-400" />;
    case "Update":
      return <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    case "Upload":
      return <Upload className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    case "Security":
      return <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />;
    case "Billing":
      return <Download className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
    default:
      return <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case "Login": return "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
    case "Update": return "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
    case "Upload": return "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800";
    case "Security": return "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800";
    case "Billing": return "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800";
    default: return "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
  }
};

export default function ActivityLogsTab() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = activityData.filter((activity) =>
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Activity History
        </h3>
        <div className="flex gap-3">
            <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors cursor-pointer">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
            Filter Type
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative">
        <div className="absolute left-9 top-8 bottom-8 w-px bg-gray-200 dark:bg-gray-700"></div>
        <div className="space-y-8">
          {filteredData.map((activity) => (
            <div key={activity.id} className="relative flex gap-4">
              <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 pt-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {activity.action}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {activity.details}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Calendar({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    );
}