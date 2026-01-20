"use client";

import React, { useState, useMemo } from "react";
import { 
  Download, 
  ChevronDown, 
  Monitor, 
  FileText, 
  HardDrive, 
  Flag,
  Video,
  Image as ImageIcon,
  Music,
  Type,
  Home,
  ChevronRight
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { useTheme } from "next-themes";
import Link from "next/link";

// Define the time range options
const TIME_RANGES = [
  { label: "Last 1 day", value: 1 },
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 1 year", value: 365 },
];

const ContentAndProgramsReport = () => {
  const { theme } = useTheme();
  // State for time range filter
  const [selectedRange, setSelectedRange] = useState(TIME_RANGES[2]); // Default to 30 days
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- Dynamic Data Generation based on Time Range ---
  const reportData = useMemo(() => {
    // Multiplier to scale data based on time range (mock logic)
    // 1 day = 0.1x, 7 days = 0.5x, 30 days = 1x, 365 days = 10x
    let multiplier = 1;
    if (selectedRange.value === 1) multiplier = 0.1;
    if (selectedRange.value === 7) multiplier = 0.5;
    if (selectedRange.value === 365) multiplier = 10;

    // KPI Data
    const kpi = {
      totalScreens: Math.floor(3456 * multiplier),
      totalScreensChange: Math.floor(89 * multiplier),
      contentItems: Math.floor(28492 * multiplier),
      contentItemsChange: Math.floor(1245 * multiplier),
      storageUsed: (8.6 * multiplier).toFixed(1), // TB
      storageCapacity: 72, // Mock percentage
      flaggedContent: Math.floor(23 * multiplier),
    };

    // Content Type Distribution (Donut Chart)
    // Content Type Distribution (Donut Chart)
    // Varying distribution slightly based on time range to show dynamic behavior
    let videoPct = 65, imgPct = 25, audioPct = 8, textPct = 2;
    
    if (selectedRange.value === 1) { videoPct = 50; imgPct = 30; audioPct = 15; textPct = 5; }
    if (selectedRange.value === 7) { videoPct = 60; imgPct = 25; audioPct = 10; textPct = 5; }
    // 30 days keeps default
    if (selectedRange.value === 365) { videoPct = 70; imgPct = 20; audioPct = 8; textPct = 2; }

    const distribution = [
      { name: "Video", value: videoPct, color: "#8884d8", items: `${(4.8 * multiplier * (videoPct/65)).toFixed(1)} TB`, percentage: `${videoPct}%` }, // Purple
      { name: "Images", value: imgPct, color: "#82ca9d", items: `${(2.1 * multiplier * (imgPct/25)).toFixed(1)} TB`, percentage: `${imgPct}%` }, // Green
      { name: "Audio", value: audioPct, color: "#ffc658", items: `${(1.5 * multiplier * (audioPct/8)).toFixed(1)} TB`, percentage: `${audioPct}%` },   // Yellow
      { name: "Text/Other", value: textPct, color: "#ff8042", items: `${(0.2 * multiplier * (textPct/2)).toFixed(1)} TB`, percentage: `${textPct}%` }, // Orange
    ];
    // Adjust values slightly based on multiplier/range if needed, but percentages usually stay similar for distribution.
    // We'll keep percentages static for visual consistency with design, but could scale them.

    // Content Quality Stats
    const qualityStats = {
      total: Math.floor(28492 * multiplier),
      active: Math.floor(27856 * multiplier),
      flagged: Math.floor(23 * multiplier),
      archived: Math.floor(613 * multiplier),
    };

    // Usage Trends
    const trends = [
      { id: 1, title: "Holiday Promotions", count: Math.floor(1245 * multiplier), type: "Video" },
      { id: 2, title: "Product Showcases", count: Math.floor(892 * multiplier), type: "Image" },
      { id: 3, title: "Menu Displays", count: Math.floor(756 * multiplier), type: "Image" },
      { id: 4, title: "Background Music", count: Math.floor(623 * multiplier), type: "Audio" },
      { id: 5, title: "News Feeds", count: Math.floor(445 * multiplier), type: "Text" },
    ];

    return { kpi, distribution, qualityStats, trends };
  }, [selectedRange]);

  const COLORS = ["#9BA4ED", "#86Dba8", "#FCD34D", "#FB7185"]; // Matches the image colors roughly

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
            <Link href="/admin/dashboard">
                <Home className="w-4 h-4 cursor-pointer hover:text-bgBlue" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Reports & Analytics</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-bgBlue dark:text-blue-400 font-medium">Content And Programs</span>
          </div> 
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Content And Programs
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            User behavior, system access, and accountability tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-navbarBg border border-border rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors md:min-w-[160px] justify-between"
            >
              <span>{selectedRange.label}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-full md:w-48 bg-navbarBg border border-border rounded-lg shadow-lg z-20 py-1">
                  {TIME_RANGES.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => {
                        setSelectedRange(range);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedRange.value === range.value
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Export Button */}
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Download className="w-4 h-4" />
            Export Financial Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total Screens */}
        <div className="bg-navbarBg p-6 rounded-xl border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Screens</h3>
             <Monitor className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {reportData.kpi.totalScreens.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400">
              +{reportData.kpi.totalScreensChange} from last month
            </span>
          </div>
        </div>

        {/* Card 2: Content Items */}
        <div className="bg-navbarBg p-6 rounded-xl border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Content Items</h3>
             <FileText className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {reportData.kpi.contentItems.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400">
              +{reportData.kpi.contentItemsChange.toLocaleString()} from last month
            </span>
          </div>
        </div>

        {/* Card 3: Storage Used */}
        <div className="bg-navbarBg p-6 rounded-xl border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Storage Used</h3>
             <HardDrive className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {reportData.kpi.storageUsed} TB
            </span>
            <span className="text-xs text-gray-400">
              {reportData.kpi.storageCapacity}% of total capacity
            </span>
          </div>
        </div>

        {/* Card 4: Flagged Content */}
        <div className="bg-navbarBg p-6 rounded-xl border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Flagged Content</h3>
             <Flag className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-red-500 mb-1">
              {reportData.kpi.flaggedContent}
            </span>
            <span className="text-xs text-gray-400">
              Requires review
            </span>
          </div>
        </div>
      </div>

      {/* Charts & Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Left: Content Type Distribution */}
        <div className="bg-navbarBg p-6 rounded-xl border border-border shadow-sm">
           <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-8">
             Content Type Distribution
           </h3>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* Donut Chart */}
              <div className="w-48 h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reportData.distribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {reportData.distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme === 'dark' ? '#1F2937' : '#fff',
                        borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                        borderRadius: '0.5rem',
                        color: theme === 'dark' ? '#F3F4F6' : '#111827'
                      }}
                      itemStyle={{ color: theme === 'dark' ? '#F3F4F6' : '#111827' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend/Stats */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full sm:w-auto">
                 {reportData.distribution.map((item, index) => (
                    <div key={item.name} className="flex items-start gap-2">
                       <span 
                         className="w-3 h-3 rounded-full mt-1" 
                         style={{ backgroundColor: COLORS[index] }}
                       />
                       <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                             {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.percentage}</span>
                             <span className="text-xs text-gray-400">{item.items}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Content Quality Stats */}
        <div className="bg-navbarBg p-6 rounded-xl border border-border shadow-sm">
           <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-8">
             Content Quality Stats
           </h3>

           <div className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-600 dark:text-gray-400">Total Content Items</span>
                 <span className="font-semibold text-gray-900 dark:text-white text-base">
                    {reportData.qualityStats.total.toLocaleString()}
                 </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-600 dark:text-gray-400">Active Content</span>
                 <span className="font-semibold text-green-500 text-base">
                    {reportData.qualityStats.active.toLocaleString()}
                 </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-600 dark:text-gray-400">Flagged Content</span>
                 <span className="font-semibold text-red-500 text-base">
                    {reportData.qualityStats.flagged}
                 </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-600 dark:text-gray-400">Archived Content</span>
                 <span className="font-semibold text-gray-500 dark:text-gray-500 text-base">
                    {reportData.qualityStats.archived}
                 </span>
              </div>
           </div>
        </div>
      </div>

      {/* Content Usage Trends */}
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 ml-1">
        Content Usage Trends
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
         {reportData.trends.map((item) => (
            <div key={item.id} className="bg-navbarBg p-5 rounded-xl border border-border shadow-sm">
               <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
               </h4>
               <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                     {item.count.toLocaleString()}
                  </span>
               </div>
               <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {item.type}
               </span>
            </div>
         ))}
      </div>

    </div>
  );
};

export default ContentAndProgramsReport;
