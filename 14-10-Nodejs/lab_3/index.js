const cron = require("node-cron");
const express = require("express");
require("dotenv").config(); // default file is .env
const { logRequestRecieved } = require("./middleware");
const PORT  = process.env.PORT;

const app = express();
console.log("Starting Nodejs Server API");

app.use(logRequestRecieved)

app.use((req, res, next) => {
  const startedAt = performance.now();
  res.on("finish", () => {
    const durationMs = performance.now() - startedAt;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${durationMs.toFixed(2)}ms`
    );
  });

  next();
});

// middleware every request will pass through this middleware
app.use((req,res,next)=>{
   
   const user = req.query.user;
   const password = req.query.password;
   const envMasterUser = process.env?.MASTER_USER?.toLowerCase();
   const envMasterPassword = process.env?.MASTER_PASSWORD?.toLowerCase();
   
   if(user === envMasterUser && password === envMasterPassword){
        next()
    }else{
        return res.status(401).send("Unauthorized")
    }
});

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

