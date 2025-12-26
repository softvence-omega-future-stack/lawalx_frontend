"use client";

import React, { useState, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { useTheme } from 'next-themes';
import { Users, DollarSign, Percent, TrendingUp, TrendingDown, UserPlus, ChevronDown, Download, Target, Zap, Home, TargetIcon } from 'lucide-react';
import Dropdown from '@/components/shared/Dropdown';

// Demo data generator
const generateData = (days: number) => {
  const factor = days === 1 ? 0.8 : days === 7 ? 0.95 : days === 30 ? 1 : 1.1;
  
  return {
    summary: {
      mrr: Math.round(28100 * factor),
      arr: Math.round(337200 * factor),
      churnRate: 2.9,
      arpu: Math.round(116 * factor),
      newSubscriptions: Math.round(73 * factor)
    },
    mrrArr: {
      newSales: Math.round(4200 * factor),
      upgrades: Math.round(1900 * factor),
      downgrades: Math.round(-400 * factor),
      churned: Math.round(-800 * factor),
      mrrTrend: Array.from({ length: days === 1 ? 24 : days === 7 ? 7 : days === 30 ? 30 : 12 }, (_, i) => ({
        month: days === 1 ? `${i}:00` : days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] : 
               days === 30 ? `Day ${i + 1}` : 
               ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        mrr: 20000 + i * 1000 + Math.random() * 2000
      })),
      monthlyBreakdown: Array.from({ length: days === 1 ? 24 : days === 7 ? 7 : days === 30 ? 4 : 12 }, (_, i) => ({
        month: days === 1 ? `${i}:00` : days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] : 
               days === 30 ? `Week ${i + 1}` : 
               ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        churned: -(Math.random() * 200 + 100),
        downgrades: -(Math.random() * 300 + 200),
        newSales: Math.random() * 1500 + 1000,
        upgrades: Math.random() * 800 + 500
      })),
      annualRevenue: Math.round(337200 * factor),
      growthRate: 7.3
    },
    churn: {
      newSignups: Math.round(73 * factor),
      cancellations: Math.round(14 * factor),
      netGrowth: Math.round(50 * factor),
      retentionRate: 97.1,
      activityData: Array.from({ length: days === 1 ? 24 : days === 7 ? 7 : days === 30 ? 30 : 12 }, (_, i) => ({
        month: days === 1 ? `${i}:00` : days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] : 
               days === 30 ? `Day ${i + 1}` : 
               ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        cancellations: Math.random() * 20 + 10,
        netGrowth: Math.random() * 30 + 20,
        newSignups: Math.random() * 60 + 40
      })),
      churnByPlan: [
        { plan: 'Starter Plan', rate: 4.2 },
        { plan: 'Business Plan', rate: 2.8 },
        { plan: 'Enterprise Plan', rate: 1.2 }
      ]
    },
    plans: {
      starter: { subscribers: 284, revenue: 8532, avgUser: 30, churnRate: 4.5, growth: 12 },
      business: { subscribers: 156, revenue: 15732, avgUser: 120, churnRate: 2.8, growth: 8 },
      enterprise: { subscribers: 42, revenue: 5040, avgUser: 600, churnRate: 1.2, growth: 25 },
      revenueData: [
        { plan: 'Starter', revenue: Math.round(8532 * factor) },
        { plan: 'Business', revenue: Math.round(15732 * factor) },
        { plan: 'Enterprise', revenue: Math.round(5040 * factor) }
      ],
      subscribersData: [
        { plan: 'Starter', subscribers: Math.round(284 * factor) },
        { plan: 'Business', subscribers: Math.round(156 * factor) },
        { plan: 'Enterprise', subscribers: Math.round(42 * factor) }
      ]
    },
    arpu: {
      overall: Math.round(116 * factor),
      starter: Math.round(30 * factor),
      business: Math.round(135 * factor),
      enterprise: Math.round(630 * factor),
      arpuTrend: Array.from({ length: days === 1 ? 24 : days === 7 ? 7 : days === 30 ? 30 : 12 }, (_, i) => ({
        month: days === 1 ? `${i}:00` : days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] : 
               days === 30 ? `Day ${i + 1}` : 
               ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        business: 130 + Math.random() * 20,
        enterprise: 600 + Math.random() * 100,
        overall: 110 + Math.random() * 20,
        starter: 28 + Math.random() * 5
      })),
      growthFactors: [
        { name: 'Plan Upgrades', description: 'Users moving to higher tiers', impact: '+$1.80' },
        { name: 'Add-on Features', description: 'Extra storage, uploads, etc.', impact: '+$1.20' },
        { name: 'Price Adjustments', description: 'Annual price increases', impact: '+$0.60' },
        { name: 'Plan Downgrades', description: 'Users moving to lower tiers', impact: '-$0.20' }
      ]
    },
    trials: {
      overallConversion: 74.3,
      trialsStarted: Math.round(785 * factor),
      convertedToPaid: Math.round(586 * factor),
      avgTrialDuration: 14,
      conversionByPlan: [
        { plan: 'Starter Plan', trials: 430, converted: 304, rate: 70.0 },
        { plan: 'Business Plan', trials: 280, converted: 224, rate: 80.0 },
        { plan: 'Enterprise Plan', trials: 75, converted: 58, rate: 80.0 }
      ],
      topFeature: 'Content Scheduler',
      featureUsage: 89,
      avgTimeToConvert: 8.5
    }
  };
};

const FinancialReport = () => {
  const { theme, resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('mrr');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  const [timeRange, setTimeRange] = useState(30);

  const data = useMemo(() => generateData(timeRange), [timeRange]);

  const timeRanges = [
    { value: 1, label: 'Last 1 day' },
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 365, label: 'Last 1 year' }
  ];

  const tabs = [
    { id: 'mrr', label: 'MRR/ARR' },
    { id: 'churn', label: 'Churn' },
    { id: 'plans', label: 'Plans' },
    { id: 'arpu', label: 'ARPU' },
    { id: 'trials', label: 'Trials' }
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
                <span>Financial Report</span>
                {/* <span>›</span>
                <span className="text-cyan-600 font-medium">MRR/ARR</span> */}
              </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Financial Report</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Comprehensive financial analytics and subscription metrics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Dropdown
              value={timeRanges.find(t => t.value === timeRange)?.label || ''}
              options={timeRanges.map(t => t.label)}
              onChange={(label) => setTimeRange(timeRanges.find(t => t.label === label)?.value || 30)}
            />
            
            <button className="px-4 py-2 border border-bgBlue text-bgBlue rounded-lg flex items-center gap-2 hover:scale-105 transition-all text-sm bg-navbarBg cursor-pointer dark:shadow-customShadow">
              <Download className="w-4 h-4" />
              <span className='hidden md:block'>Export Financial Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-navbarBg border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-6">
              <span className='border border-border rounded-full p-2'><DollarSign className="w-4 h-4 text-red-500" /></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">MRR</span>
            </div>
            <div className="text-2xl font-bold mb-1">${data.summary.mrr.toLocaleString()}</div>
            <div className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8.2% from Last Month
            </div>
          </div>

          <div className="bg-navbarBg border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-6">
              <span className='border border-border rounded-full p-2'><TargetIcon className="w-4 h-4 text-green-500" /></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">ARR</span>
            </div>
            <div className="text-2xl font-bold mb-1">${data.summary.arr.toLocaleString()}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">+7% on track for $400K</div>
          </div>

          <div className="bg-navbarBg border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-6">
              <span className='border border-border rounded-full p-2'><Percent className="w-4 h-4 text-red-500" /></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Churn Rate</span>
            </div>
            <div className="text-2xl font-bold mb-1">{data.summary.churnRate}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">45 % conversion rate</div>
          </div>

          <div className="bg-navbarBg border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-6">
              <span className='border border-border rounded-full p-2'><TrendingUp className="w-4 h-4 text-green-500" /></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">ARPU</span>
            </div>
            <div className="text-2xl font-bold mb-1">${data.summary.arpu}</div>
            <div className="text-xs text-red-500 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              +3.4% growth
            </div>
          </div>

          <div className="bg-navbarBg border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-6">
              <span className='border border-border rounded-full p-2'><UserPlus className="w-4 h-4 text-green-500" /></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">New Subscriptions</span>
            </div>
            <div className="text-2xl font-bold mb-1">{data.summary.newSubscriptions}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">This month</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-navbarBg rounded-full border border-border p-1.5 mb-6 inline-flex overflow-x-auto max-w-full scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-full font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 mx-2 shadow-customShadow ${
                activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-800'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200' 
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MRR/ARR Tab */}
        {activeTab === 'mrr' && (
          <div className="space-y-6">
            <div className="bg-navbarBg border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Monthly Recurring Revenue (MRR)</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Track recurring revenue trends and components</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">New Sales</div>
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">${data.mrrArr.newSales.toLocaleString()}</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">This month</div>
                </div>
                <div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">Upgrades</div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">${data.mrrArr.upgrades.toLocaleString()}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">This month</div>
                </div>
                <div>
                  <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">Downgrades</div>
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">${data.mrrArr.downgrades.toLocaleString()}</div>
                  <div className="text-xs text-orange-600 dark:text-orange-400">This month</div>
                </div>
                <div>
                  <div className="text-xs text-red-600 dark:text-red-400 mb-1">Churned</div>
                  <div className="text-2xl font-bold text-red-700 dark:text-red-300">${data.mrrArr.churned.toLocaleString()}</div>
                  <div className="text-xs text-red-600 dark:text-red-400">This month</div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data.mrrArr.mrrTrend}>
                  <defs>
                    <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="mrr" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMRR)" name="MRR" />
                </AreaChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={300} className="mt-8">
                <BarChart data={data.mrrArr.monthlyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="month" className="fill-gray-600 dark:fill-gray-400" tick={{ fontSize: 12 }} />
                  <YAxis className="fill-gray-600 dark:fill-gray-400" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg)',
                      border: '1px solid var(--tooltip-border)',
                      borderRadius: '0.5rem'
                    }}
                    cursor={{ fill: 'transparent' }}
                    formatter={(value: number) => [`$${Math.abs(value).toLocaleString()}`, undefined]}
                    wrapperClassName="dark:[--tooltip-bg:#1f2937] dark:[--tooltip-border:#374151] [--tooltip-bg:#ffffff] [--tooltip-border:#e5e7eb]"
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke={isDark ? '#4b5563' : '#9ca3af'} />
                  <Bar dataKey="newSales" stackId="a" fill="#8b5cf6" name="New Sales" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="upgrades" stackId="a" fill="#3b82f6" name="Upgrades" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="churned" stackId="a" fill="#ef4444" name="Churned" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="downgrades" stackId="a" fill="#f59e0b" name="Downgrades" radius={[0, 0, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Annual Recurring Revenue</div>
                    <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">${data.mrrArr.annualRevenue.toLocaleString()}</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">Based on current MRR</div>
                  </div>
                  <span><TargetIcon className="w-12 h-12 text-purple-500" /></span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Growth Rate</div>
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{data.mrrArr.growthRate}%</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Month over month</div>
                  </div>
                  <span><TrendingUp className="w-12 h-12 text-blue-500" /></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Churn Tab */}
        {activeTab === 'churn' && (
          <div className="space-y-6">
            <div className="bg-navbarBg border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-2">Subscriber Activity & Churn Analysis</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Monitor subscription lifecycle and retention</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className='flex items-center justify-between border border-border rounded-xl p-4'>
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">New Sign-ups</div>
                    <div className="text-2xl font-bold text-green-800">{data.churn.newSignups}</div>
                  </div>
                  <span className="flex items-center justify-center"><UserPlus className="w-8 h-8 text-green-800" /></span>
                </div>
                <div className='flex items-center justify-between border border-border rounded-xl p-4'>
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Cancellations</div>
                  <div className="text-2xl font-bold text-[#E7000B]">{data.churn.cancellations}</div>
                  </div>
                  <span className="flex items-center justify-center"><TrendingDown className="w-8 h-8 text-[#E7000B]" /></span>
                </div>
                <div className='flex items-center justify-between border border-border rounded-xl p-4'>
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Net Growth</div>
                  <div className="text-2xl font-bold text-[#9810FA]">+{data.churn.netGrowth}</div>
                  </div>
                  <span className="flex items-center justify-center"><TrendingUp className="w-8 h-8 text-[#9810FA]" /></span>
                </div>
                <div className='flex items-center justify-between border border-border rounded-xl p-4'>
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Retention Rate</div>
                  <div className="text-2xl font-bold text-[#0092B8]">{data.churn.retentionRate}%</div>
                  </div>
                  <span className="flex items-center justify-center"><Percent className="w-8 h-8 text-[#0092B8]" /></span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.churn.activityData}>
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
                  <Legend />
                  <Bar dataKey="cancellations" fill="#ef4444" name="Cancellations" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="netGrowth" fill="#8b5cf6" name="Net Growth" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="newSignups" fill="#10b981" name="New Sign-ups" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-navbarBg border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Churn Rate by Plan</h2>
              <div className="space-y-4">
                {data.churn.churnByPlan.map((plan, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{plan.plan}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{plan.rate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${plan.rate * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="bg-navbarBg rounded-lg p-6 border border-border">
              <h2 className="text-lg font-semibold mb-2">Plan Performance Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Comparative analysis of subscription tiers</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg p-4 border border-yellow-300 dark:border-yellow-700">
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">Starter</div>
                  <div className="text-3xl font-bold mb-2">{data.plans.starter.subscribers}</div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">subscribers</div>
                  <div className="space-y-1 mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
                      <span className="font-semibold">${data.plans.starter.revenue.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg/User:</span>
                      <span className="font-semibold">${data.plans.starter.avgUser}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Churn Rate:</span>
                      <span className="font-semibold">{data.plans.starter.churnRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Growth:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">+{data.plans.starter.growth}%</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 border border-blue-300 dark:border-blue-700">
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-2">Business</div>
                  <div className="text-3xl font-bold mb-2">{data.plans.business.subscribers}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">subscribers</div>
                  <div className="space-y-1 mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
                      <span className="font-semibold">${data.plans.business.revenue.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg/User:</span>
                      <span className="font-semibold">${data.plans.business.avgUser}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Churn Rate:</span>
                      <span className="font-semibold">{data.plans.business.churnRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Growth:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">+{data.plans.business.growth}%</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 border border-purple-300 dark:border-purple-700">
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-2">Enterprise</div>
                  <div className="text-3xl font-bold mb-2">{data.plans.enterprise.subscribers}</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">subscribers</div>
                  <div className="space-y-1 mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
                      <span className="font-semibold">${data.plans.enterprise.revenue.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg/User:</span>
                      <span className="font-semibold">${data.plans.enterprise.avgUser}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Churn Rate:</span>
                      <span className="font-semibold">{data.plans.enterprise.churnRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Growth:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">+{data.plans.enterprise.growth}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-navbarBg rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.plans.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="plan" className="fill-gray-600 dark:fill-gray-400" tick={{ fontSize: 12 }} />
                    <YAxis className="fill-gray-600 dark:fill-gray-400" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '1px solid var(--tooltip-border)',
                        borderRadius: '0.5rem'
                      }}
                      wrapperClassName="dark:[--tooltip-bg:#1f2937] dark:[--tooltip-border:#374151] [--tooltip-bg:#ffffff] [--tooltip-border:#e5e7eb]"
                    />
                    <Bar dataKey="revenue" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-navbarBg rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-4">Subscribers</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.plans.subscribersData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="plan" className="fill-gray-600 dark:fill-gray-400" tick={{ fontSize: 12 }} />
                    <YAxis className="fill-gray-600 dark:fill-gray-400" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '1px solid var(--tooltip-border)',
                        borderRadius: '0.5rem'
                      }}
                      wrapperClassName="dark:[--tooltip-bg:#1f2937] dark:[--tooltip-border:#374151] [--tooltip-bg:#ffffff] [--tooltip-border:#e5e7eb]"
                    />
                    <Bar dataKey="subscribers" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ARPU Tab */}
        {activeTab === 'arpu' && (
          <div className="space-y-6">
            <div className="bg-navbarBg rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Average Revenue Per User (ARPU)</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Track revenue per subscriber month</p>
                </div>
                {/* <button className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-800 dark:hover:bg-gray-600 cursor-pointer">
                  Export
                </button> */}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="rounded-xl p-4 border border-border">
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Overall ARPU</div>
                  <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">${data.arpu.overall}</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Per month</div>
                </div>
                <div className="rounded-xl p-4 border border-border">
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">Starter ARPU</div>
                  <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">${data.arpu.starter}</div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">Per month</div>
                </div>
                <div className="rounded-xl p-4 border border-border">
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">Business ARPU</div>
                  <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">${data.arpu.business}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">+2.3% growth</div>
                </div>
                <div className="rounded-xl p-4 border border-border">
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Enterprise ARPU</div>
                  <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">${data.arpu.enterprise}</div>
                  <div className="text-xs text-red-600 dark:text-red-400">-1.8% growth</div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.arpu.arpuTrend}>
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
                  <Legend />
                  <Line type="monotone" dataKey="business" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Business" />
                  <Line type="monotone" dataKey="enterprise" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Enterprise" />
                  <Line type="monotone" dataKey="overall" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Overall ARPU" />
                  <Line type="monotone" dataKey="starter" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Starter" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-navbarBg rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4">ARPU Growth Factors</h3>
              <div className="space-y-4">
                {data.arpu.growthFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{factor.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{factor.description}</div>
                    </div>
                    <div className={`text-lg font-bold ${
                      factor.impact.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {factor.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trials Tab */}
        {activeTab === 'trials' && (
          <div className="space-y-6">
            <div className="bg-navbarBg rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Trial Conversion Rate</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Track trial-to-paid conversion metrics</p>
                </div>
                {/* <button className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-800 dark:hover:bg-gray-600">
                  Export
                </button> */}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className='rounded-xl p-4 border border-border'>
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Overall Conversion</div>
                  <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">{data.trials.overallConversion}%</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Last 14 days</div>
                </div>
                <div className='rounded-xl p-4 border border-border'>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Trials Started</div>
                  <div className="text-3xl font-bold">{data.trials.trialsStarted}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">This month</div>
                </div>
                <div className='rounded-xl p-4 border border-border'>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Converted to Paid</div>
                  <div className="text-3xl font-bold">{data.trials.convertedToPaid}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">This month</div>
                </div>
                <div className='rounded-xl p-4 border border-border'>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Trial Duration</div>
                  <div className="text-3xl font-bold">{data.trials.avgTrialDuration}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">days (14-day trial)</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-sm">Conversion by Plan</h3>
                {data.trials.conversionByPlan.map((plan, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{plan.plan}</span>
                      <span className="text-sm font-semibold">{plan.rate}% conversion</span>
                    </div>
                    <div className="flex items-center gap-0 bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                      <div
                        className="bg-purple-500 flex items-center justify-center text-white text-xs font-medium h-full"
                        style={{ width: `${(plan.trials / (plan.trials)) * 50}%` }}
                      >
                        {plan.trials} trials
                      </div>
                      <div
                        className="bg-cyan-500 flex items-center justify-center text-white text-xs font-medium h-full"
                        style={{ width: `${(plan.converted / (plan.trials)) * 50}%` }}
                      >
                        {plan.converted} converted
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navbarBg rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4">Conversion Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-700 dark:text-green-400 mb-1">Top Converting Feature</div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">{data.trials.topFeature}</div>
                      <div className="text-sm text-green-600 dark:text-green-500">Used by {data.trials.featureUsage}% of converts</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-700 dark:text-blue-400 mb-1">Avg Time to Convert</div>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">{data.trials.avgTimeToConvert} days</div>
                      <div className="text-sm text-blue-600 dark:text-blue-500">After trial start</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReport;