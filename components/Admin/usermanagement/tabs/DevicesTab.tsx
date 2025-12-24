"use client";

import React, { useState } from "react";
import { Search, Filter, Monitor, Smartphone, Tablet, MoreVertical, Trash2, Unlink } from "lucide-react";

const devicesData = [
  {
    id: 1,
    name: "Lobby Display 01",
    type: "Monitor",
    location: "Main Entrance",
    status: "Online",
    lastActive: "Just now",
    appVersion: "v2.5.1",
  },
  {
    id: 2,
    name: "Cafeteria Menu Board",
    type: "Monitor",
    location: "Cafeteria",
    status: "Online",
    lastActive: "5 mins ago",
    appVersion: "v2.5.1",
  },
  {
    id: 3,
    name: "Meeting Room A",
    type: "Tablet",
    location: "2nd Floor",
    status: "Offline",
    lastActive: "2 days ago",
    appVersion: "v2.4.8",
  },
  {
    id: 4,
    name: "Reception Kiosk",
    type: "Tablet",
    location: "Reception",
    status: "Online",
    lastActive: "Just now",
    appVersion: "v2.5.1",
  },
  {
    id: 5,
    name: "Admin Dashboard Mobile",
    type: "Smartphone",
    location: "Remote",
    status: "Idle",
    lastActive: "1 hour ago",
    appVersion: "v2.5.0",
  },
];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "Monitor":
      return <Monitor className="w-5 h-5 text-blue-500" />;
    case "Smartphone":
      return <Smartphone className="w-5 h-5 text-purple-500" />;
    case "Tablet":
      return <Tablet className="w-5 h-5 text-orange-500" />;
    default:
      return <Monitor className="w-5 h-5 text-gray-500" />;
  }
};

export default function DevicesTab() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = devicesData.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Registered Devices
        </h3>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Device Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                App Version
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((device) => (
              <tr
                key={device.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {device.type}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {device.location}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border inline-block ${
                      device.status === "Online"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        : device.status === "Idle"
                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {device.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {device.lastActive}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {device.appVersion}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors cursor-pointer" title="Unlink Device">
                      <Unlink className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}