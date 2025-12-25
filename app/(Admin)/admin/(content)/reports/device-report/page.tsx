"use client";
import { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Monitor, Wifi, WifiOff, TrendingUp, ChevronDown, Download, Home } from 'lucide-react';
import Dropdown from '@/components/shared/Dropdown';

// Demo data generator
const generateData = (days: number) => {
  const regions = [
    { name: 'North America', base: 2575, onlineRate: 0.951, offlineRate: 0.049 },
    { name: 'Europe', base: 1854, onlineRate: 0.962, offlineRate: 0.048 },
    { name: 'Asia', base: 1201, onlineRate: 0.944, offlineRate: 0.056 },
    { name: 'South America', base: 468, onlineRate: 0.951, offlineRate: 0.049 },
    { name: 'Others', base: 168, onlineRate: 0.929, offlineRate: 0.071 }
  ];

  const factor = days === 1 ? 0.8 : days === 7 ? 0.95 : days === 30 ? 1 : 1.1;
  
  const adjustedRegions = regions.map(r => ({
    ...r,
    base: Math.round(r.base * factor),
    online: Math.round(r.base * factor * r.onlineRate),
    offline: Math.round(r.base * factor * r.offlineRate)
  }));

  const total = adjustedRegions.reduce((sum, r) => sum + r.base, 0);
  const totalOnline = adjustedRegions.reduce((sum, r) => sum + r.online, 0);
  const totalOffline = adjustedRegions.reduce((sum, r) => sum + r.offline, 0);
  
  const uptimeData = [];
  const daysToShow = days === 1 ? 24 : days === 7 ? 7 : days === 30 ? 30 : 365;
  const baseUptime = 98.7;
  
  for (let i = 0; i < daysToShow; i++) {
    const variance = (Math.random() - 0.5) * 2;
    uptimeData.push({
      day: days === 1 ? `${i}:00` : days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] : 
           days === 30 ? `Day ${i + 1}` : `M${i + 1}`,
      uptime: Math.max(95, Math.min(100, baseUptime + variance))
    });
  }

  return {
    summary: {
      total,
      online: totalOnline,
      offline: totalOffline,
      avgUptime: baseUptime
    },
    regions: adjustedRegions,
    uptimeData
  };
};
const DeviceReportDashboard = () => {
  const [timeRange, setTimeRange] = useState(30);

  const data = useMemo(() => generateData(timeRange), [timeRange]);

  const timeRanges = [
    { value: 1, label: 'Last 1 day' },
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 365, label: 'Last 1 year' }
  ];

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                <span><Home className="w-4 h-4 text-gray-400" /></span>
                <span>›</span>
                <span>Reports & Analytics</span>
                <span>›</span>
                <span>Device Report</span>
              </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Device Report</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monitor and manage all connected devices across customers
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Dropdown
              value={timeRanges.find(t => t.value === timeRange)?.label || ''}
              options={timeRanges.map(t => t.label)}
              onChange={(label) => setTimeRange(timeRanges.find(t => t.label === label)?.value || 30)}
            />
            
            <button className="px-4 py-2 bg-bgBlue text-white rounded-lg shadow-customShadow flex items-center gap-2 hover:bg-blue-600 transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export Financial Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-navbarBg rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Devices</span>
              <Monitor className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="text-3xl font-bold mb-1">{data.summary.total.toLocaleString()}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">From last week</div>
          </div>

          <div className="bg-navbarBg rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Online Devices</span>
              <Wifi className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1 text-green-500">
              {data.summary.online.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {((data.summary.online / data.summary.total) * 100).toFixed(1)}% online
            </div>
          </div>

          <div className="bg-navbarBg rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Offline Devices</span>
              <WifiOff className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold mb-1 text-red-500">
              {data.summary.offline}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Requires attention</div>
          </div>

          <div className="bg-navbarBg rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Average Uptime</span>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{data.summary.avgUptime.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Last 30 days</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Device Distribution by Region */}
          <div className="bg-navbarBg rounded-lg p-6 border border-border">
            <h2 className="text-lg font-semibold mb-4">Device Distribution by Region</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.regions}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="name" 
                  className="fill-gray-600 dark:fill-gray-400"
                  tick={{ fontSize: 12 }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis className="fill-gray-600 dark:fill-gray-400" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '0.5rem'
                  }}
                  wrapperClassName="dark:[--tooltip-bg:#1f2937] dark:[--tooltip-border:#374151] [--tooltip-bg:#ffffff] [--tooltip-border:#e5e7eb]"
                />
                <Bar dataKey="online" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="offline" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* System Uptime */}
          <div className="bg-navbarBg rounded-lg p-6 border border-border">
            <h2 className="text-lg font-semibold mb-4">
              System Uptime (Last {timeRange === 1 ? '24 Hours' : timeRange === 7 ? '7 Days' : timeRange === 30 ? '30 Days' : 'Year'})
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.uptimeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="day" 
                  className="fill-gray-600 dark:fill-gray-400"
                  tick={{ fontSize: 12 }}
                  interval={timeRange === 365 ? 30 : timeRange === 30 ? 4 : 0}
                />
                <YAxis 
                  domain={[95, 100]} 
                  className="fill-gray-600 dark:fill-gray-400"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '0.5rem'
                  }}
                  wrapperClassName="dark:[--tooltip-bg:#1f2937] dark:[--tooltip-border:#374151] [--tooltip-bg:#ffffff] [--tooltip-border:#e5e7eb]"
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Uptime']}
                />
                <Line 
                  type="monotone" 
                  dataKey="uptime" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Device Statistics */}
        <div className="bg-navbarBg rounded-lg p-6 border border-border">
          <h2 className="text-lg font-semibold mb-6">Regional Device Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.regions.map((region) => (
              <div key={region.name} className="p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-3">{region.name}</h3>
                <div className="text-2xl font-bold mb-3">{region.base.toLocaleString()}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-500">Online: {region.online}</span>
                    <span className="text-green-500">{(region.onlineRate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-500">Offline: {region.offline}</span>
                    <span className="text-gray-500 dark:text-gray-400">{(region.offlineRate * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceReportDashboard;