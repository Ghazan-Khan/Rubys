'use client';

import Link from 'next/link';
import { HeartIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useWishlist, type WishlistItem } from '@/context/WishlistContext';
import { formatPKR } from '@/lib/format';
import type { Product } from '@/types';

function toProduct(item: WishlistItem): Product {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    sku: '',
    description: null,
    shortDescription: null,
    price: item.originalPrice ?? item.price,
    salePrice: item.originalPrice ? item.price : null,
    costPrice: null,
    categoryId: null,
    categoryName: item.categoryName,
    categorySlug: null,
    brand: null,
    stockQuantity: item.stockQuantity,
    isFeatured: false,
    isActive: true,
    emoji: item.emoji,
    imageUrl: null,
    badge: null,
    rating: 0,
    reviewCount: 0,
    soldCount: 0,
    metaTitle: null,
    metaDescription: null,
    createdAt: '',
  };
}

export default function WishlistView() {
  const { items, ready, remove, clear } = useWishlist();
  const { addItem } = useCart();

  if (!ready) {
    return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
        <p className="text-5xl">💖</p>
        <h2 className="mt-4 text-xl font-bold text-charcoal-900">Your wishlist is empty</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-charcoal-500">
          Tap the heart on any product to save it here for later.
        </p>
        <Link href="/shop" className="btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3">
        <p className="text-sm font-semibold text-charcoal-800">
          {items.length} saved item{items.length === 1 ? '' : 's'}
        </p>
        <button type="button" onClick={clear} className="text-xs font-medium text-charcoal-400 hover:text-rose-600">
          Clear wishlist
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const product = toProduct(item);
          return (
            <article key={item.id} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex gap-3">
                <Link
                  href={`/product/${item.slug}`}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 via-pink-50 to-red-100 text-4xl"
                  aria-label={item.name}
                >
                  {item.emoji || '🛍️'}
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ruby-600">{item.categoryName}</p>
                  <Link href={`/product/${item.slug}`} className="mt-0.5 block text-sm font-semibold leading-5 text-charcoal-900 hover:text-ruby-600">
                    {item.name}
                  </Link>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="text-sm font-bold text-charcoal-900">{formatPKR(item.price)}</span>
                    {item.originalPrice && (
                      <span className="text-[11px] text-charcoal-400 line-through">{formatPKR(item.originalPrice)}</span>
                    )}
                  </div>
                  <p className={`mt-1 text-[10px] font-medium ${item.stockQuantity > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {item.stockQuantity > 0 ? 'In stock' : 'Out of stock'}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  disabled={item.stockQuantity <= 0}
                  onClick={() => addItem(product)}
                  className="btn-primary flex-1 px-3 py-2 text-xs"
                >
                  <ShoppingCartIcon className="h-3.5 w-3.5" /> Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                  className="rounded-lg border border-gray-200 p-2 text-charcoal-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-charcoal-400">
        <HeartIcon className="h-3.5 w-3.5 text-ruby-500" /> Your wishlist is saved on this device.
      </p>
    </div>
  );
}
