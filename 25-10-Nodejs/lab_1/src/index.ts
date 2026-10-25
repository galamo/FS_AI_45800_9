import { config } from "dotenv";
import express, { type ErrorRequestHandler, type RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { logRequestDuration, logRequestRecieved, verifyLogin } from "./middleware.js";
import authRouter from "./routes/login/index.js"
import cors from "cors";
import { inspectExternalCatalog, loadProductCatalog } from "./products/catalog.js";
import { createProductsRouter } from "./routes/products/index.js";
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
app.use(cors()) //enable all origins 
app.use(assignRequestId);
app.use(logRequestRecieved);
app.use(logRequestDuration);
app.use(express.json());

app.use("/auth", authRouter)
app.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});



app.use(verifyLogin);


const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const requestId = res.getHeader("x-request-id");
  const stack = err instanceof Error ? err.stack : String(err);
  console.error(`${stack} ReqId:${requestId}`);
  res.status(500).send(`Something broke! ReqId:${requestId}`);
};

async function start() {
  const products = await loadProductCatalog();
  const observation = await inspectExternalCatalog();
  console.log(observation);
  app.use("/api/products", createProductsRouter(products));
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

start().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
