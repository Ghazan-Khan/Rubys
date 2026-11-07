import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { getAdminUser } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLoginPage() {
  const user = await getAdminUser();
  if (user) redirect('/admin');

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ruby-600 text-2xl font-bold text-white shadow-lg shadow-ruby-950/40">
            R
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
            Ruby&apos;s<span className="text-ruby-400">.pk</span> Admin
          </h1>
          <p className="mt-1 text-sm text-gray-400">Sign in to manage products, orders and customers.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
          <AdminLoginForm />
        </div>

        <p className="mt-5 text-center text-[11px] leading-5 text-gray-500">
          This area is protected by server-side authentication, role checks and login rate limiting.
        </p>
      </div>
    </div>
  );
}
