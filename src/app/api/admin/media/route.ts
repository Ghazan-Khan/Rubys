import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { run } from '@/lib/db';
import { getClientIp, logAdminAction, requireAdminApi } from '@/lib/admin-auth';

export const runtime = 'nodejs';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_UPLOAD_BYTES + 1024 * 1024) {
    return NextResponse.json(
      { success: false, message: 'Image must be 5 MB or smaller.' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid upload request.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json(
      { success: false, message: 'Choose an image to upload.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      { success: false, message: 'The selected image is empty.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { success: false, message: 'Image must be 5 MB or smaller.' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { success: false, message: 'Use a JPEG, PNG, WebP, GIF or AVIF image.' },
      { status: 415, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer, {
      failOn: 'error',
      limitInputPixels: 40_000_000,
      animated: false,
    });

    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error('Image has no readable dimensions.');
    }

    const processed = await image
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toBuffer({ resolveWithObject: true });

    const id = randomUUID();
    const altText =
      typeof form.get('altText') === 'string' ? String(form.get('altText')).trim().slice(0, 200) : null;

    run(
      `INSERT INTO media (id, original_name, mime_type, size_bytes, width, height, data, alt_text, created_by)
       VALUES (?, ?, 'image/webp', ?, ?, ?, ?, ?, ?)`,
      [
        id,
        file.name.slice(0, 255),
        processed.data.length,
        processed.info.width ?? null,
        processed.info.height ?? null,
        processed.data,
        altText || null,
        auth.user.id,
      ]
    );

    logAdminAction({
      userId: auth.user.id,
      action: 'media.upload',
      entityType: 'media',
      entityId: id,
      details: { originalName: file.name, sizeBytes: processed.data.length },
      ip: getClientIp(request),
    });

    return NextResponse.json(
      {
        success: true,
        media: {
          id,
          url: `/api/media/${id}`,
          originalName: file.name,
          mimeType: 'image/webp',
          sizeBytes: processed.data.length,
          width: processed.info.width ?? null,
          height: processed.info.height ?? null,
        },
      },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Image upload failed', error);
    return NextResponse.json(
      { success: false, message: 'Could not process that image. Try a different file.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
