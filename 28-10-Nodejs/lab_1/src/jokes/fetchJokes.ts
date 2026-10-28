import { z } from "zod";

const DEFAULT_SOURCE = "https://official-joke-api.appspot.com/jokes/random";

const jokeSchema = z.object({
  id: z.number(),
  type: z.string(),
  setup: z.string(),
  punchline: z.string(),
});

export type Joke = z.infer<typeof jokeSchema>;

function sourceBase() {
  return (process.env.JOKES_SOURCE_URL ?? DEFAULT_SOURCE).replace(/\/$/, "");
}

export async function fetchJokes(count: number): Promise<Joke[]> {
  const url = `${sourceBase()}/${count}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });

  if (!response.ok) {
    throw new Error(`Jokes source returned HTTP ${response.status}`);
  }

  const payload: unknown = await response.json();
  const list = Array.isArray(payload) ? payload : [payload];
  const parsed = z.array(jokeSchema).safeParse(list);

  if (!parsed.success) {
    throw new Error("Jokes source returned an unexpected shape");
  }

  return parsed.data;
}
