'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUturnLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ProductRowActionsProps {
  id: string;
  name: string;
  archived?: boolean;
}

export default function ProductRowActions({ id, name, archived = false }: ProductRowActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    if (!window.confirm(`Delete “${name}”? It will be hidden from the storefront and can be restored later.`)) {
      return;
    }
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        setError(data.message || 'Could not delete this product.');
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError('Could not reach the server.');
      setBusy(false);
    }
  }

  async function handleRestore() {
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        setError(data.message || 'Could not restore this product.');
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError('Could not reach the server.');
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center justify-end gap-1">
        {archived ? (
          <button
            type="button"
            onClick={handleRestore}
            disabled={busy}
            className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60"
          >
            <ArrowUturnLeftIcon className="h-3.5 w-3.5" />
            {busy ? 'Restoring…' : 'Restore'}
          </button>
        ) : (
          <>
            <Link
              href={`/admin/products/${id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-[11px] font-semibold text-charcoal-700 transition hover:border-ruby-200 hover:text-ruby-600"
            >
              <PencilSquareIcon className="h-3.5 w-3.5" />
              Edit
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[11px] font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-60"
            >
              <TrashIcon className="h-3.5 w-3.5" />
              {busy ? 'Deleting…' : 'Delete'}
            </button>
          </>
        )}
      </div>
      {error && <p className="max-w-[220px] text-right text-[10px] text-rose-600">{error}</p>}
    </div>
  );
}
