import { NextResponse } from 'next/server';
import { get } from '@/lib/db';

export const runtime = 'nodejs';

type Params = Promise<{ id: string }>;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  if (!UUID_PATTERN.test(id)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const row = get<{ mime_type: string; size_bytes: number; data: Uint8Array }>(
    'SELECT mime_type, size_bytes, data FROM media WHERE id = ?',
    [id]
  );

  if (!row) {
    return new NextResponse('Not found', { status: 404 });
  }

  const etag = `"media-${id}"`;
  if (request.headers.get('if-none-match') === etag) {
    return new NextResponse(null, {
      status: 304,
      headers: { ETag: etag, 'Cache-Control': 'public, max-age=31536000, immutable' },
    });
  }

  const bytes = row.data instanceof Uint8Array ? row.data : new Uint8Array(row.data);
  // Copy into a plain ArrayBuffer so the value satisfies the Response BodyInit type.
  const body = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(body).set(bytes);

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': row.mime_type,
      'Content-Length': String(row.size_bytes),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      ETag: etag,
    },
  });
}
