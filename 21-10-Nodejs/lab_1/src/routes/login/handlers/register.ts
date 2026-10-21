import type { RequestHandler } from "express";
import { addUser } from "../../../data/users.js";
import { type RegisterBody, registerBodyKey } from "../middleware/validateRegister.js";

export const register: RequestHandler = async (_req, res) => {
  const input = res.locals[registerBodyKey] as RegisterBody | undefined;

  if (!input) {
    res.status(400).json({ message: "Invalid registration input" });
    return;
  }

  const result = await addUser(input);

  if (!result.ok) {
    res.status(409).json({ message: result.message });
    return;
  }

  const { email, name, login } = result.user;

  res.status(201).json({
    message: "User registered",
    user: {
      username: login.username,
      email,
      firstName: name.first,
      lastName: name.last,
    },
  });
};
