import { Router, type ErrorRequestHandler } from "express";
import { fetchJokes } from "../../jokes/fetchJokes.js";

const MAX_JOKES = 100;

function parseCount(value: unknown): { ok: true; count: number } | { ok: false; message: string } {
  if (value === undefined || value === "") {
    return { ok: true, count: 5 };
  }

  const raw = Array.isArray(value) ? value[0] : value;
  const count = typeof raw === "string" ? Number(raw) : Number.NaN;

  if (!Number.isInteger(count) || count < 1 || count > MAX_JOKES) {
    return { ok: false, message: `count must be an integer from 1 to ${MAX_JOKES}` };
  }

  return { ok: true, count };
}

export function createJokesRouter() {
  const router = Router();

  router.get("/", async (req, res) => {
    const parsed = parseCount(req.query.count);

    if (!parsed.ok) {
      res.status(400).json({
        error: {
          code: "INVALID_QUERY",
          message: parsed.message,
        },
      });
      return;
    }

    try {
      const jokes = await fetchJokes(parsed.count);
      res.status(200).json({ jokes, total: jokes.length });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Jokes source failed";
      console.error(message);
      res.status(502).json({
        error: {
          code: "JOKES_UNAVAILABLE",
          message: "The jokes service is unavailable. Try again.",
        },
      });
    }
  });

  const unexpectedError: ErrorRequestHandler = (error, _req, res, _next) => {
    console.error(error);
    if (res.headersSent) {
      return;
    }

    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
      },
    });
  };

  router.use(unexpectedError);

  return router;
}
