import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const usersFilePath = join(dirname(fileURLToPath(import.meta.url)), "users.json");

export type UserRecord = {
  role:string;
  email: string;
  name: {
    title?: string;
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

export type NewUser = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type AddUserResult =
  | { ok: true; user: UserRecord }
  | { ok: false; message: string };

const isUsersFile = (value: unknown): value is UsersFile => {
  if (typeof value !== "object" || value === null || !("results" in value)) {
    return false;
  }

  return Array.isArray(value.results);
};

const readUsersFile = async (): Promise<UsersFile> => {
  const raw = await readFile(usersFilePath, "utf8");
  const parsed: unknown = JSON.parse(raw);

  if (!isUsersFile(parsed)) {
    throw new Error("Users file is missing a results array");
  }

  return parsed;
};

export const readUsers = async (): Promise<UserRecord[]> => {
  const file = await readUsersFile();
  return file.results;
};

export const addUser = async (input: NewUser): Promise<AddUserResult> => {
  const file = await readUsersFile();
  const usernameTaken = file.results.some((user) => user.login?.username === input.username);
  const emailTaken = file.results.some((user) => user.email === input.email);

  if (usernameTaken) {
    return { ok: false, message: "Username already exists" };
  }

  if (emailTaken) {
    return { ok: false, message: "Email already exists" };
  }

  const user: UserRecord = {
    email: input.email,
    name: {
      first: input.firstName,
      last: input.lastName,
    },
    login: {
      username: input.username,
      password: input.password,
    },
  };

  file.results.push(user);
  await writeFile(usersFilePath, `${JSON.stringify(file, null, 2)}\n`, "utf8");

  return { ok: true, user };
};
