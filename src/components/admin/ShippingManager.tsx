'use client';

import { useState } from 'react';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { AdminShippingZone } from '@/lib/admin';
import { formatPKR } from '@/lib/format';

interface ShippingManagerProps {
  initialZones: AdminShippingZone[];
}

export default function ShippingManager({ initialZones }: ShippingManagerProps) {
  const [zones, setZones] = useState<AdminShippingZone[]>(initialZones);
  const [editing, setEditing] = useState<AdminShippingZone | null>(null);
  const [rate, setRate] = useState(0);
  const [freeMin, setFreeMin] = useState<number | ''>('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function openEdit(zone: AdminShippingZone) {
    setEditing(zone);
    setRate(zone.rate);
    setFreeMin(zone.freeShippingMin ?? '');
    setEstimatedDays(zone.estimatedDays ?? '');
    setIsActive(zone.isActive);
    setError('');
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true); setError('');
    try {
      const res = await fetch('/api/admin/shipping', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editing.id,
          rate: Number(rate),
          freeShippingMin: freeMin === '' ? null : Number(freeMin),
          estimatedDays: estimatedDays || null,
          isActive,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save');
      setZones((prev) => prev.map((z) => (z.id === editing.id ? data.zone : z)));
      setEditing(null);
      setSuccess(`${editing.name} shipping rates updated!`);
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to update zone.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Fulfilment</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">Shipping Zones & Rates</h1>
        <p className="mt-1 text-sm text-charcoal-500">
          Update delivery rates, free shipping thresholds and estimated delivery times for each province zone.
        </p>
      </div>

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">✓ {success}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {zones.map((zone) => (
          <div key={zone.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-charcoal-900">{zone.name}</p>
                <p className="mt-0.5 text-xs text-charcoal-500">{zone.provinces.join(', ')}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${zone.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {zone.isActive ? 'Active' : 'Disabled'}
                </span>
                <button onClick={() => openEdit(zone)} className="rounded-lg p-1.5 text-charcoal-400 hover:bg-gray-100 hover:text-charcoal-700">
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-gray-50 p-2">
                <p className="text-[10px] font-semibold uppercase text-charcoal-400">Rate</p>
                <p className="text-sm font-black text-charcoal-900">{formatPKR(zone.rate)}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-2">
                <p className="text-[10px] font-semibold uppercase text-charcoal-400">Free above</p>
                <p className="text-sm font-black text-charcoal-900">
                  {zone.freeShippingMin ? formatPKR(zone.freeShippingMin) : 'Never'}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-2">
                <p className="text-[10px] font-semibold uppercase text-charcoal-400">ETA</p>
                <p className="text-sm font-black text-charcoal-900">{zone.estimatedDays ?? '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-charcoal-900">Edit: {editing.name}</h2>
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {error && <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800">{error}</div>}

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700">Delivery Rate (PKR) *</label>
                <input type="number" min="0" required value={rate} onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700">Free Shipping Above (PKR)</label>
                <input type="number" min="0" value={freeMin} onChange={(e) => setFreeMin(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Leave blank to never offer free shipping"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700">Estimated Delivery Time</label>
                <input type="text" value={estimatedDays} onChange={(e) => setEstimatedDays(e.target.value)} placeholder="e.g. 2-3 days"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500" />
              </div>

              <div className="flex items-center gap-2">
                <input id="zone-active" type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-ruby-600 focus:ring-ruby-500" />
                <label htmlFor="zone-active" className="text-sm font-medium text-charcoal-800">Enable this shipping zone</label>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-charcoal-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="rounded-xl bg-ruby-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ruby-700 disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
