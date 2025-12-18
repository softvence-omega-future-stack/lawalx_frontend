'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, CreditCard, Globe, Monitor,
  MessageCircle, BarChart3, Activity, FileText, LogOut, ChevronDown,
  Ticket,
  UserRoundCogIcon,
  TvMinimal,
  TvMinimalPlay,
  CircleHelp,
  LineChart,
  ClipboardList,
  HomeIcon
} from 'lucide-react';

export default function AdminSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Auto-expand parent if child is active (only when not collapsed)
  useEffect(() => {
    if (!isCollapsed) {
      const newExpanded: Record<string, boolean> = {};
      if (pathname.startsWith('/admin/support')) newExpanded.support = true;
      if (pathname.startsWith('/admin/reports')) newExpanded.reports = true;
      setExpandedItems(prev => ({ ...prev, ...newExpanded }));
    }
  }, [pathname, isCollapsed]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (href: string) => pathname === href;

  // Full nested menu items (only used when expanded)
  const clientItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, href: '/admin/dashboard' },
    { id: 'user-management', label: 'User Management', icon: UserRoundCogIcon, href: '/admin/user-management' },
    { id: 'subscription', label: 'Subscription & Billing', icon: CreditCard, href: '/admin/subscription' },
    { id: 'devices', label: 'Devices (Global)', icon: TvMinimal, href: '/admin/devices' },
    { id: 'screen', label: 'Screen & Content', icon: TvMinimalPlay, href: '/admin/screen&content' },
    {
      id: 'support',
      label: 'Customer Supports',
      icon: CircleHelp,
      children: [
        { id: 'tickets', label: 'Tickets', href: '/admin/support/tickets', icon: Ticket },
        { id: 'live-chat', label: 'Live Chat', href: '/admin/support/live-chat', icon: MessageCircle },
      ],
    },
  ];

  const systemItems = [
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: LineChart,
      children: [
        { id: 'device-report', label: 'Device Report', href: '/admin/reports/device-report', icon: BarChart3 },
        { id: 'user-&-activity-reports', label: 'User & Activity Reports', href: '/admin/reports/user-&-activity-reports', icon: BarChart3 },
        { id: 'customer-service-&-support-reports', label: 'Customer Service & Support Reports', href: '/admin/reports/customer-service-&-support-reports', icon: ClipboardList },
        { id: 'financial-reports', label: 'Financial Reports', href: '/admin/reports/financial-reports', icon: BarChart3 },
      ],
    },
    { id: 'system-health', label: 'System Health', icon: Activity, href: '/admin/system-health' },
    { id: 'activity-log', label: 'Activity Log', icon: ClipboardList, href: '/admin/activity-log' },
  ];

  // ONLY the items that should appear when collapsed (parents removed)
  const collapsedItems = [
    { icon: LayoutDashboard, href: '/admin/dashboard', label: 'Dashboard' },
    { icon: Users, href: '/admin/user-management', label: 'User Management' },
    { icon: CreditCard, href: '/admin/subscription', label: 'Subscription & Billing' },
    { icon: Globe, href: '/admin/devices', label: 'Devices (Global)' },
    { icon: Monitor, href: '/admin/screen&content', label: 'Screen & Content' },
    { icon: Ticket, href: '/admin/support/tickets', label: 'Tickets' },
    { icon: MessageCircle, href: '/admin/support/live-chat', label: 'Live Chat' },
    { icon: BarChart3, href: '/admin/reports/device-report', label: 'Device Report' },
    { icon: BarChart3, href: '/admin/reports/user-&-activity-reports', label: 'User & Activity Reports' },
    { icon: ClipboardList, href: '/admin/reports/customer-service-&-support-reports', label: 'Customer Service & Support Reports' },
    { icon: BarChart3, href: '/admin/reports/financial-reports', label: 'Financial Reports' },
    { icon: Activity, href: '/admin/system-health', label: 'System Health' },
    { icon: FileText, href: '/admin/activity-log', label: 'Activity Log' },
  ];

  interface MenuChildItem {
    id: string;
    label: string;
    href: string;
    icon: React.ElementType;
  }

  interface MenuItemType {
    id: string;
    label: string;
    icon: React.ElementType;
    href?: string;
    children?: MenuChildItem[];
  }

  const MenuItem = ({ item }: { item: MenuItemType }) => {
    const isExpanded = !!expandedItems[item.id];
    const hasChildren = item.children && item.children.length > 0;
    const isParentActive = hasChildren && item.children!.some((c) => isActive(c.href));

    return (
      <div>
        {item.href ? (
          <Link
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
              isActive(item.href)
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ) : (
          <button
            onClick={() => toggleExpand(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
              isParentActive || isExpanded
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </div>
            {!isCollapsed && hasChildren && (
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            )}
          </button>
        )}

        {hasChildren && !isCollapsed && isExpanded && item.children && (
          <div className="ml-10 mt-1 space-y-1">
            {item.children.map((child: MenuChildItem) => (
              <Link
                key={child.id}
                href={child.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive(child.href)
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <child.icon className="w-4 h-4" />
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`fixed top-16 left-0 bottom-0 bg-navbarBg border-r border-border transition-all duration-300 z-20 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="h-full py-4 flex flex-col justify-between">
        <div className="px-3 space-y-6">
          {isCollapsed ? (
            // Collapsed: Only child icons + tooltips
            <div className="space-y-1">
              {collapsedItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className={`flex justify-center p-3 rounded-lg transition-all group relative ${
                    isActive(item.href)
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5" />
                  {/* Optional: Show tooltip on hover */}
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            // Expanded: Full original layout
            <>
              <div>
                <div className="px-3 mb-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</span>
                </div>
                <div className="space-y-1">
                  {clientItems.map(item => <MenuItem key={item.id} item={item} />)}
                </div>
              </div>

              <div>
                <div className="px-3 mb-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">System</span>
                </div>
                <div className="space-y-1">
                  {systemItems.map(item => <MenuItem key={item.id} item={item} />)}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Logout */}
        <div className="px-3 pb-4">
          <Link
            href="/admin/login"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}
            title="Logout"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}
// 'use client';

// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard, Users, CreditCard, Globe, Monitor,
//   MessageCircle, BarChart3, Activity, FileText, LogOut, ChevronDown,
//   Ticket
// } from 'lucide-react';
// import { icon } from 'leaflet';

// export default function AdminSidebar({ isCollapsed }: { isCollapsed: boolean }) {
//   const pathname = usePathname();
//   const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

//   // Auto-expand parent ONLY if a child route is currently active
//   useEffect(() => {
//     const newExpanded: Record<string, boolean> = {};

//     if (pathname.startsWith('/admin/support')) newExpanded.support = true;
//     if (pathname.startsWith('/admin/reports')) newExpanded.reports = true;

//     setExpandedItems(prev => ({ ...prev, ...newExpanded }));
//   }, [pathname]);

//   const toggleExpand = (id: string) => {
//     setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const isActive = (href: string) => pathname === href;

//   const clientItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
//     { id: 'user-management', label: 'User Management', icon: Users, href: '/admin/user-management' },
//     { id: 'subscription', label: 'Subscription & Billing', icon: CreditCard, href: '/admin/subscription' },
//     { id: 'devices', label: 'Devices (Global)', icon: Globe, href: '/admin/devices' },
//     { id: 'screen', label: 'Screen & Content', icon: Monitor, href: '/admin/screen' },
//     {
//       id: 'support',
//       label: 'Customer Supports',
//       icon: MessageCircle,
//       children: [
//         { id: 'tickets', label: 'Tickets', href: '/admin/support/tickets', icon: Ticket },
//         { id: 'live-chat', label: 'Live Chat', href: '/admin/support/live-chat', icon: MessageCircle },
//       ],
//     },
//   ];

//   const systemItems = [
//     {
//       id: 'reports',
//       label: 'Reports & Analytics',
//       icon: BarChart3,
//       children: [
//         { id: 'overview', label: 'Overview', href: '/admin/reports/overview', icon: BarChart3 },
//         { id: 'user-analytics', label: 'User Analytics', href: '/admin/reports/user-analytics', icon: BarChart3 },
//       ],
//     },
//     { id: 'system-health', label: 'System Health', icon: Activity, href: '/admin/system-health'},
//     { id: 'activity-log', label: 'Activity Log', icon: FileText, href: '/admin/activity-log' },
//   ];

//   const MenuItem = ({ item }: any) => {
//     const isExpanded = !!expandedItems[item.id]; // false by default
//     const hasChildren = item.children && item.children.length > 0;
//     const isParentActive = hasChildren && item.children.some((c: any) => isActive(c.href));

//     return (
//       <div>
//         {item.href ? (
//           <Link
//             href={item.href}
//             className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
//               isActive(item.href)
//                 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
//             } ${isCollapsed ? 'justify-center' : ''}`}
//             title={isCollapsed ? item.label : ''}
//           >
//             <item.icon className="w-5 h-5 shrink-0" />
//             {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
//           </Link>
//         ) : (
//           <button
//             onClick={() => toggleExpand(item.id)}
//             className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
//               isParentActive || isExpanded
//                 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
//             } ${isCollapsed ? 'justify-center' : ''}`}
//           >
//             <div className="flex items-center gap-3">
//               <item.icon className="w-5 h-5 shrink-0" />
//               {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
//             </div>
//             {!isCollapsed && hasChildren && (
//               <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
//             )}
//           </button>
//         )}

//         {/* Submenu - only when expanded and not collapsed */}
//         {hasChildren && !isCollapsed && isExpanded && (
//           <div className="ml-10 mt-1 space-y-1">
//             {item.children.map((child: any) => (
//               <Link
//                 key={child.id}
//                 href={child.href}
//                 className={`block px-3 py-2 rounded-lg text-sm transition-all ${
//                   isActive(child.href)
//                     ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                     : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
//                 }`}
//               >
//                 <child.icon className="w-4 h-4 inline-block mr-2 shrink-0" />
//                 {child.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <aside className={`fixed top-16 left-0 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-20 ${isCollapsed ? 'w-16' : 'w-64'}`}>
//       <div className="h-full py-4 flex flex-col justify-between overflow-y-auto">
//         <div className="px-3 space-y-6">
//           {/* Client Section */}
//           <div>
//             {!isCollapsed && (
//               <div className="px-3 mb-3">
//                 <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</span>
//               </div>
//             )}
//             <div className="space-y-1">
//               {clientItems.map(item => (
//                 <MenuItem key={item.id} item={item} />
//               ))}
//             </div>
//           </div>

//           {/* System Section */}
//           <div>
//             {!isCollapsed && (
//               <div className="px-3 mb-3">
//                 <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">System</span>
//               </div>
//             )}
//             <div className="space-y-1">
//               {systemItems.map(item => (
//                 <MenuItem key={item.id} item={item} />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Logout */}
//         <div className="px-3">
//           <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
//             <LogOut className="w-5 h-5 flex-shrink-0" />
//             {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }





// 'use client';

// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard, Users, CreditCard, Globe, Monitor,
//   MessageCircle, BarChart3, Activity, FileText, LogOut, Ticket
// } from 'lucide-react';

// export default function AdminSidebar() {
//   const pathname = usePathname();

//   // Detect screen size
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 1024); // lg breakpoint = 1024px
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const isActive = (href: string) => pathname === href;

//   // All menu items (flattened for mobile)
//   const allMenuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
//     { id: 'user-management', label: 'User Management', icon: Users, href: '/admin/user-management' },
//     { id: 'subscription', label: 'Subscription & Billing', icon: CreditCard, href: '/admin/subscription' },
//     { id: 'devices', label: 'Devices (Global)', icon: Globe, href: '/admin/devices' },
//     { id: 'screen', label: 'Screen & Content', icon: Monitor, href: '/admin/screen' },
//     { id: 'tickets', label: 'Tickets', icon: Ticket, href: '/admin/support/tickets' },
//     { id: 'live-chat', label: 'Live Chat', icon: MessageCircle, href: '/admin/support/live-chat' },
//     { id: 'overview', label: 'Reports Overview', icon: BarChart3, href: '/admin/reports/overview' },
//     { id: 'user-analytics', label: 'User Analytics', icon: BarChart3, href: '/admin/reports/user-analytics' },
//     { id: 'system-health', label: 'System Health', icon: Activity, href: '/admin/system-health' },
//     { id: 'activity-log', label: 'Activity Log', icon: FileText, href: '/admin/activity-log' },
//   ];

//   // Full nested structure for desktop
//   const clientItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
//     { id: 'user-management', label: 'User Management', icon: Users, href: '/admin/user-management' },
//     { id: 'subscription', label: 'Subscription & Billing', icon: CreditCard, href: '/admin/subscription' },
//     { id: 'devices', label: 'Devices (Global)', icon: Globe, href: '/admin/devices' },
//     { id: 'screen', label: 'Screen & Content', icon: Monitor, href: '/admin/screen' },
//     {
//       id: 'support',
//       label: 'Customer Supports',
//       icon: MessageCircle,
//       children: [
//         { id: 'tickets', label: 'Tickets', href: '/admin/support/tickets', icon: Ticket },
//         { id: 'live-chat', label: 'Live Chat', href: '/admin/support/live-chat', icon: MessageCircle },
//       ],
//     },
//   ];

//   const systemItems = [
//     {
//       id: 'reports',
//       label: 'Reports & Analytics',
//       icon: BarChart3,
//       children: [
//         { id: 'overview', label: 'Overview', href: '/admin/reports/overview', icon: BarChart3 },
//         { id: 'user-analytics', label: 'User Analytics', href: '/admin/reports/user-analytics', icon: BarChart3 },
//       ],
//     },
//     { id: 'system-health', label: 'System Health', icon: Activity, href: '/admin/system-health' },
//     { id: 'activity-log', label: 'Activity Log', icon: FileText, href: '/admin/activity-log' },
//   ];

//   // Desktop: Normal nested menu
//   const DesktopMenu = () => {
//     const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

//     useEffect(() => {
//       const newExpanded: Record<string, boolean> = {};
//       if (pathname.startsWith('/admin/support')) newExpanded.support = true;
//       if (pathname.startsWith('/admin/reports')) newExpanded.reports = true;
//       setExpandedItems(prev => ({ ...prev, ...newExpanded }));
//     }, [pathname]);

//     const toggleExpand = (id: string) => {
//       setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
//     };

//     const MenuItem = ({ item }: any) => {
//       const isExpanded = !!expandedItems[item.id];
//       const hasChildren = item.children && item.children.length > 0;
//       const isParentActive = hasChildren && item.children.some((c: any) => isActive(c.href));

//       return (
//         <div key={item.id}>
//           {item.href ? (
//             <Link
//               href={item.href}
//               className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
//                 isActive(item.href)
//                   ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
//               }`}
//             >
//               <item.icon className="w-5 h-5 shrink-0" />
//               <span className="text-sm font-medium">{item.label}</span>
//             </Link>
//           ) : (
//             <button
//               onClick={() => toggleExpand(item.id)}
//               className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
//                 isParentActive || isExpanded
//                   ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <item.icon className="w-5 h-5 shrink-0" />
//                 <span className="text-sm font-medium">{item.label}</span>
//               </div>
//               {hasChildren && (
//                 <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               )}
//             </button>
//           )}

//           {hasChildren && isExpanded && (
//             <div className="ml-10 mt-1 space-y-1">
//               {item.children.map((child: any) => (
//                 <Link
//                   key={child.id}
//                   href={child.href}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
//                     isActive(child.href)
//                       ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                       : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
//                   }`}
//                 >
//                   <child.icon className="w-4 h-4" />
//                   {child.label}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     };

//     return (
//       <>
//         <div className="px-3 mb-3">
//           <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</span>
//         </div>
//         <div className="space-y-1">
//           {clientItems.map(item => <MenuItem key={item.id} item={item} />)}
//         </div>

//         <div className="px-3 mb-3 mt-8">
//           <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">System</span>
//         </div>
//         <div className="space-y-1">
//           {systemItems.map(item => <MenuItem key={item.id} item={item} />)}
//         </div>
//       </>
//     );
//   };

//   return (
//     <aside className={`fixed top-16 left-0 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-20 ${isMobile ? 'w-16' : 'w-64'}`}>
//       <div className="h-full py-4 flex flex-col justify-between overflow-y-auto">
//         <div className="px-3 space-y-6">
//           {/* Mobile: Show only icons (flattened) */}
//           {isMobile ? (
//             <div className="space-y-1">
//               {allMenuItems.map(item => (
//                 <Link
//                   key={item.id}
//                   href={item.href}
//                   className={`flex items-center justify-center p-3 rounded-lg transition-all ${
//                     isActive(item.href)
//                       ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                       : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
//                   }`}
//                   title={item.label}
//                 >
//                   <item.icon className="w-5 h-5" />
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <DesktopMenu />
//           )}
//         </div>

//         {/* Logout */}
//         <div className="px-3 pb-4">
//           <button className={`w-full flex items-center ${isMobile ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'} rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all`}>
//             <LogOut className="w-5 h-5" />
//             {!isMobile && <span className="text-sm font-medium">Logout</span>}
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }