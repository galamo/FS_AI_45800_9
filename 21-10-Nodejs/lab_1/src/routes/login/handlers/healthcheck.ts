import type { RequestHandler } from "express";

export const healthcheck: RequestHandler = (_req, res) => {
  console.log("get healthcheck");
  res.send("Hello World!!!!!!");
};
