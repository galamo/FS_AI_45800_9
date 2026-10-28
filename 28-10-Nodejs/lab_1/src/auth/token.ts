import jwt from "jsonwebtoken";
import type { UserRecord } from "../data/users.js";

const TOKEN_TTL_SECONDS = 60 * 60 * 24

const readSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret;
};

export const signLoginToken = (user: UserRecord): string =>
  jwt.sign({ username: user.login.username, role: user.role,  timestamp: new Date().toISOString() }, readSecret(), { expiresIn: TOKEN_TTL_SECONDS });

export const verifyLoginToken = (token: string): {status: boolean, user: UserRecord | null} => {
  try {
    const decodedClaims = jwt.verify(token, readSecret());
    return {status: true, user: decodedClaims as UserRecord};
   
  } catch {
    return {status: false, user: null};
  }
};
