import type { Metadata } from 'next';
import { listAdminContactMessages, listNewsletterSubscribers } from '@/lib/admin';
import InquiriesManager from '@/components/admin/InquiriesManager';

export const metadata: Metadata = { title: 'Inquiries & Newsletter | Admin' };

export default async function AdminInquiriesPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const result = listAdminContactMessages({
    status: params.status,
    page: Number(params.page || '1') || 1,
    pageSize: 20,
  });
  const subscribers = listNewsletterSubscribers();
  return <InquiriesManager initialData={result} initialSubscribers={subscribers} />;
}
