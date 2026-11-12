import { all, count, get, run } from '@/lib/db';
import { getOrderItems, mapOrder } from '@/lib/orders';
import { mapProduct } from '@/lib/products';
import type { ProductInput } from '@/lib/admin-validation';
import type { AdminCoupon, AdminCustomer, AdminProduct, BlogPost, Category, Order, Review, User } from '@/types';
import { randomUUID } from 'node:crypto';

type Row = Record<string, unknown>;

export class AdminError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'AdminError';
    this.status = status;
  }
}

const ADMIN_PRODUCT_SELECT = `
  SELECT p.*, c.name AS category_name, c.slug AS category_slug
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
`;

function mapAdminProduct(row: Row): AdminProduct {
  return {
    ...mapProduct(row),
    deletedAt: (row.deleted_at as string) ?? null,
    updatedAt: String(row.updated_at),
  };
}

export interface AdminProductFilters {
  query?: string;
  status?: 'all' | 'active' | 'inactive';
  category?: string;
  stock?: 'all' | 'in' | 'low' | 'out';
  featured?: boolean;
  archived?: boolean;
  sort?: string;
  page?: number;
  pageSize?: number;
}

function buildAdminProductWhere(filters: AdminProductFilters): {
  where: string;
  params: Array<string | number>;
} {
  const conditions: string[] = [];
  const params: Array<string | number> = [];

  conditions.push(filters.archived ? 'p.deleted_at IS NOT NULL' : 'p.deleted_at IS NULL');

  if (filters.query?.trim()) {
    const term = `%${filters.query.trim()}%`;
    conditions.push(
      '(p.name LIKE ? OR p.sku LIKE ? OR p.brand LIKE ? OR p.short_description LIKE ? OR c.name LIKE ?)'
    );
    params.push(term, term, term, term, term);
  }
  if (filters.status === 'active') conditions.push('p.is_active = 1');
  if (filters.status === 'inactive') conditions.push('p.is_active = 0');
  if (filters.category) {
    conditions.push('p.category_id = ?');
    params.push(filters.category);
  }
  if (filters.featured) conditions.push('p.is_featured = 1');
  if (filters.stock === 'out') conditions.push('p.stock_quantity = 0');
  if (filters.stock === 'low') {
    conditions.push('p.stock_quantity > 0 AND p.stock_quantity <= p.min_stock_alert');
  }
  if (filters.stock === 'in') conditions.push('p.stock_quantity > 0');

  return { where: `WHERE ${conditions.join(' AND ')}`, params };
}

function adminProductOrderBy(sort?: string): string {
  switch (sort) {
    case 'oldest':
      return 'p.created_at ASC';
    case 'name':
      return 'p.name ASC';
    case 'price-asc':
      return 'p.price ASC';
    case 'price-desc':
      return 'p.price DESC';
    case 'stock-asc':
      return 'p.stock_quantity ASC, p.name ASC';
    case 'stock-desc':
      return 'p.stock_quantity DESC, p.name ASC';
    case 'updated':
      return 'p.updated_at DESC';
    default:
      return 'p.created_at DESC';
  }
}

export function listAdminProducts(filters: AdminProductFilters = {}): {
  products: AdminProduct[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const page = Math.max(1, Math.floor(filters.page ?? 1));
  const pageSize = Math.min(Math.max(Math.floor(filters.pageSize ?? 15), 1), 100);
  const { where, params } = buildAdminProductWhere(filters);

  const total = count(
    `SELECT COUNT(*) AS n FROM products p
     LEFT JOIN categories c ON c.id = p.category_id ${where}`,
    params
  );

  const rows = all<Row>(
    `${ADMIN_PRODUCT_SELECT} ${where}
     ORDER BY ${adminProductOrderBy(filters.sort)}
     LIMIT ? OFFSET ?`,
    [...params, pageSize, (page - 1) * pageSize]
  );

  return {
    products: rows.map(mapAdminProduct),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export function getAdminProductById(id: string, includeDeleted = false): AdminProduct | null {
  const row = get<Row>(
    `${ADMIN_PRODUCT_SELECT} WHERE p.id = ?${includeDeleted ? '' : ' AND p.deleted_at IS NULL'}`,
    [id]
  );
  return row ? mapAdminProduct(row) : null;
}

export function getAdminCategories(): Category[] {
  const rows = all<Row>(`
    SELECT c.*, COUNT(p.id) AS product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id AND p.deleted_at IS NULL
    GROUP BY c.id
    ORDER BY c.sort_order ASC, c.name ASC
  `);
  return rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    description: (row.description as string) ?? null,
    emoji: (row.emoji as string) ?? null,
    bannerText: (row.banner_text as string) ?? null,
    imageUrl: (row.image_url as string) ?? null,
    isActive: Boolean(row.is_active),
    sortOrder: Number(row.sort_order),
    productCount: Number(row.product_count),
  }));
}

export function getBrandNames(): string[] {
  const rows = all<{ name: string }>(`
    SELECT name FROM brands WHERE is_active = 1
    UNION
    SELECT brand AS name FROM products
      WHERE brand IS NOT NULL AND brand != '' AND deleted_at IS NULL
    ORDER BY name ASC
  `);
  return rows.map((row) => row.name).filter(Boolean);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180) || 'product';
}

function uniqueSlug(base: string, excludeId?: string): string {
  const root = slugify(base);
  let candidate = root;
  let suffix = 2;
  for (;;) {
    const existing = get<Row>(
      `SELECT id FROM products WHERE slug = ?${excludeId ? ' AND id != ?' : ''}`,
      excludeId ? [candidate, excludeId] : [candidate]
    );
    if (!existing) return candidate;
    candidate = `${root}-${suffix}`;
    suffix += 1;
  }
}

function assertCategory(categoryId: string | null | undefined) {
  if (!categoryId) return;
  const category = get<Row>('SELECT id FROM categories WHERE id = ?', [categoryId]);
  if (!category) throw new AdminError('The selected category does not exist.', 400);
}

function normalizeImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const url = value.trim();
  if (!url) return null;
  if (url.startsWith('/api/media/')) return url;
  if (url.startsWith('https://')) return url;
  throw new AdminError('Image URL must be an uploaded media URL or an https:// address.', 400);
}

function normalizeSalePrice(salePrice: number | null | undefined, price: number): number | null {
  if (salePrice == null || salePrice <= 0) return null;
  if (salePrice >= price) {
    throw new AdminError('Sale price must be lower than the regular price.', 400);
  }
  return salePrice;
}

function assertSkuAvailable(sku: string, excludeId?: string) {
  const existing = get<Row>(
    `SELECT id FROM products WHERE sku = ? COLLATE NOCASE${excludeId ? ' AND id != ?' : ''}`,
    excludeId ? [sku, excludeId] : [sku]
  );
  if (existing) throw new AdminError('That SKU is already used by another product.', 409);
}

export function createProduct(input: ProductInput, user: User, ip?: string): AdminProduct {
  assertCategory(input.categoryId);
  assertSkuAvailable(input.sku);

  const id = randomUUID();
  const slug = uniqueSlug(input.slug?.trim() || input.name);
  const salePrice = normalizeSalePrice(input.salePrice, input.price);
  const imageUrl = normalizeImageUrl(input.imageUrl);

  run(
    `INSERT INTO products (
       id, name, slug, sku, description, short_description, price, sale_price,
       category_id, brand, stock_quantity, is_featured, is_active, emoji, image_url,
       badge, meta_title, meta_description
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.name,
      slug,
      input.sku,
      input.description,
      input.shortDescription,
      input.price,
      salePrice,
      input.categoryId,
      input.brand,
      input.stockQuantity,
      input.isFeatured ? 1 : 0,
      input.isActive ? 1 : 0,
      input.emoji,
      imageUrl,
      input.badge,
      input.metaTitle,
      input.metaDescription,
    ]
  );

  const product = getAdminProductById(id);
  if (!product) throw new AdminError('Product could not be created.', 500);

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'product.create', 'product', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ name: product.name, sku: product.sku }), ip ?? null]
  );

  return product;
}

export function updateProduct(
  id: string,
  input: ProductInput,
  user: User,
  ip?: string
): AdminProduct {
  const existing = getAdminProductById(id);
  if (!existing) throw new AdminError('Product not found.', 404);

  assertCategory(input.categoryId);
  assertSkuAvailable(input.sku, id);

  const slug = uniqueSlug(input.slug?.trim() || input.name, id);
  const salePrice = normalizeSalePrice(input.salePrice, input.price);
  const imageUrl = normalizeImageUrl(input.imageUrl);

  run(
    `UPDATE products SET
       name = ?, slug = ?, sku = ?, description = ?, short_description = ?,
       price = ?, sale_price = ?, category_id = ?, brand = ?, stock_quantity = ?,
       is_featured = ?, is_active = ?, emoji = ?, image_url = ?, badge = ?,
       meta_title = ?, meta_description = ?, updated_at = datetime('now')
     WHERE id = ? AND deleted_at IS NULL`,
    [
      input.name,
      slug,
      input.sku,
      input.description,
      input.shortDescription,
      input.price,
      salePrice,
      input.categoryId,
      input.brand,
      input.stockQuantity,
      input.isFeatured ? 1 : 0,
      input.isActive ? 1 : 0,
      input.emoji,
      imageUrl,
      input.badge,
      input.metaTitle,
      input.metaDescription,
      id,
    ]
  );

  const product = getAdminProductById(id);
  if (!product) throw new AdminError('Product not found.', 404);

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'product.update', 'product', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ name: product.name, sku: product.sku }), ip ?? null]
  );

  return product;
}

export function softDeleteProduct(id: string, user: User, ip?: string): AdminProduct {
  const existing = getAdminProductById(id);
  if (!existing) throw new AdminError('Product not found.', 404);

  run(
    `UPDATE products
     SET deleted_at = datetime('now'), is_active = 0, updated_at = datetime('now')
     WHERE id = ? AND deleted_at IS NULL`,
    [id]
  );

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'product.delete', 'product', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ name: existing.name, sku: existing.sku }), ip ?? null]
  );

  return { ...existing, isActive: false, deletedAt: new Date().toISOString() };
}

export function restoreProduct(id: string, user: User, ip?: string): AdminProduct {
  const existing = getAdminProductById(id, true);
  if (!existing) throw new AdminError('Product not found.', 404);

  run(
    `UPDATE products
     SET deleted_at = NULL, is_active = 1, updated_at = datetime('now')
     WHERE id = ?`,
    [id]
  );

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'product.restore', 'product', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ name: existing.name, sku: existing.sku }), ip ?? null]
  );

  const product = getAdminProductById(id);
  if (!product) throw new AdminError('Product not found.', 404);
  return product;
}

export interface AdminOrderFilters {
  query?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export function listAdminOrders(filters: AdminOrderFilters = {}): {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const page = Math.max(1, Math.floor(filters.page ?? 1));
  const pageSize = Math.min(Math.max(Math.floor(filters.pageSize ?? 20), 1), 100);
  const conditions: string[] = [];
  const params: string[] = [];

  if (filters.query?.trim()) {
    const term = `%${filters.query.trim()}%`;
    conditions.push(
      '(order_number LIKE ? OR shipping_full_name LIKE ? OR guest_phone LIKE ? OR guest_email LIKE ? OR tracking_number LIKE ?)'
    );
    params.push(term, term, term, term, term);
  }
  if (filters.status) {
    conditions.push('status = ?');
    params.push(filters.status);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const total = count(`SELECT COUNT(*) AS n FROM orders ${where}`, params);
  const rows = all<Row>(
    `SELECT * FROM orders ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, pageSize, (page - 1) * pageSize]
  );

  return {
    orders: rows.map((row) => mapOrder(row, getOrderItems(String(row.id)))),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export interface AdminCustomerFilters {
  query?: string;
  page?: number;
  pageSize?: number;
}

export function listAdminCustomers(filters: AdminCustomerFilters = {}): {
  customers: AdminCustomer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const page = Math.max(1, Math.floor(filters.page ?? 1));
  const pageSize = Math.min(Math.max(Math.floor(filters.pageSize ?? 20), 1), 100);
  const conditions: string[] = ["u.role = 'customer'"];
  const params: string[] = [];

  if (filters.query?.trim()) {
    const term = `%${filters.query.trim()}%`;
    conditions.push('(u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)');
    params.push(term, term, term, term);
  }

  const where = `WHERE ${conditions.join(' AND ')}`;
  const total = count(`SELECT COUNT(*) AS n FROM users u ${where}`, params);

  const rows = all<Row>(
    `SELECT u.*,
       COUNT(o.id) AS order_count,
       COALESCE(SUM(CASE WHEN o.status NOT IN ('cancelled', 'refunded') THEN o.total_amount ELSE 0 END), 0) AS total_spent
     FROM users u
     LEFT JOIN orders o ON o.user_id = u.id
     ${where}
     GROUP BY u.id
     ORDER BY u.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, pageSize, (page - 1) * pageSize]
  );

  return {
    customers: rows.map((row) => ({
      id: String(row.id),
      firstName: String(row.first_name),
      lastName: String(row.last_name),
      email: String(row.email),
      phone: String(row.phone),
      isActive: Boolean(row.is_active),
      createdAt: String(row.created_at),
      orderCount: Number(row.order_count),
      totalSpent: Number(row.total_spent),
    })),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  lowStock: number;
  outOfStock: number;
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  totalSales: number;
  todaySales: number;
  monthSales: number;
  recentOrders: Order[];
  lowStockProducts: AdminProduct[];
}

export function getDashboardStats(): DashboardStats {
  const totalProducts = count('SELECT COUNT(*) AS n FROM products WHERE deleted_at IS NULL');
  const activeProducts = count(
    'SELECT COUNT(*) AS n FROM products WHERE deleted_at IS NULL AND is_active = 1'
  );
  const lowStock = count(
    'SELECT COUNT(*) AS n FROM products WHERE deleted_at IS NULL AND stock_quantity > 0 AND stock_quantity <= min_stock_alert'
  );
  const outOfStock = count(
    'SELECT COUNT(*) AS n FROM products WHERE deleted_at IS NULL AND stock_quantity = 0'
  );
  const totalOrders = count('SELECT COUNT(*) AS n FROM orders');
  const pendingOrders = count(
    "SELECT COUNT(*) AS n FROM orders WHERE status IN ('pending', 'confirmed', 'processing')"
  );
  const totalCustomers = count("SELECT COUNT(*) AS n FROM users WHERE role = 'customer'");

  const salesRow = get<{ total: number; today: number; month: number }>(`
    SELECT
      COALESCE(SUM(CASE WHEN status NOT IN ('cancelled', 'refunded') THEN total_amount ELSE 0 END), 0) AS total,
      COALESCE(SUM(CASE WHEN status NOT IN ('cancelled', 'refunded') AND date(created_at) = date('now') THEN total_amount ELSE 0 END), 0) AS today,
      COALESCE(SUM(CASE WHEN status NOT IN ('cancelled', 'refunded') AND created_at >= datetime('now', 'start of month') THEN total_amount ELSE 0 END), 0) AS month
    FROM orders
  `);

  const lowStockProducts = all<Row>(
    `${ADMIN_PRODUCT_SELECT}
     WHERE p.deleted_at IS NULL AND p.stock_quantity <= p.min_stock_alert
     ORDER BY p.stock_quantity ASC, p.name ASC
     LIMIT 5`
  ).map(mapAdminProduct);

  return {
    totalProducts,
    activeProducts,
    lowStock,
    outOfStock,
    totalOrders,
    pendingOrders,
    totalCustomers,
    totalSales: Number(salesRow?.total ?? 0),
    todaySales: Number(salesRow?.today ?? 0),
    monthSales: Number(salesRow?.month ?? 0),
    recentOrders: listAdminOrders({ page: 1, pageSize: 6 }).orders,
    lowStockProducts,
  };
}

export interface CouponInput {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number | null;
  usageLimit?: number | null;
  startsAt?: string | null;
  expiresAt?: string | null;
  isActive?: boolean;
}

function mapAdminCoupon(row: Row): AdminCoupon {
  return {
    id: String(row.id),
    code: String(row.code),
    type: row.type === 'fixed' ? 'fixed' : 'percentage',
    value: Number(row.value),
    minOrderAmount: Number(row.min_order_amount ?? 0),
    maxDiscountAmount: row.max_discount_amount == null ? null : Number(row.max_discount_amount),
    usageLimit: row.usage_limit == null ? null : Number(row.usage_limit),
    usedCount: Number(row.used_count ?? 0),
    startsAt: row.starts_at ? String(row.starts_at) : null,
    expiresAt: row.expires_at ? String(row.expires_at) : null,
    isActive: Boolean(row.is_active),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export function listAdminCoupons(): AdminCoupon[] {
  return all<Row>('SELECT * FROM coupons ORDER BY created_at DESC').map(mapAdminCoupon);
}

export function getAdminCouponById(id: string): AdminCoupon | null {
  const row = get<Row>('SELECT * FROM coupons WHERE id = ?', [id]);
  return row ? mapAdminCoupon(row) : null;
}

export function createCoupon(input: CouponInput, user: User, ip?: string): AdminCoupon {
  const code = input.code.trim().toUpperCase();
  if (!code || code.length < 2) {
    throw new AdminError('Coupon code must be at least 2 characters long.', 400);
  }
  if (!['percentage', 'fixed'].includes(input.type)) {
    throw new AdminError('Invalid coupon discount type.', 400);
  }
  if (input.value <= 0) {
    throw new AdminError('Discount value must be greater than zero.', 400);
  }
  if (input.type === 'percentage' && input.value > 100) {
    throw new AdminError('Percentage discount cannot exceed 100%.', 400);
  }

  const existing = get<Row>('SELECT id FROM coupons WHERE code = ? COLLATE NOCASE', [code]);
  if (existing) {
    throw new AdminError(`A coupon with code "${code}" already exists.`, 409);
  }

  const id = `cpn-${randomUUID().slice(0, 8)}`;
  const minOrder = Math.max(0, Number(input.minOrderAmount) || 0);
  const maxDiscount = input.type === 'percentage' && input.maxDiscountAmount ? Math.max(0, Number(input.maxDiscountAmount)) : null;
  const usageLimit = input.usageLimit ? Math.max(1, Number(input.usageLimit)) : null;
  const isActive = input.isActive !== false ? 1 : 0;

  run(
    `INSERT INTO coupons (id, code, type, value, min_order_amount, max_discount_amount, usage_limit, starts_at, expires_at, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      code,
      input.type,
      input.value,
      minOrder,
      maxDiscount,
      usageLimit,
      input.startsAt || null,
      input.expiresAt || null,
      isActive,
    ]
  );

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'coupon.create', 'coupon', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ code, type: input.type, value: input.value }), ip ?? null]
  );

  const coupon = getAdminCouponById(id);
  if (!coupon) throw new AdminError('Could not retrieve created coupon.', 500);
  return coupon;
}

export function updateCoupon(
  id: string,
  input: Partial<CouponInput>,
  user: User,
  ip?: string
): AdminCoupon {
  const existing = getAdminCouponById(id);
  if (!existing) throw new AdminError('Coupon not found.', 404);

  const updates: string[] = ['updated_at = datetime("now")'];
  const params: Array<string | number | null> = [];

  if (input.code !== undefined) {
    const code = input.code.trim().toUpperCase();
    if (!code || code.length < 2) throw new AdminError('Coupon code must be at least 2 characters long.', 400);
    const dup = get<Row>('SELECT id FROM coupons WHERE code = ? COLLATE NOCASE AND id != ?', [code, id]);
    if (dup) throw new AdminError(`Coupon code "${code}" is already in use.`, 409);
    updates.push('code = ?');
    params.push(code);
  }

  if (input.type !== undefined) {
    if (!['percentage', 'fixed'].includes(input.type)) throw new AdminError('Invalid coupon discount type.', 400);
    updates.push('type = ?');
    params.push(input.type);
  }

  if (input.value !== undefined) {
    if (input.value <= 0) throw new AdminError('Discount value must be greater than zero.', 400);
    updates.push('value = ?');
    params.push(input.value);
  }

  if (input.minOrderAmount !== undefined) {
    updates.push('min_order_amount = ?');
    params.push(Math.max(0, Number(input.minOrderAmount) || 0));
  }

  if (input.maxDiscountAmount !== undefined) {
    updates.push('max_discount_amount = ?');
    params.push(input.maxDiscountAmount ? Math.max(0, Number(input.maxDiscountAmount)) : null);
  }

  if (input.usageLimit !== undefined) {
    updates.push('usage_limit = ?');
    params.push(input.usageLimit ? Math.max(1, Number(input.usageLimit)) : null);
  }

  if (input.startsAt !== undefined) {
    updates.push('starts_at = ?');
    params.push(input.startsAt || null);
  }

  if (input.expiresAt !== undefined) {
    updates.push('expires_at = ?');
    params.push(input.expiresAt || null);
  }

  if (input.isActive !== undefined) {
    updates.push('is_active = ?');
    params.push(input.isActive ? 1 : 0);
  }

  params.push(id);
  run(`UPDATE coupons SET ${updates.join(', ')} WHERE id = ?`, params);

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'coupon.update', 'coupon', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ code: input.code ?? existing.code }), ip ?? null]
  );

  const updated = getAdminCouponById(id);
  if (!updated) throw new AdminError('Could not retrieve updated coupon.', 500);
  return updated;
}

export function deleteCoupon(id: string, user: User, ip?: string): void {
  const existing = getAdminCouponById(id);
  if (!existing) throw new AdminError('Coupon not found.', 404);

  run('DELETE FROM coupons WHERE id = ?', [id]);

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'coupon.delete', 'coupon', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ code: existing.code }), ip ?? null]
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export interface AdminReview extends Review {
  productName: string;
  productSlug: string;
  updatedAt: string;
}

export interface AdminReviewFilters {
  query?: string;
  status?: 'all' | 'approved' | 'pending';
  rating?: number;
  page?: number;
  pageSize?: number;
}

function mapAdminReview(row: Row): AdminReview {
  return {
    id: String(row.id),
    productId: String(row.product_id),
    productName: String(row.product_name ?? ''),
    productSlug: String(row.product_slug ?? ''),
    userId: (row.user_id as string) ?? null,
    authorName: String(row.author_name),
    rating: Number(row.rating),
    title: (row.title as string) ?? null,
    comment: (row.comment as string) ?? null,
    isApproved: Boolean(row.is_approved),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at ?? row.created_at),
  };
}

export function listAdminReviews(filters: AdminReviewFilters = {}): {
  reviews: AdminReview[];
  total: number;
  page: number;
  pageSize: number;
} {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(50, Math.max(5, filters.pageSize ?? 20));
  const offset = (page - 1) * pageSize;

  const conditions: string[] = [];
  const params: Array<string | number> = [];

  if (filters.status === 'approved') {
    conditions.push('r.is_approved = 1');
  } else if (filters.status === 'pending') {
    conditions.push('r.is_approved = 0');
  }

  if (filters.rating && filters.rating >= 1 && filters.rating <= 5) {
    conditions.push('r.rating = ?');
    params.push(filters.rating);
  }

  if (filters.query?.trim()) {
    const term = `%${filters.query.trim()}%`;
    conditions.push('(r.author_name LIKE ? OR r.comment LIKE ? OR r.title LIKE ? OR p.name LIKE ?)');
    params.push(term, term, term, term);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const base = `FROM reviews r LEFT JOIN products p ON p.id = r.product_id ${where}`;

  const totalRow = get<{ n: number }>(`SELECT COUNT(*) AS n ${base}`, params);
  const total = Number(totalRow?.n ?? 0);

  const rows = all<Row>(
    `SELECT r.*, p.name AS product_name, p.slug AS product_slug ${base}
     ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );

  return {
    reviews: rows.map(mapAdminReview),
    total,
    page,
    pageSize,
  };
}

function recalcProductRating(productId: string) {
  const stats = get<{ avg: number | null; n: number }>(
    `SELECT AVG(rating) AS avg, COUNT(*) AS n FROM reviews WHERE product_id = ? AND is_approved = 1`,
    [productId]
  );
  run('UPDATE products SET rating = ?, review_count = ? WHERE id = ?', [
    stats?.avg ? Math.round(Number(stats.avg) * 10) / 10 : 0,
    Number(stats?.n ?? 0),
    productId,
  ]);
}

export function approveReview(id: string, user: User, ip?: string): AdminReview {
  const row = get<Row>(
    `SELECT r.*, p.name AS product_name, p.slug AS product_slug
     FROM reviews r LEFT JOIN products p ON p.id = r.product_id WHERE r.id = ?`,
    [id]
  );
  if (!row) throw new AdminError('Review not found.', 404);

  run(`UPDATE reviews SET is_approved = 1, updated_at = datetime('now') WHERE id = ?`, [id]);
  recalcProductRating(String(row.product_id));

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'review.approve', 'review', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ authorName: row.author_name }), ip ?? null]
  );

  const updated = get<Row>(
    `SELECT r.*, p.name AS product_name, p.slug AS product_slug
     FROM reviews r LEFT JOIN products p ON p.id = r.product_id WHERE r.id = ?`,
    [id]
  )!;
  return mapAdminReview(updated);
}

export function rejectReview(id: string, user: User, ip?: string): AdminReview {
  const row = get<Row>(
    `SELECT r.*, p.name AS product_name, p.slug AS product_slug
     FROM reviews r LEFT JOIN products p ON p.id = r.product_id WHERE r.id = ?`,
    [id]
  );
  if (!row) throw new AdminError('Review not found.', 404);

  run(`UPDATE reviews SET is_approved = 0, updated_at = datetime('now') WHERE id = ?`, [id]);
  recalcProductRating(String(row.product_id));

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'review.reject', 'review', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ authorName: row.author_name }), ip ?? null]
  );

  const updated = get<Row>(
    `SELECT r.*, p.name AS product_name, p.slug AS product_slug
     FROM reviews r LEFT JOIN products p ON p.id = r.product_id WHERE r.id = ?`,
    [id]
  )!;
  return mapAdminReview(updated);
}

export function deleteReview(id: string, user: User, ip?: string): void {
  const row = get<Row>('SELECT * FROM reviews WHERE id = ?', [id]);
  if (!row) throw new AdminError('Review not found.', 404);

  run('DELETE FROM reviews WHERE id = ?', [id]);
  recalcProductRating(String(row.product_id));

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'review.delete', 'review', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ authorName: row.author_name }), ip ?? null]
  );
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export interface BlogPostInput {
  title: string;
  content: string;
  excerpt?: string | null;
  emoji?: string | null;
  category?: string | null;
  status?: 'draft' | 'published' | 'archived';
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface AdminBlogPost extends BlogPost {
  metaTitle: string | null;
  metaDescription: string | null;
  updatedAt: string;
}

function mapAdminBlogPost(row: Row): AdminBlogPost {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    excerpt: (row.excerpt as string) ?? null,
    content: String(row.content),
    emoji: (row.emoji as string) ?? null,
    authorName: (row.author_name as string) ?? null,
    category: (row.category as string) ?? null,
    status: String(row.status),
    publishedAt: (row.published_at as string) ?? null,
    views: Number(row.views ?? 0),
    createdAt: String(row.created_at),
    metaTitle: (row.meta_title as string) ?? null,
    metaDescription: (row.meta_description as string) ?? null,
    updatedAt: String(row.updated_at ?? row.created_at),
  };
}

export function listAdminBlogPosts(): AdminBlogPost[] {
  return all<Row>('SELECT * FROM blog_posts ORDER BY created_at DESC').map(mapAdminBlogPost);
}

export function getAdminBlogPostById(id: string): AdminBlogPost | null {
  const row = get<Row>('SELECT * FROM blog_posts WHERE id = ?', [id]);
  return row ? mapAdminBlogPost(row) : null;
}

function slugifyPost(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 220) || 'post';
}

function uniquePostSlug(base: string, excludeId?: string): string {
  const root = slugifyPost(base);
  let candidate = root;
  let suffix = 2;
  for (;;) {
    const existing = get<Row>(
      `SELECT id FROM blog_posts WHERE slug = ?${excludeId ? ' AND id != ?' : ''}`,
      excludeId ? [candidate, excludeId] : [candidate]
    );
    if (!existing) return candidate;
    candidate = `${root}-${suffix}`;
    suffix += 1;
  }
}

export function createBlogPost(input: BlogPostInput, user: User, ip?: string): AdminBlogPost {
  if (!input.title?.trim()) throw new AdminError('Post title is required.', 400);
  if (!input.content?.trim()) throw new AdminError('Post content is required.', 400);

  const id = `post-${randomUUID().slice(0, 8)}`;
  const slug = uniquePostSlug(input.title);
  const status = input.status ?? 'draft';
  const publishedAt = status === 'published' ? new Date().toISOString() : null;

  run(
    `INSERT INTO blog_posts (id, title, slug, excerpt, content, emoji, author_id, author_name, category, status, published_at, meta_title, meta_description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.title.trim(),
      slug,
      input.excerpt?.trim() || null,
      input.content.trim(),
      input.emoji?.trim() || null,
      user.id,
      `${user.firstName} ${user.lastName}`.trim(),
      input.category?.trim() || null,
      status,
      publishedAt,
      input.metaTitle?.trim() || null,
      input.metaDescription?.trim() || null,
    ]
  );

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'blog.create', 'blog_post', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ title: input.title, status }), ip ?? null]
  );

  const post = getAdminBlogPostById(id);
  if (!post) throw new AdminError('Could not retrieve created post.', 500);
  return post;
}

export function updateBlogPost(
  id: string,
  input: Partial<BlogPostInput>,
  user: User,
  ip?: string
): AdminBlogPost {
  const existing = getAdminBlogPostById(id);
  if (!existing) throw new AdminError('Blog post not found.', 404);

  const updates: string[] = [`updated_at = datetime('now')`];
  const params: Array<string | null> = [];

  if (input.title !== undefined) {
    if (!input.title.trim()) throw new AdminError('Post title is required.', 400);
    updates.push('title = ?');
    params.push(input.title.trim());
    const newSlug = uniquePostSlug(input.title, id);
    updates.push('slug = ?');
    params.push(newSlug);
  }

  if (input.content !== undefined) {
    if (!input.content.trim()) throw new AdminError('Post content is required.', 400);
    updates.push('content = ?');
    params.push(input.content.trim());
  }

  if (input.excerpt !== undefined) { updates.push('excerpt = ?'); params.push(input.excerpt?.trim() || null); }
  if (input.emoji !== undefined) { updates.push('emoji = ?'); params.push(input.emoji?.trim() || null); }
  if (input.category !== undefined) { updates.push('category = ?'); params.push(input.category?.trim() || null); }
  if (input.metaTitle !== undefined) { updates.push('meta_title = ?'); params.push(input.metaTitle?.trim() || null); }
  if (input.metaDescription !== undefined) { updates.push('meta_description = ?'); params.push(input.metaDescription?.trim() || null); }

  if (input.status !== undefined) {
    updates.push('status = ?');
    params.push(input.status);
    if (input.status === 'published' && existing.status !== 'published') {
      updates.push('published_at = ?');
      params.push(new Date().toISOString());
    }
  }

  params.push(id);
  run(`UPDATE blog_posts SET ${updates.join(', ')} WHERE id = ?`, params);

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'blog.update', 'blog_post', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ title: input.title ?? existing.title }), ip ?? null]
  );

  const updated = getAdminBlogPostById(id);
  if (!updated) throw new AdminError('Could not retrieve updated post.', 500);
  return updated;
}

export function deleteBlogPost(id: string, user: User, ip?: string): void {
  const existing = getAdminBlogPostById(id);
  if (!existing) throw new AdminError('Blog post not found.', 404);
  run('DELETE FROM blog_posts WHERE id = ?', [id]);
  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'blog.delete', 'blog_post', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ title: existing.title }), ip ?? null]
  );
}

// ─── Shipping Zones ───────────────────────────────────────────────────────────

export interface AdminShippingZone {
  id: string;
  name: string;
  provinces: string[];
  cities: string[];
  rate: number;
  freeShippingMin: number | null;
  estimatedDays: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingZoneInput {
  name: string;
  provinces: string[];
  cities: string[];
  rate: number;
  freeShippingMin?: number | null;
  estimatedDays?: string | null;
  isActive?: boolean;
}

function mapShippingZone(row: Row): AdminShippingZone {
  return {
    id: String(row.id),
    name: String(row.name),
    provinces: JSON.parse(String(row.provinces || '[]')),
    cities: JSON.parse(String(row.cities || '[]')),
    rate: Number(row.rate),
    freeShippingMin: row.free_shipping_min == null ? null : Number(row.free_shipping_min),
    estimatedDays: (row.estimated_days as string) ?? null,
    isActive: Boolean(row.is_active),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at ?? row.created_at),
  };
}

export function listAdminShippingZones(): AdminShippingZone[] {
  return all<Row>('SELECT * FROM shipping_zones ORDER BY name ASC').map(mapShippingZone);
}

export function updateShippingZone(
  id: string,
  input: Partial<ShippingZoneInput>,
  user: User,
  ip?: string
): AdminShippingZone {
  const row = get<Row>('SELECT * FROM shipping_zones WHERE id = ?', [id]);
  if (!row) throw new AdminError('Shipping zone not found.', 404);

  const updates: string[] = [`updated_at = datetime('now')`];
  const params: Array<string | number | null> = [];

  if (input.name !== undefined) { updates.push('name = ?'); params.push(input.name.trim()); }
  if (input.rate !== undefined) { updates.push('rate = ?'); params.push(Math.max(0, Number(input.rate))); }
  if (input.freeShippingMin !== undefined) { updates.push('free_shipping_min = ?'); params.push(input.freeShippingMin != null ? Math.max(0, Number(input.freeShippingMin)) : null); }
  if (input.estimatedDays !== undefined) { updates.push('estimated_days = ?'); params.push(input.estimatedDays || null); }
  if (input.isActive !== undefined) { updates.push('is_active = ?'); params.push(input.isActive ? 1 : 0); }
  if (input.provinces !== undefined) { updates.push('provinces = ?'); params.push(JSON.stringify(input.provinces)); }
  if (input.cities !== undefined) { updates.push('cities = ?'); params.push(JSON.stringify(input.cities)); }

  params.push(id);
  run(`UPDATE shipping_zones SET ${updates.join(', ')} WHERE id = ?`, params);

  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'shipping.update', 'shipping_zone', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ name: input.name ?? row.name }), ip ?? null]
  );

  const updated = get<Row>('SELECT * FROM shipping_zones WHERE id = ?', [id])!;
  return mapShippingZone(updated);
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export interface AdminContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  repliedAt: string | null;
  createdAt: string;
}

function mapContactMessage(row: Row): AdminContactMessage {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    phone: (row.phone as string) ?? null,
    subject: (row.subject as string) ?? null,
    message: String(row.message),
    status: (row.status as AdminContactMessage['status']) ?? 'new',
    repliedAt: (row.replied_at as string) ?? null,
    createdAt: String(row.created_at),
  };
}

export function listAdminContactMessages(filters: { status?: string; page?: number; pageSize?: number } = {}): {
  messages: AdminContactMessage[];
  total: number;
  page: number;
  pageSize: number;
} {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(50, Math.max(5, filters.pageSize ?? 20));
  const offset = (page - 1) * pageSize;
  const params: Array<string | number> = [];
  let where = '';
  if (filters.status && filters.status !== 'all') {
    where = 'WHERE status = ?';
    params.push(filters.status);
  }
  const totalRow = get<{ n: number }>(`SELECT COUNT(*) AS n FROM contact_messages ${where}`, params);
  const rows = all<Row>(
    `SELECT * FROM contact_messages ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  return { messages: rows.map(mapContactMessage), total: Number(totalRow?.n ?? 0), page, pageSize };
}

export function updateContactMessageStatus(
  id: string,
  status: 'new' | 'read' | 'replied' | 'closed',
  user: User,
  ip?: string
): AdminContactMessage {
  const row = get<Row>('SELECT * FROM contact_messages WHERE id = ?', [id]);
  if (!row) throw new AdminError('Message not found.', 404);
  const repliedAt = status === 'replied' ? new Date().toISOString() : (row.replied_at as string | null);
  run('UPDATE contact_messages SET status = ?, replied_at = ? WHERE id = ?', [status, repliedAt, id]);
  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, 'contact.status', 'contact_message', ?, ?, ?)`,
    [randomUUID(), user.id, id, JSON.stringify({ status }), ip ?? null]
  );
  const updated = get<Row>('SELECT * FROM contact_messages WHERE id = ?', [id])!;
  return mapContactMessage(updated);
}

export function listNewsletterSubscribers(): Array<{ id: string; email: string; isActive: boolean; subscribedAt: string }> {
  return all<Row>('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC').map((row) => ({
    id: String(row.id),
    email: String(row.email),
    isActive: Boolean(row.is_active),
    subscribedAt: String(row.subscribed_at),
  }));
}
