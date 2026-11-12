import { NextResponse } from 'next/server';
import { AdminError, listAdminShippingZones, updateShippingZone } from '@/lib/admin';
import { getClientIp, requireAdminApi } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;
  const zones = listAdminShippingZones();
  return NextResponse.json({ success: true, zones }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  let body: { id: string } & Record<string, unknown>;
  try { body = await request.json(); }
  catch { return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 }); }

  if (!body.id) return NextResponse.json({ success: false, message: 'Zone ID is required.' }, { status: 400 });

  try {
    const zone = updateShippingZone(body.id, body as any, auth.user, getClientIp(request));
    return NextResponse.json({ success: true, zone }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof AdminError) return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    return NextResponse.json({ success: false, message: 'Could not update zone.' }, { status: 500 });
  }
}
