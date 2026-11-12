export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  emoji: string | null;
  bannerText: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  salePrice: number | null;
  costPrice: number | null;
  categoryId: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  brand: string | null;
  stockQuantity: number;
  isFeatured: boolean;
  isActive: boolean;
  emoji: string | null;
  imageUrl: string | null;
  badge: string | null;
  rating: number;
  reviewCount: number;
  soldCount: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
}

export interface AdminProduct extends Product {
  deletedAt: string | null;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string | null;
  authorName: string;
  rating: number;
  title: string | null;
  comment: string | null;
  isApproved: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  emoji: string | null;
  authorName: string | null;
  category: string | null;
  status: string;
  publishedAt: string | null;
  views: number;
  createdAt: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  updatedAt?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'manager';
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  province: string;
  postalCode: string | null;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string | null;
  productName: string;
  productSku: string;
  productEmoji: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'dispatched'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

export type PaymentMethod = 'cod' | 'bank_transfer' | 'jazzcash' | 'easypaisa';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string | null;
  guestEmail: string | null;
  guestPhone: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  couponCode: string | null;
  shippingFullName: string;
  shippingPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string | null;
  shippingCity: string;
  shippingProvince: string;
  shippingPostalCode: string | null;
  notes: string | null;
  trackingNumber: string | null;
  courierName: string | null;
  dispatchedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxDiscountAmount: number | null;
}

export interface AdminCoupon extends Coupon {
  id: string;
  usageLimit: number | null;
  usedCount: number;
  startsAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  originalPrice: number | null;
  emoji: string | null;
  categoryName: string | null;
  stockQuantity: number;
  quantity: number;
}

export interface ShippingZone {
  province: string;
  rate: number;
  freeShippingMin: number;
  estimatedDays: string;
  cities: string[];
}
