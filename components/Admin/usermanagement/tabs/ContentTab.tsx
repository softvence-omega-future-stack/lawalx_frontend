"use client";

import React, { useState } from "react";
import { Search, Filter, Eye, MoreVertical, FileImage, FileVideo, FileText, Music } from "lucide-react";

const contentData = [
  {
    id: 1,
    name: "Summer Campaign 2024.mp4",
    type: "Video",
    size: "45.2 MB",
    uploadDate: "Dec 12, 2024",
    status: "Active",
  },
  {
    id: 2,
    name: "Product Showcase.jpg",
    type: "Image",
    size: "2.4 MB",
    uploadDate: "Dec 10, 2024",
    status: "Active",
  },
  {
    id: 3,
    name: "Q4 Report.pdf",
    type: "Document",
    size: "1.8 MB",
    uploadDate: "Dec 08, 2024",
    status: "Archived",
  },
  {
    id: 4,
    name: "Background Music.mp3",
    type: "Audio",
    size: "5.6 MB",
    uploadDate: "Dec 05, 2024",
    status: "Active",
  },
  {
    id: 5,
    name: "Logo Variation.png",
    type: "Image",
    size: "1.2 MB",
    uploadDate: "Dec 01, 2024",
    status: "Inactive",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "Video":
      return <FileVideo className="w-5 h-5 text-purple-500" />;
    case "Image":
      return <FileImage className="w-5 h-5 text-blue-500" />;
    case "Audio":
      return <Music className="w-5 h-5 text-pink-500" />;
    default:
      return <FileText className="w-5 h-5 text-gray-500" />;
  }
};

export default function ContentTab() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = contentData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Content Library
        </h3>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
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

      {/* Content Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Content Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {getIcon(item.type)}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {item.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {item.size}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {item.uploadDate}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border inline-block ${
                      item.status === "Active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        : item.status === "Archived"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                      <Eye className="w-4 h-4" />
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