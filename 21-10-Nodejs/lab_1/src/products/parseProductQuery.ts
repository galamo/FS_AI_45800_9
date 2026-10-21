import { z } from "zod";
import type { ProductFilters } from "./product.js";

export type ParsedProductQuery =
  | { ok: true; filters: ProductFilters }
  | { ok: false; message: string };

const pricePattern = /^(?:\d+|\d+\.\d+)$/;

function optionalText(label: string) {
  return z
    .string(`${label} must be a single text value`)
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined));
}

function optionalPrice(label: string) {
  return z
    .string(`${label} must be a non-negative number`)
    .trim()
    .optional()
    .transform((value, context) => {
      if (!value) {
        return undefined;
      }

      if (!pricePattern.test(value)) {
        context.addIssue({
          code: "custom",
          message: `${label} must be a non-negative number`,
        });
        return undefined;
      }

      return Number(value);
    });
}

function optionalInStock() {
  return z
    .string("inStock must be true or false")
    .trim()
    .optional()
    .transform((value, context) => {
      if (!value) {
        return undefined;
      }

      if (value === "true") {
        return true;
      }

      if (value === "false") {
        return false;
      }

      context.addIssue({
        code: "custom",
        message: "inStock must be true or false",
      });
      return undefined;
    });
}

export const productQuerySchema = z
  .object({
    search: optionalText("search"),
    category: optionalText("category"),
    brand: optionalText("brand"),
    minPrice: optionalPrice("minPrice"),
    maxPrice: optionalPrice("maxPrice"),
    inStock: optionalInStock(),
  })
  .superRefine((query, context) => {
    if (
      query.minPrice !== undefined &&
      query.maxPrice !== undefined &&
      query.minPrice > query.maxPrice
    ) {
      context.addIssue({
        code: "custom",
        path: ["minPrice"],
        message: "minPrice cannot be greater than maxPrice",
      });
    }
  })
  .transform((query): ProductFilters => {
    const filters: ProductFilters = {};

    if (query.search !== undefined) {
      filters.search = query.search;
    }

    if (query.category !== undefined) {
      filters.category = query.category;
    }

    if (query.brand !== undefined) {
      filters.brand = query.brand;
    }

    if (query.minPrice !== undefined) {
      filters.minPrice = query.minPrice;
    }

    if (query.maxPrice !== undefined) {
      filters.maxPrice = query.maxPrice;
    }

    if (query.inStock !== undefined) {
      filters.inStock = query.inStock;
    }

    return filters;
  });

export const productIdSchema = z.object({
  id: z.string("Product id is required").trim().min(1, "Product id is required"),
});

function firstIssueMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? "Invalid product input";
}

export function parseProductQuery(query: Record<string, unknown>): ParsedProductQuery {
  const parsed = productQuerySchema.safeParse(query);

  if (!parsed.success) {
    return { ok: false, message: firstIssueMessage(parsed.error) };
  }

  return { ok: true, filters: parsed.data };
}

export function parseProductId(id: unknown): { ok: true; id: string } | { ok: false; message: string } {
  const parsed = productIdSchema.safeParse({ id });

  if (!parsed.success) {
    return { ok: false, message: firstIssueMessage(parsed.error) };
  }

  return { ok: true, id: parsed.data.id };
}
