'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('The two passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Your password must be at least 8 characters long.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        setError(data.message || 'Could not create your account.');
        setLoading(false);
        return;
      }
      router.push('/account');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="register-first-name" className="label-field">First name</label>
          <input
            id="register-first-name"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={(event) => update('firstName', event.target.value)}
            className="input-field"
            placeholder="Ayesha"
          />
        </div>
        <div>
          <label htmlFor="register-last-name" className="label-field">Last name</label>
          <input
            id="register-last-name"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={(event) => update('lastName', event.target.value)}
            className="input-field"
            placeholder="Khan"
          />
        </div>
      </div>

      <div>
        <label htmlFor="register-email" className="label-field">Email address</label>
        <input
          id="register-email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(event) => update('email', event.target.value)}
          className="input-field"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="register-phone" className="label-field">Mobile number</label>
        <input
          id="register-phone"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => update('phone', event.target.value)}
          className="input-field"
          placeholder="03001234567"
        />
        <p className="mt-1 text-[11px] text-charcoal-400">We use this number for delivery updates only.</p>
      </div>

      <div>
        <label htmlFor="register-password" className="label-field">Password</label>
        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={8}
            autoComplete="new-password"
            value={form.password}
            onChange={(event) => update('password', event.target.value)}
            className="input-field pr-11"
            placeholder="At least 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-charcoal-400 hover:text-charcoal-700"
          >
            {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="register-confirm-password" className="label-field">Confirm password</label>
        <input
          id="register-confirm-password"
          type={showPassword ? 'text' : 'password'}
          required
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={(event) => update('confirmPassword', event.target.value)}
          className="input-field"
          placeholder="Re-enter your password"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full py-3">
        <UserPlusIcon className="h-4 w-4" />
        {loading ? 'Creating account…' : 'Create account'}
      </button>

      <p className="text-center text-xs text-charcoal-500">
        Already have an account?{' '}
        <Link href="/account/login" className="font-semibold text-ruby-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
