import { z } from 'zod';

const nullableText = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal(''), z.null()])
    .optional()
    .transform((value) => (value == null || value === '' ? null : value));

export const productInputSchema = z
  .object({
    name: z.string().trim().min(2, 'Product name must be at least 2 characters.').max(200),
    slug: z.string().trim().max(200).optional(),
    sku: z.string().trim().min(1, 'SKU is required.').max(80),
    shortDescription: nullableText(500),
    description: nullableText(20_000),
    price: z.coerce
      .number()
      .int('Price must be a whole number of rupees.')
      .min(0, 'Price cannot be negative.')
      .max(100_000_000),
    salePrice: z
      .union([z.coerce.number().int().min(0).max(100_000_000), z.null()])
      .optional(),
    stockQuantity: z.coerce
      .number()
      .int('Stock must be a whole number.')
      .min(0, 'Stock cannot be negative.')
      .max(1_000_000),
    categoryId: nullableText(100),
    brand: nullableText(120),
    isFeatured: z.boolean().optional().default(false),
    isActive: z.boolean().optional().default(true),
    emoji: nullableText(16),
    imageUrl: nullableText(500),
    badge: nullableText(60),
    metaTitle: nullableText(200),
    metaDescription: nullableText(500),
  })
  .superRefine((data, ctx) => {
    if (data.salePrice != null && data.salePrice > 0 && data.salePrice >= data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['salePrice'],
        message: 'Sale price must be lower than the regular price.',
      });
    }
  });

export type ProductInput = z.infer<typeof productInputSchema>;

export function firstZodError(error: z.ZodError): string {
  return error.issues[0]?.message || 'Please check the form and try again.';
}
