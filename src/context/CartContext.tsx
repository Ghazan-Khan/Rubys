'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Coupon, Product } from '@/types';
import { calculateDiscount } from '@/lib/pricing';
import { effectivePrice } from '@/lib/format';

const CART_STORAGE_KEY = 'rubys_cart_v1';

interface StoredCoupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxDiscountAmount: number | null;
}

interface CartContextValue {
  items: CartItem[];
  coupon: StoredCoupon | null;
  ready: boolean;
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function toCartItem(product: Product, quantity: number): CartItem {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    sku: product.sku,
    price: effectivePrice(product.price, product.salePrice),
    originalPrice: product.salePrice ? product.price : null,
    emoji: product.emoji,
    categoryName: product.categoryName,
    stockQuantity: product.stockQuantity,
    quantity,
  };
}

function loadCart(): { items: CartItem[]; coupon: StoredCoupon | null } {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [], coupon: null };
    const parsed = JSON.parse(raw) as { items?: CartItem[]; coupon?: StoredCoupon | null };
    const items = Array.isArray(parsed.items)
      ? parsed.items.filter((item) => item && typeof item.id === 'string' && item.quantity > 0)
      : [];
    return { items, coupon: parsed.coupon ?? null };
  } catch {
    return { items: [], coupon: null };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<StoredCoupon | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = loadCart();
    setItems(stored.items);
    setCoupon(stored.coupon);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items, coupon }));
  }, [items, coupon, ready]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, Math.max(product.stockQuantity, 1), 20) }
            : item
        );
      }
      return [
        ...current,
        toCartItem(product, Math.min(quantity, Math.max(product.stockQuantity, 1), 20)),
      ];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, Math.min(quantity, Math.max(item.stockQuantity, 1), 20)) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const discount = useMemo(() => {
    if (!coupon) return 0;
    const couponLike: Coupon = {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minOrderAmount: coupon.minOrderAmount,
      maxDiscountAmount: coupon.maxDiscountAmount,
    };
    return calculateDiscount(couponLike, subtotal);
  }, [coupon, subtotal]);

  const applyCoupon = useCallback(
    async (code: string) => {
      if (!code.trim()) return { success: false, message: 'Enter a coupon code.' };
      try {
        const response = await fetch('/api/coupons/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, subtotal }),
        });
        const data = (await response.json()) as {
          success?: boolean;
          message?: string;
          coupon?: StoredCoupon;
          discount?: number;
        };
        if (!response.ok || !data.success || !data.coupon) {
          setCoupon(null);
          return { success: false, message: data.message || 'This coupon could not be applied.' };
        }
        setCoupon(data.coupon);
        return {
          success: true,
          message: `Coupon applied — you save Rs. ${Number(data.discount || 0).toLocaleString('en-PK')}.`,
        };
      } catch {
        return { success: false, message: 'Could not validate the coupon. Please try again.' };
      }
    },
    [subtotal]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      coupon,
      ready,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      discount,
      total: Math.max(0, subtotal - discount),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
    }),
    [items, coupon, ready, subtotal, discount, addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
