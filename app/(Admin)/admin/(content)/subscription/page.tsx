function Subscription() {
    return ( 
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription & Billing</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Manage subscription plans, billing, and payment methods</p>
        </div>
     );
}

export default Subscription;






// app/dashboard/page.tsx
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