import jwt from "jsonwebtoken";

const TOKEN_TTL_SECONDS = 10000;

const readSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret;
};

export const signLoginToken = (username: string): string =>
  jwt.sign({ username, role: "user",  system:"nodejs_api", timestamp: new Date().toISOString() }, readSecret(), { expiresIn: TOKEN_TTL_SECONDS });

export const verifyLoginToken = (token: string): boolean => {
  try {
    jwt.verify(token, readSecret(),(_, decodedClaims)=>{
     console.log(decodedClaims);
    });
    
    return true;
  } catch {
    return false;
  }
};
