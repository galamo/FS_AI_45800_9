import { config } from "dotenv";
import express, { type ErrorRequestHandler, type RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { authorize, logRequestDuration, logRequestRecieved } from "./middleware.js";
import authRouter from "./routes/login/index.js"
config();

const port = process.env.PORT;
const app = express();

console.log("Starting Nodejs Server API");

const assignRequestId: RequestHandler = (_req, res, next) => {
  const requestId = uuidv4();
  res.setHeader("x-request-id", requestId);
  res.setHeader("x-powered-by", "");
  next();
};

app.use(assignRequestId);
app.use(logRequestRecieved);
app.use(logRequestDuration);
// app.use(authorize);

app.use("/auth", authRouter)
app.get("/users", (_req, res) => {
  res.status(200).send("users!!!");
});

app.get("/do-something", (_req, res) => {
  res.status(200).send("some api entry point");
});

app.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const requestId = res.getHeader("x-request-id");
  const stack = err instanceof Error ? err.stack : String(err);
  console.error(`${stack} ReqId:${requestId}`);
  res.status(500).send(`Something broke! ReqId:${requestId}`);
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
