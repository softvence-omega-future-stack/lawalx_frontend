
// import AdminNavbar from "@/components/layout/AdminNavbar";
// import Wrapper from "@/components/layout/Wrapper";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900">
//       <AdminNavbar />
//       <Wrapper>{children}</Wrapper>
//     </div>
//   );
// }

'use client';

import { ThemeProvider } from '@/components/Admin/layout/ThemeProvider';
import Navbar from '@/components/Admin/layout/AdminNavbar';
import Sidebar from '@/components/Admin/layout/AdminSidebar';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-White">
        <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <Sidebar isCollapsed={isCollapsed} />

        <main className={`pt-16 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-2 md:p-6">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}