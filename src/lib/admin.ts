import { all, count, get, run } from '@/lib/db';
import { getOrderItems, mapOrder } from '@/lib/orders';
import { mapProduct } from '@/lib/products';
import type { ProductInput } from '@/lib/admin-validation';
import type { AdminCustomer, AdminProduct, Category, Order, User } from '@/types';
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
