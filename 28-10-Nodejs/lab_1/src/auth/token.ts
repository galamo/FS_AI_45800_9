import jwt from "jsonwebtoken";
import type { UserRecord } from "../data/users.js";
import { readTokenTtlMinutes } from "./tokenConfig.js";

const readSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret;
};

export const signLoginToken = async (user: UserRecord): Promise<string> => {
  const ttlMinutes = await readTokenTtlMinutes();
  return jwt.sign(
    { username: user.login.username, role: user.role, timestamp: new Date().toISOString() },
    readSecret(),
    { expiresIn: ttlMinutes * 60 },
  );
};

export const verifyLoginToken = (token: string): {status: boolean, user: UserRecord | null} => {
  try {
    const decodedClaims = jwt.verify(token, readSecret());
    return {status: true, user: decodedClaims as UserRecord};
   
  } catch {
    return {status: false, user: null};
  }
};
