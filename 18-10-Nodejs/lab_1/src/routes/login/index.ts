import { Router } from "express";

const authRouter = Router();

authRouter.get("/healthcheck", (req, res) => {
    console.log("get healthcheck")
    res.send("Hello World!!!!!!");
});
authRouter.post("/login", (req, res) => {
    console.log("post login")
    res.send("Hello World");
});

export default authRouter;