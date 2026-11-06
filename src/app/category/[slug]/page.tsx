import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import ProductResults from '@/components/product/ProductResults';
import { countProducts, getCategories, getCategoryBySlug, getProducts } from '@/lib/products';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category not found' };
  return {
    title: category.name,
    description: category.description || `Shop ${category.name} at Ruby's.pk with nationwide delivery.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const queryParams = await searchParams;
  const query = first(queryParams.q)?.trim() || '';
  const sort = first(queryParams.sort) || 'featured';
  const min = Number(first(queryParams.min));
  const max = Number(first(queryParams.max));
  const sale = first(queryParams.sale) === '1';
  const page = Math.max(1, Number.parseInt(first(queryParams.page) || '1', 10) || 1);
  const pageSize = 12;

  const filters = {
    category: category.slug,
    query: query || undefined,
    sort,
    minPrice: Number.isFinite(min) && first(queryParams.min) ? min : undefined,
    maxPrice: Number.isFinite(max) && first(queryParams.max) ? max : undefined,
    onSale: sale || undefined,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  const products = getProducts(filters);
  const total = countProducts(filters);
  const categories = getCategories();

  const plainParams: Record<string, string | undefined> = {
    q: query || undefined,
    sort: sort !== 'featured' ? sort : undefined,
    min: first(queryParams.min),
    max: first(queryParams.max),
    sale: sale ? '1' : undefined,
  };

  return (
    <>
      <PageHero
        eyebrow={category.bannerText || 'Shop by category'}
        title={`${category.emoji || ''} ${category.name}`.trim()}
        description={category.description || `Explore our ${category.name.toLowerCase()} range.`}
      >
        <p className="text-xs font-medium text-charcoal-500">
          {total} product{total === 1 ? '' : 's'} in this category · Cash on Delivery available
        </p>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shop', href: '/shop' }, { label: category.name }]} />
        <ProductResults
          products={products}
          total={total}
          page={page}
          pageSize={pageSize}
          categories={categories}
          searchParams={plainParams}
          basePath={`/category/${category.slug}`}
          activeCategory={category.slug}
          sort={sort}
        />
      </div>
    </>
  );
}
