import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import type { Category } from '@/types';

const GRADIENTS: Record<string, string> = {
  'cat-fashion': 'from-rose-50 to-pink-100',
  'cat-electronics': 'from-sky-50 to-cyan-100',
  'cat-home-living': 'from-amber-50 to-orange-100',
  'cat-beauty-health': 'from-fuchsia-50 to-rose-100',
  'cat-sports-fitness': 'from-emerald-50 to-teal-100',
  'cat-books-stationery': 'from-violet-50 to-indigo-100',
};

export default function FeaturedCategories({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-600">Browse the store</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-charcoal-900 sm:text-3xl">
              Shop by category
            </h2>
            <p className="mt-2 max-w-xl text-sm text-charcoal-500">
              Six carefully curated departments, with new pieces added every week.
            </p>
          </div>
          <Link href="/shop" className="btn-secondary text-sm">
            View everything
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 ring-1 ring-black/[0.03] transition duration-300 hover:-translate-y-1 hover:shadow-lg ${GRADIENTS[category.id] || 'from-gray-50 to-gray-100'}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{category.emoji}</span>
                <ArrowUpRightIcon className="h-4 w-4 text-charcoal-400 transition group-hover:text-ruby-600" />
              </div>
              <h3 className="mt-6 text-sm font-bold leading-5 text-charcoal-900 group-hover:text-ruby-700">
                {category.name}
              </h3>
              <p className="mt-1 text-[11px] font-medium text-charcoal-500">{category.productCount} products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
