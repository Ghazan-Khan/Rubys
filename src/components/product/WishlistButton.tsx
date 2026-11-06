'use client';

import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useWishlist } from '@/context/WishlistContext';
import type { Product } from '@/types';
import { cn } from '@/lib/format';

interface WishlistButtonProps {
  product: Product;
  className?: string;
  showLabel?: boolean;
}

export default function WishlistButton({ product, className, showLabel = false }: WishlistButtonProps) {
  const { has, toggle, ready } = useWishlist();
  const saved = ready && has(product.id);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      onClick={() => toggle(product)}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-colors',
        showLabel
          ? 'rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-charcoal-700 hover:border-ruby-300 hover:text-ruby-600'
          : 'rounded-full bg-white/90 p-2 shadow-sm backdrop-blur hover:bg-white',
        className
      )}
    >
      {saved ? (
        <HeartSolidIcon className={cn('h-5 w-5 text-ruby-600', showLabel && 'h-4 w-4')} />
      ) : (
        <HeartIcon className={cn('h-5 w-5 text-charcoal-500', showLabel && 'h-4 w-4')} />
      )}
      {showLabel && <span>{saved ? 'Saved to wishlist' : 'Save to wishlist'}</span>}
    </button>
  );
}
