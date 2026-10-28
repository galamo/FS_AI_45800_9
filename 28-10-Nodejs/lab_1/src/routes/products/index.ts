import { Router, type ErrorRequestHandler } from "express";


import { deleteProductFromCatalog } from "../../products/catalog.js";
import { filterProducts, listFilterOptions } from "../../products/filterProducts.js";
import { parseProductId, parseProductQuery } from "../../products/parseProductQuery.js";
import type { Product } from "../../products/product.js";
import { validateIsAdmin } from "../../middleware.js";

export function createProductsRouter(products: Product[]) {
  const router = Router();

  router.get("/", (req, res) => {
    const parsed = parseProductQuery(req.query as Record<string, unknown>);

    if (!parsed.ok) {
      res.status(400).json({
        error: {
          code: "INVALID_QUERY",
          message: parsed.message,
        },
      });
      return;
    }

    const matched = filterProducts(products, parsed.filters);
    res.status(200).json({
      products: matched,
      total: matched.length,
    });
  });

  router.get("/filters", (_req, res) => {
    res.status(200).json(listFilterOptions(products));
  });

  router.get("/:id", (req, res) => {
    const parsedId = parseProductId(req.params.id);

    if (!parsedId.ok) {
      res.status(400).json({
        error: {
          code: "INVALID_QUERY",
          message: parsedId.message,
        },
      });
      return;
    }

    const product = products.find((entry) => entry.id === parsedId.id);

    if (!product) {
      res.status(404).json({
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        },
      });
      return;
    }

    res.status(200).json({ product });
  });

 
  router.delete("/:id", validateIsAdmin, async (req, res) => {
    const parsedId = parseProductId(req.params.id);

    if (!parsedId.ok) {
      res.status(400).json({
        error: {
          code: "INVALID_QUERY",
          message: parsedId.message,
        },
      });
      return;
    }

    const deleted = await deleteProductFromCatalog(parsedId.id);

    if (!deleted) {
      res.status(404).json({
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        },
      });
      return;
    }

    const index = products.findIndex((entry) => entry.id === parsedId.id);
    if (index !== -1) {
      products.splice(index, 1);
    }

    res.status(200).json({ message: "deleted" });
  });

  const unexpectedError: ErrorRequestHandler = (error, _req, res, _next) => {
    console.error(error);
    if (res.headersSent) {
      return;
    }

    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
      },
    });
  };

  router.use(unexpectedError);

  return router;
}
