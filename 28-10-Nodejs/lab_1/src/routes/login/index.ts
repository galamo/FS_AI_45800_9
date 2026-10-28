import { Router } from "express";
import { healthcheck } from "./handlers/healthcheck.js";
import { login } from "./handlers/login.js";
import { register } from "./handlers/register.js";
import { validateRegister } from "./middleware/validateRegister.js";

const authRouter = Router();

authRouter.get("/healthcheck", healthcheck);
authRouter.post("/login", login);
authRouter.post("/register", validateRegister, register);

export default authRouter;
