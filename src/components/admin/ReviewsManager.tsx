'use client';

import { useState } from 'react';
import { CheckIcon, HandThumbUpIcon, HandThumbDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { AdminReview } from '@/lib/admin';
import { formatDateTime } from '@/lib/format';

interface ReviewsManagerProps {
  initialData: { reviews: AdminReview[]; total: number; page: number; pageSize: number };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? 'text-amber-400' : 'text-gray-200'}>★</span>
      ))}
    </span>
  );
}

export default function ReviewsManager({ initialData }: ReviewsManagerProps) {
  const [reviews, setReviews] = useState<AdminReview[]>(initialData.reviews);
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [acting, setActing] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  const filtered = reviews.filter((r) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'approved' && r.isApproved) ||
      (statusFilter === 'pending' && !r.isApproved);
    const matchesSearch =
      !search ||
      r.authorName.toLowerCase().includes(search.toLowerCase()) ||
      (r.comment ?? '').toLowerCase().includes(search.toLowerCase()) ||
      r.productName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = reviews.filter((r) => !r.isApproved).length;
  const approvedCount = reviews.filter((r) => r.isApproved).length;

  async function doAction(id: string, action: 'approve' | 'reject' | 'delete') {
    setActing(id);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Action failed');

      if (action === 'delete') {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        setSuccess('Review deleted.');
      } else {
        setReviews((prev) => prev.map((r) => (r.id === id ? data.review : r)));
        setSuccess(action === 'approve' ? 'Review approved!' : 'Review rejected.');
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed.');
    } finally {
      setActing(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Moderation</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">Product Reviews</h1>
          <p className="mt-1 text-sm text-charcoal-500">Approve, reject, or remove customer reviews.</p>
        </div>
      </div>

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          ✓ {success}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: reviews.length, color: 'text-charcoal-900' },
          { label: 'Approved', value: approvedCount, color: 'text-emerald-700' },
          { label: 'Pending', value: pendingCount, color: 'text-amber-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm text-center">
            <p className="text-xs font-semibold uppercase text-charcoal-400">{label}</p>
            <p className={`text-2xl font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search by author, product or review text…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm text-charcoal-900 placeholder-gray-400 outline-none transition focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500 sm:max-w-xs"
        />
        <div className="flex gap-2">
          {(['all', 'approved', 'pending'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                statusFilter === f ? 'bg-charcoal-900 text-white' : 'bg-gray-100 text-charcoal-600 hover:bg-gray-200'
              }`}
            >
              {f} {f === 'pending' && pendingCount > 0 && (
                <span className="ml-1 rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] text-white">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-3xl">⭐</p>
            <h3 className="mt-2 text-sm font-bold text-charcoal-900">No reviews found</h3>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((review) => (
              <div key={review.id} className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-charcoal-400">{formatDateTime(review.createdAt)}</span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        review.isApproved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {review.isApproved ? '✓ Approved' : '⏳ Pending'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-bold text-charcoal-900">{review.authorName}</span>
                      {review.title && (
                        <span className="ml-2 text-sm italic text-charcoal-600">"{review.title}"</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-charcoal-700">{review.comment}</p>
                    <p className="mt-1 text-xs text-charcoal-400">
                      Product: <span className="font-medium text-charcoal-700">{review.productName}</span>
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {!review.isApproved && (
                      <button
                        disabled={acting === review.id}
                        onClick={() => doAction(review.id, 'approve')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                      >
                        <HandThumbUpIcon className="h-4 w-4" /> Approve
                      </button>
                    )}
                    {review.isApproved && (
                      <button
                        disabled={acting === review.id}
                        onClick={() => doAction(review.id, 'reject')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                      >
                        <HandThumbDownIcon className="h-4 w-4" /> Reject
                      </button>
                    )}
                    <button
                      disabled={acting === review.id}
                      onClick={() => confirm('Delete this review permanently?') && doAction(review.id, 'delete')}
                      className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
                      title="Delete Review"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
