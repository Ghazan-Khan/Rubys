'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckIcon, MinusIcon, PlusIcon, ShoppingBagIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const soldOut = product.stockQuantity <= 0;
  const max = Math.min(Math.max(product.stockQuantity, 1), 20);

  function changeQuantity(next: number) {
    setQuantity(Math.max(1, Math.min(next, max)));
  }

  function handleAdd() {
    if (soldOut) return;
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    if (soldOut) return;
    addItem(product, quantity);
    router.push('/checkout');
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-lg border border-gray-300">
          <button
            type="button"
            onClick={() => changeQuantity(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="p-3 text-charcoal-500 transition hover:text-ruby-600 disabled:opacity-30"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="min-w-10 text-center text-sm font-semibold text-charcoal-900">{quantity}</span>
          <button
            type="button"
            onClick={() => changeQuantity(quantity + 1)}
            disabled={quantity >= max}
            aria-label="Increase quantity"
            className="p-3 text-charcoal-500 transition hover:text-ruby-600 disabled:opacity-30"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className="btn-primary min-w-40 flex-1 py-3.5"
        >
          {added ? (
            <>
              <CheckIcon className="h-4 w-4" /> Added to cart
            </>
          ) : (
            <>
              <ShoppingBagIcon className="h-4 w-4" /> {soldOut ? 'Out of stock' : 'Add to cart'}
            </>
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        disabled={soldOut}
        className="btn-secondary mt-3 w-full py-3.5 disabled:bg-gray-100"
      >
        <BoltIcon className="h-4 w-4" /> Buy now
      </button>

      <p className="mt-2.5 text-center text-[11px] text-charcoal-400">
        {soldOut ? 'This item is currently unavailable.' : 'Secure checkout · Cash on Delivery available'}
      </p>
    </div>
  );
}
