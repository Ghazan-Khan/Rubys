'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { Category } from '@/types';
import { cn } from '@/lib/format';

interface ShopFiltersProps {
  categories: Category[];
  activeCategory?: string;
  hideCategories?: boolean;
}

const PRICE_RANGES = [
  { label: 'Under Rs. 2,000', min: 0, max: 2000 },
  { label: 'Rs. 2,000 – 5,000', min: 2000, max: 5000 },
  { label: 'Rs. 5,000 – 10,000', min: 5000, max: 10000 },
  { label: 'Over Rs. 10,000', min: 10000, max: undefined },
];

export default function ShopFilters({ categories, activeCategory, hideCategories = false }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('min') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max') || '');
  const [onSale, setOnSale] = useState(searchParams.get('sale') === '1');

  const hasFilters = Boolean(
    searchParams.get('q') || searchParams.get('min') || searchParams.get('max') || searchParams.get('sale')
  );

  function pushParams(mutator: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    params.delete('page');
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    pushParams((params) => {
      if (query.trim()) params.set('q', query.trim());
      else params.delete('q');
      if (minPrice) params.set('min', minPrice);
      else params.delete('min');
      if (maxPrice) params.set('max', maxPrice);
      else params.delete('max');
      if (onSale) params.set('sale', '1');
      else params.delete('sale');
    });
    setOpen(false);
  }

  function clearAll() {
    setQuery('');
    setMinPrice('');
    setMaxPrice('');
    setOnSale(false);
    router.push(pathname);
  }

  const panel = (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="filter-search" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">
            Search
          </label>
          <input
            id="filter-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-ruby-400 focus:ring-2 focus:ring-ruby-100"
          />
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-charcoal-500">Price range (Rs.)</p>
          <div className="flex items-center gap-2">
            <input
              aria-label="Minimum price"
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="Min"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-ruby-400 focus:ring-2 focus:ring-ruby-100"
            />
            <span className="text-gray-400">–</span>
            <input
              aria-label="Maximum price"
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Max"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-ruby-400 focus:ring-2 focus:ring-ruby-100"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                type="button"
                onClick={() => {
                  setMinPrice(range.min ? String(range.min) : '');
                  setMaxPrice(range.max ? String(range.max) : '');
                  pushParams((params) => {
                    if (range.min) params.set('min', String(range.min));
                    else params.delete('min');
                    if (range.max) params.set('max', String(range.max));
                    else params.delete('max');
                  });
                }}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-charcoal-600 transition hover:bg-ruby-50 hover:text-ruby-700"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-gray-200 px-3 py-2.5">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(event) => setOnSale(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-ruby-600 focus:ring-ruby-500"
          />
          <span className="text-sm text-charcoal-700">Only show items on sale</span>
        </label>

        <div className="flex gap-2">
          <button type="submit" className="btn-primary flex-1 py-2 text-sm">
            Apply filters
          </button>
          {hasFilters && (
            <button type="button" onClick={clearAll} className="btn-secondary px-3 py-2 text-sm">
              Clear
            </button>
          )}
        </div>
      </form>

      {!hideCategories && (
        <div className="border-t border-gray-100 pt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-charcoal-500">Categories</p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/shop"
                className={cn(
                  'block rounded-lg px-3 py-2 text-sm transition',
                  !activeCategory ? 'bg-ruby-50 font-semibold text-ruby-700' : 'text-charcoal-600 hover:bg-gray-50'
                )}
              >
                All products
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition',
                    activeCategory === category.slug
                      ? 'bg-ruby-50 font-semibold text-ruby-700'
                      : 'text-charcoal-600 hover:bg-gray-50'
                  )}
                >
                  <span>
                    <span className="mr-1.5">{category.emoji}</span>
                    {category.name}
                  </span>
                  <span className="text-[10px] text-charcoal-400">{category.productCount}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-charcoal-700"
        >
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
          Filters
          {hasFilters && <span className="h-1.5 w-1.5 rounded-full bg-ruby-600" />}
        </button>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-32 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">{panel}</div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-charcoal-900">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="rounded-lg p-2 text-charcoal-500 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            {panel}
          </div>
        </div>
      )}
    </>
  );
}
