import AdminShell from '@/components/admin/AdminShell';
import { requireAdminPage } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminPage();

  return (
    <AdminShell
      user={{
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }}
    >
      {children}
    </AdminShell>
  );
}
