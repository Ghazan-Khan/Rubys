import type { Metadata } from 'next';
import { listAdminBlogPosts } from '@/lib/admin';
import BlogManager from '@/components/admin/BlogManager';

export const metadata: Metadata = { title: 'Blog & Journal | Admin' };

export default function AdminBlogPage() {
  const posts = listAdminBlogPosts();
  return <BlogManager initialPosts={posts} />;
}
