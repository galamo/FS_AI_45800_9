function logRequestRecieved(req,res,next){
    console.log(`[${new Date().toISOString()}] Request received ${req.method} ${req.url}`);
    next()
}

function logRequestDuration(req,res,next){
    const startedAt = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - startedAt;
        console.log(`[${new Date().toISOString()}] Request duration ${duration}ms`);
    });
    next()
}

function authorize(req,res,next){
        const user = req.query.user;
        const password = req.query.password;
        const envMasterUser = process.env?.MASTER_USER?.toLowerCase();
        const envMasterPassword = process.env?.MASTER_PASSWORD?.toLowerCase();
        if(user === envMasterUser && password === envMasterPassword){
            console.log("next")
             next()
         }else{
             return res.status(401).send("Unauthorized")
         }
}

module.exports = { logRequestRecieved,logRequestDuration,authorize } 
