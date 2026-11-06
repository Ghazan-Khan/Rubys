import Link from 'next/link';
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { BlogPost } from '@/types';
import { formatDate, truncate } from '@/lib/format';

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-600">The Ruby&apos;s journal</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-charcoal-900 sm:text-3xl">
              Practical reads before you buy
            </h2>
            <p className="mt-2 max-w-xl text-sm text-charcoal-500">
              Honest guides on everyday products, written for real homes in Pakistan.
            </p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ruby-600 hover:text-ruby-700">
            All guides <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-ruby-50 via-orange-50 to-amber-100 text-6xl">
                {post.emoji || '📝'}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-ruby-600">
                  <span>{post.category || 'Buying guide'}</span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1 font-medium normal-case tracking-normal text-charcoal-400">
                    <ClockIcon className="h-3 w-3" /> 4 min read
                  </span>
                </div>
                <h3 className="mt-2 text-base font-bold leading-6 text-charcoal-900 group-hover:text-ruby-600">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-charcoal-500">
                  {truncate(post.excerpt || post.content, 110)}
                </p>
                <p className="mt-4 text-[11px] text-charcoal-400">
                  {post.authorName} · {formatDate(post.publishedAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
