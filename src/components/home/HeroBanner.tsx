import Link from 'next/link';
import { ArrowRightIcon, CheckBadgeIcon, StarIcon, TruckIcon } from '@heroicons/react/24/outline';
import ProductArtwork from '@/components/product/ProductArtwork';
import type { Product } from '@/types';
import { discountPercent, effectivePrice, formatPKR } from '@/lib/format';

interface HeroBannerProps {
  products: Product[];
}

export default function HeroBanner({ products }: HeroBannerProps) {
  const main = products[0];
  const secondary = products.slice(1, 3);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#7f1d1d_0%,#991b1b_38%,#450a0a_100%)] text-white">
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-ruby-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
        <div className="animation-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ruby-100 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Delivering across Pakistan · KPK priority
          </div>

          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Everyday quality.
            <span className="block text-ruby-200">Delivered to your door.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-ruby-100/90 sm:text-base">
            Carefully selected fashion, electronics, home and beauty essentials at honest prices.
            Cash on Delivery, easy returns and fast dispatch from Peshawar.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-ruby-700 shadow-lg shadow-black/10 transition hover:bg-ruby-50"
            >
              Shop the collection
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/track-order"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Track my order
            </Link>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
            <div>
              <p className="text-xl font-bold">10k+</p>
              <p className="mt-0.5 text-[11px] text-ruby-100/80">Happy customers</p>
            </div>
            <div>
              <p className="text-xl font-bold">2–4 days</p>
              <p className="mt-0.5 text-[11px] text-ruby-100/80">Nationwide delivery</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-xl font-bold">
                4.8 <StarIcon className="h-4 w-4 fill-amber-300 text-amber-300" />
              </p>
              <p className="mt-0.5 text-[11px] text-ruby-100/80">Average rating</p>
            </div>
          </div>
        </div>

        <div className="animation-fade-up relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: '120ms' }}>
          {main && (
            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="overflow-hidden rounded-[1.5rem] bg-white">
                <ProductArtwork
                  emoji={main.emoji}
                  name={main.name}
                  categoryName={main.categoryName}
                  className="aspect-[4/3] w-full"
                  emojiClassName="text-8xl sm:text-9xl"
                />
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ruby-600">
                      {main.badge || 'Featured pick'}
                    </p>
                    <Link href={`/product/${main.slug}`} className="mt-1 block text-base font-bold text-charcoal-900 hover:text-ruby-600">
                      {main.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <span className="font-bold text-ruby-600">{formatPKR(effectivePrice(main.price, main.salePrice))}</span>
                      {main.salePrice && (
                        <span className="text-xs text-charcoal-400 line-through">{formatPKR(main.price)}</span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/product/${main.slug}`}
                    aria-label={`View ${main.name}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ruby-600 text-white transition hover:bg-ruby-700"
                  >
                    <ArrowRightIcon className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {main.salePrice && discountPercent(main.price, main.salePrice) != null && (
                <div className="absolute -right-3 -top-3 rotate-6 rounded-2xl bg-amber-400 px-3 py-2 text-center text-charcoal-900 shadow-lg">
                  <p className="text-lg font-extrabold leading-none">{discountPercent(main.price, main.salePrice)}%</p>
                  <p className="text-[9px] font-bold uppercase tracking-wide">off</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            {secondary.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur transition hover:bg-white/15"
              >
                <ProductArtwork
                  emoji={product.emoji}
                  name={product.name}
                  categoryName={product.categoryName}
                  compact
                  className="h-14 w-14 shrink-0 rounded-xl"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white">{product.name}</p>
                  <p className="mt-0.5 text-[11px] text-ruby-200">
                    {formatPKR(effectivePrice(product.price, product.salePrice))}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-medium text-ruby-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5">
              <TruckIcon className="h-3.5 w-3.5" /> Free over Rs. 2,000 in KPK
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5">
              <CheckBadgeIcon className="h-3.5 w-3.5" /> 7-day easy returns
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
