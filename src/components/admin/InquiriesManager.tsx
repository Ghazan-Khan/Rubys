'use client';

import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import type { AdminContactMessage } from '@/lib/admin';
import { formatDateTime } from '@/lib/format';

type Subscriber = { id: string; email: string; isActive: boolean; subscribedAt: string };
type MessageStatus = 'new' | 'read' | 'replied' | 'closed';

interface InquiriesManagerProps {
  initialData: { messages: AdminContactMessage[]; total: number; page: number; pageSize: number };
  initialSubscribers: Subscriber[];
}

const STATUS_COLORS: Record<MessageStatus, string> = {
  new: 'bg-ruby-50 text-ruby-700',
  read: 'bg-blue-50 text-blue-700',
  replied: 'bg-emerald-50 text-emerald-700',
  closed: 'bg-gray-100 text-gray-500',
};

export default function InquiriesManager({ initialData, initialSubscribers }: InquiriesManagerProps) {
  const [messages, setMessages] = useState<AdminContactMessage[]>(initialData.messages);
  const [subscribers] = useState<Subscriber[]>(initialSubscribers);
  const [tab, setTab] = useState<'messages' | 'newsletter'>('messages');
  const [filterStatus, setFilterStatus] = useState<'all' | MessageStatus>('all');
  const [expanding, setExpanding] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  const filtered = messages.filter(
    (m) => filterStatus === 'all' || m.status === filterStatus
  );

  const counts = { new: messages.filter(m => m.status === 'new').length, read: messages.filter(m => m.status === 'read').length, replied: messages.filter(m => m.status === 'replied').length, closed: messages.filter(m => m.status === 'closed').length };

  async function updateStatus(id: string, status: MessageStatus) {
    setUpdating(id);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setMessages((prev) => prev.map((m) => (m.id === id ? data.message : m)));
      setSuccess(`Status updated to "${status}".`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  }

  function downloadCSV() {
    const header = 'Email,Subscribed At,Active\n';
    const rows = subscribers.map((s) => `${s.email},${s.subscribedAt},${s.isActive}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'rubys-newsletter-subscribers.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Communication</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">Inquiries & Newsletter</h1>
        <p className="mt-1 text-sm text-charcoal-500">Manage customer messages from the contact form and newsletter subscribers.</p>
      </div>

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">✓ {success}</div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1 w-fit">
        {(['messages', 'newsletter'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${tab === t ? 'bg-white text-charcoal-900 shadow-sm' : 'text-charcoal-500 hover:text-charcoal-700'}`}>
            {t === 'messages' ? `📩 Messages` : `📧 Newsletter`}
            {t === 'messages' && counts.new > 0 && (
              <span className="ml-1.5 rounded-full bg-ruby-600 px-1.5 py-0.5 text-[10px] font-bold text-white">{counts.new}</span>
            )}
            {t === 'newsletter' && (
              <span className="ml-1.5 text-xs text-charcoal-400">{subscribers.filter(s => s.isActive).length}</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'messages' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {(['new', 'read', 'replied', 'closed'] as MessageStatus[]).map((s) => (
              <button key={s} onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)}
                className={`rounded-2xl border p-4 text-center transition ${filterStatus === s ? 'border-ruby-300 bg-ruby-50' : 'border-gray-100 bg-white hover:bg-gray-50'} shadow-sm`}>
                <p className="text-xs font-semibold capitalize text-charcoal-400">{s}</p>
                <p className="text-2xl font-black text-charcoal-900">{counts[s]}</p>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-3xl">📩</p>
                <h3 className="mt-2 text-sm font-bold text-charcoal-900">No messages</h3>
              </div>
            ) : filtered.map((msg) => (
              <div key={msg.id} className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_COLORS[msg.status]}`}>
                        {msg.status}
                      </span>
                      <span className="text-xs text-charcoal-400">{formatDateTime(msg.createdAt)}</span>
                    </div>
                    <p className="mt-2 font-bold text-charcoal-900">{msg.name} <span className="font-normal text-charcoal-400">— {msg.email}</span></p>
                    {msg.subject && <p className="text-sm font-semibold text-charcoal-700">{msg.subject}</p>}
                    <p
                      className={`mt-1 text-sm text-charcoal-600 ${expanding === msg.id ? '' : 'line-clamp-2'}`}
                      onClick={() => setExpanding(expanding === msg.id ? null : msg.id)}
                    >
                      {msg.message}
                    </p>
                    {msg.message.length > 100 && (
                      <button onClick={() => setExpanding(expanding === msg.id ? null : msg.id)} className="text-xs font-semibold text-ruby-600 hover:underline">
                        {expanding === msg.id ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    {(['new', 'read', 'replied', 'closed'] as MessageStatus[]).filter(s => s !== msg.status).map((s) => (
                      <button key={s} disabled={updating === msg.id} onClick={() => updateStatus(msg.id, s)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold capitalize text-charcoal-700 transition hover:bg-gray-50 disabled:opacity-50">
                        Mark {s}
                      </button>
                    ))}
                    <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Your Inquiry')} | Ruby's.pk`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-ruby-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ruby-700">
                      <EnvelopeIcon className="h-3.5 w-3.5" /> Reply
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'newsletter' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-bold text-charcoal-900">Total Subscribers: <span className="text-ruby-600">{subscribers.length}</span></p>
              <p className="text-xs text-charcoal-500">Active: {subscribers.filter(s => s.isActive).length}</p>
            </div>
            <button onClick={downloadCSV} className="inline-flex items-center gap-2 rounded-xl bg-charcoal-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-charcoal-800">
              ⬇ Export CSV
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-[11px] font-bold uppercase text-charcoal-500">
                <tr>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Subscribed</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-charcoal-900">{s.email}</td>
                    <td className="px-5 py-3 text-xs text-charcoal-500">{formatDateTime(s.subscribedAt)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                        {s.isActive ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
