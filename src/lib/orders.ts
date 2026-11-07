import { all, get, run, transaction } from '@/lib/db';
import { validateCoupon } from '@/lib/coupons';
import { getShippingAmount } from '@/lib/constants';
import { normalizePhone } from '@/lib/format';
import type { Order, OrderItem, PaymentMethod } from '@/types';
import { randomInt, randomUUID } from 'node:crypto';

type Row = Record<string, unknown>;

export class OrderError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'OrderError';
    this.status = status;
  }
}

export interface CreateOrderInput {
  userId?: string | null;
  items: Array<{ productId: string; quantity: number }>;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
}

export interface CreatedOrder {
  id: string;
  orderNumber: string;
  totalAmount: number;
}

function generateOrderNumber(): string {
  const now = new Date();
  const date = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const suffix = String(randomInt(1000, 9999));
    const candidate = `RB-${date}-${suffix}`;
    const exists = get<Row>('SELECT id FROM orders WHERE order_number = ?', [candidate]);
    if (!exists) return candidate;
  }
  return `RB-${date}-${String(Date.now()).slice(-5)}`;
}

export function createOrder(input: CreateOrderInput): CreatedOrder {
  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new OrderError('Your cart is empty.', 400);
  }
  if (input.items.length > 50) {
    throw new OrderError('Your cart contains too many different items.', 400);
  }

  return transaction(() => {
    const normalizedPhone = normalizePhone(input.phone);
    const orderId = randomUUID();
    const orderNumber = generateOrderNumber();
    const lineItems: Array<{
      productId: string;
      productName: string;
      productSku: string;
      productEmoji: string | null;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }> = [];

    let subtotal = 0;

    for (const item of input.items) {
      const quantity = Math.floor(Number(item.quantity));
      if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
        throw new OrderError('Each item must have a valid quantity between 1 and 20.', 400);
      }

      const product = get<Row>(
        `SELECT id, name, sku, price, sale_price, stock_quantity, emoji, is_active
         FROM products WHERE id = ?`,
        [item.productId]
      );

      if (!product || !Number(product.is_active)) {
        throw new OrderError('One of the products in your cart is no longer available.', 409);
      }
      if (Number(product.stock_quantity) < quantity) {
        throw new OrderError(
          `Only ${Number(product.stock_quantity)} left of ${String(product.name)}. Please update your cart.`,
          409
        );
      }

      const price = product.sale_price != null && Number(product.sale_price) > 0 && Number(product.sale_price) < Number(product.price)
        ? Number(product.sale_price)
        : Number(product.price);

      const totalPrice = price * quantity;
      subtotal += totalPrice;

      lineItems.push({
        productId: String(product.id),
        productName: String(product.name),
        productSku: String(product.sku),
        productEmoji: (product.emoji as string) ?? null,
        quantity,
        unitPrice: price,
        totalPrice,
      });
    }

    let discountAmount = 0;
    let couponCode: string | null = null;

    if (input.couponCode?.trim()) {
      const result = validateCoupon(input.couponCode, subtotal);
      if (result.error || !result.coupon) {
        throw new OrderError(result.error || 'This coupon is not valid.', 400);
      }
      discountAmount = result.discount;
      couponCode = result.coupon.code;
    }

    const shippingAmount = getShippingAmount(input.province, subtotal - discountAmount);
    const totalAmount = Math.max(0, subtotal - discountAmount + shippingAmount);

    run(
      `INSERT INTO orders (
        id, order_number, user_id, guest_email, guest_phone, status, payment_method, payment_status,
        subtotal, discount_amount, shipping_amount, tax_amount, total_amount, coupon_code,
        shipping_full_name, shipping_phone, shipping_address_line1, shipping_address_line2,
        shipping_city, shipping_province, shipping_postal_code, notes
      ) VALUES (
        ?, ?, ?, ?, ?, 'pending', ?, 'pending',
        ?, ?, ?, 0, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?
      )`,
      [
        orderId,
        orderNumber,
        input.userId || null,
        input.email.trim().toLowerCase(),
        normalizedPhone,
        input.paymentMethod,
        subtotal,
        discountAmount,
        shippingAmount,
        totalAmount,
        couponCode,
        `${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
        normalizedPhone,
        input.addressLine1.trim(),
        input.addressLine2?.trim() || null,
        input.city.trim(),
        input.province.trim(),
        input.postalCode?.trim() || null,
        input.notes?.trim() || null,
      ]
    );

    for (const item of lineItems) {
      run(
        `INSERT INTO order_items (
          id, order_id, product_id, product_name, product_sku, product_emoji,
          quantity, unit_price, total_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          randomUUID(),
          orderId,
          item.productId,
          item.productName,
          item.productSku,
          item.productEmoji,
          item.quantity,
          item.unitPrice,
          item.totalPrice,
        ]
      );

      run(
        `UPDATE products
         SET stock_quantity = stock_quantity - ?, sold_count = sold_count + ?
         WHERE id = ?`,
        [item.quantity, item.quantity, item.productId]
      );
    }

    if (couponCode) {
      run('UPDATE coupons SET used_count = used_count + 1 WHERE code = ? COLLATE NOCASE', [couponCode]);
    }

    return { id: orderId, orderNumber, totalAmount };
  });
}

function mapOrderItem(row: Row): OrderItem {
  return {
    id: String(row.id),
    productId: (row.product_id as string) ?? null,
    productName: String(row.product_name),
    productSku: String(row.product_sku),
    productEmoji: (row.product_emoji as string) ?? null,
    quantity: Number(row.quantity),
    unitPrice: Number(row.unit_price),
    totalPrice: Number(row.total_price),
  };
}

export function mapOrder(row: Row, items: OrderItem[] = []): Order {
  return {
    id: String(row.id),
    orderNumber: String(row.order_number),
    userId: (row.user_id as string) ?? null,
    guestEmail: (row.guest_email as string) ?? null,
    guestPhone: String(row.guest_phone),
    status: String(row.status) as Order['status'],
    paymentMethod: String(row.payment_method) as PaymentMethod,
    paymentStatus: String(row.payment_status) as Order['paymentStatus'],
    subtotal: Number(row.subtotal),
    discountAmount: Number(row.discount_amount),
    shippingAmount: Number(row.shipping_amount),
    taxAmount: Number(row.tax_amount),
    totalAmount: Number(row.total_amount),
    couponCode: (row.coupon_code as string) ?? null,
    shippingFullName: String(row.shipping_full_name),
    shippingPhone: String(row.shipping_phone),
    shippingAddressLine1: String(row.shipping_address_line1),
    shippingAddressLine2: (row.shipping_address_line2 as string) ?? null,
    shippingCity: String(row.shipping_city),
    shippingProvince: String(row.shipping_province),
    shippingPostalCode: (row.shipping_postal_code as string) ?? null,
    notes: (row.notes as string) ?? null,
    trackingNumber: (row.tracking_number as string) ?? null,
    courierName: (row.courier_name as string) ?? null,
    dispatchedAt: (row.dispatched_at as string) ?? null,
    deliveredAt: (row.delivered_at as string) ?? null,
    cancelledAt: (row.cancelled_at as string) ?? null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    items,
  };
}

export function getOrderItems(orderId: string): OrderItem[] {
  return all<Row>('SELECT * FROM order_items WHERE order_id = ? ORDER BY created_at ASC', [orderId])
    .map(mapOrderItem);
}

export function getOrderByNumber(orderNumber: string): Order | null {
  const row = get<Row>('SELECT * FROM orders WHERE order_number = ? COLLATE NOCASE', [orderNumber.trim()]);
  if (!row) return null;
  return mapOrder(row, getOrderItems(String(row.id)));
}

export function getOrderByNumberAndPhone(orderNumber: string, phone: string): Order | null {
  const row = get<Row>(
    `SELECT * FROM orders WHERE order_number = ? COLLATE NOCASE AND guest_phone = ?`,
    [orderNumber.trim(), normalizePhone(phone)]
  );
  if (!row) return null;
  return mapOrder(row, getOrderItems(String(row.id)));
}

export function getOrdersForUser(userId: string): Order[] {
  const rows = all<Row>(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows.map((row) => {
    const order = mapOrder(row, getOrderItems(String(row.id)));
    return order;
  });
}

export function getUserOrder(userId: string, orderNumber: string): Order | null {
  const row = get<Row>(
    'SELECT * FROM orders WHERE user_id = ? AND order_number = ? COLLATE NOCASE',
    [userId, orderNumber.trim()]
  );
  if (!row) return null;
  return mapOrder(row, getOrderItems(String(row.id)));
}
