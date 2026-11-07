import Link from 'next/link';
import ProductArtwork from '@/components/product/ProductArtwork';
import RatingStars from '@/components/product/RatingStars';
import AddToCartButton from '@/components/product/AddToCartButton';
import WishlistButton from '@/components/product/WishlistButton';
import type { Product } from '@/types';
import { cn, discountPercent, effectivePrice, formatPKR } from '@/lib/format';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const price = effectivePrice(product.price, product.salePrice);
  const percent = discountPercent(product.price, product.salePrice);

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      <div className="relative">
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="block">
          <ProductArtwork
            emoji={product.emoji}
            name={product.name}
            categoryName={product.categoryName}
            imageUrl={product.imageUrl}
            className="aspect-square w-full"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-ruby-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {percent != null && (
            <span className="w-fit rounded-full bg-charcoal-900/85 px-2.5 py-1 text-[10px] font-bold text-white">
              -{percent}%
            </span>
          )}
        </div>

        <WishlistButton product={product} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/category/${product.categorySlug ?? ''}`}
          className="text-[11px] font-semibold uppercase tracking-wider text-ruby-600 hover:text-ruby-700"
        >
          {product.categoryName ?? "Ruby's Select"}
        </Link>
        <Link href={`/product/${product.slug}`} className="mt-1 block">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-charcoal-900 transition-colors group-hover:text-ruby-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5">
          <RatingStars rating={product.rating} count={product.reviewCount} />
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-charcoal-900">{formatPKR(price)}</span>
          {product.salePrice && (
            <span className="text-xs text-charcoal-400 line-through">{formatPKR(product.price)}</span>
          )}
        </div>

        <div className="mt-3 flex-1" />
        {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
          <p className="mb-2 text-[11px] font-medium text-amber-700">Only {product.stockQuantity} left</p>
        )}
        <AddToCartButton product={product} compact className="w-full" />
      </div>
    </article>
  );
}
