import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { getAdminCategories, getAdminProductById, getBrandNames } from '@/lib/admin';

export const metadata: Metadata = { title: 'Edit product' };

type Params = Promise<{ id: string }>;

export default async function AdminEditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = getAdminProductById(id);
  if (!product) notFound();

  const categories = getAdminCategories();
  const brands = getBrandNames();

  return (
    <ProductForm
      mode="edit"
      product={product}
      categories={categories}
      brands={brands}
    />
  );
}
