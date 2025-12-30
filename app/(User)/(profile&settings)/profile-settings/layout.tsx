import UserDashboardNavbar from "@/components/layout/UserDashboardNavbar";
import SidebarComponent from "@/components/sidebar/SidebarComponent";
import { Bell, Palette, UserRoundCog, Crown, Lock, Webhook } from 'lucide-react';

const customItems = [
  {
    icon: <Palette className="w-5 h-5" />,
    label: 'General',
    href: '/profile-settings/general',
  },
  {
    icon: <UserRoundCog className="w-5 h-5" />,
    label: 'Account',
    href: '/profile-settings/account',
  },
  {
    icon: <Crown className="w-5 h-5" />,
    label: 'Subscriptions',
    href: '/profile-settings/subscriptions',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    label: 'Security',
    href: '/profile-settings/security',
  },
  {
    icon: <Bell className="w-5 h-5" />,
    label: 'Notifications',
    href: '/profile-settings/notifications',
  },
  {
    icon: <Webhook className="w-5 h-5" />,
    label: 'Integrations',
    href: '/profile-settings/integrations',
    comingSoon: true, // Assuming the sidebar component supports this, or I'll just leave it as is if not supported yet.
  },
];

// app/dashboard/content/layout.tsx

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-White min-h-screen">
      <UserDashboardNavbar />

      <div className="flex">
        <SidebarComponent items={customItems} className="top-24" />

        {/* Main content - push right on desktop */}
        <main className="flex-1 lg:ml-64 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

