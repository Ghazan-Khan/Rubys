'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types';
import { effectivePrice } from '@/lib/format';

const WISHLIST_STORAGE_KEY = 'rubys_wishlist_v1';

export interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number | null;
  emoji: string | null;
  categoryName: string | null;
  stockQuantity: number;
}

interface WishlistContextValue {
  items: WishlistItem[];
  ready: boolean;
  count: number;
  toggle: (product: Product) => boolean;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function toWishlistItem(product: Product): WishlistItem {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: effectivePrice(product.price, product.salePrice),
    originalPrice: product.salePrice ? product.price : null,
    emoji: product.emoji,
    categoryName: product.categoryName,
    stockQuantity: product.stockQuantity,
  };
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishlistItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((item) => item && typeof item.id === 'string'));
        }
      }
    } catch {
      // Ignore malformed storage.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const toggle = useCallback((product: Product) => {
    let added = false;
    setItems((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current.filter((item) => item.id !== product.id);
      }
      added = true;
      return [toWishlistItem(product), ...current];
    });
    return added;
  }, []);

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      ready,
      count: items.length,
      toggle,
      remove,
      clear,
      has: (id: string) => items.some((item) => item.id === id),
    }),
    [items, ready, toggle, remove, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider');
  return context;
}
