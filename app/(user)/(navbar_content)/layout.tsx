// app/dashboard/layout.tsx
import UserDashboardNavbar from "@/components/layout/UserDashboardNavbar";
import Wrapper from "@/components/layout/Wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bgGray dark:bg-[#0f172a]">
      <UserDashboardNavbar />
      <Wrapper>{children}</Wrapper>
    </div>
  );
}