import { NextResponse } from 'next/server';
import {
  AdminError,
  getAdminProductById,
  restoreProduct,
  softDeleteProduct,
  updateProduct,
} from '@/lib/admin';
import { getClientIp, requireAdminApi } from '@/lib/admin-auth';
import { firstZodError, productInputSchema } from '@/lib/admin-validation';

export const runtime = 'nodejs';

type Params = Promise<{ id: string }>;

function noStoreHeaders() {
  return { 'Cache-Control': 'no-store' };
}

export async function GET(request: Request, { params }: { params: Params }) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const { id } = await params;
  const includeDeleted = new URL(request.url).searchParams.get('includeDeleted') === '1';
  const product = getAdminProductById(id, includeDeleted);
  if (!product) {
    return NextResponse.json(
      { success: false, message: 'Product not found.' },
      { status: 404, headers: noStoreHeaders() }
    );
  }
  return NextResponse.json({ success: true, product }, { headers: noStoreHeaders() });
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400, headers: noStoreHeaders() }
    );
  }

  if (body && typeof body === 'object' && (body as { action?: unknown }).action === 'restore') {
    try {
      const product = restoreProduct(id, auth.user, getClientIp(request));
      return NextResponse.json(
        { success: true, message: 'Product restored.', product },
        { headers: noStoreHeaders() }
      );
    } catch (error) {
      if (error instanceof AdminError) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: error.status, headers: noStoreHeaders() }
        );
      }
      console.error('Admin product restore failed', error);
      return NextResponse.json(
        { success: false, message: 'Could not restore the product.' },
        { status: 500, headers: noStoreHeaders() }
      );
    }
  }

  const parsed = productInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: firstZodError(parsed.error),
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers: noStoreHeaders() }
    );
  }

  try {
    const product = updateProduct(id, parsed.data, auth.user, getClientIp(request));
    return NextResponse.json(
      { success: true, message: 'Product updated.', product },
      { headers: noStoreHeaders() }
    );
  } catch (error) {
    if (error instanceof AdminError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status, headers: noStoreHeaders() }
      );
    }
    console.error('Admin product update failed', error);
    return NextResponse.json(
      { success: false, message: 'Could not update the product.' },
      { status: 500, headers: noStoreHeaders() }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const { id } = await params;

  try {
    softDeleteProduct(id, auth.user, getClientIp(request));
    return NextResponse.json(
      { success: true, message: 'Product deleted. It can be restored from the archived list.' },
      { headers: noStoreHeaders() }
    );
  } catch (error) {
    if (error instanceof AdminError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status, headers: noStoreHeaders() }
      );
    }
    console.error('Admin product delete failed', error);
    return NextResponse.json(
      { success: false, message: 'Could not delete the product.' },
      { status: 500, headers: noStoreHeaders() }
    );
  }
}
