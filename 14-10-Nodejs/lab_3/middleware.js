function logRequestRecieved(req,res,next){
    console.log(`[${new Date().toISOString()}] Request received ${req.method} ${req.url}`);
    next()
}

module.exports = { logRequestRecieved } 
