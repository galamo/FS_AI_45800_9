const { randomUUID, timingSafeEqual } = require("node:crypto");
const { performance } = require("node:perf_hooks");

const bearerPrefix = "Bearer ";

const sendUnauthorized = (res) => {
  res.set("WWW-Authenticate", "Bearer");
  return res.status(401).json({ message: "Unauthorized" });
};

const readBearerToken = (authorizationHeader) => {
  if (typeof authorizationHeader !== "string") {
    return undefined;
  }

  if (!authorizationHeader.startsWith(bearerPrefix)) {
    return undefined;
  }

  const token = authorizationHeader.slice(bearerPrefix.length);

  if (token.trim() === "") {
    return undefined;
  }

  return token;
};

const tokensMatch = (presentedToken, expectedToken) => {
  const presentedBuffer = Buffer.from(presentedToken);
  const expectedBuffer = Buffer.from(expectedToken);

  if (presentedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(presentedBuffer, expectedBuffer);
};

const authorize = (req, res, next) => {
  const expectedToken = process.env.BANK_API_TOKEN;
  const presentedToken = readBearerToken(req.get("Authorization"));

  if (typeof expectedToken !== "string" || expectedToken.trim() === "") {
    return sendUnauthorized(res);
  }

  if (presentedToken === undefined) {
    return sendUnauthorized(res);
  }

  if (!tokensMatch(presentedToken, expectedToken)) {
    return sendUnauthorized(res);
  }

  return next();
};

const assignRequestId = (req, res, next) => {
  const requestId = randomUUID();
  req.requestId = requestId;
  res.set("x-request-id", requestId);
  next();
};

const logRequest = (req, res, next) => {
  const receivedAt = new Date().toISOString();
  console.log(
    `${receivedAt} request id=${req.requestId} method=${req.method} path=${req.path}`,
  );
  next();
};

const logRequestDuration = (req, res, next) => {
  const startedAt = performance.now();

  res.once("finish", () => {
    const durationMs = performance.now() - startedAt;
    console.log(
      `request finished id=${req.requestId} status=${res.statusCode} durationMs=${durationMs}`,
    );
  });

  next();
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    message: "Internal server error",
    requestId: req.requestId,
  });
};

module.exports = {
  authorize,
  assignRequestId,
  logRequest,
  logRequestDuration,
  errorHandler,
};
