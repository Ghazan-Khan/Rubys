import ProductCard from '@/components/product/ProductCard';
import ShopFilters from '@/components/product/ShopFilters';
import SortSelect from '@/components/product/SortSelect';
import Pagination from '@/components/ui/Pagination';
import type { Category, Product } from '@/types';
import Link from 'next/link';

interface ProductResultsProps {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  categories: Category[];
  searchParams: Record<string, string | undefined>;
  basePath: string;
  activeCategory?: string;
  hideCategories?: boolean;
  sort: string;
}

export default function ProductResults({
  products,
  total,
  page,
  pageSize,
  categories,
  searchParams,
  basePath,
  activeCategory,
  hideCategories,
  sort,
}: ProductResultsProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <ShopFilters categories={categories} activeCategory={activeCategory} hideCategories={hideCategories} />

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3">
          <p className="text-xs text-charcoal-500">
            {total > 0 ? (
              <>
                Showing <span className="font-semibold text-charcoal-800">{from}–{to}</span> of{' '}
                <span className="font-semibold text-charcoal-800">{total}</span> products
              </>
            ) : (
              'No products found'
            )}
          </p>
          <SortSelect value={sort} />
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <p className="text-4xl">🔍</p>
            <h2 className="mt-4 text-lg font-bold text-charcoal-900">Nothing matched those filters</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-charcoal-500">
              Try a different search term or clear the filters to see the full collection.
            </p>
            <Link href={basePath} className="btn-primary mt-5 text-sm">
              Clear filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              basePath={basePath}
              page={page}
              totalPages={totalPages}
              searchParams={searchParams}
            />
          </>
        )}
      </div>
    </div>
  );
}
