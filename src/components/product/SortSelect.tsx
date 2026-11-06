'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PRODUCT_SORT_OPTIONS } from '@/lib/constants';

export default function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (event.target.value === 'featured') params.delete('sort');
    else params.set('sort', event.target.value);
    params.delete('page');
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <label className="flex items-center gap-2 text-xs text-charcoal-500">
      <span className="hidden sm:inline">Sort by</span>
      <select
        value={value}
        onChange={handleChange}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-charcoal-800 outline-none focus:border-ruby-400 focus:ring-2 focus:ring-ruby-100"
      >
        {PRODUCT_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
