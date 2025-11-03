
import AdminNavbar from "@/components/layout/AdminNavbar";
import Wrapper from "@/components/layout/Wrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <AdminNavbar />
      <Wrapper>{children}</Wrapper>
    </div>
  );
}

