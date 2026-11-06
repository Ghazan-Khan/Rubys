import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/products';
import { SITE } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/format';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: post.title,
    description: post.excerpt || truncate(post.content, 155),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || truncate(post.content, 155),
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getBlogPosts(6).filter((item) => item.id !== post.id).slice(0, 3);
  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || truncate(post.content, 155),
    author: { '@type': 'Organization', name: post.authorName || "Ruby's.pk" },
    publisher: { '@type': 'Organization', name: "Ruby's.pk", url: SITE.url },
    datePublished: post.publishedAt || post.createdAt,
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    articleSection: post.category || 'Buying guide',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="border-b border-gray-100 bg-gradient-to-br from-ruby-50 via-white to-amber-50">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Buying guides', href: '/blog' }, { label: truncate(post.title, 40) }]} />
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-600">
            {post.category || 'Buying guide'}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-charcoal-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-charcoal-500">
            By {post.authorName || "Ruby's Editorial Team"} · {formatDate(post.publishedAt)} · {Math.max(2, Math.round(post.content.split(' ').length / 200))} min read
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-ruby-50 via-orange-50 to-amber-100 text-8xl">
          {post.emoji || '📝'}
        </div>

        <div className="prose-ruby">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? 'text-base leading-8 text-charcoal-700' : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-charcoal-950 p-6 text-white">
          <h2 className="text-lg font-extrabold">Ready to shop?</h2>
          <p className="mt-1.5 text-sm text-gray-300">
            Browse quality-checked products with fast delivery and Cash on Delivery across Pakistan.
          </p>
          <Link href="/shop" className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-charcoal-900 hover:bg-gray-100">
            Shop the collection
          </Link>
        </div>

        <p className="mt-6 text-[11px] leading-5 text-charcoal-400">
          This guide is general information, not professional advice. Prices and availability are correct at the
          time of publishing and may change. Questions?{' '}
          <Link href="/contact-us" className="font-semibold text-ruby-600 hover:underline">Talk to our team</Link>.
        </p>
      </article>

      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-extrabold text-charcoal-900">More buying guides</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-3xl">{item.emoji || '📝'}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-ruby-600">{item.category}</p>
                  <h3 className="mt-1 text-sm font-bold leading-5 text-charcoal-900 group-hover:text-ruby-600">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
