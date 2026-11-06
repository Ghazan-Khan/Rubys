import type { Coupon } from '@/types';

export function calculateDiscount(coupon: Pick<Coupon, 'type' | 'value' | 'minOrderAmount' | 'maxDiscountAmount'>, subtotal: number): number {
  if (subtotal <= 0 || subtotal < coupon.minOrderAmount) return 0;

  let discount = coupon.type === 'percentage'
    ? Math.round((subtotal * coupon.value) / 100)
    : Math.round(coupon.value);

  if (coupon.maxDiscountAmount != null && coupon.maxDiscountAmount > 0) {
    discount = Math.min(discount, coupon.maxDiscountAmount);
  }

  return Math.max(0, Math.min(discount, subtotal));
}
