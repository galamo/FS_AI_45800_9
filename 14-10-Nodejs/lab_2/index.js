const cron = require("node-cron");
const express = require("express");
require("dotenv").config(); // default file is .env

const PORT  = process.env.PORT;

const app = express();
console.log("Starting Nodejs Server API");
app.use((req,res,next)=>{
    console.log(`[${new Date().toISOString()}] Request received ${req.method} ${req.url}`);
    next()
})

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

function vadimPromise(){
  return new Promise((resolve, reject) => {
    //  DONT DO THIS!!!
      for(let i = 0; i < 1000000; i++){
        console.log(i);
      }
      resolve("Vadim Promise");
  
  });
}

app.get("/long-process", async (req, res) => {
        const result = await vadimPromise();
        res.status(200).send(`${new Date().toLocaleString()} - Long Process ${result}`);
});
app.get("/short-process", (req, res) => {
  res.status(200).send(`${new Date().toLocaleString()} - Short Process`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

