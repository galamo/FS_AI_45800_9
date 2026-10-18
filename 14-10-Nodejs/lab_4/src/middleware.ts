import type { Request, RequestHandler } from "express";

const readQueryValue = (value: Request["query"][string]): string | undefined => {
  if (typeof value === "string") {
    return value;
  }

  return undefined;
};

export const logRequestRecieved: RequestHandler = (req, _res, next) => {
  console.log(`[${new Date().toISOString()}] Request received ${req.method} ${req.url}`);
  next();
};

export const logRequestDuration: RequestHandler = (_req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startedAt;
    console.log(`[${new Date().toISOString()}] Request duration ${duration}ms`);
  });

  next();
};


