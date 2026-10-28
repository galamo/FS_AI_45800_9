import { Router } from "express";
import {
  isTokenTtlMinutes,
  MAX_TTL_MINUTES,
  MIN_TTL_MINUTES,
  readTokenTtlMinutes,
  writeTokenTtlMinutes,
} from "../../auth/tokenConfig.js";
import { validateIsAdmin } from "../../middleware.js";

const settingsRouter = Router();

const isAdmin = (req: { user?: { role?: unknown } }): boolean => req.user?.role === "admin";

settingsRouter.get("/token-ttl", async (req, res) => {
  const ttlMinutes = await readTokenTtlMinutes();
  res.status(200).json({
    ttlMinutes,
    canUpdate: isAdmin(req as { user?: { role?: unknown } }),
  });
});

settingsRouter.put("/token-ttl", validateIsAdmin, async (req, res) => {
  const ttlMinutes = (req.body as { ttlMinutes?: unknown } | undefined)?.ttlMinutes;

  if (!isTokenTtlMinutes(ttlMinutes)) {
    res.status(400).json({
      error: {
        code: "INVALID_TTL",
        message: `Token TTL must be a whole number of minutes from ${MIN_TTL_MINUTES} to ${MAX_TTL_MINUTES}`,
      },
    });
    return;
  }

  await writeTokenTtlMinutes(ttlMinutes);
  res.status(200).json({
    ttlMinutes,
    canUpdate: true,
  });
});

export default settingsRouter;
