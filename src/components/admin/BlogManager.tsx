'use client';

import { useState } from 'react';
import { PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { AdminBlogPost } from '@/lib/admin';
import { formatDateTime } from '@/lib/format';

interface BlogManagerProps {
  initialPosts: AdminBlogPost[];
}

const CATEGORIES = ['Clothing & Fashion', 'Beauty & Skincare', 'Bags & Accessories', 'Jewellery & Watches', 'Shoes & Footwear', 'Lifestyle & Personal Care', 'Buying Guides'];
const EMOJIS = ['👗', '💄', '👜', '✨', '👠', '🌸', '🧴', '🎀', '💎', '💅', '🛍️', '📝'];

export default function BlogManager({ initialPosts }: BlogManagerProps) {
  const [posts, setPosts] = useState<AdminBlogPost[]>(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [emoji, setEmoji] = useState('📝');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [error, setError] = useState('');

  const filtered = posts.filter((p) =>
    filterStatus === 'all' || p.status === filterStatus
  );

  function openCreate() {
    setEditingPost(null);
    setTitle(''); setContent(''); setExcerpt(''); setEmoji('📝');
    setCategory(''); setStatus('draft'); setMetaTitle(''); setMetaDescription('');
    setError(''); setModalOpen(true);
  }

  function openEdit(post: AdminBlogPost) {
    setEditingPost(post);
    setTitle(post.title); setContent(post.content); setExcerpt(post.excerpt ?? '');
    setEmoji(post.emoji ?? '📝'); setCategory(post.category ?? '');
    setStatus(post.status === 'published' ? 'published' : 'draft');
    setMetaTitle(post.metaTitle ?? ''); setMetaDescription(post.metaDescription ?? '');
    setError(''); setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setSaving(true);
    const payload = { title, content, excerpt: excerpt || null, emoji: emoji || null, category: category || null, status, metaTitle: metaTitle || null, metaDescription: metaDescription || null };
    try {
      if (editingPost) {
        const res = await fetch(`/api/admin/blog/${editingPost.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? data.post : p)));
        setSuccess(`Post "${title}" updated!`);
      } else {
        const res = await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setPosts((prev) => [data.post, ...prev]);
        setSuccess(`Post "${title}" created!`);
      }
      setModalOpen(false);
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, postTitle: string) {
    if (!confirm(`Delete "${postTitle}"?`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setSuccess(`"${postTitle}" deleted.`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  }

  async function togglePublish(post: AdminBlogPost) {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPosts((prev) => prev.map((p) => (p.id === post.id ? data.post : p)));
      setSuccess(`Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully.`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Content</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">Blog & Journal</h1>
          <p className="mt-1 text-sm text-charcoal-500">Write buying guides, news and lifestyle articles for the Ruby's Journal.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ruby-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ruby-700">
          <PlusIcon className="h-5 w-5" /> New Article
        </button>
      </div>

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">✓ {success}</div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Posts', value: posts.length },
          { label: 'Published', value: posts.filter(p => p.status === 'published').length },
          { label: 'Drafts', value: posts.filter(p => p.status === 'draft').length },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm text-center">
            <p className="text-xs font-semibold uppercase text-charcoal-400">{label}</p>
            <p className="text-2xl font-black text-charcoal-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'published', 'draft'] as const).map((f) => (
          <button key={f} onClick={() => setFilterStatus(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${filterStatus === f ? 'bg-charcoal-900 text-white' : 'bg-gray-100 text-charcoal-600 hover:bg-gray-200'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-100">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-3xl">📝</p>
            <h3 className="mt-2 text-sm font-bold text-charcoal-900">No articles yet</h3>
            <p className="text-xs text-charcoal-500">Click "New Article" to write your first blog post.</p>
          </div>
        ) : filtered.map((post) => (
          <div key={post.id} className="flex items-start justify-between gap-4 p-5">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-2xl">{post.emoji ?? '📝'}</span>
              <div>
                <p className="font-bold text-charcoal-900">{post.title}</p>
                <p className="mt-0.5 text-xs text-charcoal-500">{post.category} · {formatDateTime(post.createdAt)} · {post.views} views</p>
                {post.excerpt && <p className="mt-1 text-sm text-charcoal-600 line-clamp-2">{post.excerpt}</p>}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => togglePublish(post)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${post.status === 'published' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {post.status === 'published' ? '✓ Published' : '○ Draft'}
              </button>
              <button onClick={() => openEdit(post)} className="rounded-lg p-1.5 text-charcoal-400 hover:bg-gray-100 hover:text-charcoal-700">
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button disabled={deleting === post.id} onClick={() => handleDelete(post.id, post.title)} className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-charcoal-900">{editingPost ? 'Edit Article' : 'New Article'}</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {error && <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="flex gap-3 items-center">
                <div className="w-20">
                  <label className="block text-xs font-bold uppercase text-charcoal-700">Emoji</label>
                  <input type="text" value={emoji} onChange={(e) => setEmoji(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-center text-xl outline-none focus:border-ruby-500" maxLength={2} />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase text-charcoal-700">Title *</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article headline…" className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-ruby-500">
                    <option value="">Uncategorised</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')} className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-ruby-500">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700">Excerpt (shown in listings)</label>
                <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary shown in article cards…" className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500 resize-none" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700">Article Content *</label>
                <textarea required rows={12} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write the full article content here…" className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500 focus:ring-1 focus:ring-ruby-500 resize-y font-mono" />
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-bold uppercase text-charcoal-500 mb-2">SEO (Optional)</p>
                <div className="space-y-3">
                  <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Meta title (defaults to article title)" className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500" />
                  <input type="text" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Meta description (150-160 characters)" className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-charcoal-900 outline-none focus:border-ruby-500" />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-charcoal-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="rounded-xl bg-ruby-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ruby-700 disabled:opacity-50">
                  {saving ? 'Saving…' : editingPost ? 'Update Article' : 'Create Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
