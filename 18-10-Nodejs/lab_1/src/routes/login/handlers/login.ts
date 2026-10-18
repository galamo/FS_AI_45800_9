import type { RequestHandler } from "express";
import { readUsers } from "../../../data/users.js";
import { v4 as uuidv4 } from "uuid";
const tokensObj: Record<string, {date: Date, user:string}> = {}; // will be replaced with a database

export const login: RequestHandler = async (req, res) => {
  console.log("login request received!!!!!!");
  const body = req.body as { username?: unknown; password?: unknown } | undefined;
  const { username, password } = body ?? {};

  if (typeof username !== "string" || username.length === 0 || typeof password !== "string" || password.length === 0) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  const users = await readUsers();
  const user = users.find((entry) => entry.login?.username === username);

  if (!user) {
    res.status(404).json({ message: "User does not exist" });
    return;
  }

  if (user.login.password !== password) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }
 
  const currentToken = uuidv4();
  tokensObj[currentToken] = {date: new Date(), user: user.login.username};
  // clear the prev user tokens 
  console.log(tokensObj);
  res.status(200).json({
    message: "Login successful",
    user: {
      username: user.login.username,
      email: user.email,
      name: user.name,
    },
    token: currentToken,
  });
};
