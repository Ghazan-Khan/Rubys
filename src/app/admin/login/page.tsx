import type { Metadata } from 'next';
import Image from 'next/image';
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
          <div className="inline-flex items-center justify-center gap-3">
            <Image
              src="/images/logo.webp"
              alt="Ruby's.pk Admin"
              width={140}
              height={72}
              priority
              className="h-12 w-auto object-contain drop-shadow-md"
            />
            <span className="flex items-baseline font-black tracking-tighter text-3xl select-none leading-none drop-shadow-sm">
              <span className="text-white font-black">Rubys</span>
              <span className="text-ruby-500 font-black text-2xl">.pk</span>
            </span>
          </div>
          <h1 className="mt-4 text-xl font-bold tracking-tight text-white">
            Staff & Admin Portal
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
