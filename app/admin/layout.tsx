import { AdminSidebar } from '@/components/admin/admin-sidebar';

export const metadata = {
  title: 'Admin Dashboard | Blitz Hauling',
  description: 'Manage customers, jobs, and invoices',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
