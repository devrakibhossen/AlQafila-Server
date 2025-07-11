import { RequestHandler, Router } from "express";
import { followUser, unfollowUser } from "../controllers/follow.controller.js";

const followRouter = Router();

followRouter.post("/followUser", followUser as RequestHandler);
followRouter.post("/unfollowUser", unfollowUser as RequestHandler);

export default followRouter;
