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


// app/dashboard/content/layout.tsx
import UserDashboardNavbar from "@/components/layout/UserDashboardNavbar";
import Wrapper from "@/components/layout/Wrapper";
import SidebarComponent from "@/components/sidebar/SidebarComponent";
import { HelpCircle, Video, Headphones } from 'lucide-react';

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
  {
    icon: <HelpCircle className="w-5 h-5" />,
    label: 'Contact Us',
    href: '/contact',
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    label: 'Report and Problems',
    href: '/report&problem',
  }
];

// app/dashboard/content/layout.tsx

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-White ">
      <UserDashboardNavbar />
      
      <div className="flex">
        <SidebarComponent items={customItems} />
        
        {/* Main content - push right on desktop */}
        <main className="flex-1 min-h-screen lg:ml-64">
          <Wrapper>{children}</Wrapper>
        </main>
      </div>
    </div>
  );
}

