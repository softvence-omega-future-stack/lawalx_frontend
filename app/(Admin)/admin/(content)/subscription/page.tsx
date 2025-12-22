// function Subscription() {
//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription & Billing</h1>
//             <p className="mt-2 text-gray-600 dark:text-gray-400">Manage subscription plans, billing, and payment methods</p>
//         </div>
//      );
// }

// export default Subscription;

// app/dashboard/page.tsx
// "use client";

// import React, { useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
// } from 'recharts';
// import { MoonIcon, SunIcon } from 'lucide-react'; // Assuming lucide-react for icons

// const timeOptions = ['Last 1 day', 'Last 7 days', 'Last 30 days', 'Last 1 year'];

// const generateDemoData = (period: string) => {
//   let xLabels: string[] = [];
//   let data = [];

//   switch (period) {
//     case 'Last 1 day':
//       xLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
//       data = xLabels.map((label) => ({
//         name: label,
//         Failed: Math.floor(Math.random() * 10),
//         Recovered: Math.floor(Math.random() * 10),
//         Permanent: Math.floor(Math.random() * 5),
//         RecoveryRate: Math.floor(Math.random() * 100),
//       }));
//       break;
//     case 'Last 7 days':
//       xLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//       data = xLabels.map((label) => ({
//         name: label,
//         Failed: Math.floor(Math.random() * 10),
//         Recovered: Math.floor(Math.random() * 10),
//         Permanent: Math.floor(Math.random() * 5),
//         RecoveryRate: Math.floor(Math.random() * 100),
//       }));
//       break;
//     case 'Last 30 days':
//       xLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
//       data = xLabels.map((label) => ({
//         name: label,
//         Failed: Math.floor(Math.random() * 10),
//         Recovered: Math.floor(Math.random() * 10),
//         Permanent: Math.floor(Math.random() * 5),
//         RecoveryRate: Math.floor(Math.random() * 100),
//       }));
//       break;
//     case 'Last 1 year':
//       xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//       data = xLabels.map((label) => ({
//         name: label,
//         Failed: Math.floor(Math.random() * 10),
//         Recovered: Math.floor(Math.random() * 10),
//         Permanent: Math.floor(Math.random() * 5),
//         RecoveryRate: Math.floor(Math.random() * 100),
//       }));
//       break;
//   }

//   return data;
// };

// const transactionData = [
//   { name: 'Jul', Successful: 150, Failed: 5, Refunded: 2 },
//   { name: 'Aug', Successful: 180, Failed: 3, Refunded: 1 },
//   // Add more based on period
// ];

// const recentTransactions = [
//   {
//     id: 'TXN-2025-001',
//     date: '2025-01-27',
//     customer: 'TechCorp Inc.',
//     amount: '$600',
//     status: 'Successful',
//     method: 'Credit Card',
//     invoice: 'INV-2025-234',
//   },
//   // More entries
// ];

// const paymentMethods = [
//   { method: 'Credit Card', percentage: '42%' },
//   { method: 'PayPal', percentage: '35%' },
//   { method: 'Flutterwave', percentage: '15%' },
//   { method: 'Technical Error', percentage: '8%' },
// ];

// const agingData = [
//   { bucket: '1-30 days', amount: 200 },
//   { bucket: '31-60 days', amount: 120 },
//   { bucket: '61-90 days', amount: 50 },
//   { bucket: '90+ days', amount: 30 },
// ];

// const overdueInvoices = [
//   {
//     invoice: 'INV-2024-942',
//     customer: 'Retail Solutions',
//     amount: '$12',
//     dueDate: '2024-12-15',
//     daysOverdue: '43',
//     category: '31-60 days',
//     status: 'Overdue',
//   },
//   // More
// ];

// const delinquencyData = [
//   {
//     customer: 'Retail Solutions',
//     plan: 'Business',
//     balance: '$36',
//     lastPayment: '2024-10-15',
//     daysPastDue: '104',
//     attempts: '5',
//     status: 'Critical',
//     action: 'Contact',
//   },
//   // More
// ];

// const pieData = [
//   { name: 'Starter', value: 2 },
//   { name: 'Business', value: 1 },
// ];

// const COLORS = ['#F59E0B', '#06B6D4'];

// const refundDemoData = generateDemoData('Last 30 days'); // Similar to failed payments but for refunds
// const taxDemoData = generateDemoData('Last 30 days'); // Tax collections over time
// const dsoDemoData = generateDemoData('Last 30 days'); // DSO trends

// const Dashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('Transactions');
//   const [timePeriod, setTimePeriod] = useState('Last 30 days');
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(generateDemoData(timePeriod));

//   const tabs = [
//     'Transactions',
//     'Invoice Aging',
//     'Failed Payment',
//     'Delinquency',
//     'Refund',
//     'Tax',
//     'DSO',
//   ];

//   const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setTimePeriod(e.target.value);
//     setData(generateDemoData(e.target.value));
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Transactions':
//         return (
//           <div>
//             <h3 className="text-lg font-semibold">Detailed Transaction Report</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={transactionData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="Successful" fill="#22C55E" />
//                 <Bar dataKey="Failed" fill="#EF4444" />
//                 <Bar dataKey="Refunded" fill="#F59E0B" />
//               </BarChart>
//             </ResponsiveContainer>
//             <h4>Recent Transactions</h4>
//             <table className="w-full">
//               {/* Table content from image */}
//             </table>
//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <h4>Payment Methods</h4>
//                 {/* List */}
//               </div>
//               <div>
//                 <h4>Transaction Volume</h4>
//                 <p>$43,890</p>
//               </div>
//               <div>
//                 <h4>Average Transaction</h4>
//                 <p>$113</p>
//               </div>
//             </div>
//           </div>
//         );
//       case 'Invoice Aging':
//         return (
//           <div>
//             <h3 className="text-lg font-semibold">Invoice Aging Report</h3>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="bg-orange-100 p-4">1-30 Days: 2 Invoices $120 outstanding</div>
//               {/* Other buckets */}
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={agingData} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" />
//                 <YAxis dataKey="bucket" type="category" />
//                 <Tooltip />
//                 <Bar dataKey="amount" fill="#F59E0B" />
//               </BarChart>
//             </ResponsiveContainer>
//             <h4>Overdue Invoice Details</h4>
//             <table className="w-full">
//               {/* Table */}
//             </table>
//           </div>
//         );
//       case 'Failed Payment':
//         return (
//           <div>
//             <h3 className="text-lg font-semibold">Failed Payment During Efforts</h3>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="bg-red-100 p-4">Failed This Month: 9</div>
//               <div className="bg-green-100 p-4">Successfully Recovered: 7</div>
//               <div className="bg-orange-100 p-4">Permanent Failures: 2</div>
//               <div className="bg-yellow-100 p-4">Recovery Rate: 77.8%</div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="Failed" fill="#EF4444" />
//                 <Bar dataKey="Recovered" fill="#22C55E" />
//                 <Bar dataKey="Permanent" fill="#F59E0B" />
//               </BarChart>
//             </ResponsiveContainer>
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="RecoveryRate" stroke="#A855F7" />
//               </LineChart>
//             </ResponsiveContainer>
//             <h4>Dunning Strategy Performance</h4>
//             {/* List of strategies */}
//             <h4>Common Failure Reasons</h4>
//             {/* Bar list */}
//           </div>
//         );
//       case 'Delinquency':
//         return (
//           <div>
//             <h3 className="text-lg font-semibold">Overdue & Delinquency Report</h3>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="bg-red-100 p-4">Delinquent Accounts: 3</div>
//               <div className="bg-orange-100 p-4">Total Outstanding: $510</div>
//               <div className="p-4">Avg Days Past Due: 57</div>
//               <div className="p-4">Collection Attempts: 10</div>
//             </div>
//             <h4>Delinquent Account Details</h4>
//             <table className="w-full">
//               {/* Table */}
//             </table>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h4>Delinquency by Plan Type</h4>
//                 <ResponsiveContainer width="100%" height={200}>
//                   <PieChart>
//                     <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div>
//                 <h4>Collection Actions Required</h4>
//                 {/* Alerts */}
//               </div>
//             </div>
//           </div>
//         );
//       case 'Refund':
//         // Demo content for Refund tab
//         return (
//           <div>
//             <h3 className="text-lg font-semibold">Refund Report</h3>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="bg-orange-100 p-4">Total Refunds: 15</div>
//               <div className="bg-green-100 p-4">Processed: 12</div>
//               <div className="bg-red-100 p-4">Pending: 3</div>
//               <div className="bg-yellow-100 p-4">Refund Rate: 5.2%</div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={refundDemoData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="Processed" fill="#22C55E" />
//                 <Bar dataKey="Pending" fill="#F59E0B" />
//                 <Bar dataKey="Failed" fill="#EF4444" />
//               </BarChart>
//             </ResponsiveContainer>
//             <h4>Common Refund Reasons</h4>
//             {/* List or bars */}
//             <h4>Recent Refunds</h4>
//             <table className="w-full">
//               {/* Demo table */}
//             </table>
//           </div>
//         );
//       case 'Tax':
//         // Demo content for Tax tab
//         return (
//           <div>
//             <h3 className="text-lg font-semibold">Tax Collection Report</h3>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="bg-blue-100 p-4">Total Tax Collected: $12,500</div>
//               <div className="bg-green-100 p-4">VAT: $8,000</div>
//               <div className="bg-orange-100 p-4">Sales Tax: $4,500</div>
//               <div className="bg-yellow-100 p-4">Compliance Rate: 98%</div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={taxDemoData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="Collected" stroke="#3B82F6" />
//                 <Line type="monotone" dataKey="Pending" stroke="#F59E0B" />
//               </LineChart>
//             </ResponsiveContainer>
//             <h4>Tax by Region</h4>
//             {/* Pie or table */}
//           </div>
//         );
//       case 'DSO':
//         // Demo content for DSO tab
//         return (
//           <div>
//             <h3 className="text-lg font-semibold">Days Sales Outstanding Report</h3>
//             <div className="grid grid-cols-4 gap-4">
//               <div className="bg-purple-100 p-4">Current DSO: 28 days</div>
//               <div className="bg-green-100 p-4">Improvement: -2 days</div>
//               <div className="bg-red-100 p-4">High DSO Accounts: 4</div>
//               <div className="bg-yellow-100 p-4">Average Collection Period: 25 days</div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={dsoDemoData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="DSO" stroke="#A855F7" />
//               </LineChart>
//             </ResponsiveContainer>
//             <h4>DSO Breakdown by Customer</h4>
//             <table className="w-full">
//               {/* Demo table */}
//             </table>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen p-6`}>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Billing & Payment Management</h1>
//         <div className="flex items-center space-x-4">
//           <select value={timePeriod} onChange={handleTimeChange} className="border p-2">
//             {timeOptions.map((opt) => (
//               <option key={opt}>{opt}</option>
//             ))}
//           </select>
//           <button className="bg-blue-500 text-white p-2">Export Financial Report</button>
//           <button onClick={toggleDarkMode}>
//             {darkMode ? <SunIcon /> : <MoonIcon />}
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-5 gap-4 mb-6">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//           <h2>Success Rate</h2>
//           <p>97.7% +1.2% from last month</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//           <h2>Failed Payments</h2>
//           <p>9 -31% reduction</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//           <h2>Overdue Invoices</h2>
//           <p>5 $870 outstanding</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//           <h2>Recovery Rate</h2>
//           <p>77.8% 7 of 9 recovered</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//           <h2>Avg DSO</h2>
//           <p>28 days Below 30-day target</p>
//         </div>
//       </div>
//       <div className="flex space-x-4 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`p-2 ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//       {renderContent()}
//     </div>
//   );
// };

// export default Dashboard;

"use client";

import React, { useState } from "react";
import {
  Users,
  FileText,
  CreditCard,
  Gift,
  Search,
  MoreVertical,
  ChevronDown,
  Home,
  Eye,
  RefreshCw,
  X,
  Edit,
  Trash2,
  Upload,
  LayoutTemplate,
} from "lucide-react";

// Types
interface Subscriber {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Professional" | "Business" | "Trial";
  amount: number;
  paymentCycle: "Monthly" | "Yearly" | "---";
  nextBilling: string;
  revenue: number;
}

interface Invoice {
  id: string;
  user: string;
  email: string;
  paymentMethod: string;
  cardLast4: string;
  amount: number;
  status: "Paid";
  date: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  users: number;
  devices: number;
  storage: string;
  uploadLimits: string;
  templates: number;
}

interface Coupon {
  code: string;
  discount: string;
  cycle: string;
  usage: { current: number; total: number };
  status: "Active" | "Expired";
  expiryDate: string;
}

type TabType = "subscribers" | "billing" | "plans" | "coupons";

// Mock Data
const PLANS = ["Starter", "Professional", "Business", "Trial"] as const;
const PAYMENT_CYCLES = ["Monthly", "Yearly", "---"] as const;

const mockSubscribers: Subscriber[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
  plan: PLANS[i % PLANS.length],
  amount: 299.0,
  paymentCycle: PAYMENT_CYCLES[i % PAYMENT_CYCLES.length],
  nextBilling: "Dec 22, 2025",
  revenue: i % 2 === 0 ? 231.0 : 0,
}));

const mockInvoices: Invoice[] = Array.from({ length: 20 }, (_, i) => ({
  id: `INV-2025-${i + 1}`,
  user: `User ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
  paymentMethod: "visa",
  cardLast4: "4025",
  amount: 299.0,
  status: "Paid",
  date: "December 15, 2025",
}));

const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Demo (For Developers)",
    description: "Perfect for growing businesses with advanced needs",
    price: 0,
    users: 120,
    devices: 100,
    storage: "100 GB",
    uploadLimits: "Max 200 Files",
    templates: 20,
  },
  {
    id: "2",
    name: "Free Trial",
    description: "Perfect for growing businesses with advanced needs",
    price: 0,
    users: 120,
    devices: 20,
    storage: "10 GB",
    uploadLimits: "Max 20 Files",
    templates: 1,
  },
  {
    id: "3",
    name: "Starter",
    description: "Perfect for growing businesses with advanced needs",
    price: 0,
    users: 120,
    devices: 20,
    storage: "10 GB",
    uploadLimits: "Max 20 Files",
    templates: 1,
  },
  {
    id: "4",
    name: "Business",
    description: "Perfect for growing businesses with advanced needs",
    price: 0,
    users: 120,
    devices: 20,
    storage: "10 GB",
    uploadLimits: "Max 20 Files",
    templates: 1,
  },
];

const mockCoupons: Coupon[] = Array.from({ length: 20 }, (_, i) => ({
  code: `COUPON${i + 1}`,
  discount: "30%",
  cycle: ["Once", "3 months", "1 year", "Forever"][i % 4],
  usage: { current: 156, total: 500 },
  status: i % 2 === 0 ? "Active" : "Expired",
  expiryDate: "December 15, 2025",
}));

// Header Component
const PageHeader: React.FC = () => (
  <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <div className="px-6 py-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
      <Home className="w-3.5 h-3.5" />
      <span>/</span>
      <span>Subscription & Billing</span>
    </div>
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Subscription & Billing
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your subscribers, plans and promotions
          </p>
        </div>
      </div>
      <button className="px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
        <Eye className="w-3.5 h-3.5" />
        View Reports
      </button>
    </div>
  </div>
);

// Tabs Component
const Tabs: React.FC<{
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: "subscribers" as TabType,
      label: "Subscribers",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "billing" as TabType,
      label: "Billing & Invoices",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "plans" as TabType,
      label: "Plans",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      id: "coupons" as TabType,
      label: "Coupons",
      icon: <Gift className="w-4 h-4" />,
    },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="px-6 flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Pagination Component
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Showing {(currentPage - 1) * 6 + 1} to{" "}
        {Math.min(currentPage * 6, totalPages * 6)} of {totalPages * 6} items
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Subscribers Tab
const SubscribersTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("All Plans");
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const plans = ["All Plans", "Starter", "Professional", "Business", "Trial"];
  const itemsPerPage = 6;
  const filteredSubscribers = mockSubscribers.filter(
    (sub) =>
      (selectedPlan === "All Plans" || sub.plan === selectedPlan) &&
      (sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const currentData = filteredSubscribers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            All Users ({mockSubscribers.length})
          </h2>
        </div>

        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowPlanDropdown(!showPlanDropdown)}
              className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2"
            >
              {selectedPlan}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showPlanDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {showPlanDropdown && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
                {plans.map((plan) => (
                  <button
                    key={plan}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setShowPlanDropdown(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 ${
                      selectedPlan === plan
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  User
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Plan
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Payment Cycle
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Next Billing
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Revenue
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((subscriber) => (
                <tr
                  key={subscriber.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {subscriber.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {subscriber.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        subscriber.plan === "Starter"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : subscriber.plan === "Professional"
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                          : subscriber.plan === "Business"
                          ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {subscriber.plan}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-900 dark:text-white">
                    ${subscriber.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-900 dark:text-white">
                    {subscriber.paymentCycle}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {subscriber.nextBilling}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-900 dark:text-white">
                    ${subscriber.revenue.toFixed(2)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === subscriber.id
                              ? null
                              : subscriber.id
                          )
                        }
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {showActionMenu === subscriber.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5" />
                            View Invoices
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5" />
                            Change Plan
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
                            <X className="w-3.5 h-3.5" />
                            Cancel Plan
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

// Billing Tab
const BillingTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedMonth, setSelectedMonth] = useState("This Month");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const filteredInvoices = mockInvoices.filter(
    (inv) =>
      (selectedStatus === "All Status" || inv.status === selectedStatus) &&
      (inv.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const currentData = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Payment History
          </h2>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
            Download All
          </button>
        </div>

        <div className="p-5 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or invoice ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Invoice
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  User
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Payment Method
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {invoice.id}
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.user}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {invoice.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">
                        VISA
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        •••• •••• •••• {invoice.cardLast4}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-900 dark:text-white">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {invoice.date}
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

// Plans Tab
const PlansTab: React.FC = () => {
  const [yearlyDiscount, setYearlyDiscount] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            All Plans
          </h2>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
            Create New Plan
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockPlans.map((plan) => (
            <div
              key={plan.id}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-5 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  /month
                </span>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  {plan.users} Users
                </span>
              </div>

              <div className="space-y-3 mb-5 flex-grow">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <Users className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Devices
                  </span>
                  <span className="ml-auto font-medium text-gray-900 dark:text-white">
                    {plan.devices}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <CreditCard className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Storage
                  </span>
                  <span className="ml-auto font-medium text-gray-900 dark:text-white">
                    {plan.storage}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <Upload className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Upload Limits
                  </span>
                  <span className="ml-auto font-medium text-gray-900 dark:text-white">
                    {plan.uploadLimits}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <LayoutTemplate className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Templates
                  </span>
                  <span className="ml-auto font-medium text-gray-900 dark:text-white">
                    {plan.templates}
                  </span>
                </div>
              </div>

              <button className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
          ))}
        </div>

        <div className="p-5 bg-orange-50 dark:bg-orange-900/10 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Yearly Discount
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={yearlyDiscount}
                onChange={(e) => setYearlyDiscount(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Offer a discount for yearly billing.
          </p>
          <div className="relative">
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              className="w-full pr-8 pl-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Coupons Tab
const CouponsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedMonth, setSelectedMonth] = useState("This Month");
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const filteredCoupons = mockCoupons.filter(
    (coupon) =>
      (selectedStatus === "All Status" || coupon.status === selectedStatus) &&
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const currentData = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Coupon Management
          </h2>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
            Create New Coupon
          </button>
        </div>

        <div className="p-5 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Expired</option>
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Code
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Discount
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Coupon Cycle
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Usage
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Expiry Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((coupon) => (
                <tr
                  key={coupon.code}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {coupon.code}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-900 dark:text-white">
                    {coupon.discount}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-900 dark:text-white">
                    {coupon.cycle}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{
                            width: `${
                              (coupon.usage.current / coupon.usage.total) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {coupon.usage.current}/{coupon.usage.total}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        coupon.status === "Active"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {coupon.expiryDate}
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === coupon.code ? null : coupon.code
                          )
                        }
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {showActionMenu === coupon.code && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
                            <Edit className="w-3.5 h-3.5" />
                            Edit Coupon
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-orange-600 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
                            <X className="w-3.5 h-3.5" />
                            Stop Coupon
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const SubscriptionBilling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("subscribers");
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "subscribers" && <SubscribersTab />}
      {activeTab === "billing" && <BillingTab />}
      {activeTab === "plans" && <PlansTab />}
      {activeTab === "coupons" && <CouponsTab />}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default SubscriptionBilling;
