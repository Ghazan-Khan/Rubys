'use client';

import { useState } from 'react';
import { CheckIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import { cn } from '@/lib/format';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  label?: string;
  compact?: boolean;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className,
  label = 'Add to cart',
  compact = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = product.stockQuantity <= 0;

  function handleClick() {
    if (soldOut) return;
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={soldOut}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200',
        'bg-ruby-600 text-white hover:bg-ruby-700 focus:outline-none focus:ring-2 focus:ring-ruby-500 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500',
        compact ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-sm',
        className
      )}
    >
      {added ? (
        <>
          <CheckIcon className="h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingBagIcon className="h-4 w-4" />
          {soldOut ? 'Out of stock' : label}
        </>
      )}
    </button>
  );
}
