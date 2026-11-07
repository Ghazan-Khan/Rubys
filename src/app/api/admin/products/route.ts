import { NextResponse } from 'next/server';
import { AdminError, createProduct, listAdminProducts } from '@/lib/admin';
import { requireAdminApi, getClientIp } from '@/lib/admin-auth';
import { firstZodError, productInputSchema } from '@/lib/admin-validation';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get('page') || '1', 10) || 1;
  const pageSize = Number.parseInt(url.searchParams.get('pageSize') || '15', 10) || 15;
  const filters = {
    query: url.searchParams.get('q') || undefined,
    status: (url.searchParams.get('status') as 'all' | 'active' | 'inactive' | null) || 'all',
    category: url.searchParams.get('category') || undefined,
    stock: (url.searchParams.get('stock') as 'all' | 'in' | 'low' | 'out' | null) || 'all',
    featured: url.searchParams.get('featured') === '1',
    archived: url.searchParams.get('archived') === '1',
    sort: url.searchParams.get('sort') || 'newest',
    page,
    pageSize,
  };

  const result = listAdminProducts(filters);
  return NextResponse.json(
    { success: true, ...result },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const parsed = productInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: firstZodError(parsed.error),
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const product = createProduct(parsed.data, auth.user, getClientIp(request));
    return NextResponse.json(
      { success: true, message: 'Product created.', product },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    if (error instanceof AdminError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    console.error('Admin product create failed', error);
    return NextResponse.json(
      { success: false, message: 'Could not create the product.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
