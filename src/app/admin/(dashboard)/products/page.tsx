import type { Metadata } from 'next';
import Link from 'next/link';
import { MagnifyingGlassIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import ProductArtwork from '@/components/product/ProductArtwork';
import ProductRowActions from '@/components/admin/ProductRowActions';
import Pagination from '@/components/ui/Pagination';
import { getAdminCategories, listAdminProducts } from '@/lib/admin';
import { formatDate, formatPKR } from '@/lib/format';

export const metadata: Metadata = { title: 'Products' };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = first(params.q)?.trim() || '';
  const status = (first(params.status) || 'all') as 'all' | 'active' | 'inactive';
  const category = first(params.category) || '';
  const stock = (first(params.stock) || 'all') as 'all' | 'in' | 'low' | 'out';
  const featured = first(params.featured) === '1';
  const archived = first(params.archived) === '1';
  const sort = first(params.sort) || 'newest';
  const page = Math.max(1, Number.parseInt(first(params.page) || '1', 10) || 1);

  const categories = getAdminCategories();
  const result = listAdminProducts({
    query: query || undefined,
    status,
    category: category || undefined,
    stock,
    featured,
    archived,
    sort,
    page,
    pageSize: 15,
  });

  const plainParams: Record<string, string | undefined> = {
    q: query || undefined,
    status: status !== 'all' ? status : undefined,
    category: category || undefined,
    stock: stock !== 'all' ? stock : undefined,
    featured: featured ? '1' : undefined,
    archived: archived ? '1' : undefined,
    sort: sort !== 'newest' ? sort : undefined,
  };

  const showingFrom = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const showingTo = Math.min(result.page * result.pageSize, result.total);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Catalog</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">
            {archived ? 'Archived products' : 'Products'}
          </h1>
          <p className="mt-1 text-sm text-charcoal-500">
            {result.total === 0
              ? 'No products match the current filters.'
              : `Showing ${showingFrom}–${showingTo} of ${result.total} products.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={archived ? '/admin/products' : '/admin/products?archived=1'}
            className="btn-secondary px-4 py-2 text-sm"
          >
            {archived ? 'Back to active' : 'Archived'}
          </Link>
          <Link href="/admin/products/new" className="btn-primary px-4 py-2 text-sm">
            <PlusIcon className="h-4 w-4" />
            Add product
          </Link>
        </div>
      </div>

      <form
        action="/admin/products"
        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
      >
        {archived && <input type="hidden" name="archived" value="1" />}
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <label htmlFor="admin-product-search" className="sr-only">
              Search products
            </label>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              id="admin-product-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search name, SKU, brand…"
              className="input-field pl-9"
            />
          </div>

          <select name="category" defaultValue={category} className="input-field" aria-label="Category">
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select name="status" defaultValue={status} className="input-field" aria-label="Status">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select name="stock" defaultValue={stock} className="input-field" aria-label="Stock">
            <option value="all">All stock</option>
            <option value="in">In stock</option>
            <option value="low">Low stock</option>
            <option value="out">Out of stock</option>
          </select>

          <select name="sort" defaultValue={sort} className="input-field" aria-label="Sort">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="updated">Recently updated</option>
            <option value="name">Name A–Z</option>
            <option value="price-asc">Price low → high</option>
            <option value="price-desc">Price high → low</option>
            <option value="stock-asc">Stock low → high</option>
            <option value="stock-desc">Stock high → low</option>
          </select>

          <button type="submit" className="btn-primary px-5 py-2 text-sm">
            Filter
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-600">
            <input
              type="checkbox"
              name="featured"
              value="1"
              defaultChecked={featured}
              className="h-4 w-4 rounded border-gray-300 text-ruby-600 focus:ring-ruby-500"
            />
            Featured only
          </label>
          <Link href={archived ? '/admin/products?archived=1' : '/admin/products'} className="text-xs font-semibold text-ruby-600 hover:underline">
            Clear filters
          </Link>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {result.products.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-4xl">🔍</p>
            <h2 className="mt-3 text-sm font-bold text-charcoal-900">No products found</h2>
            <p className="mt-1 text-xs text-charcoal-500">
              Try a different search term or clear the filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-charcoal-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Product</th>
                  <th className="px-3 py-3 font-semibold">Category</th>
                  <th className="px-3 py-3 font-semibold">Price</th>
                  <th className="px-3 py-3 font-semibold">Stock</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 text-center font-semibold">Featured</th>
                  <th className="px-3 py-3 font-semibold">Updated</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {result.products.map((product) => (
                  <tr key={product.id} className="align-top hover:bg-gray-50/70">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <ProductArtwork
                          emoji={product.emoji}
                          name={product.name}
                          categoryName={product.categoryName}
                          imageUrl={product.imageUrl}
                          compact
                          className="h-12 w-12 shrink-0 rounded-lg"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="block max-w-[280px] truncate font-semibold text-charcoal-900 hover:text-ruby-600"
                          >
                            {product.name}
                          </Link>
                          <p className="text-[11px] text-charcoal-400">{product.sku}</p>
                          {product.badge && (
                            <span className="mt-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-charcoal-500">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-charcoal-600">
                      {product.categoryName || '—'}
                      <p className="text-[10px] text-charcoal-400">{product.brand || 'No brand'}</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-xs font-semibold text-charcoal-900">
                        {formatPKR(product.salePrice && product.salePrice > 0 ? product.salePrice : product.price)}
                      </p>
                      {product.salePrice && product.salePrice > 0 && (
                        <p className="text-[10px] text-charcoal-400 line-through">{formatPKR(product.price)}</p>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={
                          product.stockQuantity === 0
                            ? 'rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700'
                            : product.stockQuantity <= 5
                              ? 'rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800'
                              : 'rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700'
                        }
                      >
                        {product.stockQuantity === 0 ? 'Out of stock' : `${product.stockQuantity} in stock`}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={
                          product.isActive
                            ? 'rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700'
                            : 'rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-charcoal-500'
                        }
                      >
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {product.deletedAt && (
                        <span className="mt-1 block rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {product.isFeatured ? (
                        <StarIcon className="mx-auto h-4 w-4 fill-amber-400 text-amber-500" />
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-[11px] text-charcoal-500">{formatDate(product.updatedAt)}</td>
                    <td className="px-5 py-3">
                      <ProductRowActions id={product.id} name={product.name} archived={archived} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        basePath="/admin/products"
        page={result.page}
        totalPages={result.totalPages}
        searchParams={plainParams}
      />
    </div>
  );
}
