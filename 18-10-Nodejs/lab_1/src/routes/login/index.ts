import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Router, type RequestHandler } from "express";

const usersFilePath = join(dirname(fileURLToPath(import.meta.url)), "../../data/users.json");

type UserRecord = {
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    username: string;
    password: string;
  };
};

type UsersFile = {
  results: UserRecord[];
};

const isUsersFile = (value: unknown): value is UsersFile => {
  if (typeof value !== "object" || value === null || !("results" in value)) {
    return false;
  }

  return Array.isArray(value.results);
};

const readUsers = async (): Promise<UserRecord[]> => {
  const raw = await readFile(usersFilePath, "utf8");
  const parsed: unknown = JSON.parse(raw);

  if (!isUsersFile(parsed)) {
    throw new Error("Users file is missing a results array");
  }

  return parsed.results;
};

const login: RequestHandler = async (req, res) => {
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

  res.status(200).json({
    message: "Login successful",
    user: {
      username: user.login.username,
      email: user.email,
      name: user.name,
    },
  });
};

const authRouter = Router();

authRouter.get("/healthcheck", (_req, res) => {
  console.log("get healthcheck");
  res.send("Hello World!!!!!!");
});

authRouter.post("/login", login);


export default authRouter;
