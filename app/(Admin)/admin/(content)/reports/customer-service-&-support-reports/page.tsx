"use client";

import React, { useState, useMemo } from 'react';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CheckCircle, Clock, TrendingUp, ChevronDown, Download, Filter } from 'lucide-react';

// Demo data generator
const generateData = (days: number) => {
  const factor = days === 1 ? 0.8 : days === 7 ? 0.95 : days === 30 ? 1 : 1.1;
  
  return {
    summary: {
      totalTickets: Math.round(256 * factor),
      resolved: Math.round(234 * factor),
      avgResponseTime: '8 min',
      avgResolutionTime: '3.2 hrs'
    },
    ticketTrend: Array.from({ length: days === 1 ? 24 : days === 7 ? 7 : days === 30 ? 30 : 12 }, (_, i) => ({
      month: days === 1 ? `${i}:00` : days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] : 
             days === 30 ? `Day ${i + 1}` : 
             ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      resolved: 80 + Math.random() * 40,
      total: 120 + Math.random() * 50
    })),
    recentTickets: [
      { id: 'TKT-2025-001', customer: 'TechCorp Inc.', subject: 'Screen not displaying content', category: 'Technical', priority: 'High', status: 'Open', responseTime: '12 min' },
      { id: 'TKT-2025-002', customer: 'Retail Solutions', subject: 'Billing question', category: 'Billing', priority: 'Medium', status: 'In Progress', responseTime: '8 min' },
      { id: 'TKT-2025-003', customer: 'HealthCare Plus', subject: 'How to upload content', category: 'General', priority: 'Low', status: 'Resolved', responseTime: '5 min' },
      { id: 'TKT-2025-004', customer: 'Education Hub', subject: 'Device offline issue', category: 'Technical', priority: 'High', status: 'Resolved', responseTime: '15 min' },
      { id: 'TKT-2025-005', customer: 'Restaurant Chain', subject: 'Feature request', category: 'Feature Request', priority: 'Low', status: 'Closed', responseTime: '18 min' }
    ],
    categoryDistribution: [
      { name: 'Technical', value: Math.round(44 * factor), color: '#8b5cf6' },
      { name: 'Billing', value: Math.round(23 * factor), color: '#10b981' },
      { name: 'General', value: Math.round(18 * factor), color: '#f59e0b' },
      { name: 'Feature Request', value: Math.round(15 * factor), color: '#ef4444' }
    ],
    responseTrend: Array.from({ length: days === 1 ? 24 : days === 7 ? 7 : days === 30 ? 30 : 12 }, (_, i) => ({
      month: days === 1 ? `${i}:00` : days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] : 
             days === 30 ? `Day ${i + 1}` : 
             ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      avgTime: 8 + Math.random() * 4
    }))
  };
};

const CustomerServiceReports = () => {
  const [timeRange, setTimeRange] = useState(30);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const data = useMemo(() => generateData(timeRange), [timeRange]);

  const timeRanges = [
    { value: 1, label: 'Last 1 day' },
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 365, label: 'Last 1 year' }
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Low': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'In Progress': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Resolved': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Closed': return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1">Customer Service & Support Reports</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ticket, support operations, and customer satisfaction
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 rounded-lg bg-navbarBg border border-border flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm cursor-pointer"
              >
                <span>{timeRanges.find(t => t.value === timeRange)?.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-navbarBg border border-border shadow-lg z-10">
                  {timeRanges.map(range => (
                    <button
                      key={range.value}
                      onClick={() => {
                        setTimeRange(range.value);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg cursor-pointer${
                        timeRange === range.value ? 'bg-bgBlue text-black dark:text-white hover:bg-blue-600 dark:hover:bg-blue-600' : ''
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button className="px-4 py-2 bg-bgBlue text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors text-sm cursor-pointer">
              <Download className="w-4 h-4" />
              Export Financial Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Total Tickets</div>
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">{data.summary.totalTickets}</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">This month</div>
          </div>

          <div className="bg-navbarBg rounded-lg p-4 border border-border">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Resolved</div>
            <div className="text-3xl font-bold mb-1">{data.summary.resolved}</div>
            <div className="text-xs text-green-500">91.4% resolution rate</div>
          </div>

          <div className="bg-navbarBg rounded-lg p-4 border border-border">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Response Time</div>
            <div className="text-3xl font-bold mb-1">{data.summary.avgResponseTime}</div>
            <div className="text-xs text-green-500">15% improvement</div>
          </div>

          <div className="bg-navbarBg rounded-lg p-4 border border-border">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Resolution Time</div>
            <div className="text-3xl font-bold mb-1">{data.summary.avgResolutionTime}</div>
            <div className="text-xs text-green-500">10% improvement</div>
          </div>
        </div>

        {/* Ticket Trend Chart */}
        <div className="bg-navbarBg rounded-lg p-6 border border-border mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data.ticketTrend}>
              <defs>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="month" 
                className="fill-gray-600 dark:fill-gray-400" 
                tick={{ fontSize: 12 }} 
                interval={timeRange === 30 ? 4 : 0}
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
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
              <Area type="monotone" dataKey="total" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTotal)" name="Total Tickets" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Tickets Table */}
        <div className="bg-navbarBg rounded-lg p-6 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Tickets</h2>
            <button className="px-3 py-1.5 border border-border rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Ticket ID</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Subject</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Priority</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentTickets.map((ticket, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 text-sm font-medium">{ticket.id}</td>
                    <td className="py-3 px-4 text-sm">{ticket.customer}</td>
                    <td className="py-3 px-4 text-sm">{ticket.subject}</td>
                    <td className="py-3 px-4 text-sm">{ticket.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{ticket.responseTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tickets by Category */}
          <div className="bg-navbarBg rounded-lg p-6 border border-border">
            <h2 className="text-lg font-semibold mb-4">Tickets by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {data.categoryDistribution.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-sm">{cat.name}</span>
                  </div>
                  <span className="text-sm font-medium">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time Trend */}
          <div className="bg-navbarBg rounded-lg p-6 border border-border">
            <h2 className="text-lg font-semibold mb-4">Response Time Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.responseTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="month" 
                  className="fill-gray-600 dark:fill-gray-400" 
                  tick={{ fontSize: 12 }}
                  interval={timeRange === 30 ? 4 : 0}
                />
                <YAxis 
                  className="fill-gray-600 dark:fill-gray-400" 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '0.5rem'
                  }}
                  wrapperClassName="dark:[--tooltip-bg:#1f2937] dark:[--tooltip-border:#374151] [--tooltip-bg:#ffffff] [--tooltip-border:#e5e7eb]"
                  formatter={(value: number) => [`${value.toFixed(1)} min`, 'Avg Response (min)']}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  name="Avg Response (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-navbarBg rounded-lg p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-green-700 dark:text-green-400 mb-1">Fast Response</div>
                  <div className="text-sm text-green-600 dark:text-green-500">5 min avg, 80% under 10 minutes target</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-700 dark:text-blue-400 mb-1">High Resolution Rate</div>
                  <div className="text-sm text-blue-600 dark:text-blue-500">91.4% of tickets resolved</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-purple-700 dark:text-purple-400 mb-1">Improving Efficiency</div>
                  <div className="text-sm text-purple-600 dark:text-purple-500">Resolution time down 10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceReports;