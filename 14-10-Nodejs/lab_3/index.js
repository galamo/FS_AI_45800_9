const cron = require("node-cron");
const express = require("express");
require("dotenv").config(); // default file is .env
const { logRequestRecieved, authorize, logRequestDuration } = require("./middleware");
const PORT  = process.env.PORT;

const app = express();
console.log("Starting Nodejs Server API");

app.use(logRequestRecieved)
app.use(logRequestDuration)
app.use(authorize)

app.get("/users", (req, res) => {
    setTimeout(() => {
        res.status(200).send("users!!!");
    }, 1000);
    
});

app.get("/do-something", (req, res) => {
    res.status(200).send("some api entry point");
  });

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
// ERROR MIDDLEWARE - must be the last middleware with 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

