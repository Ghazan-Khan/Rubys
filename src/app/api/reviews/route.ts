import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getProductById, addReview } from '@/lib/products';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Please sign in to write a review.' },
      { status: 401 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const productId = typeof body.productId === 'string' ? body.productId : '';
  const rating = Number(body.rating);
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const comment = typeof body.comment === 'string' ? body.comment.trim() : '';

  if (!getProductById(productId)) {
    return NextResponse.json({ success: false, message: 'Product not found.' }, { status: 404 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ success: false, message: 'Please choose a rating from 1 to 5 stars.' }, { status: 400 });
  }
  if (comment.length < 10 || comment.length > 1200) {
    return NextResponse.json(
      { success: false, message: 'Your review should be between 10 and 1200 characters.' },
      { status: 400 }
    );
  }

  try {
    const review = addReview({
      productId,
      userId: user.id,
      authorName: `${user.firstName} ${user.lastName.charAt(0)}.`.trim(),
      rating,
      title,
      comment,
    });
    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('Review creation failed', error);
    return NextResponse.json(
      { success: false, message: 'Could not publish your review right now.' },
      { status: 500 }
    );
  }
}
