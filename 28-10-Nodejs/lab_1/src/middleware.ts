import type { RequestHandler } from "express";
import { verifyLoginToken } from "./auth/token.js";
import { logger } from "./logger.js";

const publicPaths = new Set(["/auth/login", "/auth/register", "/auth/healthcheck"]);

export const logRequestRecieved: RequestHandler = (req, _res, next) => {
  console.log(`[${new Date().toISOString()}] Request received ${req.method} ${req.url}`);
  next();
};

export const verifyLogin: RequestHandler = (req, res, next) => {
 

  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : header;
  if(!token){
    logger.error("Unauthorized - no token", res.getHeader("x-request-id"));
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Unauthorized - no token",
      },
    });
    return;
  }
   
  const jwtVerifyResponse = verifyLoginToken(token);
  (req as any).user = jwtVerifyResponse.user;

  if (!jwtVerifyResponse.status) {
    logger.error("Unauthorized-token not valid", res.getHeader("x-request-id"));
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

export const  validateIsAdmin:RequestHandler = (req, res ,next) =>{
  if((req as any).user.role === "admin"){
    return next()
  }else{
    return res.status(403).json({
      error: {
        code: "FORBIDDEN",
        message: "Permission denied",
      },
    })
  }
}



