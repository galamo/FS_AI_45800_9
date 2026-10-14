const cron = require("node-cron");
const express = require("express");
require("dotenv").config(); // default file is .env

const PORT  = process.env.PORT;

const app = express();
console.log("Starting Nodejs Server API");

// middleware every request will pass through this middleware
app.use((req,res,next)=>{
    // implement authorization access logic
    // if the userName and password from the query params are correct ? env=almog, pass=1234
    // then continue next - 
    // otherwise return 401 

    console.log("Request received");
    return res.send("U turn")
    next()
});

app.get("/almog/going/crazy", (req, res) => {
  res.status(200).send("You are Crazy!!!");
});

app.get("/do-something", (req, res) => {
    res.status(200).send("some api entry point");
  });

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

