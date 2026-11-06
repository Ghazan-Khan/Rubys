import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowPathIcon,
  CheckBadgeIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductArtwork from '@/components/product/ProductArtwork';
import ProductCard from '@/components/product/ProductCard';
import ProductPurchasePanel from '@/components/product/ProductPurchasePanel';
import RatingStars from '@/components/product/RatingStars';
import ReviewForm from '@/components/product/ReviewForm';
import WishlistButton from '@/components/product/WishlistButton';
import { getCurrentUser } from '@/lib/auth';
import { SITE } from '@/lib/constants';
import { discountPercent, effectivePrice, formatDate, formatPKR } from '@/lib/format';
import { getProductBySlug, getRelatedProducts, getReviewStats, getReviews } from '@/lib/products';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  const price = effectivePrice(product.price, product.salePrice);
  return {
    title: product.metaTitle || product.name,
    description:
      product.metaDescription ||
      product.shortDescription ||
      `Buy ${product.name} online at Ruby's.pk for ${formatPKR(price)} with nationwide delivery.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription || `Buy ${product.name} at Ruby's.pk.`,
      type: 'website',
      url: `${SITE.url}/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, stats, related, user] = await Promise.all([
    Promise.resolve(getReviews(product.id, 12)),
    Promise.resolve(getReviewStats(product.id)),
    Promise.resolve(getRelatedProducts(product.categoryId, product.id, 4)),
    getCurrentUser(),
  ]);

  const price = effectivePrice(product.price, product.salePrice);
  const percent = discountPercent(product.price, product.salePrice);
  const inStock = product.stockQuantity > 0;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.description || product.name,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand || "Ruby's Select" },
    category: product.categoryName || undefined,
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}/product/${product.slug}`,
      priceCurrency: 'PKR',
      price,
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: "Ruby's.pk" },
    },
    ...(product.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE.url}/shop` },
      ...(product.categoryName && product.categorySlug
        ? [{ '@type': 'ListItem', position: 3, name: product.categoryName, item: `${SITE.url}/category/${product.categorySlug}` }]
        : []),
      { '@type': 'ListItem', position: product.categoryName ? 4 : 3, name: product.name, item: `${SITE.url}/product/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="border-b border-gray-100 bg-gray-50/70">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Shop', href: '/shop' },
              ...(product.categoryName && product.categorySlug
                ? [{ label: product.categoryName, href: `/category/${product.categorySlug}` }]
                : []),
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <ProductArtwork
                emoji={product.emoji}
                name={product.name}
                categoryName={product.categoryName}
                className="aspect-square w-full"
                emojiClassName="text-[9rem] sm:text-[12rem]"
              />
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="rounded-full bg-ruby-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {product.badge}
                  </span>
                )}
                {percent != null && (
                  <span className="w-fit rounded-full bg-charcoal-900 px-3 py-1.5 text-[10px] font-bold text-white">
                    Save {percent}%
                  </span>
                )}
              </div>
              <WishlistButton product={product} className="absolute right-4 top-4" />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {[product.emoji, '📦', '✅', '🚚'].map((emoji, index) => (
                <div
                  key={`${emoji}-${index}`}
                  className="flex aspect-square items-center justify-center rounded-xl border border-gray-100 bg-white text-2xl shadow-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-white p-3.5">
                <TruckIcon className="mt-0.5 h-5 w-5 shrink-0 text-ruby-600" />
                <div>
                  <p className="text-xs font-semibold text-charcoal-900">Fast delivery</p>
                  <p className="mt-0.5 text-[11px] text-charcoal-500">2–3 days in KPK · 3–5 days nationwide</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-white p-3.5">
                <ArrowPathIcon className="mt-0.5 h-5 w-5 shrink-0 text-ruby-600" />
                <div>
                  <p className="text-xs font-semibold text-charcoal-900">7-day returns</p>
                  <p className="mt-0.5 text-[11px] text-charcoal-500">Easy exchange or refund policy</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-xs font-bold uppercase tracking-[0.18em] text-ruby-600 hover:text-ruby-700"
            >
              {product.categoryName}
            </Link>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-charcoal-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RatingStars rating={product.rating} count={product.reviewCount} showValue size="md" />
              <a href="#reviews" className="text-xs font-medium text-ruby-600 hover:underline">
                Read reviews
              </a>
              <span className="text-xs text-charcoal-400">· {product.soldCount}+ sold</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-charcoal-600">{product.shortDescription}</p>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-extrabold text-charcoal-900">{formatPKR(price)}</span>
              {product.salePrice && (
                <span className="pb-1 text-base text-charcoal-400 line-through">{formatPKR(product.price)}</span>
              )}
              {percent != null && (
                <span className="mb-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
                  You save {formatPKR(product.price - price)}
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] text-charcoal-400">Price inclusive of all taxes. Shipping calculated at checkout.</p>

            <div className="mt-4 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className={`text-xs font-semibold ${inStock ? 'text-emerald-700' : 'text-rose-600'}`}>
                {inStock ? `In stock${product.stockQuantity <= 5 ? ` — only ${product.stockQuantity} left` : ''}` : 'Out of stock'}
              </span>
            </div>

            <ProductPurchasePanel product={product} />

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <WishlistButton product={product} showLabel className="flex-1" />
            </div>

            <div className="mt-6 space-y-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-2.5 text-xs text-charcoal-600">
                <CheckBadgeIcon className="h-4 w-4 text-ruby-600" />
                <span>Genuine product, quality checked before dispatch</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-charcoal-600">
                <CreditCardIcon className="h-4 w-4 text-ruby-600" />
                <span>Cash on Delivery, JazzCash, Easypaisa or bank transfer</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-charcoal-600">
                <ShieldCheckIcon className="h-4 w-4 text-ruby-600" />
                <span>Your order and personal details are kept private</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-charcoal-500">
              <p><span className="font-semibold text-charcoal-700">Brand:</span> {product.brand}</p>
              <p><span className="font-semibold text-charcoal-700">SKU:</span> {product.sku}</p>
              <p><span className="font-semibold text-charcoal-700">Category:</span> {product.categoryName}</p>
              <p><span className="font-semibold text-charcoal-700">Warranty:</span> 7-day return</p>
            </div>
          </div>
        </div>

        <section className="mt-12 grid gap-8 border-t border-gray-100 pt-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="text-lg font-bold text-charcoal-900">Product details</h2>
            <div className="prose-ruby mt-4 text-sm">
              {(product.description || product.shortDescription || '')
                .split(/\n{2,}/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
            <h3 className="mt-7 text-sm font-bold text-charcoal-900">What&apos;s in the box</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-charcoal-600">
              <li>• 1 × {product.name}</li>
              <li>• Original packaging and care instructions</li>
              <li>• Order confirmation with tracking details</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold text-charcoal-900">Delivery & returns</h3>
              <dl className="mt-3 space-y-3 text-xs text-charcoal-600">
                <div>
                  <dt className="font-semibold text-charcoal-800">Khyber Pakhtunkhwa</dt>
                  <dd>2–3 working days · free over Rs. 2,000</dd>
                </div>
                <div>
                  <dt className="font-semibold text-charcoal-800">Rest of Pakistan</dt>
                  <dd>3–5 working days · free over Rs. 2,500</dd>
                </div>
                <div>
                  <dt className="font-semibold text-charcoal-800">Returns</dt>
                  <dd>7 days from delivery, unused and in original packaging.</dd>
                </div>
              </dl>
              <Link href="/shipping-policy" className="mt-4 inline-block text-xs font-semibold text-ruby-600 hover:underline">
                Read the full shipping policy →
              </Link>
            </div>

            <div className="rounded-2xl bg-ruby-50 p-5">
              <h3 className="text-sm font-bold text-ruby-900">Need help deciding?</h3>
              <p className="mt-1.5 text-xs leading-5 text-ruby-800/80">
                Message our team on WhatsApp or email us. We usually reply within a few hours during business days.
              </p>
              <Link href="/contact-us" className="mt-3 inline-block rounded-lg bg-white px-4 py-2 text-xs font-semibold text-ruby-700 shadow-sm hover:bg-ruby-100">
                Contact support
              </Link>
            </div>
          </div>
        </section>

        <section id="reviews" className="mt-12 border-t border-gray-100 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-charcoal-900">Customer reviews</h2>
              <p className="mt-1 text-xs text-charcoal-500">Verified feedback from Ruby&apos;s shoppers.</p>
            </div>
            {stats.total > 0 && (
              <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5">
                <span className="text-2xl font-extrabold text-amber-700">{stats.average.toFixed(1)}</span>
                <div>
                  <RatingStars rating={stats.average} />
                  <p className="text-[10px] text-amber-700">{stats.total} review{stats.total === 1 ? '' : 's'}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="space-y-4">
              {stats.total > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-charcoal-900">Rating breakdown</h3>
                  <div className="mt-3 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = stats.distribution[star - 1];
                      const width = stats.total ? Math.round((count / stats.total) * 100) : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-[11px] text-charcoal-500">
                          <span className="w-8">{star} ★</span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full bg-amber-400" style={{ width: `${width}%` }} />
                          </div>
                          <span className="w-6 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {user ? (
                <ReviewForm productId={product.id} />
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5 text-center">
                  <p className="text-sm font-semibold text-charcoal-800">Bought this item?</p>
                  <p className="mt-1 text-xs text-charcoal-500">Sign in to share a review with other shoppers.</p>
                  <Link href="/account/login" className="btn-primary mt-3 w-full py-2 text-sm">
                    Sign in to review
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-charcoal-500">
                  No reviews yet. Be the first to review this product.
                </div>
              ) : (
                reviews.map((review) => (
                  <article key={review.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ruby-50 text-xs font-bold text-ruby-700">
                          {review.authorName.charAt(0)}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-charcoal-900">{review.authorName}</p>
                          <p className="text-[10px] text-charcoal-400">{formatDate(review.createdAt)}</p>
                        </div>
                      </div>
                      <RatingStars rating={review.rating} />
                    </div>
                    {review.title && <h3 className="mt-3 text-sm font-bold text-charcoal-900">{review.title}</h3>}
                    {review.comment && <p className="mt-1.5 text-sm leading-6 text-charcoal-600">{review.comment}</p>}
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-14 border-t border-gray-100 pt-10">
            <div className="mb-6 flex items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-600">You may also like</p>
                <h2 className="mt-1 text-xl font-extrabold text-charcoal-900">More from {product.categoryName}</h2>
              </div>
              <Link href={`/category/${product.categorySlug}`} className="text-sm font-semibold text-ruby-600 hover:text-ruby-700">
                View category
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
