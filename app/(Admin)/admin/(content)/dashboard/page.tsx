// "use client";

// import React from 'react';
// import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { TrendingUp, TrendingDown, Calendar, Users, MousePointer, Clock, CheckSquare, FileText, Headphones, RefreshCw, AlertCircle, MoreVertical } from 'lucide-react';

// // Types
// interface MetricCardProps {
//   icon: React.ReactNode;
//   title: string;
//   value: string | number;
//   change: string;
//   changeValue: string;
//   isPositive: boolean;
//   subtitle?: string;
// }

// interface ActivityItem {
//   user: string;
//   action: string;
//   details: string;
//   time: string;
//   badge?: string;
// }

// interface SupportTicket {
//   title: string;
//   description: string;
//   priority: string;
//   status: string;
// }

// // Metric Card Component
// const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, change, changeValue, isPositive, subtitle }) => (
//   <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
//     <div className="flex items-start justify-between mb-3">
//       <div className="flex items-center gap-2">
//         <div className="text-gray-500">{icon}</div>
//         <span className="text-xs font-medium text-gray-600">{title}</span>
//       </div>
//     </div>
//     <div className="space-y-0.5">
//       <div className="text-2xl font-bold text-gray-900">{value}</div>
//       <div className="flex items-center gap-1.5 text-xs">
//         {isPositive ? (
//           <span className="text-green-600">{change}</span>
//         ) : (
//           <span className="text-red-600">{change}</span>
//         )}
//         <span className="text-gray-500">From Last Month</span>
//       </div>
//       {subtitle && <div className="text-[10px] text-gray-400 pt-0.5">{subtitle}</div>}
//     </div>
//   </div>
// );

// // Header Component
// const DashboardHeader: React.FC = () => (
//   <div className="border-b border-gray-200 px-6 py-4">
//     <div className="flex items-center justify-between">
//       <div>
//         <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-xs text-gray-500 mt-0.5">Monitor system performance and manage client operations</p>
//       </div>
//       <div className="flex items-center gap-2">
//         <button className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5">
//           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           Export Overview Report
//         </button>
//         <button className="px-3 py-2 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 flex items-center gap-1.5">
//           <AlertCircle className="w-3.5 h-3.5" />
//           View Critical Alerts
//         </button>
//         <button className="px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-1.5">
//           <span className="text-base font-normal">+</span>
//           Add New Client
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // Date Selector Component
// const DateSelector: React.FC = () => (
//   <div className="flex items-center gap-3 mb-5">
//     <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs">
//       <Clock className="w-3.5 h-3.5 text-gray-500" />
//       <span className="text-gray-700">Thursday, October 30, 2025</span>
//     </div>
//     <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs">
//       <Calendar className="w-3.5 h-3.5 text-gray-500" />
//       <span className="text-gray-700">Date Range:</span>
//       <span className="ml-1 px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600">7 Days</span>
//     </div>
//   </div>
// );

// // Subscription Plan Distribution Component
// const SubscriptionDistribution: React.FC = () => {
//   const data = [
//     { name: 'Starter', value: 12, color: '#3B82F6' },
//     { name: 'Business', value: 28, color: '#FB923C' },
//     { name: 'Enterprise', value: 10, color: '#FDE047' }
//   ];

//   const total = data.reduce((sum, item) => sum + item.value, 0);

//   return (
//     <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 h-full">
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           <h3 className="text-xs font-semibold text-gray-900">Subscription Plan Distribution</h3>
//           <p className="text-[10px] text-gray-500 mt-0.5">Active subscribers by tier</p>
//         </div>
//         <MoreVertical className="w-4 h-4 text-gray-300 cursor-pointer" />
//       </div>
      
//       <div className="flex items-center justify-center my-4">
//         <div className="relative" style={{ width: '180px', height: '180px' }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={55}
//                 outerRadius={75}
//                 paddingAngle={3}
//                 dataKey="value"
//                 startAngle={90}
//                 endAngle={-270}
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-gray-900">{total}</div>
//               <div className="text-[10px] text-gray-500">Total</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 space-y-2">
//         {data.map((item, idx) => (
//           <div key={idx} className="flex items-center justify-between text-xs">
//             <div className="flex items-center gap-2">
//               <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
//               <span className="text-gray-700">{item.name} ({item.value})</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button className="w-full mt-5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
//         View Details
//       </button>
//     </div>
//   );
// };

// // Platform Activity Trend Component
// const PlatformActivityTrend: React.FC = () => {
//   const data = [
//     { month: 'Jan', dailyLogins: 1000, taskProgress: 850, totalRevenue: 600 },
//     { month: 'Feb', dailyLogins: 1050, taskProgress: 900, totalRevenue: 650 },
//     { month: 'Mar', dailyLogins: 980, taskProgress: 920, totalRevenue: 680 },
//     { month: 'Apr', dailyLogins: 1100, taskProgress: 950, totalRevenue: 700 },
//     { month: 'May', dailyLogins: 1080, taskProgress: 980, totalRevenue: 750 },
//     { month: 'Jun', dailyLogins: 1150, taskProgress: 1000, totalRevenue: 800 },
//     { month: 'Jul', dailyLogins: 1120, taskProgress: 1020, totalRevenue: 850 },
//     { month: 'Aug', dailyLogins: 1180, taskProgress: 1050, totalRevenue: 880 },
//     { month: 'Sep', dailyLogins: 1200, taskProgress: 1080, totalRevenue: 920 },
//     { month: 'Oct', dailyLogins: 1150, taskProgress: 1100, totalRevenue: 950 },
//     { month: 'Nov', dailyLogins: 1220, taskProgress: 1120, totalRevenue: 980 },
//     { month: 'Dec', dailyLogins: 1180, taskProgress: 1150, totalRevenue: 1000 }
//   ];

//   return (
//     <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 h-full">
//       <div className="flex items-center justify-between mb-3">
//         <div>
//           <h3 className="text-xs font-semibold text-gray-900">Platform Activity Trend</h3>
//           <p className="text-[10px] text-gray-500 mt-0.5">Daily active users and task progress over the last 7 days</p>
//         </div>
//         <MoreVertical className="w-4 h-4 text-gray-300 cursor-pointer" />
//       </div>

//       <div className="flex items-center justify-end gap-4 mb-3 text-[10px]">
//         <div className="flex items-center gap-1.5">
//           <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
//           <span className="text-gray-600">Daily Logins</span>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
//           <span className="text-gray-600">Total Progress</span>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <div className="w-2 h-2 bg-cyan-400 rounded-sm"></div>
//           <span className="text-gray-600">Total Revenue</span>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={240}>
//         <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//           <defs>
//             <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4}/>
//               <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.05}/>
//             </linearGradient>
//             <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.4}/>
//               <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.05}/>
//             </linearGradient>
//             <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
//               <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
//           <XAxis 
//             dataKey="month" 
//             tick={{ fontSize: 10, fill: '#9CA3AF' }} 
//             stroke="#E5E7EB"
//             tickLine={false}
//           />
//           <YAxis 
//             tick={{ fontSize: 10, fill: '#9CA3AF' }} 
//             stroke="#E5E7EB"
//             tickLine={false}
//             domain={[0, 1200]}
//             ticks={[0, 200, 400, 600, 800, 1000, 1200]}
//           />
//           <Tooltip 
//             contentStyle={{ fontSize: '11px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
//           />
//           <Area 
//             type="monotone" 
//             dataKey="totalRevenue" 
//             stroke="#22D3EE" 
//             strokeWidth={2}
//             fillOpacity={1} 
//             fill="url(#colorRevenue)" 
//           />
//           <Area 
//             type="monotone" 
//             dataKey="taskProgress" 
//             stroke="#A78BFA" 
//             strokeWidth={2}
//             fillOpacity={1} 
//             fill="url(#colorProgress)" 
//           />
//           <Area 
//             type="monotone" 
//             dataKey="dailyLogins" 
//             stroke="#10B981" 
//             strokeWidth={2}
//             fillOpacity={1} 
//             fill="url(#colorLogins)" 
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Content Usage Breakdown Component
// const ContentUsageBreakdown: React.FC<{ title: string; subtitle: string; type: 'uploaded' | 'payments' }> = ({ title, subtitle, type }) => {
//   const uploadedData = [
//     { label: 'Image', uploaded: 250, views: 120 },
//     { label: 'Audio', uploaded: 380, views: 180 },
//     { label: 'Video', uploaded: 220, views: 100 },
//     { label: 'Template', uploaded: 320, views: 150 }
//   ];

//   const paymentsData = [
//     { label: 'Jan', failed: 15, recurring: 8 },
//     { label: 'Feb', recurring: 20, failed: 12 },
//     { label: 'Mar', recurring: 15, failed: 10 },
//     { label: 'Apr', recurring: 35, failed: 22 },
//     { label: 'May', recurring: 30, failed: 18 },
//     { label: 'Jun', recurring: 28, failed: 15 },
//     { label: 'Jul', recurring: 38, failed: 48 },
//     { label: 'Aug', recurring: 32, failed: 25 },
//     { label: 'Sep', recurring: 40, failed: 30 },
//     { label: 'Oct', recurring: 35, failed: 22 },
//     { label: 'Nov', recurring: 45, failed: 60 },
//     { label: 'Dec', recurring: 42, failed: 52 }
//   ];

//   const data = type === 'uploaded' ? uploadedData : paymentsData;
//   const keys = type === 'uploaded' ? ['uploaded', 'views'] : ['failed', 'recurring'];
//   const colors = type === 'uploaded' ? ['#3B82F6', '#93C5FD'] : ['#3B82F6', '#FB923C'];
//   const labels = type === 'uploaded' ? ['Uploaded', 'Views'] : ['Failed Payments', 'Recurring Bans (%)'];

//   return (
//     <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
//       <div className="flex items-center justify-between mb-3">
//         <div>
//           <h3 className="text-xs font-semibold text-gray-900">{title}</h3>
//           <p className="text-[10px] text-gray-500 mt-0.5">{subtitle}</p>
//         </div>
//         <MoreVertical className="w-4 h-4 text-gray-300 cursor-pointer" />
//       </div>

//       <div className="flex items-center justify-end gap-4 mb-3 text-[10px]">
//         {labels.map((label, idx) => (
//           <div key={idx} className="flex items-center gap-1.5">
//             <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: colors[idx] }}></div>
//             <span className="text-gray-600">{label}</span>
//           </div>
//         ))}
//       </div>

//       <ResponsiveContainer width="100%" height={180}>
//         <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
//           <XAxis 
//             dataKey="label" 
//             tick={{ fontSize: 10, fill: '#9CA3AF' }} 
//             stroke="#E5E7EB"
//             tickLine={false}
//           />
//           <YAxis 
//             tick={{ fontSize: 10, fill: '#9CA3AF' }} 
//             stroke="#E5E7EB"
//             tickLine={false}
//           />
//           <Tooltip 
//             contentStyle={{ fontSize: '11px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
//           />
//           <Bar dataKey={keys[0]} fill={colors[0]} radius={[3, 3, 0, 0]} barSize={type === 'uploaded' ? 40 : 20} />
//           <Bar dataKey={keys[1]} fill={colors[1]} radius={[3, 3, 0, 0]} barSize={type === 'uploaded' ? 40 : 20} />
//         </BarChart>
//       </ResponsiveContainer>

//       <button className="w-full mt-4 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
//         View Details
//       </button>
//     </div>
//   );
// };

// // Recent Critical Activity Component
// const RecentCriticalActivity: React.FC = () => {
//   const activities: ActivityItem[] = [
//     {
//       user: 'Sarah Wilson',
//       action: 'Suspended user account due to payment failure',
//       details: '',
//       time: '3 hours ago',
//       badge: 'High'
//     },
//     {
//       user: 'Sarah Wilson',
//       action: 'Permanently banned user account (User_id: 34520)',
//       details: '',
//       time: '5 hours ago',
//       badge: 'Critical'
//     },
//     {
//       user: 'Device TV-0045',
//       action: 'Device was offline - No heartbeat received',
//       details: '',
//       time: '1 day ago',
//       badge: 'Critical'
//     }
//   ];

//   return (
//     <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h3 className="text-xs font-semibold text-gray-900">Recent Critical Activity</h3>
//           <p className="text-[10px] text-gray-500 mt-0.5">Showing 3 high-impact changes</p>
//         </div>
//         <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View All</button>
//       </div>

//       <div className="space-y-3">
//         {activities.map((activity, idx) => (
//           <div key={idx} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
//             <div className="flex items-start justify-between mb-1">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-semibold text-gray-900">{activity.user}</span>
//                 <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
//                   activity.badge === 'Critical' ? 'bg-red-100 text-red-700' :
//                   'bg-orange-100 text-orange-700'
//                 }`}>
//                   {activity.badge}
//                 </span>
//               </div>
//               <MoreVertical className="w-3.5 h-3.5 text-gray-300 cursor-pointer" />
//             </div>
//             <p className="text-xs text-gray-600 mb-1">{activity.action}</p>
//             <span className="text-[10px] text-gray-400">{activity.time}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Recent Support Tickets Component
// const RecentSupportTickets: React.FC = () => {
//   const tickets: SupportTicket[] = [
//     {
//       title: 'Billing error - payment method declined',
//       description: '',
//       priority: 'High',
//       status: 'Open'
//     },
//     {
//       title: 'Device sync failed - unable to connect',
//       description: '',
//       priority: 'High',
//       status: 'Open'
//     },
//     {
//       title: 'Content not displaying on screen',
//       description: '',
//       priority: 'High',
//       status: 'New'
//     },
//     {
//       title: 'Content not displaying on screen',
//       description: '',
//       priority: 'High',
//       status: 'New'
//     }
//   ];

//   return (
//     <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h3 className="text-xs font-semibold text-gray-900">Recent Support Tickets</h3>
//           <p className="text-[10px] text-gray-500 mt-0.5">Priority tickets needing attention</p>
//         </div>
//         <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View All</button>
//       </div>

//       <div className="space-y-2">
//         {tickets.map((ticket, idx) => (
//           <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors group">
//             <span className="text-xs text-gray-700">{ticket.title}</span>
//             <div className="flex items-center gap-1.5">
//               <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-100 text-orange-700">
//                 {ticket.priority}
//               </span>
//               <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-200 text-gray-700">
//                 {ticket.status}
//               </span>
//               <MoreVertical className="w-3.5 h-3.5 text-gray-300 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main Dashboard Component
// const Dashboard: React.FC = () => {
//   return (
//     <div className="min-h-screen">
//       <DashboardHeader />
      
//       <div className="pt-5 px-5">
//         <DateSelector />
        
//         {/* Metrics Grid - Row 1 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//           <MetricCard
//             icon={<Users className="w-4 h-4" />}
//             title="Total Users"
//             value="12,458"
//             change="+4.3 % (421)"
//             changeValue="+421"
//             isPositive={true}
//             subtitle="Active: 11,863 | Inactive: 595"
//           />
//           <MetricCard
//             icon={<MousePointer className="w-4 h-4" />}
//             title="Active Subscriptions"
//             value="1,100"
//             change="-8.2 %"
//             changeValue="-98"
//             isPositive={false}
//             subtitle="Active: 1,023 | Paused: 77"
//           />
//           <MetricCard
//             icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//             title="Monthly Recurring Revenue"
//             value="$28.1K"
//             change="+137 %"
//             changeValue="+$16.6K"
//             isPositive={true}
//             subtitle="+60.12%"
//           />
//           <MetricCard
//             icon={<RefreshCw className="w-4 h-4" />}
//             title="System Uptime"
//             value="99.8%"
//             change="-0.2 %"
//             changeValue=""
//             isPositive={false}
//             subtitle="Current week: 167h 55m"
//           />
//         </div>

//         {/* Metrics Grid - Row 2 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//           <MetricCard
//             icon={<Clock className="w-4 h-4" />}
//             title="Avg API Response Time"
//             value="189 ms"
//             change="+14.5 %"
//             changeValue="+24ms"
//             isPositive={false}
//             subtitle="Global: 212ms | Peak: 456ms"
//           />
//           <MetricCard
//             icon={<CheckSquare className="w-4 h-4" />}
//             title="Active Devices"
//             value="1100"
//             change="-14.7 %"
//             changeValue="-189"
//             isPositive={false}
//             subtitle="Online: 942 | Offline: 158"
//           />
//           <MetricCard
//             icon={<FileText className="w-4 h-4" />}
//             title="Total Content Items"
//             value="1100"
//             change="+6.3 %"
//             changeValue="+65"
//             isPositive={true}
//             subtitle="Published: 987 | Drafts: 113"
//           />
//           <MetricCard
//             icon={<Headphones className="w-4 h-4" />}
//             title="Open Support Tickets"
//             value="12"
//             change="-3.5 %"
//             changeValue="-1"
//             isPositive={false}
//             subtitle="High Priority: 4 | Medium: 8"
//           />
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//           <SubscriptionDistribution />
//           <div className="lg:col-span-2">
//             <PlatformActivityTrend />
//           </div>
//         </div>

//         {/* Content Usage Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
//           <ContentUsageBreakdown
//             title="Content Usage Breakdown"
//             subtitle="Volume of content pertaining above the week"
//             type="uploaded"
//           />
//           <ContentUsageBreakdown
//             title="Content Usage Breakdown"
//             subtitle="Volume of recurring bans or failed payments (On a weekly scale)"
//             type="payments"
//           />
//         </div>

//         {/* Activity and Tickets Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <RecentCriticalActivity />
//           <RecentSupportTickets />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




'use client';

import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {  Calendar, Users, MousePointer, Clock, CheckSquare, FileText, Headphones, RefreshCw, AlertCircle, MoreVertical, ChevronDown, Plus, Crown, DollarSign, Shield, Webhook, TvMinimal, FileVideo } from 'lucide-react';
import AddUserModal from '@/components/Admin/usermanagement/AddUserModal';

type DateRange = '1day' | '7days' | '1month' | '1year';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: string;
  changeValue: string;
  isPositive: boolean;
  subtitle?: string;
}

interface ActivityItem {
  user: string;
  action: string;
  details: string;
  time: string;
  badge?: string;
}

interface SupportTicket {
  title: string;
  description: string;
  priority: string;
  status: string;
}

const getMetricsData = (range: DateRange) => {
  const multipliers = {
    '1day': 0.03,
    '7days': 1,
    '1month': 4.3,
    '1year': 52
  };
  
  const mult = multipliers[range];
  
  return {
    totalUsers: Math.round(12458 * mult),
    totalUsersChange: range === '1day' ? '+0.1%' : range === '7days' ? '+4.3%' : range === '1month' ? '+18.2%' : '+156%',
    totalUsersValue: range === '1day' ? '+12' : range === '7days' ? '+421' : range === '1month' ? '+1,820' : '+78,450',
    totalUsersPositive: true,
    
    activeSubscriptions: Math.round(1100 * (range === '1day' ? 0.95 : range === '7days' ? 1 : range === '1month' ? 1.05 : 1.2)),
    subscriptionsChange: range === '1day' ? '-0.2%' : range === '7days' ? '-8.2%' : range === '1month' ? '+5.3%' : '+20.1%',
    subscriptionsValue: range === '1day' ? '-2' : range === '7days' ? '-98' : range === '1month' ? '+58' : '+184',
    subscriptionsPositive: range === '1month' || range === '1year',
    
    mrr: range === '1day' ? '$0.9K' : range === '7days' ? '$28.1K' : range === '1month' ? '$112K' : '$1.35M',
    mrrChange: range === '1day' ? '+2.1%' : range === '7days' ? '+137%' : range === '1month' ? '+22.5%' : '+285%',
    mrrValue: range === '1day' ? '+$19' : range === '7days' ? '+$16.6K' : range === '1month' ? '+$20.6K' : '+$1.05M',
    mrrPositive: true,
    
    uptime: range === '1day' ? '100%' : range === '7days' ? '99.8%' : range === '1month' ? '99.7%' : '99.5%',
    uptimeChange: range === '1day' ? '+0.2%' : range === '7days' ? '-0.2%' : range === '1month' ? '-0.3%' : '-0.5%',
    uptimePositive: range === '1day',
    
    responseTime: range === '1day' ? '165ms' : range === '7days' ? '189ms' : range === '1month' ? '198ms' : '215ms',
    responseChange: range === '1day' ? '-12.7%' : range === '7days' ? '+14.5%' : range === '1month' ? '+20.1%' : '+31.5%',
    responsePositive: range === '1day',
    
    devices: Math.round(1100 * (range === '1day' ? 0.98 : range === '7days' ? 1 : range === '1month' ? 1.08 : 1.25)),
    devicesChange: range === '1day' ? '-2.0%' : range === '7days' ? '-14.7%' : range === '1month' ? '+8.2%' : '+25.0%',
    devicesValue: range === '1day' ? '-22' : range === '7days' ? '-189' : range === '1month' ? '+84' : '+220',
    devicesPositive: range === '1month' || range === '1year',
    
    contentItems: Math.round(1100 * (range === '1day' ? 1.01 : range === '7days' ? 1 : range === '1month' ? 1.15 : 1.8)),
    contentChange: range === '1day' ? '+1.1%' : range === '7days' ? '+6.3%' : range === '1month' ? '+15.0%' : '+80.0%',
    contentValue: range === '1day' ? '+11' : range === '7days' ? '+65' : range === '1month' ? '+144' : '+488',
    contentPositive: true,
    
    tickets: range === '1day' ? 3 : range === '7days' ? 12 : range === '1month' ? 48 : 580,
    ticketsChange: range === '1day' ? '+50%' : range === '7days' ? '-3.5%' : range === '1month' ? '+12.5%' : '+33.3%',
    ticketsValue: range === '1day' ? '+1' : range === '7days' ? '-1' : range === '1month' ? '+5' : '+145',
    ticketsPositive: range === '7days'
  };
};

const getChartData = (range: DateRange) => {
  if (range === '1day') {
    return [
      { label: '12 AM', value1: 850, value2: 720, value3: 580 },
      { label: '3 AM', value1: 680, value2: 620, value3: 480 },
      { label: '6 AM', value1: 920, value2: 850, value3: 650 },
      { label: '9 AM', value1: 1150, value2: 980, value3: 820 },
      { label: '12 PM', value1: 1280, value2: 1100, value3: 920 },
      { label: '3 PM', value1: 1220, value2: 1050, value3: 880 },
      { label: '6 PM', value1: 1180, value2: 1020, value3: 850 },
      { label: '9 PM', value1: 1080, value2: 920, value3: 750 }
    ];
  } else if (range === '7days') {
    return [
      { label: 'Mon', value1: 1000, value2: 850, value3: 600 },
      { label: 'Tue', value1: 1100, value2: 950, value3: 700 },
      { label: 'Wed', value1: 1050, value2: 900, value3: 650 },
      { label: 'Thu', value1: 1150, value2: 1000, value3: 800 },
      { label: 'Fri', value1: 1200, value2: 1080, value3: 920 },
      { label: 'Sat', value1: 980, value2: 820, value3: 580 },
      { label: 'Sun', value1: 920, value2: 780, value3: 520 }
    ];
  } else if (range === '1month') {
    return [
      { label: 'Week 1', value1: 7200, value2: 6100, value3: 4200 },
      { label: 'Week 2', value1: 7800, value2: 6650, value3: 4900 },
      { label: 'Week 3', value1: 7500, value2: 6400, value3: 4600 },
      { label: 'Week 4', value1: 8100, value2: 6900, value3: 5600 }
    ];
  } else {
    return [
      { label: 'Jan', value1: 1000, value2: 850, value3: 600 },
      { label: 'Feb', value1: 1050, value2: 900, value3: 650 },
      { label: 'Mar', value1: 980, value2: 920, value3: 680 },
      { label: 'Apr', value1: 1100, value2: 950, value3: 700 },
      { label: 'May', value1: 1080, value2: 980, value3: 750 },
      { label: 'Jun', value1: 1150, value2: 1000, value3: 800 },
      { label: 'Jul', value1: 1120, value2: 1020, value3: 850 },
      { label: 'Aug', value1: 1180, value2: 1050, value3: 880 },
      { label: 'Sep', value1: 1200, value2: 1080, value3: 920 },
      { label: 'Oct', value1: 1150, value2: 1100, value3: 950 },
      { label: 'Nov', value1: 1220, value2: 1120, value3: 980 },
      { label: 'Dec', value1: 1180, value2: 1150, value3: 1000 }
    ];
  }
};

const getBarChartData = (range: DateRange, type: 'uploaded' | 'payments') => {
  if (type === 'uploaded') {
    const base = [
      { label: 'Image', uploaded: 250, views: 120 },
      { label: 'Audio', uploaded: 380, views: 180 },
      { label: 'Video', uploaded: 220, views: 100 },
      { label: 'Template', uploaded: 320, views: 150 }
    ];
    
    const mult = range === '1day' ? 0.05 : range === '7days' ? 1 : range === '1month' ? 4 : 48;
    return base.map(item => ({
      ...item,
      uploaded: Math.round(item.uploaded * mult),
      views: Math.round(item.views * mult)
    }));
  } else {
    if (range === '1day') {
      return [
        { label: '12AM', failed: 0, recurring: 0 },
        { label: '6AM', failed: 1, recurring: 0 },
        { label: '12PM', failed: 2, recurring: 1 },
        { label: '6PM', failed: 1, recurring: 0 }
      ];
    } else if (range === '7days') {
      return [
        { label: 'Mon', failed: 5, recurring: 2 },
        { label: 'Tue', failed: 7, recurring: 3 },
        { label: 'Wed', failed: 4, recurring: 2 },
        { label: 'Thu', failed: 8, recurring: 4 },
        { label: 'Fri', failed: 6, recurring: 3 },
        { label: 'Sat', failed: 3, recurring: 1 },
        { label: 'Sun', failed: 2, recurring: 1 }
      ];
    } else if (range === '1month') {
      return [
        { label: 'Week 1', failed: 28, recurring: 12 },
        { label: 'Week 2', failed: 35, recurring: 18 },
        { label: 'Week 3', failed: 32, recurring: 15 },
        { label: 'Week 4', failed: 42, recurring: 22 }
      ];
    } else {
      return [
        { label: 'Jan', failed: 15, recurring: 8 },
        { label: 'Feb', failed: 20, recurring: 12 },
        { label: 'Mar', failed: 15, recurring: 10 },
        { label: 'Apr', failed: 35, recurring: 22 },
        { label: 'May', failed: 30, recurring: 18 },
        { label: 'Jun', failed: 28, recurring: 15 },
        { label: 'Jul', failed: 38, recurring: 48 },
        { label: 'Aug', failed: 32, recurring: 25 },
        { label: 'Sep', failed: 40, recurring: 30 },
        { label: 'Oct', failed: 35, recurring: 22 },
        { label: 'Nov', failed: 45, recurring: 60 },
        { label: 'Dec', failed: 42, recurring: 52 }
      ];
    }
  }
};

const getSubscriptionData = (range: DateRange) => {
  const base = [
    { name: 'Starter', value: 12, color: '#3B82F6' },
    { name: 'Business', value: 28, color: '#FB923C' },
    { name: 'Enterprise', value: 10, color: '#FDE047' }
  ];
  
  const mult = range === '1day' ? 0.95 : range === '7days' ? 1 : range === '1month' ? 1.15 : 1.5;
  return base.map(item => ({
    ...item,
    value: Math.round(item.value * mult)
  }));
};

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, change, isPositive, subtitle }) => (
  <div className="bg-navbarBg rounded-lg p-5 shadow-sm border border-border">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="text-gray-500 dark:text-gray-400 p-2 rounded-full border border-border">{icon}</div>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{title}</span>
      </div>
    </div>
    <div className="space-y-0.5">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="flex items-center gap-1.5 text-xs">
        {isPositive ? (
          <span className="text-green-600 dark:text-green-400">{change}</span>
        ) : (
          <span className="text-red-600 dark:text-red-400">{change}</span>
        )}
        <span className="text-gray-500 dark:text-gray-400">From Last Period</span>
      </div>
      {subtitle && <div className="text-[10px] text-gray-400 dark:text-gray-500 pt-0.5">{subtitle}</div>}
    </div>
  </div>
);

const DashboardHeader: React.FC<{ onExport: () => void; onAddClientClick: () => void }> = ({ 
  onExport, 
  onAddClientClick 
}) => (
  <div className="border-b border-border mx-4 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Monitor system performance and manage client operations</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onExport}
          className="text-nowrap px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-navbarBg border border-border shadow-customShadow rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className='hidden lg:block'>Export Overview Report</span>
        </button>
        <button className="text-nowrap px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 bg-navbarBg border border-red-200 dark:border-red-900/50 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1.5 transition-colors">
          <AlertCircle className="w-3.5 h-3.5" />
          <span className='hidden lg:block'>View Critical Alerts</span>
        </button>
        <button
          onClick={onAddClientClick}   
          className="text-nowrap px-3 py-2 text-xs font-medium text-white bg-bgBlue rounded-md shadow-customShadow hover:bg-blue-500 dark:hover:bg-blue-500 flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden lg:block">Add New Client</span>
        </button>
      </div>
    </div>
  </div>
);

const DateSelector: React.FC<{ dateRange: DateRange; onDateRangeChange: (range: DateRange) => void }> = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const dateRangeOptions: { value: DateRange; label: string }[] = [
    { value: '1day', label: '1 Day' },
    { value: '7days', label: '7 Days' },
    { value: '1month', label: '1 Month' },
    { value: '1year', label: '1 Year' }
  ];
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const selectedOption = dateRangeOptions.find(opt => opt.value === dateRange);
  
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row sm:justify-start gap-3 mb-5">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-navbarBg border border-border rounded-md text-[.65rem] md:text-xs text-nowrap">
        <Clock className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
        <span className="text-gray-700 dark:text-gray-300">{currentDate}</span>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-navbarBg border border-border rounded-md text-[.65rem] md:text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-nowrap"
        >
          <Calendar className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Date Range:</span>
          <span className="ml-1 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] text-gray-600 dark:text-gray-400">
            {selectedOption?.label}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-navbarBg border border-border rounded-md shadow-lg z-10 min-w-[140px]">
            {dateRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onDateRangeChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  dateRange === option.value ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SubscriptionDistribution: React.FC<{ dateRange: DateRange }> = ({ dateRange }) => {
  const data = getSubscriptionData(dateRange);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-navbarBg rounded-xl p-5 shadow-sm border border-border h-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Subscription Plan Distribution</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Active subscribers by tier</p>
        </div>
        <MoreVertical className="w-4 h-4 text-gray-300 dark:text-gray-600 cursor-pointer" />
      </div>
      
      <div className="flex items-center justify-center my-4">
        <div className="relative" style={{ width: '180px', height: '180px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{total}</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-700 dark:text-gray-300">{item.name} ({item.value})</span>
            </div>
          </div>
        ))}
      </div>

     <div className="flex justify-end">
  <button className="mt-5 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-customShadow dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    View Details
  </button>
</div>

    </div>
  );
};

const PlatformActivityTrend: React.FC<{ dateRange: DateRange }> = ({ dateRange }) => {
  const data = getChartData(dateRange);

  return (
    <div className="bg-navbarBg rounded-xl p-5 shadow-sm border border-border h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Platform Activity Trend</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Daily active users and task progress</p>
        </div>
        <MoreVertical className="w-4 h-4 text-gray-300 dark:text-gray-600 cursor-pointer" />
      </div>

      <div className="flex items-center justify-end gap-4 mb-3 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
          <span className="text-gray-600 dark:text-gray-400">Daily Logins</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
          <span className="text-gray-600 dark:text-gray-400">Total Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-cyan-400 rounded-sm"></div>
          <span className="text-gray-600 dark:text-gray-400">Total Revenue</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 10, fill: '#9CA3AF' }} 
            stroke="#E5E7EB"
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#9CA3AF' }} 
            stroke="#E5E7EB"
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ fontSize: '11px', borderRadius: '6px', border: '1px solid #E5E7EB', backgroundColor: '#fff' }}
            labelStyle={{ color: '#374151' }}
          />
          <Area 
            type="monotone" 
            dataKey="value3" 
            stroke="#22D3EE" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
          <Area 
            type="monotone" 
            dataKey="value2" 
            stroke="#A78BFA" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorProgress)" 
          />
          <Area 
            type="monotone" 
            dataKey="value1" 
            stroke="#10B981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorLogins)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const ContentUsageBreakdown: React.FC<{ title: string; subtitle: string; type: 'uploaded' | 'payments'; dateRange: DateRange }> = ({ title, subtitle, type, dateRange }) => {
  const data = getBarChartData(dateRange, type);
  const keys = type === 'uploaded' ? ['uploaded', 'views'] : ['failed', 'recurring'];
  const colors = type === 'uploaded' ? ['#3B82F6', '#93C5FD'] : ['#3B82F6', '#FB923C'];
  const labels = type === 'uploaded' ? ['Uploaded', 'Views'] : ['Failed Payments', 'Recurring Bans (%)'];

  return (
    <div className="bg-navbarBg rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        <MoreVertical className="w-4 h-4 text-gray-300 dark:text-gray-600 cursor-pointer" />
      </div>

      <div className="flex items-center justify-end gap-4 mb-3 text-[10px]">
        {labels.map((label, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: colors[idx] }}></div>
            <span className="text-gray-600 dark:text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 10, fill: '#9CA3AF' }} 
            stroke="#E5E7EB"
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#9CA3AF' }} 
            stroke="#E5E7EB"
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ fontSize: '11px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
          />
          <Bar dataKey={keys[0]} fill={colors[0]} radius={[3, 3, 0, 0]} barSize={type === 'uploaded' ? 40 : 20} />
          <Bar dataKey={keys[1]} fill={colors[1]} radius={[3, 3, 0, 0]} barSize={type === 'uploaded' ? 40 : 20} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-end">
  <button className="mt-5 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-customShadow dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    View Details
  </button>
</div>

    </div>
  );
};

const RecentCriticalActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      user: 'Sarah Wilson',
      action: 'Suspended user account due to payment failure',
      details: '',
      time: '3 hours ago',
      badge: 'High'
    },
    {
      user: 'Sarah Wilson',
      action: 'Permanently banned user account (User_id: 34520)',
      details: '',
      time: '5 hours ago',
      badge: 'Critical'
    },
    {
      user: 'Device TV-0045',
      action: 'Device was offline - No heartbeat received',
      details: '',
      time: '1 day ago',
      badge: 'Critical'
    }
  ];

  return (
    <div className="bg-navbarBg rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Recent Critical Activity</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Showing 3 high-impact changes</p>
        </div>
        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">View All</button>
      </div>

      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <div key={idx} className="pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{activity.user}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  activity.badge === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                  'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                }`}>
                  {activity.badge}
                </span>
              </div>
              <MoreVertical className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 cursor-pointer" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{activity.action}</p>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentSupportTickets: React.FC = () => {
  const tickets: SupportTicket[] = [
    {
      title: 'Billing error - payment method declined',
      description: '',
      priority: 'High',
      status: 'Open'
    },
    {
      title: 'Device sync failed - unable to connect',
      description: '',
      priority: 'High',
      status: 'Open'
    },
    {
      title: 'Content not displaying on screen',
      description: '',
      priority: 'High',
      status: 'New'
    },
    {
      title: 'Content not displaying on screen',
      description: '',
      priority: 'High',
      status: 'New'
    }
  ];

  return (
    <div className="bg-navbarBg rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Recent Support Tickets</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Priority tickets needing attention</p>
        </div>
        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">View All</button>
      </div>

      <div className="space-y-2">
        {tickets.map((ticket, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
            <span className="text-xs text-gray-700 dark:text-gray-300">{ticket.title}</span>
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                {ticket.priority}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {ticket.status}
              </span>
              <MoreVertical className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7days');
  const metrics = getMetricsData(dateRange);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  
  const handleExport = () => {
    window.print();
  };

  const handleAddClient = (data: any) => {
    console.log("New client added:", data);
    alert(`New client ${data.fullName} (${data.email}) added successfully!`);
    setIsAddClientModalOpen(false); // Close modal after success
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        onExport={handleExport} 
        onAddClientClick={() => setIsAddClientModalOpen(true)} 
      />
      
      <div className="pt-5 px-5">
        <DateSelector dateRange={dateRange} onDateRangeChange={setDateRange} />
        
        {/* Metrics Grid - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          <MetricCard
            icon={<Users className="w-4 h-4" />}
            title="Total Users"
            value={metrics.totalUsers.toLocaleString()}
            change={metrics.totalUsersChange}
            changeValue={metrics.totalUsersValue}
            isPositive={metrics.totalUsersPositive}
            subtitle="Active: 11,863 | Inactive: 595"
          />
          <MetricCard
            icon={<Crown className="w-4 h-4" />}
            title="Active Subscriptions"
            value={metrics.activeSubscriptions.toLocaleString()}
            change={metrics.subscriptionsChange}
            changeValue={metrics.subscriptionsValue}
            isPositive={metrics.subscriptionsPositive}
            subtitle="Active: 1,023 | Paused: 77"
          />
          <MetricCard
            icon={
              <DollarSign className="w-4 h-4" />}
            title="Monthly Recurring Revenue"
            value={metrics.mrr}
            change={metrics.mrrChange}
            changeValue={metrics.mrrValue}
            isPositive={metrics.mrrPositive}
            subtitle="+60.12%"
          />
          <MetricCard
            icon={<Shield className="w-4 h-4" />}
            title="System Uptime"
            value={metrics.uptime}
            change={metrics.uptimeChange}
            changeValue=""
            isPositive={metrics.uptimePositive}
            subtitle="Current week: 167h 55m"
          />
        </div>

        {/* Metrics Grid - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          <MetricCard
            icon={<Webhook className="w-4 h-4" />}
            title="Avg API Response Time"
            value={metrics.responseTime}
            change={metrics.responseChange}
            changeValue="+24ms"
            isPositive={metrics.responsePositive}
            subtitle="Global: 212ms | Peak: 456ms"
          />
          <MetricCard
            icon={<TvMinimal className="w-4 h-4" />}
            title="Active Devices"
            value={metrics.devices.toLocaleString()}
            change={metrics.devicesChange}
            changeValue={metrics.devicesValue}
            isPositive={metrics.devicesPositive}
            subtitle="Online: 942 | Offline: 158"
          />
          <MetricCard
            icon={<FileVideo className="w-4 h-4" />}
            title="Total Content Items"
            value={metrics.contentItems.toLocaleString()}
            change={metrics.contentChange}
            changeValue={metrics.contentValue}
            isPositive={metrics.contentPositive}
            subtitle="Published: 987 | Drafts: 113"
          />
          <MetricCard
            icon={<Headphones className="w-4 h-4" />}
            title="Open Support Tickets"
            value={metrics.tickets}
            change={metrics.ticketsChange}
            changeValue={metrics.ticketsValue}
            isPositive={metrics.ticketsPositive}
            subtitle="High Priority: 4 | Medium: 8"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <SubscriptionDistribution dateRange={dateRange} />
          <div className="lg:col-span-2">
            <PlatformActivityTrend dateRange={dateRange} />
          </div>
        </div>

        {/* Content Usage Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <ContentUsageBreakdown
            title="Content Usage Breakdown"
            subtitle="Volume of content pertaining above the week"
            type="uploaded"
            dateRange={dateRange}
          />
          <ContentUsageBreakdown
            title="Content Usage Breakdown"
            subtitle="Volume of recurring bans or failed payments (On a weekly scale)"
            type="payments"
            dateRange={dateRange}
          />
        </div>

        {/* Activity and Tickets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-5">
          <RecentCriticalActivity />
          <RecentSupportTickets />
        </div>
      </div>

{/* THE REUSABLE ADD USER / CLIENT MODAL */}
      <AddUserModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onAddUser={handleAddClient}
      />

      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .min-h-screen, .min-h-screen * {
            visibility: visible;
          }
          .min-h-screen {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;