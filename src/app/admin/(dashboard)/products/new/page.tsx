import type { Metadata } from 'next';
import ProductForm from '@/components/admin/ProductForm';
import { getAdminCategories, getBrandNames } from '@/lib/admin';

export const metadata: Metadata = { title: 'Add product' };

export default function AdminNewProductPage() {
  const categories = getAdminCategories();
  const brands = getBrandNames();

  return <ProductForm mode="create" categories={categories} brands={brands} />;
}
