"use client";

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Download, Filter, Moon, Sun, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Clock, RefreshCw, DollarSign, ChevronDown, Home } from 'lucide-react';
import Dropdown from '@/components/shared/Dropdown';

import { useTheme } from 'next-themes';

const generateBillingData = (range: number) => {
  // Logic to adjust data based on range (1, 7, 30, 365)
  const multiplier = range === 1 ? 0.03 : range === 7 ? 0.25 : range === 30 ? 1 : 12;
  
  // Define time series structure based on range
  let timeSeriesStructure: { label: string; key: string }[] = [];
  let xAxisKey = 'month';

  if (range === 1) { // 1 Day -> Hours
    xAxisKey = 'time';
    for (let i = 0; i <= 24; i += 4) {
      timeSeriesStructure.push({ label: `${i}:00`, key: 'time' });
    }
  } else if (range === 7) { // 7 Days -> Days
    xAxisKey = 'day';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    timeSeriesStructure = days.map(day => ({ label: day, key: 'day' }));
  } else if (range === 30) { // 30 Days -> Weeks
    xAxisKey = 'week';
    for (let i = 1; i <= 4; i++) {
      timeSeriesStructure.push({ label: `Week ${i}`, key: 'week' });
    }
  } else { // 1 Year -> Months
    xAxisKey = 'month';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    timeSeriesStructure = months.map(month => ({ label: month, key: 'month' }));
  }

  const kpiData = {
    successRate: { value: Math.round(28100 * multiplier), change: -8.2 },
    failedPayments: { value: Math.round(337200 * multiplier), change: -8.2 },
    overdueInvoices: { count: Math.round(7 * multiplier), amount: Math.round(870 * multiplier) },
    recoveryRate: { value: 77.8, recovered: `${Math.round(7 * multiplier)} of ${Math.round(9 * multiplier)}` },
    avgDSO: { value: 28, target: 30 }
  };

  // Generate dynamic chart data based on structure
  const transactionData = timeSeriesStructure.map(item => ({
    [item.key]: item.label,
    successful: Math.round(Math.random() * 200 * multiplier + 50),
    failed: Math.round(Math.random() * 15 * multiplier + 2),
    refunded: Math.round(Math.random() * 8 * multiplier + 1)
  }));

  const failedPaymentData = timeSeriesStructure.map(item => ({
    [item.key]: item.label,
    failed: Math.round(Math.random() * 20 * multiplier + 5),
    permanent: Math.round(Math.random() * 10 * multiplier + 2),
    recovered: Math.round(Math.random() * 5 * multiplier + 1)
  }));

  const recoveryRateData = timeSeriesStructure.map(item => ({
    [item.key]: item.label,
    rate: Math.round(60 + Math.random() * 30)
  }));

  const dsoTrendData = timeSeriesStructure.map(item => ({
    [item.key]: item.label,
    actual: Math.round(25 + Math.random() * 10),
    target: 30
  }));

  // Static/Scaled categorical data
  const agingData = [
    { range: '1-30 Days', invoices: Math.round(2 * multiplier) || 1, amount: Math.round(630 * multiplier) },
    { range: '31-60 Days', invoices: Math.round(1 * multiplier) || 1, amount: Math.round(101 * multiplier) },
    { range: '61-90 Days', invoices: Math.round(1 * multiplier) || 1, amount: Math.round(120 * multiplier) },
    { range: '90+ Days', invoices: Math.round(1 * multiplier) || 1, amount: Math.round(19 * multiplier) }
  ];

  return {
    xAxisKey,
    kpiData,
    transactionData,
    agingData,
    failedPaymentData,
    // ... kept static/scaled lists
    recentTransactions: [
      { id: 'TXN-2025-001', date: '2025-01-27', customer: 'TechCorp Inc.', amount: 60, status: 'Successful', method: 'Credit Card', invoice: 'INV-2025-234' },
      { id: 'TXN-2025-002', date: '2025-01-27', customer: 'Retail Solutions', amount: 12, status: 'Successful', method: 'Stripe', invoice: 'INV-2025-235' },
      { id: 'TXN-2025-003', date: '2025-01-26', customer: 'HealthCare Plus', amount: 8, status: 'Failed', method: 'Credit Card', invoice: 'INV-2025-236' },
      { id: 'TXN-2025-004', date: '2025-01-28', customer: 'Education Hub', amount: 12, status: 'Successful', method: 'Paystack', invoice: 'INV-2025-237' },
      { id: 'TXN-2025-005', date: '2025-01-25', customer: 'Restaurant Chain', amount: 60, status: 'Refunded', method: 'Flutterwave', invoice: 'INV-2025-238' }
    ],
    overdueInvoices: [
      { invoice: 'INV-2024-023', customer: 'Retail Solutions', amount: 12, dueDate: '2024-12-15', daysOverdue: 45, category: '31-60 days', status: 'Overdue' },
      { invoice: 'INV-2024-045', customer: 'HealthCare Plus', amount: 3, dueDate: '2024-12-28', daysOverdue: 30, category: '1-30 days', status: 'Overdue' },
      { invoice: 'INV-2025-012', customer: 'TechCorp Inc.', amount: 60, dueDate: '2025-01-05', daysOverdue: 22, category: '1-30 days', status: 'Overdue' },
      { invoice: 'INV-2024-023', customer: 'Education Hub', amount: 12, dueDate: '2024-11-20', daysOverdue: 68, category: '61-90 days', status: 'Overdue' },
      { invoice: 'INV-2024-738', customer: 'Downtown Retail', amount: 3, dueDate: '2024-10-12', daysOverdue: 107, category: '90+ days', status: 'Critical' }
    ],
    recoveryRateData,
    delinquentAccounts: [
        { customer: 'Retail Solutions', plan: 'Business', balance: 36, lastPayment: '2024-10-15', daysOverdue: 104, attempts: 5, status: 'Critical' },
        { customer: 'HealthCare Plus', plan: 'Starter', balance: 60, lastPayment: '2024-12-20', daysOverdue: 38, attempts: 3, status: 'Warning' },
        { customer: 'Downtown Retail', plan: 'Starter', balance: 60, lastPayment: '2024-12-28', daysOverdue: 30, attempts: 2, status: 'Warning' }
    ],
    refundData: [
        { id: 'REF-2025-012', date: '2025-01-25', customer: 'Restaurant Chain', amount: 600, type: 'Refund', reason: 'Service dissatisfaction', fee: '-', status: 'Completed' },
        { id: 'CHB-2025-003', date: '2025-01-22', customer: 'Tech Startup', amount: 100, type: 'Chargeback', reason: 'Unauthorized charge', fee: 15, status: 'Under Review' },
        { id: 'REF-2025-008', date: '2025-01-18', customer: 'Education Hub', amount: 30, type: 'Refund', reason: 'Billing error', fee: '-', status: 'Completed' }
    ],
    taxByJurisdiction: [
        { jurisdiction: 'California, USA', transactions: Math.round(45 * multiplier), revenue: Math.round(4620 * multiplier), rate: '7.25%', collected: Math.round(335 * multiplier) },
        { jurisdiction: 'New York, USA', transactions: Math.round(38 * multiplier), revenue: Math.round(4460 * multiplier), rate: '8.82%', collected: Math.round(393 * multiplier) },
        { jurisdiction: 'Texas, USA', transactions: Math.round(33 * multiplier), revenue: Math.round(3660 * multiplier), rate: '6.25%', collected: Math.round(228 * multiplier) },
        { jurisdiction: 'United Kingdom', transactions: Math.round(28 * multiplier), revenue: Math.round(3360 * multiplier), rate: '20%', collected: Math.round(672 * multiplier) },
        { jurisdiction: 'Germany', transactions: Math.round(22 * multiplier), revenue: Math.round(2640 * multiplier), rate: '19%', collected: Math.round(501 * multiplier) },
        { jurisdiction: 'Canada', transactions: Math.round(19 * multiplier), revenue: Math.round(2280 * multiplier), rate: '13%', collected: Math.round(296 * multiplier) },
        { jurisdiction: 'Japan', transactions: Math.round(184 * multiplier), revenue: Math.round(22080 * multiplier), rate: '10%', collected: Math.round(2208 * multiplier) }
    ],
    dsoTrendData,
    planPieData: [
        { name: 'Starter', value: 67 },
        { name: 'Business', value: 33 }
    ],
    taxRegionData: [
        { name: 'Texas, USA', value: 20 },
        { name: 'California, USA', value: 28 },
        { name: 'United Kingdom', value: 16 },
        { name: 'Germany', value: 18 },
        { name: 'Canada', value: 18 }
    ]
  };
};

const BillingDashboard = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === 'dark' || currentTheme === 'dark');

  const [timeRange, setTimeRange] = useState(30);

  const {
    xAxisKey,
    kpiData,
    transactionData,
    recentTransactions,
    agingData,
    overdueInvoices,
    failedPaymentData,
    recoveryRateData,
    delinquentAccounts,
    refundData,
    taxByJurisdiction,
    dsoTrendData,
    planPieData,
    taxRegionData
  } = useMemo(() => generateBillingData(timeRange), [timeRange]);

  const timeRanges = [
    { value: 1, label: 'Last 1 day' },
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 365, label: 'Last 1 year' }
  ];

  const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

  const theme = {
    bg: 'bg-gray-50 dark:bg-gray-900',
    card: 'bg-white dark:bg-gray-800',
    text: 'text-gray-900 dark:text-gray-100',
    textSecondary: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-700'
  };

  const tabs = [
    { id: 'transactions', label: 'Transactions' },
    { id: 'invoice-aging', label: 'Invoice Aging' },
    { id: 'failed-payment', label: 'Failed Payment' },
    { id: 'delinquency', label: 'Delinquency' },
    { id: 'refund', label: 'Refund' },
    { id: 'tax', label: 'Tax' },
    { id: 'dso', label: 'DSO' }
  ];

  // --- Render Functions ---
  const renderTransactionsTab = () => (
    <div className="space-y-6">
      <div className={`bg-navbarBg rounded-lg p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Detailed Transaction Report</h3>
        <p className={`${theme.textSecondary} text-sm mb-6`}>Complete transaction history with status and payment methods</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-navbarBg rounded-xl border border-border">
            <div className="text-3xl font-bold text-purple-600">387</div>
            <div className={`text-sm ${theme.textSecondary}`}>Total Transactions</div>
          </div>
          <div className="text-center p-4 bg-navbarBg rounded-xl border border-border">
            <div className="text-3xl font-bold text-green-600">378</div>
            <div className={`text-sm ${theme.textSecondary}`}>Successful</div>
          </div>
          <div className="text-center p-4 bg-navbarBg rounded-xl border border-border">
            <div className="text-3xl font-bold text-red-600">9</div>
            <div className={`text-sm ${theme.textSecondary}`}>Failed</div>
          </div>
          <div className="text-center p-4 bg-navbarBg rounded-xl border border-border">
            <div className="text-3xl font-bold text-orange-600">3</div>
            <div className={`text-sm ${theme.textSecondary}`}>Refunded</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey={xAxisKey} stroke={isDark ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                color: isDark ? '#f3f4f6' : '#111827'
              }}
            />
            <Legend />
            <Bar dataKey="successful" fill="#10b981" name="Successful" />
            <Bar dataKey="failed" fill="#ef4444" name="Failed" />
            <Bar dataKey="refunded" fill="#f59e0b" name="Refunded" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={`bg-navbarBg rounded-lg p-6 shadow-sm border border-border`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${theme.text}`}>Recent Transactions</h3>
          <button className={`p-2 ${theme.hover} rounded-lg`}>
            <Filter size={20} className={theme.text} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme.border}`}>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Transaction ID</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Date</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Customer</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Amount</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Status</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Payment Method</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className={`border-b ${theme.border} ${theme.hover}`}>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{txn.id}</td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{txn.date}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{txn.customer}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>${txn.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      txn.status === 'Successful' ? 'bg-green-100 text-green-800' :
                      txn.status === 'Failed' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{txn.method}</td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{txn.invoice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className='border border-border rounded-xl p-4'>
            <h4 className={`font-semibold mb-2 ${theme.text}`}>Payment Methods</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={theme.textSecondary}>Credit Card</span>
                <span className={theme.text}>49%</span>
              </div>
              <div className="flex justify-between">
                <span className={theme.textSecondary}>Stripe</span>
                <span className={theme.text}>39%</span>
              </div>
              <div className="flex justify-between">
                <span className={theme.textSecondary}>Paystack</span>
                <span className={theme.text}>10%</span>
              </div>
              <div className="flex justify-between">
                <span className={theme.textSecondary}>Flutterwave</span>
                <span className={theme.text}>3%</span>
              </div>
            </div>
          </div>
          
          <div className='border border-border rounded-xl p-4'>
            <h4 className={`font-semibold mb-2 ${theme.text}`}>Transaction Volume</h4>
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${theme.text}`}>$43,890</div>
              <div className={`text-sm ${theme.textSecondary}`}>Total processed this month</div>
              <div className="text-sm text-green-600">+12.4% vs last month</div>
            </div>
          </div>
          
          <div className='border border-border rounded-xl p-4'>
            <h4 className={`font-semibold mb-2 ${theme.text}`}>Average Transaction</h4>
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${theme.text}`}>$113</div>
              <div className={`text-sm ${theme.textSecondary}`}>Per transaction</div>
              <div className="text-sm text-green-600">+3.8% increase</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoiceAgingTab = () => (
    <div className="space-y-6">
      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Invoice Aging Report</h3>
        <p className={`${theme.textSecondary} text-sm mb-6`}>Outstanding invoices categorized by age</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-50 border border-border">
            <div className="text-sm text-gray-600 mb-1">1-30 Days</div>
            <div className="text-2xl font-bold text-gray-900">2 invoices</div>
            <div className="text-sm text-yellow-600">$630 outstanding</div>
          </div>
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-50 border border-border">
            <div className="text-sm text-gray-600 mb-1">31-60 Days</div>
            <div className="text-2xl font-bold text-gray-900">1 invoice</div>
            <div className="text-sm text-orange-600">$101 outstanding</div>
          </div>
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-50 border border-border">
            <div className="text-sm text-gray-600 mb-1">61-90 Days</div>
            <div className="text-2xl font-bold text-gray-900">1 invoice</div>
            <div className="text-sm text-red-600">$120 outstanding</div>
          </div>
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-100 border border-border">
            <div className="text-sm text-gray-600 mb-1">90+ Days</div>
            <div className="text-2xl font-bold text-gray-900">1 invoice</div>
            <div className="text-sm text-red-700">$19 critical</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={agingData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="range" stroke={isDark ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
              }}
            />
            <Bar dataKey="amount" fill="#f59e0b" name="Outstanding Amount ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Overdue Invoice Details</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme.border}`}>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Invoice</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Customer</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Amount</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Due Date</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Days Overdue</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Category</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {overdueInvoices.map((invoice, idx) => (
                <tr key={idx} className={`border-b ${theme.border} ${theme.hover}`}>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{invoice.invoice}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{invoice.customer}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>${invoice.amount}</td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{invoice.dueDate}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{invoice.daysOverdue} days</td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{invoice.category}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-border rounded-xl">
          <div className="flex items-start">
            <AlertTriangle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-blue-900 font-medium">Collection Priority: Focus on 90+ day overdue invoices first</p>
              <p className="text-sm text-blue-700 mt-1">These accounts have the highest risk of becoming uncollectible. Consider automated reminders and personal outreach for invoices over 60 days past due.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFailedPaymentTab = () => (
    <div className="space-y-6">
      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Failed Payments Analysis</h3>
        <p className={`${theme.textSecondary} text-sm mb-6`}>Tracker for failed transaction attempts and recovery</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 pb-6">
            <h4 className={`font-semibold mb-4 ${theme.text}`}>Failed Payments vs Recovery</h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={failedPaymentData}>
                <defs>
                  <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey={xAxisKey} stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
                  }}
                />
                <Area type="monotone" dataKey="failed" stroke="#ef4444" fillOpacity={1} fill="url(#colorFailed)" name="Failed Attempts" />
                <Area type="monotone" dataKey="recovered" stroke="#10b981" fillOpacity={1} fill="url(#colorRecovered)" name="Recovered" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="h-80 pb-6">
            <h4 className={`font-semibold mb-4 ${theme.text}`}>Recovery Rate Trend</h4>
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={recoveryRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey={xAxisKey} stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <YAxis domain={[60, 100]} stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
                  }}
                />
                <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2} name="Recovery Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Dunning Effectiveness</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-900">Email Campaign</div>
                <div className="text-sm text-gray-600">First retry attempt</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">65%</div>
                <div className="text-sm text-gray-600">success rate</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-900">In-App Prompt</div>
                <div className="text-sm text-gray-600">Final automated attempt</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-600">8%</div>
                <div className="text-sm text-gray-600">success rate</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-900">Manual Outreach</div>
                <div className="text-sm text-gray-600">Personal contact after automation</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">15%</div>
                <div className="text-sm text-gray-600">still in progress</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className={`font-semibold mb-3 ${theme.text}`}>Common Failure Reasons</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-navbarBg border border-border rounded-sm">
              <span className={theme.text}>Insufficient Funds</span>
              <span className="text-red-600 font-semibold">44%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-navbarBg border border-border rounded-sm">
              <span className={theme.text}>Expired Card</span>
              <span className="text-orange-600 font-semibold">32%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-navbarBg border border-border rounded-sm">
              <span className={theme.text}>Card Declined</span>
              <span className="text-yellow-600 font-semibold">13%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-navbarBg border border-border rounded-sm">
              <span className={theme.text}>Technical Error</span>
              <span className="text-blue-600 font-semibold">6%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDelinquencyTab = () => (
    <div className="space-y-6">
      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Overdue & Delinquency Report</h3>
        <p className={`${theme.textSecondary} text-sm mb-6`}>Accounts with payment issues and outstanding balances</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="text-sm text-gray-600 mb-1">Delinquent Accounts</div>
            <div className="text-3xl font-bold text-red-600">3</div>
            <div className="text-sm text-red-600">Active delinquencies</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <div className="text-sm text-gray-600 mb-1">Total Outstanding</div>
            <div className="text-3xl font-bold text-orange-600">$510</div>
            <div className="text-sm text-orange-600">Across 3 accounts</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="text-sm text-gray-600 mb-1">Avg Days Past Due</div>
            <div className="text-3xl font-bold text-yellow-600">57</div>
            <div className="text-sm text-yellow-600">Average delay</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-sm text-gray-600 mb-1">Collection Attempts</div>
            <div className="text-3xl font-bold text-blue-600">10</div>
            <div className="text-sm text-blue-600">Total this month</div>
          </div>
        </div>
      </div>

      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Delinquent Account Details</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme.border}`}>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Customer</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Plan</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Outstanding Balance</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Last Payment</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Days Past Due</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Collection Attempts</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Status</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {delinquentAccounts.map((account, idx) => (
                <tr key={idx} className={`border-b ${theme.border} ${theme.hover}`}>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{account.customer}</td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{account.plan}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>${account.balance}</td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{account.lastPayment}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{account.daysOverdue} days</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{account.attempts}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      account.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Delinquency by Plan Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={planPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {planPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Collection Actions Required</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center mb-2">
                <AlertTriangle className="text-red-600 mr-2" size={20} />
                <span className="font-semibold text-gray-900">Critical Priority</span>
              </div>
              <p className="text-sm text-gray-700">1 account over 90 days past due</p>
              <p className="text-xs text-gray-600 mt-1">Requires immediate escalation</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center mb-2">
                <Clock className="text-yellow-600 mr-2" size={20} />
                <span className="font-semibold text-gray-900">High Priority</span>
              </div>
              <p className="text-sm text-gray-700">2 accounts 30-60 days past due</p>
              <p className="text-xs text-gray-600 mt-1">Schedule follow-up calls</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 bg-blue-50 border border-blue-200 rounded-xl`}>
        <div className="flex items-start">
          <AlertTriangle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-blue-900 font-medium">Recommended Action</p>
            <p className="text-sm text-blue-700 mt-1">Accounts past 90 days should be escalated to senior management. Consider payment plan negotiations or service suspension for accounts with multiple failed collection attempts. Document all contact attempts for compliance.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRefundTab = () => (
    <div className="space-y-6">
      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Refund & Chargeback Report</h3>
        <p className={`${theme.textSecondary} text-sm mb-6`}>Track refunds and customer-initiated disputes</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
            <RefreshCw className="mx-auto text-orange-600 mb-2" size={32} />
            <div className="text-3xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-600">Total Refunds</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <DollarSign className="mx-auto text-yellow-600 mb-2" size={32} />
            <div className="text-3xl font-bold text-yellow-600">$630</div>
            <div className="text-sm text-gray-600">Refund Amount</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
            <AlertTriangle className="mx-auto text-red-600 mb-2" size={32} />
            <div className="text-3xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Chargebacks</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
            <DollarSign className="mx-auto text-purple-600 mb-2" size={32} />
            <div className="text-3xl font-bold text-purple-600">$15</div>
            <div className="text-sm text-gray-600">Chargeback Fees</div>
          </div>
        </div>
      </div>

      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Refund & Chargeback Details</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme.border}`}>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>ID</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Date</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Customer</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Amount</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Type</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Reason</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Fee</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {refundData.map((item) => (
                <tr key={item.id} className={`border-b ${theme.border} ${theme.hover}`}>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{item.id}</td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{item.date}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{item.customer}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>${item.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === 'Refund' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{item.reason}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{item.fee}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Refund Reasons</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={theme.text}>Service dissatisfaction</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-orange-600 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
                <span className="text-sm font-semibold">50%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.text}>Billing error</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-orange-600 h-2 rounded-full" style={{width: '33%'}}></div>
                </div>
                <span className="text-sm font-semibold">33%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.text}>Technical issues</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-orange-600 h-2 rounded-full" style={{width: '17%'}}></div>
                </div>
                <span className="text-sm font-semibold">17%</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Chargeback Rate</h3>
          <div className="text-center py-4">
            <div className="text-5xl font-bold text-yellow-600">0.26%</div>
            <div className={`text-sm ${theme.textSecondary} mt-2`}>1 chargeback / 387 transactions</div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">Chargeback rate is healthy and within acceptable limits</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`bg-navbarBg rounded-xl p-4 shadow-sm border border-border`}>
          <h4 className={`font-semibold mb-2 ${theme.text}`}>Refund Rate</h4>
          <div className="text-2xl font-bold text-orange-600">0.77%</div>
          <div className={`text-sm ${theme.textSecondary}`}>3 refunds / 387 transactions</div>
        </div>
        <div className={`bg-navbarBg rounded-xl p-4 shadow-sm border border-border`}>
          <h4 className={`font-semibold mb-2 ${theme.text}`}>Revenue Impact</h4>
          <div className="text-2xl font-bold text-red-600">$645</div>
          <div className={`text-sm ${theme.textSecondary}`}>Lost revenue (inc. fees)</div>
        </div>
        <div className={`bg-navbarBg rounded-xl p-4 shadow-sm border border-border`}>
          <h4 className={`font-semibold mb-2 ${theme.text}`}>Avg Refund Value</h4>
          <div className="text-2xl font-bold text-purple-600">$210</div>
          <div className={`text-sm ${theme.textSecondary}`}>Per refund request</div>
        </div>
      </div>

      <div className={`p-4 bg-blue-50 border border-blue-200 rounded-xl`}>
        <div className="flex items-start">
          <AlertTriangle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-blue-900 font-medium">Prevention Strategy</p>
            <p className="text-sm text-blue-700 mt-1">Monitor refund reasons. Most refunds are due to service dissatisfaction - consider implementing customer success check-ins during the first 30 days. Chargeback should be investigated immediately to prevent future disputes.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTaxTab = () => (
    <div className="space-y-6">
      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Tax Report</h3>
        <p className={`${theme.textSecondary} text-sm mb-6`}>Sales tax and GST breakdown by jurisdiction</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-sm text-gray-600 mb-1">Tax by Collected</div>
            <div className="text-3xl font-bold text-blue-600">$2,490</div>
            <div className="text-sm text-blue-600">This month</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-sm text-gray-600 mb-1">Jurisdictions</div>
            <div className="text-3xl font-bold text-green-600">6</div>
            <div className="text-sm text-green-600">Active regions</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="text-sm text-gray-600 mb-1">Taxable Revenue</div>
            <div className="text-3xl font-bold text-purple-600">$22,080</div>
            <div className="text-sm text-purple-600">Total taxable</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
            <div className="text-sm text-gray-600 mb-1">Avg Tax Rate</div>
            <div className="text-3xl font-bold text-orange-600">11.3%</div>
            <div className="text-sm text-orange-600">Weighted average</div>
          </div>
        </div>
      </div>

      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Tax Breakdown by Jurisdiction</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme.border}`}>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Jurisdiction</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Transactions</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Taxable Revenue</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Tax Rate</th>
                <th className={`text-left py-3 px-4 ${theme.textSecondary} font-medium text-sm`}>Tax Collected</th>
              </tr>
            </thead>
            <tbody>
              {taxByJurisdiction.map((item, idx) => (
                <tr key={idx} className={`border-b ${theme.border} ${theme.hover}`}>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{item.jurisdiction}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>{item.transactions}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm`}>${item.revenue.toLocaleString()}</td>
                  <td className={`py-3 px-4 ${theme.textSecondary} text-sm`}>{item.rate}</td>
                  <td className={`py-3 px-4 ${theme.text} text-sm font-semibold`}>${item.collected.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Tax Collection by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taxRegionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(name || '').split(',')[0]}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {taxRegionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Tax Compliance Status</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-2" size={20} />
                <span className="font-medium text-gray-900">USA - Sales Tax</span>
              </div>
              <span className="text-sm text-green-700 font-semibold">Compliant</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-2" size={20} />
                <span className="font-medium text-gray-900">UK - VAT</span>
              </div>
              <span className="text-sm text-green-700 font-semibold">Compliant</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-2" size={20} />
                <span className="font-medium text-gray-900">EU - VAT</span>
              </div>
              <span className="text-sm text-green-700 font-semibold">Compliant</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-2" size={20} />
                <span className="font-medium text-gray-900">Canada - GST/HST</span>
              </div>
              <span className="text-sm text-green-700 font-semibold">Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDSOTab = () => (
    <div className="space-y-6">
      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>DSO Analysis</h3>
        <p className={`${theme.textSecondary} text-sm mb-6`}>Day Sales Outstanding (DSO) trend and efficiency metrics</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-sm text-gray-600 mb-1">Current DSO</div>
            <div className="text-3xl font-bold text-green-600">28 days</div>
            <div className="text-sm text-green-600">2 days below target</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-sm text-gray-600 mb-1">Best Possible DSO</div>
            <div className="text-3xl font-bold text-blue-600">22 days</div>
            <div className="text-sm text-blue-600">Theoretical minimum</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="text-sm text-gray-600 mb-1">Collection Efficiency</div>
            <div className="text-3xl font-bold text-purple-600">77.8%</div>
            <div className="text-sm text-purple-600">Collection Effectiveness Index</div>
          </div>
        </div>

        <div className="h-80 p-6">
          <h4 className={`font-semibold mb-4 ${theme.text}`}>DSO Trend vs Target</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dsoTrendData}>
              <defs>
                <linearGradient id="colorDso" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey={xAxisKey} stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
                }}
              />
              <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDso)" name="Actual DSO" />
              <Area type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" fill="none" name="Target (30 Days)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`bg-navbarBg rounded-xl p-6 shadow-sm border border-border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Aging Bucket Analysis</h3>
        <p className={`${theme.textSecondary} text-sm mb-4`}>Current accounts receivable aging distribution compared to industry standard</p>
        
        <div className="space-y-4">
          <div className="space-y-2">
             <div className="flex justify-between items-center">
               <span className={`${theme.text} w-24`}>Current</span>
               <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                 <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
               </div>
               <span className={`${theme.text} w-16 text-right`}>85%</span>
             </div>
             <div className="flex justify-between items-center">
               <span className={`${theme.text} w-24`}>1-30 Days</span>
               <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                 <div className="bg-yellow-500 h-full rounded-full" style={{ width: '10%' }}></div>
               </div>
               <span className={`${theme.text} w-16 text-right`}>10%</span>
             </div>
             <div className="flex justify-between items-center">
               <span className={`${theme.text} w-24`}>31-60 Days</span>
               <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                 <div className="bg-orange-500 h-full rounded-full" style={{ width: '3%' }}></div>
               </div>
               <span className={`${theme.text} w-16 text-right`}>3%</span>
             </div>
             <div className="flex justify-between items-center">
               <span className={`${theme.text} w-24`}>60+ Days</span>
               <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                 <div className="bg-red-500 h-full rounded-full" style={{ width: '2%' }}></div>
               </div>
               <span className={`${theme.text} w-16 text-right`}>2%</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen`}>
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                <span><Home className="w-4 h-4 text-gray-400" /></span>
                <span>›</span>
                <span>Reports & Analytics</span>
                <span>›</span>
                <span className='text-bgBlue'>Billing & Payment Report</span>
                {/* <span>›</span>
                <span className="text-cyan-600 font-medium">MRR/ARR</span> */}
              </div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme.text}`}>Billing & Payment Report</h1>
              <p className={`${theme.textSecondary} mt-1`}>Comprehensive financial analytics and subscription metrics</p>
            </div>
            <div className="flex items-center gap-3">
              <Dropdown
                value={timeRanges.find(t => t.value === timeRange)?.label || ''}
                options={timeRanges.map(t => t.label)}
                onChange={(label) => setTimeRange(timeRanges.find(t => t.label === label)?.value || 30)}
              />
              <button className="flex items-center gap-2 px-4 py-1.5 border border-bgBlue text-bgBlue rounded-lg transition-colors shadow-customShadow">
                <Download size={18} />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className={`bg-navbarBg rounded-lg p-4 shadow-sm border border-border`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${theme.textSecondary}`}>Success Rate</span>
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div className={`text-2xl font-bold ${theme.text}`}>${kpiData.successRate.value.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
              <TrendingDown size={14} />
              <span>{kpiData.successRate.change}%</span>
              <span className={theme.textSecondary}>From Last Month</span>
            </div>
          </div>

          <div className={`bg-navbarBg rounded-lg p-4 shadow-sm border border-border`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${theme.textSecondary}`}>Failed Payments</span>
              <XCircle size={20} className="text-red-600" />
            </div>
            <div className={`text-2xl font-bold ${theme.text}`}>${kpiData.failedPayments.value.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingDown size={14} />
              <span>{kpiData.failedPayments.change}%</span>
              <span className={theme.textSecondary}>Reduction</span>
            </div>
          </div>

          <div className={`bg-navbarBg rounded-lg p-4 shadow-sm border border-border`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${theme.textSecondary}`}>Overdue Invoices</span>
              <AlertTriangle size={20} className="text-orange-600" />
            </div>
            <div className={`text-2xl font-bold ${theme.text}`}>{kpiData.overdueInvoices.count}</div>
            <div className={`text-sm ${theme.textSecondary} mt-1`}>${kpiData.overdueInvoices.amount} outstanding</div>
          </div>

          <div className={`bg-navbarBg rounded-lg p-4 shadow-sm border border-border`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${theme.textSecondary}`}>Recovery Rate</span>
              <RefreshCw size={20} className="text-purple-600" />
            </div>
            <div className={`text-2xl font-bold ${theme.text}`}>{kpiData.recoveryRate.value}%</div>
            <div className={`text-sm text-green-600 mt-1`}>{kpiData.recoveryRate.recovered} recovered</div>
          </div>

          <div className={`bg-navbarBg rounded-lg p-4 shadow-sm border border-border`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${theme.textSecondary}`}>Avg DSO</span>
              <Clock size={20} className="text-cyan-600" />
            </div>
            <div className={`text-2xl font-bold ${theme.text}`}>{kpiData.avgDSO.value} days</div>
            <div className={`text-sm ${theme.textSecondary} mt-1`}>Below {kpiData.avgDSO.target}-day target</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-navbarBg rounded-full border border-border p-1.5 mb-6 inline-flex gap-2 overflow-x-auto max-w-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-full font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-800 shadow-customShadow'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'transactions' && renderTransactionsTab()}
          {activeTab === 'invoice-aging' && renderInvoiceAgingTab()}
          {activeTab === 'failed-payment' && renderFailedPaymentTab()}
          {activeTab === 'delinquency' && renderDelinquencyTab()}
          {activeTab === 'refund' && renderRefundTab()}
          {activeTab === 'tax' && renderTaxTab()}
          {activeTab === 'dso' && renderDSOTab()}
        </div>
      </div>
    </div>
  );
};

export default BillingDashboard;