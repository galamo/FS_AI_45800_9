const cron = require("node-cron");
const express = require("express");
require("dotenv").config(); // default file is .env

const PORT  = process.env.PORT;

const app = express();
console.log("Starting Nodejs Server API");


app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

