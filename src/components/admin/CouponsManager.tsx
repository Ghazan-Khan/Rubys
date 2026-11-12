'use client';

import { useState } from 'react';
import {
  CheckIcon,
  ClipboardDocumentIcon,
  PencilSquareIcon,
  PlusIcon,
  TagIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { AdminCoupon } from '@/types';
import { formatPKR } from '@/lib/format';

interface CouponsManagerProps {
  initialCoupons: AdminCoupon[];
}

export default function CouponsManager({ initialCoupons }: CouponsManagerProps) {
  const [coupons, setCoupons] = useState<AdminCoupon[]>(initialCoupons);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AdminCoupon | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form states
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState<number | ''>(10);
  const [minOrderAmount, setMinOrderAmount] = useState<number | ''>(0);
  const [maxDiscountAmount, setMaxDiscountAmount] = useState<number | ''>('');
  const [usageLimit, setUsageLimit] = useState<number | ''>('');
  const [startsAt, setStartsAt] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [isActive, setIsActive] = useState(true);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch = c.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && c.isActive) ||
      (statusFilter === 'inactive' && !c.isActive);
    return matchesSearch && matchesStatus;
  });

  const totalUsed = coupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);
  const activeCount = coupons.filter((c) => c.isActive).length;

  function openCreateModal() {
    setEditingCoupon(null);
    setCode('');
    setType('percentage');
    setValue(10);
    setMinOrderAmount(0);
    setMaxDiscountAmount('');
    setUsageLimit('');
    setStartsAt('');
    setExpiresAt('');
    setIsActive(true);
    setErrorMessage('');
    setModalOpen(true);
  }

  function openEditModal(c: AdminCoupon) {
    setEditingCoupon(c);
    setCode(c.code);
    setType(c.type);
    setValue(c.value);
    setMinOrderAmount(c.minOrderAmount);
    setMaxDiscountAmount(c.maxDiscountAmount ?? '');
    setUsageLimit(c.usageLimit ?? '');
    setStartsAt(c.startsAt ? c.startsAt.slice(0, 10) : '');
    setExpiresAt(c.expiresAt ? c.expiresAt.slice(0, 10) : '');
    setIsActive(c.isActive);
    setErrorMessage('');
    setModalOpen(true);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  async function handleToggleStatus(coupon: AdminCoupon) {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update');
      setCoupons((prev) =>
        prev.map((c) => (c.id === coupon.id ? { ...c, isActive: !c.isActive } : c))
      );
    } catch (err: any) {
      alert(err.message || 'Could not toggle coupon status.');
    }
  }

  async function handleDelete(id: string, couponCode: string) {
    if (!confirm(`Are you sure you want to delete coupon "${couponCode}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete');
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      setSuccessMessage(`Coupon "${couponCode}" deleted successfully.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Could not delete coupon.');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');
    setSaving(true);

    const payload = {
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minOrderAmount: Number(minOrderAmount) || 0,
      maxDiscountAmount: maxDiscountAmount === '' ? null : Number(maxDiscountAmount),
      usageLimit: usageLimit === '' ? null : Number(usageLimit),
      startsAt: startsAt ? new Date(startsAt).toISOString() : null,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      isActive,
    };

    try {
      if (editingCoupon) {
        const res = await fetch(`/api/admin/coupons/${editingCoupon.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to update coupon');
        setCoupons((prev) => prev.map((c) => (c.id === editingCoupon.id ? data.coupon : c)));
        setSuccessMessage(`Coupon "${payload.code}" updated!`);
      } else {
        const res = await fetch('/api/admin/coupons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to create coupon');
        setCoupons((prev) => [data.coupon, ...prev]);
        setSuccessMessage(`Coupon "${payload.code}" created successfully!`);
      }
      setModalOpen(false);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save coupon.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Discounts & Promotions</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">Coupons & Vouchers</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Create promotional codes, set minimum spends, expiry dates and track redemptions.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ruby-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ruby-700"
        >
          <PlusIcon className="h-5 w-5" />
          Create Coupon
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          ✓ {successMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ruby-50 text-ruby-600">
              <TagIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase text-charcoal-400">Total Coupons</p>
              <p className="text-2xl font-black text-charcoal-900">{coupons.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase text-charcoal-400">Active Coupons</p>
              <p className="text-2xl font-black text-charcoal-900">{activeCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <TagIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase text-charcoal-400">Total Redemptions</p>
              <p className="text-2xl font-black text-charcoal-900">{totalUsed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search by coupon code (e.g. RUBY10)…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm text-charcoal-900 placeholder-gray-400 outline-none transition focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500 sm:max-w-xs"
        />
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                statusFilter === filter
                  ? 'bg-charcoal-900 text-white'
                  : 'bg-gray-100 text-charcoal-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {filteredCoupons.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-3xl">🎟️</p>
            <h3 className="mt-2 text-sm font-bold text-charcoal-900">No coupons found</h3>
            <p className="text-xs text-charcoal-500">
              {search ? 'Try another search term.' : 'Click "Create Coupon" above to add your first promotional discount code.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/75 text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                <tr>
                  <th className="px-5 py-3.5">Code</th>
                  <th className="px-5 py-3.5">Discount</th>
                  <th className="px-5 py-3.5">Min. Spend</th>
                  <th className="px-5 py-3.5">Max Cap</th>
                  <th className="px-5 py-3.5">Usage</th>
                  <th className="px-5 py-3.5">Expiry</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon.id} className="transition hover:bg-gray-50/50">
                    <td className="whitespace-nowrap px-5 py-4 font-mono font-bold text-charcoal-900">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-ruby-50 px-2.5 py-1 text-xs font-extrabold tracking-wider text-ruby-700">
                          {coupon.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(coupon.code)}
                          title="Copy Code"
                          className="text-gray-400 hover:text-charcoal-700"
                        >
                          {copiedCode === coupon.code ? (
                            <CheckIcon className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <ClipboardDocumentIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-charcoal-800">
                      {coupon.type === 'percentage' ? (
                        <span className="text-ruby-600">{coupon.value}% OFF</span>
                      ) : (
                        <span className="text-emerald-700">{formatPKR(coupon.value)} OFF</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-charcoal-600">
                      {coupon.minOrderAmount > 0 ? formatPKR(coupon.minOrderAmount) : 'None'}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-charcoal-600">
                      {coupon.maxDiscountAmount ? formatPKR(coupon.maxDiscountAmount) : '—'}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="font-medium text-charcoal-900">{coupon.usedCount}</span>
                      <span className="text-xs text-charcoal-400">
                        {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ' used'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-charcoal-600">
                      {coupon.expiresAt
                        ? new Date(coupon.expiresAt).toLocaleDateString('en-PK', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'No Expiry'}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(coupon)}
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                          coupon.isActive
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <span
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            coupon.isActive ? 'bg-emerald-600' : 'bg-gray-400'
                          }`}
                        />
                        {coupon.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(coupon)}
                          className="rounded-lg p-1.5 text-charcoal-400 transition hover:bg-gray-100 hover:text-charcoal-700"
                          title="Edit Coupon"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === coupon.id}
                          onClick={() => handleDelete(coupon.id, coupon.code)}
                          className="rounded-lg p-1.5 text-rose-500 transition hover:bg-rose-50 hover:text-rose-700"
                          title="Delete Coupon"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-charcoal-900">
                {editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : 'Create New Coupon'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH20, EID500"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 font-mono text-sm font-bold uppercase text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700">Discount Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'percentage' | 'fixed')}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (PKR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700">
                    {type === 'percentage' ? 'Percentage (%) *' : 'Amount (Rs.) *'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={type === 'percentage' ? '100' : undefined}
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value === '' ? '' : Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700">Min. Order (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0 = No minimum"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500"
                  />
                </div>

                {type === 'percentage' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase text-charcoal-700">Max Cap (PKR)</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Optional cap"
                      value={maxDiscountAmount}
                      onChange={(e) =>
                        setMaxDiscountAmount(e.target.value === '' ? '' : Number(e.target.value))
                      }
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase text-charcoal-700">Usage Limit</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Unlimited"
                      value={usageLimit}
                      onChange={(e) => setUsageLimit(e.target.value === '' ? '' : Number(e.target.value))}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700">Starts At</label>
                  <input
                    type="date"
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700">Expires At</label>
                  <input
                    type="date"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="coupon-active"
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-ruby-600 focus:ring-ruby-500"
                />
                <label htmlFor="coupon-active" className="text-sm font-medium text-charcoal-800">
                  Enable coupon immediately
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-charcoal-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-ruby-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ruby-700 disabled:opacity-50"
                >
                  {saving ? 'Saving…' : editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
