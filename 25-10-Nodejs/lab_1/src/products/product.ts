import { z } from "zod";

export const productSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  category: z.string().trim().min(1),
  brand: z.string().trim().min(1),
  price: z.number().nonnegative(),
  currency: z.literal("USD"),
  inStock: z.boolean(),
});

export const catalogSchema = z.array(productSchema).min(12).superRefine((products, context) => {
  const seen = new Set<string>();

  for (const [index, product] of products.entries()) {
    if (seen.has(product.id)) {
      context.addIssue({
        code: "custom",
        path: [index, "id"],
        message: "Product id must be unique",
      });
    }

    seen.add(product.id);
  }
});

export type Product = z.infer<typeof productSchema>;

export type ProductFilters = {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
};

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
  };
};
