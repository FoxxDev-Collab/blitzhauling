import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, FileText, Mail, DollarSign } from 'lucide-react';

async function getDashboardStats() {
  const [
    totalCustomers,
    totalJobs,
    pendingJobs,
    totalInvoices,
    unpaidInvoices,
    newContacts
  ] = await Promise.all([
    prisma.customer.count(),
    prisma.job.count(),
    prisma.job.count({ where: { status: 'PENDING' } }),
    prisma.invoice.count(),
    prisma.invoice.count({ where: { status: { in: ['SENT', 'OVERDUE'] } } }),
    prisma.contactSubmission.count({ where: { status: 'NEW' } })
  ]);

  const invoiceStats = await prisma.invoice.aggregate({
    _sum: { total: true },
    where: { status: 'PAID' }
  });

  return {
    totalCustomers,
    totalJobs,
    pendingJobs,
    totalInvoices,
    unpaidInvoices,
    newContacts,
    totalRevenue: invoiceStats._sum.total || 0
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingJobs}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalJobs} total jobs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unpaidInvoices}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalInvoices} total invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Paid invoices</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Contact Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Mail className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{stats.newContacts}</div>
                <p className="text-sm text-muted-foreground">Unread submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/customers"
              className="block rounded-lg border p-3 hover:bg-accent transition-colors"
            >
              <div className="font-medium">Add New Customer</div>
              <p className="text-sm text-muted-foreground">Create a customer record</p>
            </a>
            <a
              href="/admin/jobs"
              className="block rounded-lg border p-3 hover:bg-accent transition-colors"
            >
              <div className="font-medium">Create New Job</div>
              <p className="text-sm text-muted-foreground">Schedule a hauling job</p>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
