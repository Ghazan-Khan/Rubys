import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/format';

interface PaginationProps {
  basePath: string;
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

function hrefFor(basePath: string, searchParams: Record<string, string | undefined>, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value && key !== 'page') params.set(key, value);
  }
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export default function Pagination({ basePath, page, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((candidate) => {
    if (totalPages <= 7) return true;
    return candidate === 1 || candidate === totalPages || Math.abs(candidate - page) <= 1;
  });

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
      {page > 1 ? (
        <Link
          href={hrefFor(basePath, searchParams, page - 1)}
          aria-label="Previous page"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-charcoal-600 transition hover:border-ruby-300 hover:text-ruby-600"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-300">
          <ChevronLeftIcon className="h-4 w-4" />
        </span>
      )}

      {pages.map((candidate, index) => {
        const previous = pages[index - 1];
        const showEllipsis = previous != null && candidate - previous > 1;
        return (
          <span key={candidate} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-xs text-gray-400">…</span>}
            <Link
              href={hrefFor(basePath, searchParams, candidate)}
              aria-current={candidate === page ? 'page' : undefined}
              className={cn(
                'flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition',
                candidate === page
                  ? 'border-ruby-600 bg-ruby-600 text-white'
                  : 'border-gray-300 text-charcoal-600 hover:border-ruby-300 hover:text-ruby-600'
              )}
            >
              {candidate}
            </Link>
          </span>
        );
      })}

      {page < totalPages ? (
        <Link
          href={hrefFor(basePath, searchParams, page + 1)}
          aria-label="Next page"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-charcoal-600 transition hover:border-ruby-300 hover:text-ruby-600"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-300">
          <ChevronRightIcon className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
