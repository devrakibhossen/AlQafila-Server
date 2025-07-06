import { RequestHandler, Router } from "express";
import {
  signIn,
  signUp,
  socialSignIn,
} from "../controllers/auth.controller.js";
const authRouter = Router();
authRouter.post("/sign-up", signUp as RequestHandler);
authRouter.post("/sign-in", signIn);
authRouter.post("/socialSign-in", socialSignIn as RequestHandler);
// authRouter.post("/sign-out", signOut);

export default authRouter;
