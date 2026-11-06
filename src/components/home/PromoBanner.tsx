import Link from 'next/link';
import { ArrowRightIcon, MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function PromoBanner() {
  return (
    <section className="py-4">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 p-6 ring-1 ring-amber-200/60 sm:p-8">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/50 blur-2xl" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
            <MapPinIcon className="h-3.5 w-3.5" /> KPK priority
          </span>
          <h3 className="mt-4 max-w-sm text-xl font-extrabold leading-tight text-charcoal-900">
            Peshawar to Swat, we know the way home.
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-charcoal-600">
            Free delivery on KPK orders above Rs. 2,000, with 2–3 day delivery to major cities.
          </p>
          <Link href="/shipping-policy" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900">
            Delivery details <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-100 p-6 ring-1 ring-violet-200/60 sm:p-8">
          <div className="absolute -right-8 -bottom-10 h-36 w-36 rounded-full bg-white/50 blur-2xl" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-800">
            <SparklesIcon className="h-3.5 w-3.5" /> Gifting made easy
          </span>
          <h3 className="mt-4 max-w-sm text-xl font-extrabold leading-tight text-charcoal-900">
            Thoughtful gifts, wrapped and ready.
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-charcoal-600">
            Add a note at checkout and we&apos;ll include a handwritten card with your gift — at no extra cost.
          </p>
          <Link href="/shop?sort=rating" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-800 hover:text-violet-900">
            Shop top-rated gifts <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
