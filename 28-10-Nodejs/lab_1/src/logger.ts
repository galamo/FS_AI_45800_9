import path from "node:path";
import { fileURLToPath } from "node:url";
import winston from "winston";

const logsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "logs");

const { combine, printf, timestamp } = winston.format;

const attachData = winston.format((info) => {
  const splat = info[Symbol.for("splat")];
  info.data = Array.isArray(splat) && splat.length > 0 ? splat[0] : null;
  return info;
});

const jsonLog = printf((info) =>
  JSON.stringify({
    message: info.message,
    timestamp: info.timestamp,
    data: info.data ?? null,
  }),
);

export const logger = winston.createLogger({
  format: combine(timestamp(), attachData(), jsonLog),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, "app.log") }),
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
    }),
  ],
});
