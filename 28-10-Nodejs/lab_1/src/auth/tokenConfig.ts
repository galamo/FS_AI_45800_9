import { readFile, writeFile } from "node:fs/promises";

const configUrl = new URL("./token-config.json", import.meta.url);

export const DEFAULT_TTL_MINUTES = 15;
export const MIN_TTL_MINUTES = 1;
export const MAX_TTL_MINUTES = 30;

export const isTokenTtlMinutes = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= MIN_TTL_MINUTES &&
  value <= MAX_TTL_MINUTES;

export const readTokenTtlMinutes = async (): Promise<number> => {
  try {
    const raw = await readFile(configUrl, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "ttlMinutes" in parsed &&
      isTokenTtlMinutes(parsed.ttlMinutes)
    ) {
      return parsed.ttlMinutes;
    }
  } catch {
    return DEFAULT_TTL_MINUTES;
  }

  return DEFAULT_TTL_MINUTES;
};

export const writeTokenTtlMinutes = async (ttlMinutes: number): Promise<void> => {
  if (!isTokenTtlMinutes(ttlMinutes)) {
    throw new Error("Token TTL must be a whole number of minutes from 1 to 30");
  }

  await writeFile(configUrl, `${JSON.stringify({ ttlMinutes }, null, 2)}\n`, "utf8");
};
