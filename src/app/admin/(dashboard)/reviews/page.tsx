import type { Metadata } from 'next';
import { listAdminReviews } from '@/lib/admin';
import ReviewsManager from '@/components/admin/ReviewsManager';

export const metadata: Metadata = { title: 'Reviews | Admin' };

export default async function AdminReviewsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const result = listAdminReviews({
    query: params.q,
    status: (params.status as 'all' | 'approved' | 'pending') || 'all',
    rating: params.rating ? Number(params.rating) : undefined,
    page: Number(params.page || '1') || 1,
    pageSize: 20,
  });
  return <ReviewsManager initialData={result} />;
}
