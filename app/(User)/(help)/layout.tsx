// app/dashboard/layout.tsx
// import UserDashboardNavbar from "@/components/layout/UserDashboardNavbar";
// import Wrapper from "@/components/layout/Wrapper";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-White ">
//       <UserDashboardNavbar />
//       <Wrapper>{children}</Wrapper>
//     </div>
//   );
// }


"use client";

import UserDashboardNavbar from "@/components/layout/UserDashboardNavbar";
import Wrapper from "@/components/layout/Wrapper";
import SidebarComponent from "@/components/sidebar/SidebarComponent";
import { HelpCircle, Video, Headphones } from 'lucide-react';
import { useState, useEffect } from "react";

const customItems = [
  {
    icon: <HelpCircle className="w-5 h-5" />,
    label: 'FAQs',
    href: '/faqs',
  },
  {
    icon: <Video className="w-5 h-5" />,
    label: 'Tutorials',
    href: '/video_tutorials',
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    label: 'Support',
    href: '/support',
  },
];

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsMobile(true);
        setIsCollapsed(true); // Default to collapsed state logic internally
      } else if (width < 1024) {
        setIsMobile(false);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
        // On desktop, keep existing state or default to expanded? 
        // We'll trust the user's manual toggle or default to false (expanded) on load if we didn't persist it.
        // For simplicity in this fix, we reset to false only if we are growing from small screen, 
        // but better to just set it based on width if we want auto-responsiveness.
        // Let's stick to the previous pattern: auto-expand if large.
        if (width >= 1024) setIsCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-White">
      <UserDashboardNavbar />

      <div className="flex">
        {!isMobile && (
          <SidebarComponent items={customItems} isCollapsed={isCollapsed} />
        )}

        {/* Main content - push right on desktop */}
        <main
          className={`flex-1 min-h-screen transition-all duration-300 ${isMobile ? 'ml-0 w-full' : (isCollapsed ? 'ml-16' : 'ml-64')
            }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
