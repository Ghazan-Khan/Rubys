'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  ChatBubbleLeftEllipsisIcon,
  CubeIcon,
  DocumentTextIcon,
  HomeIcon,
  ShoppingBagIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/format';

interface AdminShellProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  children: React.ReactNode;
}

const NAV = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Products', href: '/admin/products', icon: CubeIcon },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBagIcon },
  { name: 'Customers', href: '/admin/customers', icon: UsersIcon },
  { name: 'Coupons', href: '/admin/coupons', icon: TagIcon },
  { name: 'Reviews', href: '/admin/reviews', icon: StarIcon },
  { name: 'Blog & Journal', href: '/admin/blog', icon: DocumentTextIcon },
  { name: 'Shipping', href: '/admin/shipping', icon: TruckIcon },
  { name: 'Inquiries', href: '/admin/inquiries', icon: ChatBubbleLeftEllipsisIcon },
];


export default function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } finally {
      window.location.href = '/admin/login';
    }
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-charcoal-950 text-white">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ruby-600 text-lg font-bold text-white">
          R
        </span>
        <div>
          <p className="text-sm font-bold leading-tight">
            Ruby&apos;s<span className="text-ruby-400">.pk</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">Admin</p>
        </div>
        <button
          type="button"
          className="ml-auto rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin navigation">
        {NAV.map((item) => {
          const active =
            item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                active
                  ? 'bg-ruby-600 text-white shadow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          View storefront
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 lg:block">{sidebar}</aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-charcoal-950/60"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <aside className="absolute inset-y-0 left-0 w-64">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            type="button"
            className="rounded-lg p-2 text-charcoal-600 hover:bg-gray-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-charcoal-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-[11px] text-charcoal-400">
              {user.email} · <span className="capitalize">{user.role}</span>
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-charcoal-700 transition hover:border-ruby-200 hover:text-ruby-600 sm:flex"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              Store
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 rounded-lg bg-charcoal-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-charcoal-800 disabled:opacity-60"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              {loggingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </header>

        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
