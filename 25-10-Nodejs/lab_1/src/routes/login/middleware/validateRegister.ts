import type { RequestHandler } from "express";
import { z } from "zod";

export const registerBodyKey = "registerBody";

export const registerSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  email: z.email("Email must be valid"),
  password: z.string().min(1, "Password is required"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
});

export type RegisterBody = z.infer<typeof registerSchema>;

export const validateRegister: RequestHandler = (req, res, next) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid registration input",
      errors: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  res.locals[registerBodyKey] = parsed.data;
  next();
};
