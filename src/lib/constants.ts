import type { PaymentMethod, ShippingZone, OrderStatus } from '@/types';

export const SITE = {
  name: "Ruby's.pk",
  tagline: "Women's Fashion, Beauty & Lifestyle Boutique in Pakistan",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rubys.pk',
  email: 'support@rubys.pk',
  phone: '+92 300 000 0000',
  whatsapp: '+92 300 000 0000',
  address: 'Peshawar, Khyber Pakhtunkhwa, Pakistan',
  city: 'Peshawar',
  country: 'Pakistan',
  currency: 'PKR',
};

export const SHIPPING_ZONES: ShippingZone[] = [
  {
    province: 'Khyber Pakhtunkhwa',
    rate: 150,
    freeShippingMin: 2000,
    estimatedDays: '2-3 days',
    cities: [
      'Peshawar', 'Mardan', 'Abbottabad', 'Swat', 'Nowshera', 'Kohat',
      'Dera Ismail Khan', 'Bannu', 'Charsadda', 'Mansehra', 'Haripur', 'Swabi', 'Chitral',
    ],
  },
  {
    province: 'Punjab',
    rate: 200,
    freeShippingMin: 2500,
    estimatedDays: '3-4 days',
    cities: [
      'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan',
      'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'Jhelum',
    ],
  },
  {
    province: 'Sindh',
    rate: 200,
    freeShippingMin: 2500,
    estimatedDays: '3-4 days',
    cities: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas'],
  },
  {
    province: 'Balochistan',
    rate: 300,
    freeShippingMin: 3000,
    estimatedDays: '4-5 days',
    cities: ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar', 'Chaman'],
  },
  {
    province: 'Gilgit-Baltistan',
    rate: 350,
    freeShippingMin: 3500,
    estimatedDays: '5-7 days',
    cities: ['Gilgit', 'Skardu', 'Hunza'],
  },
  {
    province: 'Azad Jammu and Kashmir',
    rate: 350,
    freeShippingMin: 3500,
    estimatedDays: '5-7 days',
    cities: ['Muzaffarabad', 'Mirpur', 'Kotli'],
  },
];

export const PROVINCES = SHIPPING_ZONES.map((zone) => zone.province);

export function getShippingZone(province: string): ShippingZone {
  return SHIPPING_ZONES.find((zone) => zone.province === province) ?? SHIPPING_ZONES[0];
}

export function getShippingAmount(province: string, subtotal: number): number {
  if (!province) return 0;
  const zone = getShippingZone(province);
  if (subtotal <= 0) return 0;
  return subtotal >= zone.freeShippingMin ? 0 : zone.rate;
}

export const PAYMENT_METHODS: Array<{
  id: PaymentMethod;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay in cash when your order arrives. Available across Pakistan.',
    icon: '💵',
  },
  {
    id: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'Transfer to our account and send the receipt on WhatsApp. Order ships after confirmation.',
    icon: '🏦',
  },
  {
    id: 'jazzcash',
    label: 'JazzCash',
    description: 'Pay through JazzCash. Our team will share payment details after checkout.',
    icon: '📲',
  },
  {
    id: 'easypaisa',
    label: 'Easypaisa',
    description: 'Pay through Easypaisa. Our team will share payment details after checkout.',
    icon: '📱',
  },
];

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'dispatched',
  'out_for_delivery',
  'delivered',
];

export const ORDER_STATUS_META: Record<
  OrderStatus,
  { label: string; description: string; icon: string; className: string }
> = {
  pending: {
    label: 'Order placed',
    description: 'We have received your order and will confirm it shortly.',
    icon: '📝',
    className: 'bg-amber-100 text-amber-800',
  },
  confirmed: {
    label: 'Confirmed',
    description: 'Your order has been confirmed by our team.',
    icon: '✅',
    className: 'bg-blue-100 text-blue-800',
  },
  processing: {
    label: 'Processing',
    description: 'We are preparing your items for dispatch.',
    icon: '📦',
    className: 'bg-indigo-100 text-indigo-800',
  },
  dispatched: {
    label: 'Dispatched',
    description: 'Your parcel has been handed to the courier.',
    icon: '🚚',
    className: 'bg-purple-100 text-purple-800',
  },
  out_for_delivery: {
    label: 'Out for delivery',
    description: 'The courier is on the way to your address.',
    icon: '🛵',
    className: 'bg-cyan-100 text-cyan-800',
  },
  delivered: {
    label: 'Delivered',
    description: 'Your order has been delivered. Thank you for shopping with us!',
    icon: '🎉',
    className: 'bg-emerald-100 text-emerald-800',
  },
  cancelled: {
    label: 'Cancelled',
    description: 'This order was cancelled.',
    icon: '❌',
    className: 'bg-gray-200 text-gray-700',
  },
  returned: {
    label: 'Returned',
    description: 'The order has been returned to us.',
    icon: '↩️',
    className: 'bg-orange-100 text-orange-800',
  },
  refunded: {
    label: 'Refunded',
    description: 'The payment for this order has been refunded.',
    icon: '💸',
    className: 'bg-rose-100 text-rose-800',
  },
};

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'name', label: 'Name A–Z' },
];

export const FREE_SHIPPING_THRESHOLD = 2000;
