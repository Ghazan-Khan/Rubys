import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import ProductResults from '@/components/product/ProductResults';
import { countProducts, getCategories, getProducts } from '@/lib/products';
import { truncate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description:
    "Browse the full Ruby's.pk collection: fashion, electronics, home, beauty, fitness and stationery with nationwide delivery and Cash on Delivery.",
  alternates: { canonical: '/shop' },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = first(params.q)?.trim() || '';
  const category = first(params.category)?.trim() || '';
  const sort = first(params.sort) || 'featured';
  const min = Number(first(params.min));
  const max = Number(first(params.max));
  const sale = first(params.sale) === '1';
  const page = Math.max(1, Number.parseInt(first(params.page) || '1', 10) || 1);
  const pageSize = 12;

  const categories = getCategories();
  const filters = {
    query: query || undefined,
    category: category || undefined,
    sort,
    minPrice: Number.isFinite(min) && first(params.min) ? min : undefined,
    maxPrice: Number.isFinite(max) && first(params.max) ? max : undefined,
    onSale: sale || undefined,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  const products = getProducts(filters);
  const total = countProducts(filters);

  const plainParams: Record<string, string | undefined> = {
    q: query || undefined,
    category: category || undefined,
    sort: sort !== 'featured' ? sort : undefined,
    min: first(params.min),
    max: first(params.max),
    sale: sale ? '1' : undefined,
  };

  return (
    <>
      <PageHero
        eyebrow="The full collection"
        title={query ? `Search results for “${truncate(query, 40)}”` : 'All products'}
        description={
          query
            ? `Browse ${total} product${total === 1 ? '' : 's'} matching your search. Use the filters to narrow things down.`
            : 'Everything we stock, in one place. Filter by category, price or what is on sale.'
        }
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shop' }]} />
        <ProductResults
          products={products}
          total={total}
          page={page}
          pageSize={pageSize}
          categories={categories}
          searchParams={plainParams}
          basePath="/shop"
          activeCategory={category || undefined}
          sort={sort}
        />
      </div>
    </>
  );
}
