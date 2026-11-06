import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { getBlogPosts } from '@/lib/products';
import { formatDate, truncate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Buying Guides & Journal',
  description:
    "Practical buying guides and honest advice from Ruby's.pk — electronics, home, beauty and fitness for real life in Pakistan.",
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  const posts = getBlogPosts(50);

  return (
    <>
      <PageHero
        eyebrow="The Ruby's journal"
        title="Buying guides & practical reads"
        description="Honest, no-nonsense guides to help you choose well — written for real homes, real budgets and real Pakistani weather."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Buying guides' }]} />

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <p className="text-4xl">📝</p>
            <h2 className="mt-3 text-lg font-bold text-charcoal-900">Guides coming soon</h2>
            <p className="mt-1 text-sm text-charcoal-500">We are working on our first set of buying guides.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-ruby-50 via-orange-50 to-amber-100 text-6xl">
                  {post.emoji || '📝'}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-ruby-600">
                    <span>{post.category || 'Buying guide'}</span>
                    <span className="text-gray-300">•</span>
                    <span className="font-medium normal-case tracking-normal text-charcoal-400">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <h2 className="mt-2 text-base font-bold leading-6 text-charcoal-900 group-hover:text-ruby-600">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-charcoal-500">
                    {truncate(post.excerpt || post.content, 130)}
                  </p>
                  <p className="mt-4 text-[11px] font-semibold text-ruby-600">Read the guide →</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-charcoal-950 p-7 text-center text-white">
          <h2 className="text-xl font-extrabold">Shop with confidence</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-300">
            Every product on Ruby&apos;s.pk is quality checked before dispatch, with Cash on Delivery available across Pakistan.
          </p>
          <Link href="/shop" className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-charcoal-900 hover:bg-gray-100">
            Browse the collection
          </Link>
        </div>
      </div>
    </>
  );
}
