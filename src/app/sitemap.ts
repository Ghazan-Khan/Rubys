import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { getBlogSlugs, getCategories, getProductSlugs } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/shop`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/track-order`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/shipping-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/return-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/refund-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/payment-methods`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: `${base}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = getProductSlugs().map((product) => ({
    url: `${base}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt.includes('T') ? product.updatedAt : `${product.updatedAt.replace(' ', 'T')}Z`),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
