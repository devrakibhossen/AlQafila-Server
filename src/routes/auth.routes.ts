import { Router } from "express";
import { signIn, signOut, signUp ,socialSignIn} from "../controllers/auth.controller.js";
const authRouter = Router();
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/socialSign-in", socialSignIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
