import { Router, type ErrorRequestHandler } from "express";
import { filterProducts, listFilterOptions } from "../../products/filterProducts.js";
import { parseProductId, parseProductQuery } from "../../products/parseProductQuery.js";
import type { Product } from "../../products/product.js";
import { verifyLoginToken } from "../../auth/token.js";

export function createProductsRouter(products: readonly Product[]) {
  const router = Router();
 router.use((req, res, next)=>{
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : header;

  if(!token || !verifyLoginToken(token)){
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
    });
    return;
  }
  next();
 })

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
