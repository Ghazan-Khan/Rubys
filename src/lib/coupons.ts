import { get, run } from '@/lib/db';
import { calculateDiscount } from '@/lib/pricing';
import type { Coupon } from '@/types';

type Row = Record<string, unknown>;

export interface CouponResult {
  coupon: Coupon | null;
  discount: number;
  error?: string;
}

export function validateCoupon(code: string, subtotal: number): CouponResult {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return { coupon: null, discount: 0, error: 'Enter a coupon code.' };

  const row = get<Row>(
    `SELECT * FROM coupons
     WHERE code = ? COLLATE NOCASE
       AND is_active = 1
       AND (starts_at IS NULL OR datetime(starts_at) <= datetime('now'))
       AND (expires_at IS NULL OR datetime(expires_at) >= datetime('now'))
       AND (usage_limit IS NULL OR used_count < usage_limit)`,
    [normalized]
  );

  if (!row) {
    return { coupon: null, discount: 0, error: 'This coupon is invalid or has expired.' };
  }

  const coupon: Coupon = {
    code: String(row.code),
    type: row.type === 'fixed' ? 'fixed' : 'percentage',
    value: Number(row.value),
    minOrderAmount: Number(row.min_order_amount ?? 0),
    maxDiscountAmount: row.max_discount_amount == null ? null : Number(row.max_discount_amount),
  };

  if (subtotal < coupon.minOrderAmount) {
    return {
      coupon,
      discount: 0,
      error: `This coupon needs a minimum order of Rs. ${coupon.minOrderAmount.toLocaleString('en-PK')}.`,
    };
  }

  const discount = calculateDiscount(coupon, subtotal);
  if (discount <= 0) {
    return { coupon, discount: 0, error: 'This coupon cannot be applied to your cart.' };
  }

  return { coupon, discount };
}

export function incrementCouponUsage(code: string) {
  run('UPDATE coupons SET used_count = used_count + 1 WHERE code = ? COLLATE NOCASE', [code]);
}
