"use client";

import React, { useState, useMemo } from "react";
import { Monitor, FileText, MapPin, Search, Calendar, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// --- Types ---

type ActivityIconType = 'device' | 'content';

interface ActivityLog {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  ipAddress: string;
  deviceName: string;
  time: string; // Display time string
  date: Date;   // Actual date for filtering
  iconType: ActivityIconType;
}

// --- Demo Data ---
// Using specific dates for 2024-12-02 to match the design, and some others for range testing
const activityData: ActivityLog[] = [
  {
    id: 1,
    title: "New Devices added",
    subtitle: "John Doe has added a new device",
    location: "Chicago, IL",
    ipAddress: "192.00.110.11",
    deviceName: "MacBook Air 2025",
    time: "December 2, 2024 at 8:30 AM",
    date: new Date(2024, 11, 2, 8, 30),
    iconType: 'device'
  },
  {
    id: 2,
    title: "Content Uploaded",
    subtitle: "John Doe has uploaded video.mp4",
    location: "Chicago, IL",
    ipAddress: "192.00.110.11",
    deviceName: "MacBook Air 2025",
    time: "December 2, 2024 at 8:30 AM",
    date: new Date(2024, 11, 2, 8, 30),
    iconType: 'content'
  },
  {
    id: 3,
    title: "New Devices added",
    subtitle: "John Doe has added a new device",
    location: "Chicago, IL",
    ipAddress: "192.00.110.11",
    deviceName: "MacBook Air 2025",
    time: "December 2, 2024 at 8:30 AM",
    date: new Date(2024, 11, 2, 8, 30),
    iconType: 'device'
  },
  {
    id: 4,
    title: "System Update",
    subtitle: "Security patch applied to terminal",
    location: "New York, NY",
    ipAddress: "192.168.1.50",
    deviceName: "Dell XPS 15",
    time: "December 5, 2024 at 10:15 AM",
    date: new Date(2024, 11, 5, 10, 15),
    iconType: 'device'
  },
  {
    id: 5,
    title: "New Devices added",
    subtitle: "James Bond linked a new iPad",
    location: "London, UK",
    ipAddress: "10.0.0.45",
    deviceName: "iPad Pro",
    time: "December 10, 2024 at 2:00 PM",
    date: new Date(2024, 11, 10, 14, 0),
    iconType: 'device'
  },
  {
    id: 6,
    title: "Content Uploaded",
    subtitle: "Presentation.pdf uploaded",
    location: "Miami, FL",
    ipAddress: "172.16.0.100",
    deviceName: "MacBook Pro",
    time: "December 15, 2024 at 11:45 AM",
    date: new Date(2024, 11, 15, 11, 45),
    iconType: 'content'
  },
];

// --- Components ---

const ActivityIcon = ({ type }: { type: ActivityIconType }) => {
  if (type === 'device') {
    return (
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Monitor className="w-4 h-4 text-gray-500" />
      </div>
    );
  }
  return (
    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <FileText className="w-4 h-4 text-gray-500" />
    </div>
  );
};

export default function ActivityLogsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const filteredData = useMemo(() => {
    return activityData.filter((activity) => {
      // Search matching
      const matchesSearch = 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.ipAddress.includes(searchTerm) ||
        activity.deviceName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Date range matching
      let matchesDate = true;
      if (startDate && endDate) {
        // Normalizing to start/end of day for inclusive comparison
        const logTime = activity.date.getTime();
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        matchesDate = logTime >= start && logTime <= end;
      } else if (startDate) {
        const logTime = activity.date.getTime();
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        matchesDate = logTime >= start;
      }
      
      return matchesSearch && matchesDate;
    });
  }, [searchTerm, startDate, endDate]);

  const clearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Activity Logs
        </h3>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-navbarBg border border-border rounded-lg text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none w-full md:w-64"
            />
          </div>

          {/* Date Range Picker */}
          <div className="relative flex items-center bg-navbarBg border border-border rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <Calendar className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <div className="flex items-center gap-2">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  const [start, end] = update;
                  setStartDate(start);
                  setEndDate(end);
                }}
                isClearable={false}
                placeholderText="Select Date Range"
                className="bg-transparent border-none text-sm text-gray-700 dark:text-gray-300 outline-none cursor-pointer w-full"
              />
              {(startDate || endDate) && (
                <button 
                  onClick={clearDateRange}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-navbarBg border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Device & IP Address</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time & Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.length > 0 ? (
                filteredData.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    {/* Activity Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <ActivityIcon type={log.iconType} />
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{log.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{log.subtitle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Location Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white font-bold">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {log.location}
                      </div>
                    </td>

                    {/* Device & IP Column */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{log.ipAddress}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{log.deviceName}</p>
                      </div>
                    </td>

                    {/* Time & Date Column */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {log.time}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No activity logs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}