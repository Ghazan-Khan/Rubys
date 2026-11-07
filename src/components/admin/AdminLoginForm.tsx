'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        setError(data.message || 'Could not sign in. Please try again.');
        setSubmitting(false);
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800"
        >
          {error}
        </div>
      )}

      <div>
        <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-charcoal-700">
          Email address
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-charcoal-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-ruby-500"
          placeholder="you@rubys.pk"
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-charcoal-700">
          Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm text-charcoal-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-ruby-500"
            placeholder="Your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-charcoal-400 hover:bg-gray-100 hover:text-charcoal-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-ruby-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ruby-700 focus:outline-none focus:ring-2 focus:ring-ruby-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LockClosedIcon className="h-4 w-4" />
        {submitting ? 'Signing in…' : 'Sign in to admin'}
      </button>

      <p className="text-center text-xs text-charcoal-500">
        Authorized staff only. Customer accounts cannot access the admin dashboard.
      </p>
      <p className="text-center text-xs">
        <Link href="/" className="font-medium text-ruby-600 hover:underline">
          ← Back to Ruby&apos;s.pk
        </Link>
      </p>
    </form>
  );
}
