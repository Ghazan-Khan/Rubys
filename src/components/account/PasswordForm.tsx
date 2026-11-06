'use client';

import { useState } from 'react';

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('The new passwords do not match.');
      return;
    }
    setStatus('loading');
    try {
      const response = await fetch('/api/account/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        setStatus('error');
        setMessage(data.message || 'Could not update your password.');
        return;
      }
      setStatus('success');
      setMessage(data.message || 'Your password has been updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold text-charcoal-900">Password</h2>
      <p className="mt-1 text-xs text-charcoal-500">Use at least 8 characters and avoid reusing old passwords.</p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="current-password" className="label-field">Current password</label>
          <input
            id="current-password"
            type="password"
            autoComplete="current-password"
            required
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="input-field"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="new-password" className="label-field">New password</label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="confirm-new-password" className="label-field">Confirm new password</label>
            <input
              id="confirm-new-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {message && (
        <p className={`mt-3 text-xs font-medium ${status === 'success' ? 'text-emerald-700' : 'text-rose-600'}`} role="status">
          {message}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-secondary mt-4 px-5 py-2 text-sm">
        {status === 'loading' ? 'Updating…' : 'Update password'}
      </button>
    </form>
  );
}
