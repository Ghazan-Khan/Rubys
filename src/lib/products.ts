import { all, count, get, run } from '@/lib/db';
import type { BlogPost, Category, Product, Review } from '@/types';
import { randomUUID } from 'node:crypto';

type Row = Record<string, unknown>;

export function mapProduct(row: Row): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    sku: String(row.sku),
    description: (row.description as string) ?? null,
    shortDescription: (row.short_description as string) ?? null,
    price: Number(row.price),
    salePrice: row.sale_price == null ? null : Number(row.sale_price),
    costPrice: row.cost_price == null ? null : Number(row.cost_price),
    categoryId: (row.category_id as string) ?? null,
    categoryName: (row.category_name as string) ?? null,
    categorySlug: (row.category_slug as string) ?? null,
    brand: (row.brand as string) ?? null,
    stockQuantity: Number(row.stock_quantity),
    isFeatured: Boolean(row.is_featured),
    isActive: Boolean(row.is_active),
    emoji: (row.emoji as string) ?? null,
    imageUrl: (row.image_url as string) ?? null,
    badge: (row.badge as string) ?? null,
    rating: Number(row.rating),
    reviewCount: Number(row.review_count),
    soldCount: Number(row.sold_count),
    metaTitle: (row.meta_title as string) ?? null,
    metaDescription: (row.meta_description as string) ?? null,
    createdAt: String(row.created_at),
  };
}

function mapCategory(row: Row): Category {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    description: (row.description as string) ?? null,
    emoji: (row.emoji as string) ?? null,
    bannerText: (row.banner_text as string) ?? null,
    imageUrl: (row.image_url as string) ?? null,
    isActive: Boolean(row.is_active),
    sortOrder: Number(row.sort_order),
    productCount: row.product_count == null ? undefined : Number(row.product_count),
  };
}

const PRODUCT_SELECT = `
  SELECT p.*, c.name AS category_name, c.slug AS category_slug
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
`;

export function getCategories(): Category[] {
  const rows = all<Row>(`
    SELECT c.*, COUNT(p.id) AS product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1 AND p.deleted_at IS NULL
    WHERE c.is_active = 1
    GROUP BY c.id
    ORDER BY c.sort_order ASC, c.name ASC
  `);
  return rows.map(mapCategory);
}

export function getCategoryBySlug(slug: string): Category | null {
  const row = get<Row>(`
    SELECT c.*, COUNT(p.id) AS product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1 AND p.deleted_at IS NULL
    WHERE c.slug = ? AND c.is_active = 1
    GROUP BY c.id
  `, [slug]);
  return row ? mapCategory(row) : null;
}

export interface ProductFilters {
  query?: string;
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  onSale?: boolean;
  limit?: number;
  offset?: number;
  inStockOnly?: boolean;
}

function buildProductWhere(filters: ProductFilters): { where: string; params: (string | number)[] } {
  const conditions: string[] = ['p.is_active = 1', 'p.deleted_at IS NULL'];
  const params: (string | number)[] = [];

  if (filters.query?.trim()) {
    const term = `%${filters.query.trim()}%`;
    conditions.push('(p.name LIKE ? OR p.short_description LIKE ? OR p.description LIKE ? OR p.brand LIKE ? OR c.name LIKE ?)');
    params.push(term, term, term, term, term);
  }
  if (filters.category) {
    conditions.push('c.slug = ?');
    params.push(filters.category);
  }
  if (typeof filters.minPrice === 'number' && Number.isFinite(filters.minPrice)) {
    conditions.push('COALESCE(NULLIF(p.sale_price, 0), p.price) >= ?');
    params.push(filters.minPrice);
  }
  if (typeof filters.maxPrice === 'number' && Number.isFinite(filters.maxPrice)) {
    conditions.push('COALESCE(NULLIF(p.sale_price, 0), p.price) <= ?');
    params.push(filters.maxPrice);
  }
  if (filters.featured) conditions.push('p.is_featured = 1');
  if (filters.onSale) conditions.push('p.sale_price IS NOT NULL AND p.sale_price > 0 AND p.sale_price < p.price');
  if (filters.inStockOnly) conditions.push('p.stock_quantity > 0');

  return { where: `WHERE ${conditions.join(' AND ')}`, params };
}

function orderBy(sort?: string): string {
  switch (sort) {
    case 'price-asc':
      return 'COALESCE(NULLIF(p.sale_price, 0), p.price) ASC';
    case 'price-desc':
      return 'COALESCE(NULLIF(p.sale_price, 0), p.price) DESC';
    case 'newest':
      return 'p.created_at DESC';
    case 'rating':
      return 'p.rating DESC, p.review_count DESC';
    case 'name':
      return 'p.name ASC';
    default:
      return 'p.is_featured DESC, p.sold_count DESC, p.created_at DESC';
  }
}

export function getProducts(filters: ProductFilters = {}): Product[] {
  const { where, params } = buildProductWhere(filters);
  const limit = Math.min(Math.max(filters.limit ?? 24, 1), 60);
  const offset = Math.max(filters.offset ?? 0, 0);
  const rows = all<Row>(
    `${PRODUCT_SELECT} ${where} ORDER BY ${orderBy(filters.sort)} LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  return rows.map(mapProduct);
}

export function countProducts(filters: ProductFilters = {}): number {
  const { where, params } = buildProductWhere(filters);
  return count(
    `SELECT COUNT(*) AS n FROM products p LEFT JOIN categories c ON c.id = p.category_id ${where}`,
    params
  );
}

export function getProductBySlug(slug: string): Product | null {
  const row = get<Row>(`${PRODUCT_SELECT} WHERE p.slug = ? AND p.is_active = 1 AND p.deleted_at IS NULL`, [slug]);
  return row ? mapProduct(row) : null;
}

export function getProductById(id: string): Product | null {
  const row = get<Row>(`${PRODUCT_SELECT} WHERE p.id = ? AND p.is_active = 1 AND p.deleted_at IS NULL`, [id]);
  return row ? mapProduct(row) : null;
}

export function getFeaturedProducts(limit = 8): Product[] {
  return getProducts({ featured: true, limit, sort: 'featured' });
}

export function getNewArrivals(limit = 4): Product[] {
  return getProducts({ limit, sort: 'newest' });
}

export function getRelatedProducts(categoryId: string | null, excludeId: string, limit = 4): Product[] {
  if (!categoryId) return getProducts({ limit, sort: 'rating' });
  const rows = all<Row>(
    `${PRODUCT_SELECT} WHERE p.is_active = 1 AND p.deleted_at IS NULL AND p.category_id = ? AND p.id != ? ORDER BY p.rating DESC LIMIT ?`,
    [categoryId, excludeId, limit]
  );
  return rows.map(mapProduct);
}

export function getProductSlugs(): Array<{ slug: string; updatedAt: string }> {
  const rows = all<Row>('SELECT slug, updated_at FROM products WHERE is_active = 1 AND deleted_at IS NULL');
  return rows.map((row) => ({ slug: String(row.slug), updatedAt: String(row.updated_at) }));
}

export function getReviews(productId: string, limit = 20): Review[] {
  const rows = all<Row>(
    `SELECT * FROM reviews WHERE product_id = ? AND is_approved = 1 ORDER BY created_at DESC LIMIT ?`,
    [productId, limit]
  );
  return rows.map((row) => ({
    id: String(row.id),
    productId: String(row.product_id),
    userId: (row.user_id as string) ?? null,
    authorName: String(row.author_name),
    rating: Number(row.rating),
    title: (row.title as string) ?? null,
    comment: (row.comment as string) ?? null,
    isApproved: Boolean(row.is_approved),
    createdAt: String(row.created_at),
  }));
}

export function getReviewStats(productId: string): { average: number; total: number; distribution: number[] } {
  const rows = all<{ rating: number; n: number }>(
    `SELECT rating, COUNT(*) AS n FROM reviews WHERE product_id = ? AND is_approved = 1 GROUP BY rating`,
    [productId]
  );
  const distribution = [0, 0, 0, 0, 0];
  let total = 0;
  let sum = 0;
  for (const row of rows) {
    distribution[Number(row.rating) - 1] = Number(row.n);
    total += Number(row.n);
    sum += Number(row.rating) * Number(row.n);
  }
  return { average: total ? Math.round((sum / total) * 10) / 10 : 0, total, distribution };
}

export function addReview(input: {
  productId: string;
  userId: string | null;
  authorName: string;
  rating: number;
  title?: string;
  comment?: string;
}): Review {
  const id = randomUUID();
  run(
    `INSERT INTO reviews (id, product_id, user_id, author_name, rating, title, comment, is_approved)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
    [
      id,
      input.productId,
      input.userId,
      input.authorName,
      input.rating,
      input.title?.trim() || null,
      input.comment?.trim() || null,
    ]
  );

  const stats = get<{ avg_rating: number | null; n: number }>(
    `SELECT AVG(rating) AS avg_rating, COUNT(*) AS n FROM reviews WHERE product_id = ? AND is_approved = 1`,
    [input.productId]
  );
  run('UPDATE products SET rating = ?, review_count = ? WHERE id = ?', [
    Math.round(Number(stats?.avg_rating ?? 0) * 10) / 10,
    Number(stats?.n ?? 0),
    input.productId,
  ]);

  const row = get<Row>('SELECT * FROM reviews WHERE id = ?', [id])!;
  return {
    id: String(row.id),
    productId: String(row.product_id),
    userId: (row.user_id as string) ?? null,
    authorName: String(row.author_name),
    rating: Number(row.rating),
    title: (row.title as string) ?? null,
    comment: (row.comment as string) ?? null,
    isApproved: Boolean(row.is_approved),
    createdAt: String(row.created_at),
  };
}

export function getBlogPosts(limit = 20): BlogPost[] {
  const rows = all<Row>(
    `SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC, created_at DESC LIMIT ?`,
    [limit]
  );
  return rows.map(mapBlogPost);
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const row = get<Row>(
    `SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'`,
    [slug]
  );
  if (!row) return null;
  run('UPDATE blog_posts SET views = views + 1 WHERE id = ?', [String(row.id)]);
  return mapBlogPost(row);
}

export function getBlogSlugs(): Array<{ slug: string }> {
  return all<{ slug: string }>(
    `SELECT slug FROM blog_posts WHERE status = 'published'`
  );
}

function mapBlogPost(row: Row): BlogPost {
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
    views: Number(row.views),
    createdAt: String(row.created_at),
  };
}
