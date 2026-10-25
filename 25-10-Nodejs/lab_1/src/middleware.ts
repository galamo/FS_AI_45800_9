import type { RequestHandler } from "express";
import { verifyLoginToken } from "./auth/token.js";

const publicPaths = new Set(["/auth/login", "/auth/register", "/auth/healthcheck"]);

export const logRequestRecieved: RequestHandler = (req, _res, next) => {
  console.log(`[${new Date().toISOString()}] Request received ${req.method} ${req.url}`);
  next();
};

export const verifyLogin: RequestHandler = (req, res, next) => {
 

  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : header;

  if (!token || !verifyLoginToken(token)) {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
    });
    return;
  }

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


