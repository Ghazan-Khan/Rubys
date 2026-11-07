'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  PhotoIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import type { AdminProduct, Category } from '@/types';

interface ProductFormProps {
  mode: 'create' | 'edit';
  product?: AdminProduct;
  categories: Category[];
  brands: string[];
}

interface FormState {
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: string;
  salePrice: string;
  stockQuantity: string;
  categoryId: string;
  brand: string;
  isFeatured: boolean;
  isActive: boolean;
  emoji: string;
  imageUrl: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180);
}

function initialState(product?: AdminProduct): FormState {
  return {
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    sku: product?.sku ?? '',
    shortDescription: product?.shortDescription ?? '',
    description: product?.description ?? '',
    price: product ? String(product.price) : '',
    salePrice: product?.salePrice != null ? String(product.salePrice) : '',
    stockQuantity: product ? String(product.stockQuantity) : '0',
    categoryId: product?.categoryId ?? '',
    brand: product?.brand ?? '',
    isFeatured: product?.isFeatured ?? false,
    isActive: product?.isActive ?? true,
    emoji: product?.emoji ?? '',
    imageUrl: product?.imageUrl ?? '',
    badge: product?.badge ?? '',
    metaTitle: product?.metaTitle ?? '',
    metaDescription: product?.metaDescription ?? '',
  };
}

export default function ProductForm({ mode, product, categories, brands }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(() => initialState(product));
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [success, setSuccess] = useState('');

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function handleNameChange(value: string) {
    setForm((previous) => ({
      ...previous,
      name: value,
      slug: slugTouched ? previous.slug : slugify(value),
    }));
  }

  function generateSku() {
    const category = categories.find((item) => item.id === form.categoryId);
    const prefix = (category?.name || 'GEN')
      .replace(/[^a-zA-Z]/g, '')
      .slice(0, 3)
      .toUpperCase() || 'GEN';
    const suffix = Math.floor(1000 + Math.random() * 9000);
    update('sku', `RB-${prefix}-${suffix}`);
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError('');
    if (!file.type.startsWith('image/')) {
      setUploadError('Choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be 5 MB or smaller.');
      return;
    }

    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('altText', form.name || 'Product image');

      const response = await fetch('/api/admin/media', { method: 'POST', body: data });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        media?: { url?: string };
      };
      if (!response.ok || !result.media?.url) {
        setUploadError(result.message || 'Could not upload that image.');
        return;
      }
      update('imageUrl', result.media.url);
    } catch {
      setUploadError('Could not reach the server while uploading.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!form.sku.trim()) {
      setError('SKU is required. Use the Generate button if you need one.');
      return;
    }
    const price = Number(form.price);
    const salePrice = form.salePrice === '' ? null : Number(form.salePrice);
    const stockQuantity = Number(form.stockQuantity);

    if (!Number.isFinite(price) || price < 0 || !Number.isInteger(price)) {
      setError('Enter a valid regular price in whole rupees.');
      return;
    }
    if (salePrice != null && (!Number.isFinite(salePrice) || salePrice < 0 || !Number.isInteger(salePrice))) {
      setError('Enter a valid sale price in whole rupees, or leave it blank.');
      return;
    }
    if (salePrice != null && salePrice > 0 && salePrice >= price) {
      setError('Sale price must be lower than the regular price.');
      return;
    }
    if (!Number.isFinite(stockQuantity) || stockQuantity < 0 || !Number.isInteger(stockQuantity)) {
      setError('Enter a valid stock quantity.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      sku: form.sku.trim(),
      shortDescription: form.shortDescription.trim() || null,
      description: form.description.trim() || null,
      price,
      salePrice,
      stockQuantity,
      categoryId: form.categoryId || null,
      brand: form.brand.trim() || null,
      isFeatured: form.isFeatured,
      isActive: form.isActive,
      emoji: form.emoji.trim() || null,
      imageUrl: form.imageUrl.trim() || null,
      badge: form.badge.trim() || null,
      metaTitle: form.metaTitle.trim() || null,
      metaDescription: form.metaDescription.trim() || null,
    };

    setSaving(true);
    try {
      const response = await fetch(
        mode === 'create' ? '/api/admin/products' : `/api/admin/products/${product?.id}`,
        {
          method: mode === 'create' ? 'POST' : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const result = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        setError(result.message || 'Could not save the product.');
        return;
      }

      if (mode === 'create') {
        router.push('/admin/products');
        router.refresh();
        return;
      }

      setSuccess('Product saved successfully.');
      router.refresh();
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-500 hover:text-ruby-600"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to products
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-charcoal-900">
            {mode === 'create' ? 'Add product' : 'Edit product'}
          </h1>
          <p className="mt-1 text-sm text-charcoal-500">
            {mode === 'create'
              ? 'Create a new catalog item and publish it to the storefront.'
              : `Editing ${product?.name ?? 'product'}.`}
          </p>
        </div>
        {mode === 'edit' && product && (
          <Link
            href={`/product/${product.slug}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary px-4 py-2 text-sm"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            View on store
          </Link>
        )}
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
          {error}
        </div>
      )}
      {success && (
        <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          <CheckCircleIcon className="h-4 w-4" />
          {success}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.55fr_0.85fr]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900">Product details</h2>
            <p className="mt-0.5 text-[11px] text-charcoal-400">The information shoppers see on the product page.</p>

            <div className="mt-4 grid gap-4">
              <div>
                <label htmlFor="product-name" className="label-field">
                  Product name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="product-name"
                  value={form.name}
                  onChange={(event) => handleNameChange(event.target.value)}
                  className="input-field"
                  placeholder="e.g. Wireless Noise-Cancelling Earbuds"
                  required
                  maxLength={200}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="product-slug" className="label-field">
                    URL slug
                  </label>
                  <input
                    id="product-slug"
                    value={form.slug}
                    onChange={(event) => {
                      setSlugTouched(true);
                      update('slug', event.target.value);
                    }}
                    className="input-field"
                    placeholder="wireless-earbuds"
                    maxLength={200}
                  />
                  <p className="mt-1 text-[10px] text-charcoal-400">Leave blank to generate from the name.</p>
                </div>
                <div>
                  <label htmlFor="product-sku" className="label-field">
                    SKU <span className="text-rose-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="product-sku"
                      value={form.sku}
                      onChange={(event) => update('sku', event.target.value)}
                      className="input-field"
                      placeholder="RB-ELC-001"
                      required
                      maxLength={80}
                    />
                    <button
                      type="button"
                      onClick={generateSku}
                      className="shrink-0 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-charcoal-600 transition hover:border-ruby-200 hover:text-ruby-600"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="product-short" className="label-field">
                  Short description
                </label>
                <textarea
                  id="product-short"
                  value={form.shortDescription}
                  onChange={(event) => update('shortDescription', event.target.value)}
                  className="input-field min-h-[80px] resize-y"
                  placeholder="A concise summary shown near the price."
                  maxLength={500}
                />
                <p className="mt-1 text-right text-[10px] text-charcoal-400">
                  {form.shortDescription.length}/500
                </p>
              </div>

              <div>
                <label htmlFor="product-description" className="label-field">
                  Full description
                </label>
                <textarea
                  id="product-description"
                  value={form.description}
                  onChange={(event) => update('description', event.target.value)}
                  className="input-field min-h-[180px] resize-y"
                  placeholder="Detailed product information, materials, dimensions and care instructions."
                  maxLength={20000}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900">Pricing & inventory</h2>
            <p className="mt-0.5 text-[11px] text-charcoal-400">All prices are stored as whole Pakistani rupees.</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="product-price" className="label-field">
                  Regular price (PKR) <span className="text-rose-600">*</span>
                </label>
                <input
                  id="product-price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(event) => update('price', event.target.value)}
                  className="input-field"
                  placeholder="4499"
                  required
                />
              </div>
              <div>
                <label htmlFor="product-sale-price" className="label-field">
                  Sale price (PKR)
                </label>
                <input
                  id="product-sale-price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.salePrice}
                  onChange={(event) => update('salePrice', event.target.value)}
                  className="input-field"
                  placeholder="Leave blank for no sale"
                />
              </div>
              <div>
                <label htmlFor="product-stock" className="label-field">
                  Stock quantity <span className="text-rose-600">*</span>
                </label>
                <input
                  id="product-stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stockQuantity}
                  onChange={(event) => update('stockQuantity', event.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="product-badge" className="label-field">
                  Badge
                </label>
                <input
                  id="product-badge"
                  value={form.badge}
                  onChange={(event) => update('badge', event.target.value)}
                  className="input-field"
                  placeholder="e.g. Best seller"
                  maxLength={60}
                />
              </div>
              <div>
                <label htmlFor="product-emoji" className="label-field">
                  Emoji fallback
                </label>
                <input
                  id="product-emoji"
                  value={form.emoji}
                  onChange={(event) => update('emoji', event.target.value)}
                  className="input-field"
                  placeholder="🎧"
                  maxLength={16}
                />
                <p className="mt-1 text-[10px] text-charcoal-400">Shown when no image is uploaded.</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900">SEO</h2>
            <p className="mt-0.5 text-[11px] text-charcoal-400">Optional overrides for search engines and social previews.</p>
            <div className="mt-4 grid gap-4">
              <div>
                <label htmlFor="product-meta-title" className="label-field">
                  Meta title
                </label>
                <input
                  id="product-meta-title"
                  value={form.metaTitle}
                  onChange={(event) => update('metaTitle', event.target.value)}
                  className="input-field"
                  placeholder="Defaults to the product name"
                  maxLength={200}
                />
              </div>
              <div>
                <label htmlFor="product-meta-description" className="label-field">
                  Meta description
                </label>
                <textarea
                  id="product-meta-description"
                  value={form.metaDescription}
                  onChange={(event) => update('metaDescription', event.target.value)}
                  className="input-field min-h-[90px] resize-y"
                  placeholder="Defaults to the short description"
                  maxLength={500}
                />
                <p className="mt-1 text-right text-[10px] text-charcoal-400">
                  {form.metaDescription.length}/500
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900">Product image</h2>
            <p className="mt-0.5 text-[11px] text-charcoal-400">
              JPEG, PNG, WebP, GIF or AVIF. Max 5 MB. Images are optimized and stored in the database.
            </p>

            <div className="mt-4 overflow-hidden rounded-xl border border-dashed border-gray-200 bg-gray-50">
              {form.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.imageUrl}
                  alt={form.name || 'Product preview'}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center gap-2 text-charcoal-400">
                  <PhotoIcon className="h-10 w-10" />
                  <span className="text-xs">No image uploaded</span>
                  <span className="text-2xl">{form.emoji || '🛍️'}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="btn-secondary px-3 py-2 text-xs"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                {uploading ? 'Uploading…' : form.imageUrl ? 'Replace image' : 'Upload image'}
              </button>
              {form.imageUrl && (
                <button
                  type="button"
                  onClick={() => update('imageUrl', '')}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              className="hidden"
              onChange={handleImageUpload}
            />
            {uploadError && <p className="mt-2 text-[11px] font-medium text-rose-600">{uploadError}</p>}

            <div className="mt-4">
              <label htmlFor="product-image-url" className="label-field">
                Image URL
              </label>
              <input
                id="product-image-url"
                value={form.imageUrl}
                onChange={(event) => update('imageUrl', event.target.value)}
                className="input-field"
                placeholder="/api/media/… or https://…"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900">Organisation</h2>

            <div className="mt-4 grid gap-4">
              <div>
                <label htmlFor="product-category" className="label-field">
                  Category
                </label>
                <select
                  id="product-category"
                  value={form.categoryId}
                  onChange={(event) => update('categoryId', event.target.value)}
                  className="input-field"
                >
                  <option value="">No category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="product-brand" className="label-field">
                  Brand
                </label>
                <input
                  id="product-brand"
                  list="admin-brand-options"
                  value={form.brand}
                  onChange={(event) => update('brand', event.target.value)}
                  className="input-field"
                  placeholder="e.g. Ruby's Select"
                  maxLength={120}
                />
                <datalist id="admin-brand-options">
                  {brands.map((brand) => (
                    <option key={brand} value={brand} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2.5 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-charcoal-700">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) => update('isActive', event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-ruby-600 focus:ring-ruby-500"
                  />
                  Active — visible on the storefront
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-charcoal-700">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(event) => update('isFeatured', event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-ruby-600 focus:ring-ruby-500"
                  />
                  Featured — show in featured sections
                </label>
              </div>
            </div>
          </section>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-2">
              <button type="submit" disabled={saving || uploading} className="btn-primary w-full text-sm">
                {saving ? 'Saving…' : mode === 'create' ? 'Create product' : 'Save changes'}
              </button>
              <Link href="/admin/products" className="btn-secondary w-full text-sm">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
